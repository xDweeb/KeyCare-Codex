# KeyCare Backend API

FastAPI server providing the OpenAI-powered communication engine shared by KeyCare clients. Built with Codex.

## Quick Start

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and add a newly created OPENAI_API_KEY

# Run server
uvicorn main:app --reload
```

The shared `/api/v1/transform` endpoint uses the server-side OpenAI Responses API. Configure `OPENAI_MODEL` in `.env`; the default is `gpt-5-mini`. Never place the API key in an Android, web, or extension client.

## API Endpoints

### Health Check
```
GET /health
```

### Transform Message
```
POST /api/v1/transform
Content-Type: application/json

{
  "text": "wach n9dro ndecaliw meeting l vendredi?",
  "action": "translate",
  "target_language": "en"
}
```

## Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Heroku Demo Deployment

The existing demo backend is hosted on Heroku at:

`https://keycare-codex-api-ef6679e530e7.herokuapp.com`

Heroku runs the backend with the command in `Procfile`:

```text
uvicorn main:app --host 0.0.0.0 --port $PORT
```

Required Heroku Config Vars:

- `OPENAI_API_KEY` — set only in Heroku Settings; never commit or paste it into a command saved in shell history.
- `OPENAI_MODEL=gpt-5-mini`

The current repository is a multi-project repository, while the existing Heroku app deploys `backend-api/` as its application root. After authenticating with `heroku login`, deploy the `backend-api/` subtree from `feat/core-ai-android` using the existing app's established Git or GitHub deployment connection. Do not merge to `main` solely for deployment.

Verify deployment without invoking OpenAI:

```bash
curl https://keycare-codex-api-ef6679e530e7.herokuapp.com/health
```

The health endpoint reports service/provider configuration status but never calls OpenAI and never returns credentials.
