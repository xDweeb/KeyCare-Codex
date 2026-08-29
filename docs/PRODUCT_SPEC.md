# KeyCare Hackathon MVP Product Specification

## Product Positioning

**KeyCare is a Morocco-first AI communication layer.**

Tagline: **Think before you send. Communicate better.**

Moroccans naturally mix Darija, Arabic, French, English, and Arabizi, often within the same sentence. KeyCare understands this communication and helps people improve what they write directly where they type.

KeyCare is an assistive writing layer, not an autonomous messaging system. It helps users express their existing intent more clearly while keeping them in control.

## Hackathon Goal

Deliver a coherent MVP that demonstrates the same communication intelligence across three product surfaces:

- Android custom keyboard
- Browser extension
- Web app

All three surfaces use the same backend intelligence and the shared contract in [API_CONTRACT.md](API_CONTRACT.md). Clients may use contract-compatible mocks while the backend is being completed.

## Target Users and Context

The MVP is designed first for Moroccan multilingual communication, including:

- Darija in Arabic script
- Darija written as Arabizi
- Modern Standard Arabic
- French
- English
- Code-switching between these languages and writing systems

The primary use case is improving a message before the user sends it in a chat, email, form, social platform, or other text field.

## P0 Capabilities

The hackathon MVP must support:

- **Improve:** make a message clearer and more natural while preserving its meaning.
- **Professional:** rewrite a message in a professional tone.
- **Translate:** convert a message into an explicitly selected target language.
- **Calm:** reduce unnecessary aggression or escalation without removing the user's point.
- **Respectful:** express the same intent with more respectful wording.
- **Tone Check:** analyze the message and report its tone and language signals without rewriting it.
- **Darija understanding:** understand common Moroccan Arabic vocabulary and phrasing.
- **Arabizi understanding:** understand Latin-script Darija, including common numeric substitutions.
- **Code-switching understanding:** handle messages that mix Darija, Arabic, French, English, and Arabizi.

The shared API represents Tone Check with the `analyze` action. Product surfaces may use friendlier labels while sending the stable API action value.

## Required Product Behavior

- Preserve the user's intended meaning.
- Do not censor the user or silently replace their writing.
- Never send a message automatically.
- Always let the user choose whether to use a suggestion.
- Make the original and suggested text distinguishable.
- Allow the user to dismiss a suggestion and continue with the original text.
- Do not require login, payment, or a database for the hackathon MVP.
- Do not store messages by default.
- Keep private AI provider credentials on the backend; never embed them in a client.
- Represent loading, validation, network, and provider failures without blocking normal typing.

## Product Surface Expectations

### Android Custom Keyboard

- Offer the P0 actions without automatically changing or sending typed content.
- Keep ordinary keyboard input usable when the backend is slow or unavailable.
- Let the user explicitly accept a returned transformation.

### Browser Extension

- Offer the P0 actions in supported browser text contexts.
- Request only the permissions needed for the demonstrated experience.
- Require explicit user action before inserting a suggestion.

### Web App

- Provide a clear input, action selection, optional target language, and result experience.
- Demonstrate multilingual, Arabizi, and code-switched examples.
- Clearly distinguish the product demo from claims about shipped integrations.

## P1 Capabilities

Implement these only if the P0 experience is stable and time remains:

- Smart suggested action
- Shorten
- Preserve-my-language mode
- Undo
- Additional tone controls

P1 items are not part of the required MVP contract and must not be presented as implemented until they work in the relevant product surface.

## Out of Scope for the Hackathon MVP

- User accounts or authentication
- Payments or subscriptions
- A persistent message database
- Automatic message sending
- Background monitoring without an explicit user interaction
- Claims that unfinished P1 capabilities or product surfaces are complete

## MVP Success Criteria

- Android, Web, and Extension clients use the same `/api/v1/transform` contract.
- Each client can demonstrate at least the agreed P0 actions relevant to its interface.
- The shared backend correctly accepts UTF-8 Arabic and mixed-language text.
- Suggestions preserve intent and remain under explicit user control.
- The demo continues to explain failures clearly when the AI provider is unavailable.
- Public product and presentation claims accurately reflect what is working.
