# KeyCare Chrome Extension

KeyCare is a Morocco-first AI communication layer. Think before you send.

This Manifest V3 Chrome/Chromium extension connects only to the public KeyCare backend:

`https://keycare-codex-api-ef6679e530e7.herokuapp.com/api/v1/transform`

It contains no AI provider SDK, API key, authentication system, mock mode, or local AI server.

## Supported actions

- Improve
- Professional
- Translate to English, French, Arabic, or Darija
- Calm
- Respectful
- Tone Check (`analyze`)

The floating KeyCare control works with normal text inputs, textareas, and contenteditable fields. It uses selected text when available and otherwise uses the focused field. Results are shown first; Copy and Replace require an explicit user action. KeyCare never sends a message.

## Build and load

```bash
npm ci
npm run build
```

Open `chrome://extensions`, enable Developer mode, choose **Load unpacked**, and select the generated `Extension/dist` folder.

## Security and privacy

- AI credentials remain on the KeyCare backend.
- The only API host permission is the production Heroku backend.
- The content script needs HTTP/HTTPS page access to support generic editable fields.
- No page content is collected automatically; text is submitted only after an explicit action.
- AI output is rendered as text, never as executable HTML.
- There is no automatic send behavior.

## Current limitations

- Gmail, LinkedIn, and WhatsApp use the generic contenteditable integration; there are no site-specific adapters.
- Some framework-controlled editors may reject programmatic replacement. Copy remains available.
- Chrome must be used for final manual UI testing.
