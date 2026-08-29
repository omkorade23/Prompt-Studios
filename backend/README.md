# Prompt Studio Backend (Phase 1)

This is the Flask backend foundation for the Prompt Studio conversational AI application.

## Implemented Features (Phase 1 Scope)
- Google OAuth 2.0 authentication
- MongoDB Atlas integration
- Conversation and message management with strict ownership validation
- Gemini AI integration for general-purpose chat
- Secure environment configuration

## Out of Scope for Phase 1
- Prompt evaluation, scoring, or quality rubrics
- RAG (Retrieval-Augmented Generation) pipeline
- ChromaDB and Gemini embeddings
- Prompt upload and extraction

## Setup Instructions

1. **Clone the repository**
2. **Navigate to the backend directory**: `cd backend`
3. **Create a virtual environment**: `python -m venv venv`
4. **Activate the virtual environment**:
   - Windows: `.\venv\Scripts\Activate.ps1`
   - Linux/Mac: `source venv/bin/activate`
5. **Install dependencies**: `pip install -r requirements.txt`
6. **Configuration**: 
   - Copy `.env.example` to `.env`
   - Fill in `MONGODB_URI`, `GEMINI_API_KEY`, `GOOGLE_CLIENT_ID`, and `GOOGLE_CLIENT_SECRET`.
7. **Run the server**: `python run.py`

## Testing
Run `pytest tests/ -v` to execute the automated tests using mocked integrations.
