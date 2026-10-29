# Prompt Studio

> A collaborative, modern prompt engineering & AI assistant workspace powered by Google Gemini and Spring Boot.

![Prompt Studio Banner](frontend/public/botly-logo.png)

## Architecture Overview

- **Frontend**: React (Vite + TypeScript + Tailwind CSS) deployed on **Vercel**.
- **Backend**: Java 17 + Spring Boot (Dockerized) deployed on **Render**.
- **Database**: Neon Serverless PostgreSQL with auto-reconnecting SSL datasource.
- **AI Provider**: Google Gemini API via official Google GenAI SDK.
- **Authentication**: Google OAuth 2.0 / ID Token verification + secure session cookies.

---

## Directory Structure

```text
Prompt-Studios/
├── frontend/             # React + Vite TypeScript production frontend
│   ├── src/              # App components, workspace, auth context, API client
│   ├── public/           # Static assets (Botly logos, favicons)
│   ├── vercel.json       # Vercel deployment configuration
│   └── .env.example      # Example frontend environment variables
├── backend-java/         # Spring Boot backend application
│   ├── src/              # Controllers, services, JPA entities, configurations
│   ├── Dockerfile        # Multi-stage production container build
│   └── .env.example      # Example backend environment variables
├── docs/                 # Product specifications, presentations, and guides
│   ├── MASTER_PRD.md
│   └── presentations/
├── scripts/              # Automation and maintenance scripts
├── archive/              # Deprecated / legacy templates
└── render.yaml           # One-click Render Blueprint definition
```

---

## Deployment Guide

### 1. Backend on Render

1. Connect this GitHub repository (`omkorade23/Prompt-Studios`) to [Render](https://render.com).
2. Use **New Web Service** or apply via **Blueprints** using `render.yaml`.
3. Set runtime to **Docker** with:
   - **Docker Command / Context**: `./backend-java`
   - **Dockerfile Path**: `./backend-java/Dockerfile`
4. Configure required Environment Variables:
   - `DATABASE_URL`: `jdbc:postgresql://<host>/<db>?user=<user>&password=<pass>&sslmode=require`
   - `GEMINI_API_KEY`: Your Google Gemini API Key
   - `GOOGLE_CLIENT_ID`: Google OAuth Web Client ID
   - `GOOGLE_CLIENT_SECRET`: Google OAuth Web Client Secret
   - `CORS_ALLOWED_ORIGINS`: Comma-separated list including your Vercel deployment URL (e.g. `https://prompt-studios.vercel.app`)

Healthcheck endpoint: `/api/health`

### 2. Frontend on Vercel

1. Import the repository into [Vercel](https://vercel.com).
2. Set the **Root Directory** to `frontend`.
3. Framework Preset: **Vite**.
4. Configure Environment Variables:
   - `VITE_API_BASE_URL`: Your Render backend URL (e.g. `https://prompt-studio-backend.onrender.com`)
   - `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth Web Client ID
5. Deploy!

---

## Local Development

### Prerequisites
- Node.js 18+ & npm
- JDK 17 & Maven 3.8+
- PostgreSQL database (or Neon connection URL)

### 1. Run the Backend
```bash
cd backend-java
mvn spring-boot:run
```
Runs at `http://localhost:5000` (or configured `PORT`).

### 2. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:3000`.

---

## License
MIT
