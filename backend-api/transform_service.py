"""Provider-neutral KeyCare message transformation service."""

from __future__ import annotations

import json
import logging
import re
from dataclasses import dataclass
from typing import Any, Protocol

import httpx


logger = logging.getLogger("keycare.transform")

SUPPORTED_ACTIONS = {
    "improve",
    "professional",
    "translate",
    "calm",
    "respectful",
    "analyze",
}
SUPPORTED_LANGUAGES = {"ar", "darija", "fr", "en"}


class ProviderUnavailableError(RuntimeError):
    """Raised when the configured AI provider cannot fulfill a request."""


class TransformProvider(Protocol):
    async def transform(
        self, text: str, action: str, target_language: str | None
    ) -> dict[str, Any]:
        """Return a provider result matching the shared transform shape."""


@dataclass
class GeminiTransformProvider:
    """Gemini REST adapter kept behind the shared KeyCare service boundary."""

    api_key: str
    model: str
    timeout_seconds: float = 15.0

    async def transform(
        self, text: str, action: str, target_language: str | None
    ) -> dict[str, Any]:
        if not self.api_key:
            raise ProviderUnavailableError("AI provider is not configured")

        url = (
            "https://generativelanguage.googleapis.com/v1beta/models/"
            f"{self.model}:generateContent"
        )
        payload = {
            "contents": [{"parts": [{"text": build_transform_prompt(text, action, target_language)}]}],
            "generationConfig": {
                "temperature": 0.25,
                "topP": 0.8,
                "maxOutputTokens": 700,
                "responseMimeType": "application/json",
            },
            "safetySettings": [
                {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
                {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
                {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
            ],
        }

        try:
            async with httpx.AsyncClient(timeout=self.timeout_seconds) as client:
                response = await client.post(
                    url,
                    json=payload,
                    params={"key": self.api_key},
                    headers={"Content-Type": "application/json; charset=utf-8"},
                )
        except (httpx.TimeoutException, httpx.NetworkError) as exc:
            raise ProviderUnavailableError("AI provider request failed") from exc

        if response.status_code != 200:
            logger.warning("Transform provider returned status %s", response.status_code)
            raise ProviderUnavailableError("AI provider rejected the request")

        try:
            data = response.json()
            response_text = data["candidates"][0]["content"]["parts"][0]["text"]
            result = parse_provider_json(response_text)
        except (KeyError, IndexError, TypeError, ValueError, json.JSONDecodeError) as exc:
            raise ProviderUnavailableError("AI provider returned an invalid response") from exc

        if not isinstance(result, dict) or not isinstance(result.get("result"), str):
            raise ProviderUnavailableError("AI provider returned an incomplete response")
        return result


class TransformService:
    """Stable application service shared by every KeyCare client."""

    def __init__(self, provider: TransformProvider):
        self.provider = provider

    async def transform(
        self, text: str, action: str, target_language: str | None = None
    ) -> dict[str, Any]:
        provider_result = await self.provider.transform(text, action, target_language)
        analysis = normalize_analysis(provider_result.get("analysis"), text)

        result = provider_result.get("result", "").strip()
        if action == "analyze":
            result = text
        if not result:
            raise ProviderUnavailableError("AI provider returned an empty result")

        return {
            "result": result,
            "analysis": analysis,
            "meta": {
                "action": action,
                "target_language": target_language,
            },
        }


def build_transform_prompt(text: str, action: str, target_language: str | None) -> str:
    instructions = {
        "improve": "Improve clarity and naturalness while preserving meaning and language mix.",
        "professional": "Rewrite as natural professional communication while preserving meaning.",
        "translate": f"Translate naturally into {target_language}; understand the complete mixed-language meaning first.",
        "calm": "Reduce emotional escalation while preserving the user's point and boundaries.",
        "respectful": "Express the same meaning more respectfully without censoring the user.",
        "analyze": "Analyze only. Return the original text unchanged as result.",
    }
    return f"""You are KeyCare, a Morocco-first AI communication layer.

Moroccan messages may mix Darija, Arabic, French, English, and Arabizi (including 3, 7, and 9) in one sentence. Understand the message semantically; never translate word by word.

Action: {action}
Instruction: {instructions[action]}
Target language: {target_language or "none"}

Rules:
- Preserve the user's intended meaning.
- Suggest only; never claim to send, censor, or silently alter a message.
- Distinguish ordinary criticism from a personal attack using context and intent.
- Do not rely on a bad-word blacklist.
- For analyze, copy the input exactly into result.
- Return only valid JSON using this exact structure:
{{
  "result": "string",
  "analysis": {{
    "detected_languages": ["darija|arabic|french|english"],
    "code_switched": true,
    "arabizi": true,
    "tone": "short lowercase label"
  }}
}}

Message:
{text}"""


def parse_provider_json(response_text: str) -> dict[str, Any]:
    cleaned = response_text.strip()
    fenced = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", cleaned)
    if fenced:
        cleaned = fenced.group(1)
    return json.loads(cleaned)


def normalize_analysis(raw: Any, text: str) -> dict[str, Any]:
    analysis = raw if isinstance(raw, dict) else {}
    languages = analysis.get("detected_languages", [])
    if not isinstance(languages, list):
        languages = []
    languages = [str(language).lower() for language in languages if language]

    arabizi = analysis.get("arabizi")
    if not isinstance(arabizi, bool):
        arabizi = bool(re.search(r"(?i)\b\w*[379]\w*\b", text))

    code_switched = analysis.get("code_switched")
    if not isinstance(code_switched, bool):
        code_switched = len(set(languages)) > 1

    tone = analysis.get("tone")
    if not isinstance(tone, str) or not tone.strip():
        tone = "uncertain"

    return {
        "detected_languages": languages,
        "code_switched": code_switched,
        "arabizi": arabizi,
        "tone": tone.strip().lower(),
    }
