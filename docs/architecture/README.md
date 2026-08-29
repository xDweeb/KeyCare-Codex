# KeyCare Architecture

KeyCare currently combines three maintained surfaces:

1. The Android IME captures text and presents risk and rewrite suggestions.
2. The FastAPI backend validates requests, mediates messages through its configured AI provider, and returns structured results.
3. The Vite/React web experience presents the public product and download experience.

The planned browser extension is intentionally not implemented on `main` yet.

## Runtime flow

```text
Android keyboard or future browser extension
                  |
                  | POST /mediate
                  v
            FastAPI backend
                  |
                  | configured provider request
                  v
              AI provider
```

The backend response contract includes a risk level, explanation, rewrite, detected language, and whether a fresh provider call was used. Clients should handle timeouts and fallback responses without blocking normal text entry.

## Boundaries

- Provider credentials belong in environment variables and must never reach client applications.
- Android release signing material belongs outside Git and should be supplied locally or by CI.
- Generated output (`build/`, `dist/`, APK/AAB files, caches, and dependencies) is not source code and stays ignored.
- Contract changes require coordination across AI Engine, Android Keyboard, Browser Extension, and Integration & Demo workstreams.

Built with Codex.
