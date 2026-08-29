# KeyCare Shared API Contract

This contract is the shared integration boundary for the Android keyboard, browser extension, and web app. Clients can implement it immediately with local mocks and later switch to the backend without changing request or response shapes.

## Endpoint

```http
POST /api/v1/transform
Content-Type: application/json; charset=utf-8
Accept: application/json
```

The deployment-specific API origin is client configuration. The private AI provider key is backend-only and must never appear in Android, Web, or Extension source, configuration, bundles, logs, or requests.

## Request

```json
{
  "text": "wach n9dro ndecaliw meeting l vendredi?",
  "action": "professional",
  "target_language": "fr"
}
```

### Request Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `text` | string | Yes | UTF-8 message to transform or analyze. Leading and trailing whitespace may be ignored for validation. |
| `action` | string enum | Yes | One of the P0 action values below. |
| `target_language` | string | Conditional | Optional for most actions. Required for `translate`; also accepted when the user explicitly requests language conversion with another action. Use a short agreed language code such as `ar`, `darija`, `fr`, or `en`. |

Unknown request fields should be ignored for forward compatibility unless the backend framework is intentionally configured to reject them consistently.

### P0 Action Enum

| Action | Behavior |
| --- | --- |
| `improve` | Improve clarity and naturalness while preserving meaning. |
| `professional` | Rewrite in a professional tone. |
| `translate` | Translate into `target_language`. |
| `calm` | Reduce escalation while preserving the user's point. |
| `respectful` | Express the same intent more respectfully. |
| `analyze` | Return tone and language analysis. The `result` should contain the original text unchanged. |

Clients must send these lowercase values even when the visible product label differs, such as “Tone Check” for `analyze`.

## Successful Response

Status: `200 OK`

```json
{
  "result": "Serait-il possible de reporter la réunion à vendredi ?",
  "analysis": {
    "detected_languages": ["darija", "french"],
    "code_switched": true,
    "arabizi": true,
    "tone": "neutral"
  },
  "meta": {
    "action": "professional",
    "target_language": "fr"
  }
}
```

### Response Fields

| Field | Type | Description |
| --- | --- | --- |
| `result` | string | Suggested text. For `analyze`, this is the original text unchanged. It is never sent or inserted automatically. |
| `analysis.detected_languages` | string array | Languages or language varieties detected in the input, in best-effort prominence order. May include values such as `darija`, `arabic`, `french`, or `english`. |
| `analysis.code_switched` | boolean | Whether the input meaningfully mixes languages or language varieties. |
| `analysis.arabizi` | boolean | Whether Latin-script Arabic/Darija patterns were detected. |
| `analysis.tone` | string | Short best-effort tone label, such as `neutral`, `friendly`, `professional`, `aggressive`, or `uncertain`. Clients must tolerate new labels. |
| `meta.action` | action enum | Action applied by the backend. |
| `meta.target_language` | string or `null` | Effective requested target language, or `null` when none was requested. |

All successful responses use this structure. Fields are present even when a signal is unknown: use an empty array for unknown languages, `false` for undetected boolean signals, `"uncertain"` for unknown tone, and `null` when there is no target language.

## Validation Errors

Status: `422 Unprocessable Entity`

```json
{
  "error": {
    "code": "validation_error",
    "message": "The request is invalid.",
    "fields": {
      "action": "Unsupported action."
    }
  }
}
```

Validation failures use one stable error envelope:

| Field | Type | Description |
| --- | --- | --- |
| `error.code` | string | Machine-readable error code. |
| `error.message` | string | Safe, user-presentable summary. |
| `error.fields` | object | Optional mapping of request fields to validation messages. Use `{}` when no field detail is available. |

Validation cases include:

- Missing or non-string `text`
- Missing or unsupported `action`
- Missing `target_language` for `translate`
- Invalid `target_language` value
- Text exceeding the backend's documented size limit

### Empty Text

Empty text, whitespace-only text, or text that becomes empty after trimming returns `422`:

```json
{
  "error": {
    "code": "empty_text",
    "message": "Text must not be empty.",
    "fields": {
      "text": "Enter a message to continue."
    }
  }
}
```

Clients should disable submission for obviously empty text but must still handle this backend response.

## Backend and Provider Errors

Provider credentials, provider response bodies, stack traces, prompts, and internal implementation details must never be returned to clients.

### Provider Temporarily Unavailable

Status: `503 Service Unavailable`

```json
{
  "error": {
    "code": "provider_unavailable",
    "message": "KeyCare could not process this message right now. Please try again.",
    "fields": {}
  }
}
```

### Unexpected Backend Error

Status: `500 Internal Server Error`

```json
{
  "error": {
    "code": "internal_error",
    "message": "KeyCare encountered an unexpected error.",
    "fields": {}
  }
}
```

Clients must keep the original text intact, show a recoverable error state, and never block ordinary typing or automatically retry in a way that duplicates user actions.

## UTF-8 and Arabic Support

- Requests and responses use UTF-8 JSON.
- The backend must preserve Arabic characters, diacritics, emoji, punctuation, and mixed left-to-right/right-to-left content.
- Clients must not transliterate or normalize user text before sending unless the user explicitly chooses such behavior.
- JSON serialization must not corrupt Arabic text. Escaped Unicode is valid JSON, but readable UTF-8 is preferred in logs and fixtures that contain no private messages.

## Privacy Expectations

- Message text is processed only to fulfill the current request.
- Messages are not stored by default for the hackathon MVP.
- Request and provider logs must not contain full message text by default.
- No account, payment, or persistent message database is required.
- Clients must never contain or receive the private AI API key.
- The user decides whether to use the returned suggestion; the API never sends messages.

## Mock Responses

Mocks must return the same status codes and JSON shapes as the backend.

### Mock: Professional Darija/Arabizi to French

Request:

```json
{
  "text": "wach n9dro ndecaliw meeting l vendredi?",
  "action": "professional",
  "target_language": "fr"
}
```

Response:

```json
{
  "result": "Serait-il possible de reporter la réunion à vendredi ?",
  "analysis": {
    "detected_languages": ["darija", "french"],
    "code_switched": true,
    "arabizi": true,
    "tone": "neutral"
  },
  "meta": {
    "action": "professional",
    "target_language": "fr"
  }
}
```

### Mock: Calm Arabic

Request:

```json
{
  "text": "أنا غاضب بزاف وما عجبنيش هاد التعامل",
  "action": "calm"
}
```

Response:

```json
{
  "result": "أنا منزعج من هذا التعامل وأرغب في إيجاد حل مناسب.",
  "analysis": {
    "detected_languages": ["darija", "arabic"],
    "code_switched": false,
    "arabizi": false,
    "tone": "frustrated"
  },
  "meta": {
    "action": "calm",
    "target_language": null
  }
}
```

### Mock: Tone Check

Request:

```json
{
  "text": "Merci, that's exactly what I needed!",
  "action": "analyze"
}
```

Response:

```json
{
  "result": "Merci, that's exactly what I needed!",
  "analysis": {
    "detected_languages": ["french", "english"],
    "code_switched": true,
    "arabizi": false,
    "tone": "friendly"
  },
  "meta": {
    "action": "analyze",
    "target_language": null
  }
}
```

### Mock: Validation Failure

```json
{
  "error": {
    "code": "empty_text",
    "message": "Text must not be empty.",
    "fields": {
      "text": "Enter a message to continue."
    }
  }
}
```
