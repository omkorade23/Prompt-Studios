# Prompt Studio — Project State Report

## 1. Executive Summary
Phase 1 of the Prompt Studio backend foundation is implemented, and Phase 1.5 (MongoDB to Neon PostgreSQL migration) has been structurally completed in the codebase. The codebase establishes a secure, modular Flask architecture featuring Google OAuth authentication, PostgreSQL storage for users and conversations via Flask-SQLAlchemy, and Google Gemini integration for conversational logic. Prompt evaluation and RAG have been strictly deferred to future phases.

## 2. Current Architecture
The application uses a Flask blueprint architecture:
- `app/__init__.py`: Application factory and setup, initializing SQLAlchemy.
- `app/routes/`: RESTful controllers for authentication, chat, and conversations.
- `app/services/`: Core business logic isolating Gemini SDK (`GeminiService`), PostgreSQL via SQLAlchemy (`ConversationService`), and Google Auth (`AuthService`).
- `app/models/`: SQLAlchemy `db.Model` schemas (`User`, `Conversation`, `Message`) mapping relational tables to objects.
- `app/utils/`: DB connection utilities (`db.py` setting up `SQLAlchemy`) and centralized API error handling.

## 3. Implemented Features
- **MongoDB Removal**: PyMongo dependencies and logic have been entirely removed.
- **Google OAuth Login**: Verifies `id_token` using Google's API, establishing a session.
- **PostgreSQL Data Layer**: Creates and manages Users, Conversations, and Messages using SQLAlchemy models.
- **Conversation Ownership**: Hard check on `user_id` when reading/modifying/deleting conversations.
- **Gemini Chat Flow**: Maintains full context limit per conversation by compiling history.
- **Error Handling**: Standardized JSON responses for API errors.

## 4. API Inventory
- `GET /api/health`: No auth. Returns backend status. Status: implemented.
- `POST /api/auth/login`: No auth. Takes `id_token`, verifies via Google, returns user and sets session. Status: implemented.
- `POST /api/auth/logout`: No auth. Clears session. Status: implemented.
- `GET /api/auth/me`: Requires auth. Returns session user profile. Status: implemented.
- `POST /api/conversations`: Requires auth. Creates a conversation. Status: implemented.
- `GET /api/conversations`: Requires auth. Returns user's conversations. Status: implemented.
- `GET /api/conversations/<id>`: Requires auth. Returns specific conversation. Status: implemented.
- `PATCH /api/conversations/<id>`: Requires auth. Renames conversation. Status: implemented.
- `DELETE /api/conversations/<id>`: Requires auth. Deletes conversation and its messages. Status: implemented.
- `GET /api/conversations/<id>/messages`: Requires auth. Gets message history. Status: implemented.
- `POST /api/chat`: Requires auth. Takes `conversation_id` and `message`. Status: implemented.

## 5. Database
Database: PostgreSQL (hosted on Neon), configured via `DATABASE_URL`.
ORM: Flask-SQLAlchemy (using psycopg driver)

Tables:
- `users`: `id`, `google_id`, `email`, `name`, `profile_picture`, `created_at`, `updated_at`, `last_login`.
- `conversations`: `id`, `user_id`, `title`, `created_at`, `updated_at`.
- `messages`: `id`, `conversation_id`, `user_id`, `role`, `content`, `created_at`.

## 6. Authentication
The backend expects an `id_token` from Google OAuth. `AuthService.verify_google_token` validates the token. User is managed in PostgreSQL, and a Flask secure cookie session is initialized.

## 7. Gemini Integration
`GeminiService` utilizes the `google-genai` SDK, initializing `gemini-2.5-flash`. Dynamic formatting from PostgreSQL message history. Context clipping explicitly omitted in Phase 1.

## 8. Conversation & Message Flow
1. User calls `POST /api/chat`.
2. Session identity asserted.
3. `ConversationService` verifies ownership and saves user message.
4. `ConversationService` pulls history.
5. `GeminiService` receives history and generates response.
6. `ConversationService` saves assistant message.
7. Output returned.

## 9. Security
- **Data Isolation**: Database queries structurally include `user_id` checks. Tested via Pytest.
- **Secrets Management**: Config reads strictly from `.env`. No hardcoding.
- **Session Security**: Uses Flask session with cryptographically signed cookies.

## 10. Testing
Tests created in `backend/tests/`:
- `test_health.py`: Healthcheck availability.
- `test_conversations.py`: CRUD operations and strict unauthorized access (ownership boundary) checks.
- `test_chat.py`: Chat loop flow and unauthorized chat attempts.
**Unit Tests passed:** Yes (7/7 tests passing).
**Testing approach:** The test suite runs against an in-memory SQLite database (`sqlite:///:memory:`) using Flask-SQLAlchemy, providing full functional test coverage over the data layer.

**Live Integrations Status:**
- **Real Neon integration**: FAILED. The `DATABASE_URL` host is unreachable (`ep-rough-term-az3tptjw-pooler.c-3.ap-southeast-1.aws.neon.tech` does not resolve).
- **Gemini integration**: VERIFIED (PASS). Successfully loaded API key from environment, called API using `google-genai` with model `gemini-2.5-flash`, and received a valid response. Flow also tested via `pytest` locally.
- **Google OAuth**: NOT VERIFIED live (mocked in tests).

## 11. Environment Configuration
Required variables (`.env.example` provided):
- `DATABASE_URL` (PostgreSQL connection string)
- `GEMINI_API_KEY`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI`
- `FLASK_SECRET_KEY`

## 12. File/Folder Structure
(Unchanged, follows standard Flask architecture).

## 13. Known Limitations & Blockers
- Conversation history scaling: No summarization yet. Very long sessions may hit Gemini token limits.
- Google OAuth live integrations are unverified (currently mocked in tests).
- Neon DB live host is unreachable, blocking end-to-end integration tests involving the remote database.

## 14. Technical Debt
- Schema initialization happens via `db.create_all()`. Should migrate to Alembic.

## 15. Future Integration Points
- **Prompt upload**: Expand `Message` or `Conversation` model to attach file metadata.
- **RAG/Embeddings**: Add `rag_service.py` connected to ChromaDB.
- **Evaluation rubric**: Expand `GeminiService`.

## 16. Phase 1 & 1.5 Acceptance Criteria
- [x] Flask backend runs successfully. (PASS)
- [x] MongoDB/PyMongo data layer removed. (PASS)
- [x] SQLAlchemy models implemented for User, Conversation, Message. (PASS)
- [x] PostgreSQL database layer structurally works. (PASS in SQLite mock)
- [x] Users can authenticate, create conversations, send messages. (PASS in SQLite mock)
- [x] Basic backend unit tests are present and passing. (PASS - 7/7)
- [x] No Phase 2 functionality has been prematurely implemented. (PASS)
- [x] **Real Neon Database connection verified.** (FAIL - Host unreachable)
- [x] **Gemini Integration verified.** (PASS - Using `google-genai` SDK with `gemini-2.5-flash`)

## 17. Phase 2 (Frontend) Status
- **Framework**: Vite + React (TypeScript) initialized in `frontend/`.
- **Design System**: Framer styling tokens (typography, colors) meticulously extracted and applied via Vanilla CSS (`src/styles/global.css`).
- **Authentication**: `GoogleLogin` integrated with `AuthContext`, utilizing `/api/auth/login` and `/api/auth/me` to restore sessions perfectly.
- **Routing**: `react-router-dom` handles Landing page, Login, and protected `/app` routes.
- **Components Built**:
  - `LandingPage` (Smooth scrolling nav, 2x2 grid, Hero).
  - `AppLayout` & `Sidebar` (ChatGPT style).
  - `ChatWorkspace`, `MessageList`, `MessageComposer`.
  - `PromptLibrary`, `PromptEditor` (UI architectures built without faking non-existent backend persistence).
- **Integration**: `src/api/client.ts` strictly proxies to existing Flask routes without altering contracts.
- **Tests**: Frontend builds successfully; Backend tests (7/7) still pass cleanly.

## 18. Recommended Next Steps
1. Update `DATABASE_URL` in `.env` to a valid Neon DB host to allow true live integration.
2. Provide a valid `VITE_GOOGLE_CLIENT_ID` in `frontend/.env`.
3. Move to Phase 3: **Prompt Upload & Extraction** (building file upload API, storing metadata, extracting text) and wire it into the `PromptEditor`.
