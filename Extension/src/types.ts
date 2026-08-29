export type TransformAction =
  | "improve"
  | "professional"
  | "translate"
  | "calm"
  | "respectful"
  | "analyze";

export type TargetLanguage = "ar" | "darija" | "fr" | "en";

export interface TransformRequest {
  text: string;
  action: TransformAction;
  target_language?: TargetLanguage;
}

export interface TransformResponse {
  result: string;
  analysis: {
    detected_languages: string[];
    code_switched: boolean;
    arabizi: boolean;
    tone: string;
  };
  meta: {
    action: TransformAction;
    target_language: TargetLanguage | null;
  };
}

export type ExtensionMessage =
  | { type: "KEYCARE_TRANSFORM"; payload: TransformRequest }
  | { type: "KEYCARE_HEALTH" };

export type ExtensionReply =
  | { ok: true; data: TransformResponse | Record<string, unknown> }
  | { ok: false; error: string };
