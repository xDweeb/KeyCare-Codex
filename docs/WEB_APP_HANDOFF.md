# Web App Handoff

Owner: Anas Serghini

Branch: `feat/web-app`

## Product messaging

The web app uses the approved positioning from `PRODUCT_SPEC.md`: KeyCare is a Morocco-first assistive communication layer. It understands Darija, Arabic, French, English, Arabizi, and code-switching while preserving the user's intent and control.

Public claims deliberately distinguish current behavior:

- The interactive web demo supports all six P0 actions.
- Without `VITE_API_BASE_URL`, the demo uses local contract-compatible examples and clearly labels that state.
- The Android APK is linked only when `VITE_ANDROID_DOWNLOAD_URL` points to a reviewed build.
- The browser extension is described as in development, not as a public store release.
- Messages are not stored by default; text may be sent to the configured backend and its AI provider for the current request.
- KeyCare never sends or inserts a suggestion automatically.

## Coordination checklist

Before a demo or public release, confirm the following with the named workstream owner:

| Check | Owner |
| --- | --- |
| API origin, response contract, CORS, and provider status | Core AI + Backend |
| Reviewed APK URL and demonstrated Android behavior | Core AI + Android |
| Browser support, permissions, and public package status | Browser Extension |
| End-to-end scenarios, failure fallback, and release readiness | Product + Demo + QA |
| Tagline, screenshots, product claims, and demo narration | Presentation + Pitch |

## Release evidence

- Production build completes.
- English, French, and Arabic copy is present and Arabic uses RTL direction.
- Keyboard focus, mobile navigation, reduced motion, labels, error announcements, and color contrast are reviewed.
- All external links and configured downloads resolve.
- `/privacy` and `/terms` load both through navigation and direct URLs.
- The demo preserves the original text on validation, network, timeout, and provider failures.
- No secret or provider credential appears in source, `.env.example`, or the client bundle.
