# KeyCare Web App

The public KeyCare experience and interactive hackathon MVP demo. It is built with Vite, React, TypeScript, i18next, and Tailwind CSS.

## What is included

- Responsive public landing page with accessible keyboard and mobile navigation
- English, French, and Arabic translations, including right-to-left layout
- Responsive mobile-product walkthrough using the reviewed screenshots in `public/assets/screens/`
- All six P0 actions from the shared contract: improve, professional, translate, calm, respectful, and tone check
- Live `POST /api/v1/transform` integration with the production KeyCare API by default
- Separate privacy and MVP terms routes
- Honest availability states for the web demo, Android APK, and browser extension

The product wording follows [`../docs/PRODUCT_SPEC.md`](../docs/PRODUCT_SPEC.md) and the integration follows [`../docs/API_CONTRACT.md`](../docs/API_CONTRACT.md).

## Local development

Requirements: Node.js 18 or newer and npm 9 or newer.

```bash
cd web-landing
npm ci
copy .env.example .env
npm run dev
```

Open `http://localhost:5173`. The app uses the production KeyCare API unless `VITE_API_BASE_URL` is intentionally overridden for local backend integration testing.

## Configuration

All variables are public build-time configuration. Never put an AI provider key or other secret in a `VITE_` variable.

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_API_BASE_URL` | No | Optional backend origin override. Defaults to `https://keycare-codex-api-ef6679e530e7.herokuapp.com`; the app adds `/api/v1/transform`. |
| `VITE_ANDROID_DOWNLOAD_URL` | No | Reviewed, hosted APK URL. Without it, the site accurately says no public APK is linked. |
| `VITE_CONTACT_EMAIL` | No | Public contact address. Defaults to `contact@keycare.email`. |

The production backend's CORS configuration must allow the deployed web origin. The client times out after 30 seconds, preserves the original text, and displays the API error envelope when it contains a safe message.

## Validation

```bash
npm run build
npm run lint
npm run preview
```

Before release, manually check:

1. All demo actions, including the required target language for Translate.
2. English, French, and Arabic direction and content.
3. Keyboard navigation, visible focus, the mobile menu, and reduced motion.
4. `/privacy` and `/terms` through the host's SPA fallback.
5. Contact and Android download configuration.
6. Mobile screenshots, translated captions, and horizontal swipe behavior on narrow screens.
7. Network, timeout, validation, and backend provider error states.

## Deployment

The Vite base path is `/`, suitable for the configured custom domain in `public/CNAME`. Build with `npm run build` and publish the generated `dist/` directory to any static host.

For GitHub Pages, configure the workflow to:

1. Run `npm ci` in `web-landing/`.
2. Provide the public `VITE_` variables at build time.
3. Run `npm run build`.
4. Publish `web-landing/dist/`.

`public/404.html` redirects direct visits such as `/privacy` back into the single-page app. If the custom domain or base path changes, update `vite.config.ts`, `public/404.html`, canonical social URLs in `index.html`, and asset links together.

## Content ownership

- `src/i18n/en.json`, `fr.json`, and `ar.json` contain public copy.
- `src/App.tsx` contains product states and the shared API integration.
- `public/assets/og.png` is the social preview.
- Availability claims must be checked with the Android, browser extension, and demo owners before release.
- Do not add claims for accounts, payments, offline AI, automatic sending, local-only analysis, or public downloads unless those capabilities are verified.

See [`../docs/WEB_APP_HANDOFF.md`](../docs/WEB_APP_HANDOFF.md) for the release and messaging handoff.
