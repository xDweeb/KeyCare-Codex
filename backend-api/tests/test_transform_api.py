"""Lightweight contract tests for the KeyCare transform API."""

from __future__ import annotations

import asyncio
import json
import sys
import unittest
from pathlib import Path


BACKEND_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BACKEND_DIR))

import main  # noqa: E402
from transform_service import (  # noqa: E402
    KEYCARE_INSTRUCTIONS,
    OpenAITransformProvider,
    ProviderUnavailableError,
    TRANSFORM_OUTPUT_SCHEMA,
    TransformService,
    build_openai_input,
    extract_openai_output_text,
)


MOROCCAN_CASES = [
    (
        "wach n9dro ndecaliw meeting l vendredi?",
        ["darija", "french"],
        True,
        True,
        "neutral",
    ),
    (
        "slm monsieur ana maghadich n9dr nji demain",
        ["darija", "french"],
        True,
        True,
        "neutral",
    ),
    (
        "واش ممكن نأجلو la réunion؟",
        ["darija", "french"],
        True,
        False,
        "neutral",
    ),
    (
        "had design ma3jbnich khassna nbddlou",
        ["darija", "english"],
        True,
        True,
        "critical",
    ),
    (
        "nta 7mar maktfham walo",
        ["darija"],
        False,
        True,
        "aggressive",
    ),
]


class MoroccanFixtureProvider:
    """Deterministic provider double; no credentials or network required."""

    async def transform(self, text, action, target_language):
        case = next(case for case in MOROCCAN_CASES if case[0] == text)
        _, languages, code_switched, arabizi, tone = case
        return {
            "result": text if action == "analyze" else f"suggestion:{action}",
            "analysis": {
                "detected_languages": languages,
                "code_switched": code_switched,
                "arabizi": arabizi,
                "tone": tone,
            },
        }


class UnavailableProvider:
    async def transform(self, text, action, target_language):
        raise ProviderUnavailableError("test provider unavailable")


class TransformServiceContractTests(unittest.IsolatedAsyncioTestCase):
    async def test_representative_moroccan_messages_use_stable_shape(self):
        service = TransformService(MoroccanFixtureProvider())

        for text, languages, code_switched, arabizi, tone in MOROCCAN_CASES:
            with self.subTest(text=text):
                response = await service.transform(text, "analyze")
                self.assertEqual(
                    set(response), {"result", "analysis", "meta"}
                )
                self.assertEqual(
                    set(response["analysis"]),
                    {"detected_languages", "code_switched", "arabizi", "tone"},
                )
                self.assertEqual(
                    set(response["meta"]), {"action", "target_language"}
                )
                self.assertEqual(response["result"], text)
                self.assertEqual(response["analysis"]["detected_languages"], languages)
                self.assertEqual(response["analysis"]["code_switched"], code_switched)
                self.assertEqual(response["analysis"]["arabizi"], arabizi)
                self.assertEqual(response["analysis"]["tone"], tone)
                self.assertEqual(response["meta"]["action"], "analyze")
                self.assertIsNone(response["meta"]["target_language"])

    async def test_transform_actions_preserve_contract_metadata(self):
        service = TransformService(MoroccanFixtureProvider())
        text = MOROCCAN_CASES[0][0]

        for action in (
            "improve",
            "professional",
            "translate",
            "calm",
            "respectful",
        ):
            with self.subTest(action=action):
                target = "fr" if action == "translate" else None
                response = await service.transform(text, action, target)
                self.assertTrue(response["result"])
                self.assertEqual(response["meta"]["action"], action)
                self.assertEqual(response["meta"]["target_language"], target)


class TransformEndpointErrorTests(unittest.TestCase):
    def setUp(self):
        self.original_service = main.transform_service

    def tearDown(self):
        main.transform_service = self.original_service

    @staticmethod
    def response_json(response):
        return json.loads(response.body.decode("utf-8"))

    def test_empty_text_returns_contract_error(self):
        request = main.TransformRequest(text="   ", action="improve")
        response = asyncio.run(main.transform_message(request))

        self.assertEqual(response.status_code, 422)
        self.assertEqual(self.response_json(response)["error"]["code"], "empty_text")

    def test_translate_requires_target_language(self):
        request = main.TransformRequest(text="salam", action="translate")
        response = asyncio.run(main.transform_message(request))

        self.assertEqual(response.status_code, 422)
        body = self.response_json(response)
        self.assertEqual(body["error"]["code"], "validation_error")
        self.assertIn("target_language", body["error"]["fields"])

    def test_provider_failure_returns_safe_503(self):
        main.transform_service = TransformService(UnavailableProvider())
        request = main.TransformRequest(text="salam", action="improve")
        response = asyncio.run(main.transform_message(request))

        self.assertEqual(response.status_code, 503)
        body = self.response_json(response)
        self.assertEqual(body["error"]["code"], "provider_unavailable")
        self.assertNotIn("test provider unavailable", response.body.decode("utf-8"))


class OpenAIProviderTests(unittest.IsolatedAsyncioTestCase):
    async def test_missing_key_fails_without_network_request(self):
        provider = OpenAITransformProvider(api_key="", model="gpt-5-mini")
        with self.assertRaises(ProviderUnavailableError):
            await provider.transform("salam", "improve", None)

    def test_responses_output_text_is_extracted_by_type(self):
        response = {
            "output": [
                {"type": "reasoning", "content": []},
                {
                    "type": "message",
                    "content": [
                        {
                            "type": "output_text",
                            "text": '{"result":"salam","analysis":{}}',
                        }
                    ],
                },
            ]
        }
        self.assertEqual(
            extract_openai_output_text(response),
            '{"result":"salam","analysis":{}}',
        )

    def test_instruction_and_schema_encode_morocco_first_contract(self):
        self.assertIn("Arabizi", KEYCARE_INSTRUCTIONS)
        self.assertIn("code-switching", KEYCARE_INSTRUCTIONS)
        self.assertIn("criticism", KEYCARE_INSTRUCTIONS)
        self.assertFalse(TRANSFORM_OUTPUT_SCHEMA["additionalProperties"])
        self.assertEqual(
            set(TRANSFORM_OUTPUT_SCHEMA["required"]), {"result", "analysis"}
        )

    def test_action_input_preserves_complete_user_message(self):
        criticism = "had design ma3jbnich khassna nbddlou"
        attack = "nta 7mar maktfham walo"
        self.assertIn(criticism, build_openai_input(criticism, "analyze", None))
        self.assertIn(attack, build_openai_input(attack, "calm", None))


if __name__ == "__main__":
    unittest.main()
