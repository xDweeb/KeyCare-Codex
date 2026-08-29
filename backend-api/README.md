# KeyCare Backend API

FastAPI server providing AI-powered communication mediation for KeyCare clients.

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

### Mediate Message
```
POST /mediate
Content-Type: application/json

{
  "text": "Your message here",
  "tone": "calm",
  "lang_hint": "auto"
}
```

## Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
