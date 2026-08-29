# KeyCare Chrome Extension

**Think before you send.**

KeyCare is an AI communication layer for the way Moroccans actually communicate — Darija, Arabizi, Arabic, French, English, and mixed messages. This Chrome extension is a **client of the existing KeyCare backend**, the same API used by the Android keyboard app. It does **not** contain an LLM or any AI provider key.

```text
                 KEYCARE AI BACKEND
                         │
             ┌───────────┼───────────┐
             │           │           │
             ▼           ▼           ▼
       Android App   Chrome Ext.   Web App
```

> KeyCare doesn't just help you write. It helps you communicate.

## 1. Project overview

The extension injects a floating **✦ KeyCare** control next to the active text field on:

- Gmail
- WhatsApp Web
- LinkedIn (messaging, plus comments/posts where possible)
- Other sites (generic textarea / input / contenteditable)

From that control, users can rewrite tone, translate meaning (not word-by-word), analyze intent/tone, and get a **Before you send** warning when a message may sound aggressive. The user always stays in control. KeyCare never auto-sends, auto-deletes, or silently rewrites text.

## 2. Architecture

```text
Popup / Content script
        │  chrome.runtime.sendMessage
        ▼
Background service worker
        │  HTTPS (Bearer token)
        ▼
KeyCare Backend API  (http://localhost:8000 or https://api.keycare.ma)
        │
        ▼
AI / LLM  (OpenAI or other — keys live only on the server)
```

| Layer | Role |
| --- | --- |
| `src/popup` | Branded popup, auth, settings, usage |
| `src/content` | Field detection, overlay UI, site adapters, pre-send analysis |
| `src/background` | API proxy, tokens, usage counters |
| `src/services/api.ts` | Single HTTP client. Endpoint paths live in `src/config.ts` |
| `src/services/auth.ts` | Login / logout / token storage / refresh |
| `src/services/demo.ts` | Labeled DEMO MODE fallbacks |

Content UI is rendered in a **Shadow DOM** overlay so host-page CSS cannot restyle KeyCare, and KeyCare CSS cannot leak into Gmail/WhatsApp/LinkedIn.

## 3. Installation (development)

Requirements: Node.js 18+.

```bash
cd KeyCare
npm install
copy server\\.env.example server\\.env
npm run build
npm run server
```

Put your OpenAI key in `server/.env` as `OPENAI_API_KEY=...` (never in the Chrome extension). Leave it empty to test signup + WhatsApp with labeled demo replies.

Then load `dist/` in Edge/Chrome and click the KeyCare icon to **Sign up**.

## 4. Development

```bash
npm run dev
```

Vite + `@crxjs/vite-plugin` serve the Manifest V3 extension with HMR. Load the unpacked `dist/` folder (or the CRXJS dev output shown in the terminal) in Chrome.

Environment files:

- `.env.development` → `http://localhost:8000`, demo mode on
- `.env.production` → `https://api.keycare.ma`, demo mode off
- `.env.example` → copy and edit

You can also change the backend URL later in the popup **Settings** panel without rebuilding.

## 5. Production build

```bash
npm run build
```

Output: `dist/` (a Chrome-loadable unpacked extension).

## 6. Loading the extension into Chrome

1. Open Chrome
2. Go to `chrome://extensions`
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the `dist/` folder

Pin KeyCare from the puzzle-piece menu. Click the icon to open the popup.

## 7. Backend configuration

All URLs are centralized:

```ts
// src/config.ts
export const API_CONFIG = {
  baseUrl: "...",          // VITE_API_BASE_URL
  rewrite: "/api/rewrite",
  translate: "/api/translate",
  analyze: "/api/analyze",
  detectLanguage: "/api/detect-language",
  login: "/api/auth/login",
  refresh: "/api/auth/refresh",
  me: "/api/auth/me",
  usage: "/api/usage",
};
```

Do **not** put a ChatGPT / OpenAI / Gemini key in this repo, in `.env`, or in Chrome storage. The Android app and this extension both call **your** KeyCare API. The LLM key belongs on the server.

Manifest host permissions include:

- `http://localhost:*/*`
- `https://api.keycare.ma/*`
- `https://*.keycare.ma/*`

If you use another domain, add it to `host_permissions` in `manifest.config.ts` and rebuild, or grant the optional host permission at runtime.

## 8. API endpoints

The extension does not assume a specific backend framework. It expects JSON.

### `POST /api/rewrite`

```json
{
  "text": "slm prof ana maghadich nji demain hit 3ndi chi empechement",
  "mode": "professional",
  "target_language": "fr"
}
```

```json
{
  "result": "Bonjour Monsieur, je ne pourrai malheureusement pas être présent demain en raison d’un empêchement. Merci pour votre compréhension."
}
```

Modes: `professional` | `respectful` | `calm` | `friendly` | `concise` | `formal` | `natural`

### `POST /api/translate`

```json
{
  "text": "wach n9dro ndecaliw meeting l vendredi?",
  "target_language": "english"
}
```

```json
{ "result": "Could we reschedule the meeting to Friday?" }
```

Targets: `darija` | `arabic` | `french` | `english`

### `POST /api/analyze`

```json
{ "text": "nta 7mar maktfham walo" }
```

```json
{
  "language": "darija_arabizi",
  "tone": "aggressive",
  "intent": "complaint",
  "risk": "high",
  "confidence": 0.93
}
```

### `POST /api/detect-language`

```json
{ "text": "ana ma3ndich disponibilité demain" }
```

```json
{
  "language": "mixed",
  "languages": ["darija_arabizi", "french"],
  "label": "Darija + French",
  "confidence": 0.82
}
```

### Auth (optional but supported)

- `POST /api/auth/login` `{ "email", "password" }` → `{ "access_token", "refresh_token?", "user?" }`
- `POST /api/auth/refresh` `{ "refresh_token" }`
- `GET /api/auth/me`
- `GET /api/usage` `{ "plan": "free"|"premium", "used": 23, "limit": 50 }`

Passwords are never stored. Tokens go in `chrome.storage.local`.

The HTTP client also accepts aliases such as `text` / `rewritten` / `translation` so a slightly different backend shape still works.

## 9. Authentication

`src/services/auth.ts`:

- `login(api, { email, password })`
- `logout()`
- `getToken()`
- `isAuthenticated()`
- `refreshToken(api)`

The popup Login screen uses the same KeyCare account as the Android app. Guest use is allowed; API calls then run without a Bearer token (or via DEMO MODE).

## 10. Supported websites

| Site | Adapter | Rewrite / Translate | Before you send |
| --- | --- | --- | --- |
| Gmail | `src/content/site-adapters/gmail.ts` | Yes | Yes, when send/Enter can be detected |
| WhatsApp Web | `whatsapp.ts` | Yes | Yes |
| LinkedIn | `linkedin.ts` | Messaging, comments/posts where possible | Yes when a send button is found |
| Other | `generic.ts` | Yes | No (by design) |

Adapters prefer semantic attributes (`contenteditable`, `role="textbox"`, `aria-label`, `g_editable`) over fragile hashed class names. WhatsApp-specific logic is isolated because that DOM changes often.

## 11. Adding a new website adapter

1. Create `src/content/site-adapters/my-site.ts` implementing `SiteAdapter`.
2. Register it **before** `genericAdapter` in `src/content/site-adapters/index.ts`.
3. Add an `enabledSites` flag in `src/types` + `DEFAULT_SETTINGS` if you want a toggle.
4. Keep selectors semantic. Isolate site quirks in that one file.

```ts
export const mySiteAdapter: SiteAdapter = {
  id: "generic",
  matches: (hostname) => hostname === "example.com",
  isEnabled: () => true,
  supportsPreSend: false,
  isSupportedField(el) { /* ... */ },
  getActiveComposer() { /* ... */ },
  getSendButtons() { return []; },
  shouldIgnore() { return false; },
};
```

## 12. Privacy architecture

Privacy-first by default:

- No scraping of the full page
- No message content written to disk (privacy mode)
- No `console` logging of message text in production
- Text is sent to the backend only for an explicit KeyCare action, or for **opt-in** Before You Send / tone detection
- Pre-send analysis is **debounced** (~1s) and skipped for short phrases (`hi`, `ok`, `thanks`, `slm`, …)
- AI output is inserted with `textContent` / `insertText` / React — never `innerHTML`
- CSP: `script-src 'self'; object-src 'self'`
- Minimal permissions: `storage` + API host permissions. No history, cookies, or `<all_urls>` host permission for fetch

## 13. Troubleshooting

**Popup is blank**  
Reload the extension on `chrome://extensions`. Rebuild with `npm run build`.

**✦ KeyCare does not appear**  
Focus a real compose field (not a password or search box). Confirm the site is enabled in Settings. WhatsApp: click the message composer at the bottom.

**Backend errors / DEMO MODE badge**  
If the API is down and Demo mode is on, sample responses are shown and labeled **DEMO MODE**. Turn Demo mode off in Settings for production.

**CORS / Failed to fetch**  
The content script does not call the API directly. The **service worker** does. Check `apiBaseUrl`, that the backend is running, and that the origin is in `host_permissions`.

**Gmail / WhatsApp rewrite does not stick**  
Those editors are contenteditable. The replacer uses `execCommand('insertText')` plus `input` / `beforeinput` events. If a site update breaks it, change only that site adapter / `src/utils/dom.ts`.

**TypeScript / build errors**  
`npm run typecheck` then `npm run build`. Icons are generated in `public/icons/` during build.

---

## Demo flows

Demo mode includes the product’s canonical examples.

1. **Gmail** — `slm prof ana maghadich nji demain hit 3ndi chi empechement` → Rewrite → Professional  
2. **WhatsApp** — `wach n9dro ndecaliw meeting l vendredi?` → Translate → English  
3. **Before you send** — `nta 7mar maktfham walo` → warning → Make it calmer  
4. **Mixed** — `ana ma3ndich disponibilité demain parce que j'ai déjà un meeting` → Darija + French → Professional

## Known limitations

- Send interception is best-effort. If a site’s send control cannot be detected reliably, KeyCare shows the warning while typing instead of blocking send.
- WhatsApp Web and LinkedIn change their DOM without notice; adapters may need updates.
- Generic websites do not get Before You Send protection.
- Custom API domains outside `*.keycare.ma` / localhost need a manifest host permission.
- Subscription checkout is not implemented; Free / Premium is displayed and ready for `/api/usage`.

## Next recommended improvements

- Request `optional_host_permissions` when the user saves a custom API URL
- Per-site onboarding tooltip the first time KeyCare appears
- Sync settings with the Android account
- Keyboard shortcut (e.g. Alt+K) to open the action menu
- Automated adapter smoke tests against stored DOM fixtures

## Security notes

- Never ship an OpenAI key in the extension, even “just for local testing”
- Tokens live in `chrome.storage.local` and are attached only in the service worker
- Untrusted model output is treated as text, not HTML
