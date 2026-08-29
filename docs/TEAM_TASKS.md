# Team Workstreams

All work branches start from the latest stable `main`. Each member owns the quality and documentation of their workstream, keeps pull requests focused, and coordinates contract changes before merging.

## Member 1 — Core AI + Backend + Android

Branch: `feat/core-ai-android`

- Own the AI mediation engine, provider boundary, prompts, validation, caching, fallbacks, and response contract.
- Maintain the FastAPI backend, configuration, API documentation, security boundaries, and backend tests.
- Maintain the Android keyboard, including IME lifecycle, onboarding, API integration, risk states, and rewrite flow.
- Keep credentials and Android signing material outside Git.
- Coordinate API contract changes with the browser extension, web app, and demo owner.

## Member 2 — Browser Extension

Branch: `feat/browser-extension`

- Define the supported browsers, extension permissions, content-script boundaries, and privacy model.
- Build the browser message-analysis and rewrite experience against the agreed backend contract.
- Handle loading, offline, timeout, permission, and API failure states clearly.
- Maintain extension packaging instructions, browser compatibility notes, and focused tests.
- Coordinate shared UX and branding with the web app owner.

## Member 3 — Web App

Branch: `feat/web-app`

- Own the public web experience, responsive layout, accessibility, navigation, and translations.
- Maintain accurate product, privacy, contact, and download information.
- Integrate approved demo or API experiences without exposing credentials in client code.
- Maintain web development, deployment, and content documentation.
- Coordinate product messaging with the demo and presentation owners.

## Member 4 — Demo + QA + Product

Branch: `feat/demo-qa`

- Define acceptance criteria and test scenarios across backend, Android, browser extension, and web app.
- Own end-to-end smoke testing, regression checks, demo data, and issue triage.
- Maintain the demo runbook, integration checklist, release checklist, and fallback plan.
- Track cross-workstream dependencies, risks, and release readiness.
- Confirm that the demonstrated behavior matches product and privacy claims.

## Member 5 — Presentation + Pitch + Story

Branch: `feat/pitch-story`

- Own the product narrative, problem statement, value proposition, and presentation structure.
- Prepare the pitch deck, speaking notes, demo narration, and anticipated Q&A.
- Keep screenshots, metrics, product claims, and technical descriptions accurate and current.
- Coordinate the presentation flow with the Demo + QA + Product owner.
- Maintain reusable communication assets without committing generated exports unnecessarily.

## Collaboration Rules

- Rebase or merge the latest `main` before opening a pull request.
- Do not commit secrets, environment files, build output, dependencies, caches, APKs, or signing keys.
- Document changes that affect APIs, shared behavior, setup, or the demo flow.
- Require review from an affected owner when a pull request crosses workstream boundaries.
- Merge completed, reviewed work through pull requests; do not force-push shared branches.
