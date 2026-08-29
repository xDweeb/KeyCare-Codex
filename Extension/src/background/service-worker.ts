import { API_BASE_URL, HEALTH_ENDPOINT, TRANSFORM_ENDPOINT } from "../config";
import type {
  ExtensionMessage,
  ExtensionReply,
  TransformRequest,
  TransformResponse,
} from "../types";

const ACTIONS = new Set([
  "improve",
  "professional",
  "translate",
  "calm",
  "respectful",
  "analyze",
]);

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    throw new Error(`KeyCare returned HTTP ${response.status}`);
  }
}

function assertRequest(payload: TransformRequest): void {
  if (!payload || typeof payload.text !== "string" || !payload.text.trim()) {
    throw new Error("Select or enter text first.");
  }
  if (!ACTIONS.has(payload.action)) {
    throw new Error("Unsupported KeyCare action.");
  }
  if (payload.action === "translate" && !payload.target_language) {
    throw new Error("Choose a translation language.");
  }
}

function assertTransformResponse(data: unknown): asserts data is TransformResponse {
  const value = data as Partial<TransformResponse> | null;
  if (
    !value ||
    typeof value.result !== "string" ||
    !value.analysis ||
    !Array.isArray(value.analysis.detected_languages) ||
    typeof value.analysis.code_switched !== "boolean" ||
    typeof value.analysis.arabizi !== "boolean" ||
    typeof value.analysis.tone !== "string" ||
    !value.meta ||
    typeof value.meta.action !== "string"
  ) {
    throw new Error("KeyCare returned an invalid response.");
  }
}

async function transform(payload: TransformRequest): Promise<TransformResponse> {
  assertRequest(payload);
  const response = await fetch(`${API_BASE_URL}${TRANSFORM_ENDPOINT}`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const data = await readJson(response);
  if (!response.ok) {
    const detail = data as { error?: { message?: string } };
    throw new Error(detail.error?.message || `KeyCare returned HTTP ${response.status}`);
  }
  assertTransformResponse(data);
  return data;
}

async function health(): Promise<Record<string, unknown>> {
  const response = await fetch(`${API_BASE_URL}${HEALTH_ENDPOINT}`);
  const data = await readJson(response);
  if (!response.ok) throw new Error(`KeyCare returned HTTP ${response.status}`);
  return data as Record<string, unknown>;
}

chrome.runtime.onMessage.addListener(
  (message: ExtensionMessage, _sender, sendResponse: (reply: ExtensionReply) => void) => {
    const operation =
      message.type === "KEYCARE_TRANSFORM"
        ? transform(message.payload)
        : message.type === "KEYCARE_HEALTH"
          ? health()
          : Promise.reject(new Error("Unsupported extension message."));

    operation
      .then((data) => sendResponse({ ok: true, data }))
      .catch((error: unknown) =>
        sendResponse({
          ok: false,
          error: error instanceof Error ? error.message : "KeyCare request failed.",
        }),
      );
    return true;
  },
);
