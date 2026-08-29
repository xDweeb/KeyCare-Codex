# Web App Handoff

Owner: Anas Serghini

Branch: `feat/web-app`

## Product messaging

The web app uses the approved positioning from `PRODUCT_SPEC.md`: KeyCare is a Morocco-first assistive communication layer. It understands Darija, Arabic, French, English, Arabizi, and code-switching while preserving the user's intent and control.

Public claims deliberately distinguish current behavior:

- The interactive web demo supports all six P0 actions.
- The demo uses `https://keycare-codex-api-ef6679e530e7.herokuapp.com/api/v1/transform` by default; `VITE_API_BASE_URL` is only an optional override for intentional integration testing.
- The Android APK is linked only when `VITE_ANDROID_DOWNLOAD_URL` points to a reviewed build.
- The mobile walkthrough uses current MVP screenshots and labels them as interface previews whose wording and setup may evolve.
- The browser extension is described as in development, not as a public store release.
- Messages are not stored by default; submitted text is sent to the production backend and may be sent to its AI provider for the current request.
- KeyCare never sends or inserts a suggestion automatically.

## Coordination checklist

Before a demo or public release, confirm the following with the named workstream owner:

| Check | Owner |
| --- | --- |
| API origin, response contract, CORS, and provider status | Core AI + Backend |
| Reviewed APK URL and demonstrated Android behavior | Core AI + Android |
| Browser support, permissions, and public package status | Browser Extension |
| End-to-end scenarios, failure handling, and release readiness | Product + Demo + QA |
| Tagline, screenshots, product claims, and demo narration | Presentation + Pitch |

## Release evidence

- Production build completes.
- Production API connectivity and all six P0 actions are verified against `POST /api/v1/transform`.
- English, French, and Arabic copy is present and Arabic uses RTL direction.
- Keyboard focus, mobile navigation, reduced motion, labels, error announcements, and color contrast are reviewed.
- All external links and configured downloads resolve.
- `/privacy` and `/terms` load both through navigation and direct URLs.
- The four mobile screenshots render with translated captions and remain usable as a swipeable gallery on narrow screens.
- The demo preserves the original text on validation, network, timeout, and provider failures.
- No secret or provider credential appears in source, `.env.example`, or the client bundle.
