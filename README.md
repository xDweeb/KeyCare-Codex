# KeyCare

> AI communication tools for the keyboard, the backend, the web, and the demo experience. Built with Codex.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Android](https://img.shields.io/badge/Platform-Android-brightgreen.svg)](https://developer.android.com/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-blue.svg)](https://fastapi.tiangolo.com/)

KeyCare is a multi-surface project for thoughtful communication. The repository currently contains:

- `android-ime/` for the Android keyboard experience
- `backend-api/` for the FastAPI AI mediation service
- `web-landing/` for the public landing page
- `docs/` for architecture and team planning

## What it does

KeyCare helps users draft clearer messages by analyzing tone, assessing risk, and proposing safer rewrites. The project keeps the AI provider implementation separate from the UI surfaces so the keyboard, web, and backend can evolve independently.

## Repository Layout

```
KeyCare-Codex/
├── android-ime/          # Android keyboard (IME)
├── backend-api/          # FastAPI service for message mediation
├── web-landing/          # Public landing page
├── docs/                 # Architecture notes and team docs
├── .env.example          # Environment template
├── .gitignore
└── README.md
```

## Local Setup

Backend and Android setup instructions live with each module:

- [Android keyboard docs](android-ime/README.md)
- [Backend docs](backend-api/README.md)
- [Landing page](web-landing/index.html)
- [Architecture notes](docs/architecture/README.md)

## Security

- No secrets are committed.
- `.env` files stay out of version control.
- Use `.env.example` as the template for local configuration.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
