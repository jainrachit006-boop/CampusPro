# Campus Intelligence

AI-assisted Campus Complaint Management and Operational Intelligence System.

## Project Overview

Campus Intelligence is a platform for students to submit complaints about campus facilities
(Wi-Fi, Hostel, Classroom, Laboratory, Other) and for administrators to view, search,
filter, and resolve them. The system includes AI-assisted complaint intelligence, priority
queuing, and analytics.

## Technology Stack

### Frontend
- Vite
- React
- JavaScript (JSX, not TypeScript)
- Tailwind CSS
- React Router
- Lucide React
- Recharts
- Supabase JavaScript SDK

### Database
- Supabase PostgreSQL
- Supabase JavaScript SDK

### Backend
- Python
- FastAPI
- Uvicorn

### AI
- OpenRouter API
- Configurable model selection

### Deployment
- Frontend: Vercel
- Backend: Separate deployment
- Database: Supabase

## Folder Structure

```
campus-intelligence/
├── frontend/          # Vite + React application
├── backend/           # FastAPI backend
├── database/          # SQL schema and policies
├── docs/              # Project documentation
├── .gitignore
└── README.md
```

## Local Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.10 or higher)
- Supabase account and project

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the development server: `npm run dev`
5. The frontend will be available at `http://localhost:5173`

### Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Create a `.env` file based on `.env.example`:
   ```
   OPENROUTER_API_KEY=
   OPENROUTER_MODEL=anthropic/claude-3.5-sonnet
   CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
   ```
6. Start the backend server: `uvicorn app.main:app --reload`
7. The backend will be available at `http://localhost:8000`

### Database Setup
1. Create a Supabase project at https://supabase.com
2. Run `database/schema.sql` in the Supabase SQL editor
3. Run `database/policies.sql` to enable RLS and apply policies
4. Note the Supabase project URL and anon key for frontend configuration

## Environment Configuration

### Frontend Variables
| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key |

### Backend Variables
| Variable | Description |
|----------|-------------|
| `OPENROUTER_API_KEY` | OpenRouter API key (for AI features) |
| `OPENROUTER_MODEL` | Model identifier (e.g., `anthropic/claude-3.5-sonnet`) |
| `CORS_ORIGINS` | Comma-separated list of allowed CORS origins |

## Team Contribution Workflow

See `docs/TEAM_WORKFLOW.md` for detailed role assignments.

## Current Implementation Status

- ✅ Project structure created
- ✅ Frontend Vite + React application initialized
- ✅ Tailwind CSS configured
- ✅ React Router configured
- ✅ Lucide React configured
- ✅ Recharts configured
- ✅ Supabase JavaScript SDK integration ready
- ✅ Clean global CSS
- ✅ All initial routes created (`/`, `/complaints`, `/priority`, `/analytics`, `/assistant`)
- ✅ Application layout with Sidebar, TopBar, and MainContent
- ✅ Placeholder page components for all routes
- ✅ Frontend service layer with Supabase client and mock data adapter
- ✅ Complaint service: createComplaint, getComplaints, updateComplaintStatus, getComplaintById
- ✅ Priority engine with official urgency formula
- ✅ LocalStorage utility with error handling
- ✅ FastAPI backend initialized
- ✅ Health endpoint: `GET /api/health`
- ✅ Basic CORS configuration
- ✅ Requirements file
- ✅ Backend .env.example
- ✅ Root .gitignore
- ✅ README.md created
- ✅ Database schema.sql created
- ✅ Database policies.sql created
- ✅ Database README.md created
- ⏳ Team workflow documentation (docs/TEAM_WORKFLOW.md)
- ⏳ Architecture documentation (docs/ARCHITECTURE.md)
- ⏳ API contracts documentation (docs/API_CONTRACTS.md)
- ⏳ Development workflow documentation (docs/DEVELOPMENT.md)

## Available Scripts

### Frontend
- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

### Backend
- `uvicorn app.main:app --reload` - Start FastAPI development server
- `pip install -r requirements.txt` - Install dependencies

## Learn More

- Vite: https://vitejs.dev/
- React: https://reactjs.org/
- Tailwind CSS: https://tailwindcss.com/
- React Router: https://reactrouter.com/
- Lucide React: https://lucide.dev/
- Recharts: https://recharts.org/
- Supabase: https://supabase.com/
- FastAPI: https://fastapi.tiangolo.com/
- OpenRouter: https://openrouter.ai/