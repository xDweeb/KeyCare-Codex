# Team Workstreams

All work branches start from the latest stable `main`. Keep pull requests focused, document API or contract changes, and request review from the Integration & Demo owner when work crosses module boundaries.

## AI Engine — `feat/ai-engine`

- Document the mediation inputs, outputs, error states, and provider boundaries.
- Add tests for risk classification, language handling, rewrites, caching, and fallbacks.
- Improve observability and configuration without committing provider credentials.
- Coordinate response-contract changes with Android and browser clients.

## Android Keyboard — `feat/android-keyboard`

- Verify IME onboarding, permissions, keyboard selection, and lifecycle behavior.
- Test typing, risk indicators, rewrite acceptance, offline behavior, and accessibility.
- Move environment-specific endpoints and release signing into safe local/CI configuration.
- Maintain debug and release build instructions.

## Browser Extension — `feat/browser-extension`

- Define supported browsers, page contexts, permissions, and privacy boundaries.
- Scaffold the extension only after its API contract is agreed with the AI Engine owner.
- Implement message analysis and rewrite UX with clear loading and failure states.
- Add packaging, linting, and browser smoke-test instructions.

## Web Experience — `feat/web-experience`

- Maintain the Vite landing experience, responsive layout, and translations.
- Verify that public privacy, download, contact, and product claims match reality.
- Add accessible navigation, performance checks, and a repeatable production build.
- Coordinate browser-extension entry points and release links.

## Integration & Demo — `feat/integration-demo`

- Own the end-to-end contract and a stable demo environment.
- Create smoke tests covering backend, Android, web, and browser-extension paths.
- Maintain demo data, runbooks, release checklists, and rollback notes.
- Track cross-workstream blockers and confirm release readiness before merging to `main`.
