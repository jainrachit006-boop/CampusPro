# Development Guide - Campus Intelligence

## Getting Started

### Prerequisites
- Node.js v18+
- Python v3.10+
- Supabase account

### Environment Setup

#### 1. Frontend
```bash
cd frontend
cp .env.example .env
# Edit .env with your Supabase credentials
npm install
npm run dev
```

#### 2. Backend
```bash
cd backend
python -m venv venv
# Activate:
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Add OPENROUTER_API_KEY if AI features needed
uvicorn app.main:app --reload
```

#### 3. Database
```bash
# In Supabase SQL editor:
-- Run schema.sql first
\i database/schema.sql

-- Then run policies.sql
\i database/policies.sql
```

## Daily Development Workflow

### Starting Services
1. Start backend: `cd backend && uvicorn app.main:app --reload`
2. Start frontend: `cd frontend && npm run dev`
3. Verify health endpoint: http://localhost:8000/api/health
4. Open frontend: http://localhost:5173

### Adding a New Complaint
1. Create form component in `frontend/src/components/complaints/`
2. Add service call to `createComplaint()`
3. Update route in `frontend/src/App.jsx` if new page
4. Test with mock data (Supabase not required initially)

### Adding a New Route
1. Create page component in `frontend/src/pages/`
2. Add route configuration in `frontend/src/App.jsx`
3. Add navigation link in `Sidebar.jsx` if needed
4. Test navigation flow

### Priority Engine Changes
- Modify `CATEGORY_WEIGHTS` in `frontend/src/utils/priorityEngine.js`
- Adjust sorting logic if needed
- Do not change the official formula: Category Weight + floor(Hours Pending / 24)

### Adding AI Features
1. Add OpenRouter API key to backend `.env`
2. Implement AI endpoint in `backend/app/api/routes/`
3. Add frontend service call
4. Update `assistant` page to display AI results

## Debugging

### Common Issues

#### Supabase not configured
- **Symptom**: Warning in console, mock data used
- **Fix**: Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env

#### CORS errors
- **Symptom**: Frontend cannot reach backend
- **Fix**: Add correct origin to CORS_ORIGINS in backend .env

#### Priority engine returning empty
- **Symptom**: No complaints in priority queue
- **Fix**: Check that complaints exist and are not all RESOLVED
- **Fix**: Verify created_at timestamps are valid ISO strings

#### LocalStorage not working
- **Symptom**: Preferences not persisted
- **Fix**: Check if browser has LocalStorage disabled
- **Fix**: Clear cache if quota exceeded

### Logging
- Frontend errors appear in browser dev console
- Backend errors appear in terminal where uvicorn is running
- Supabase client logs if credentials configured

## Code Conventions

### Naming
- Components: PascalCase (Dashboard, Sidebar)
- Functions: camelCase (createComplaint, getPriorityComplaints)
- Constants: UPPER_SNAKE_CASE (CATEGORY_WEIGHTS)
- Files: kebab-case or camelCase (supabase.js, priorityEngine.js)

### Imports
- External libraries from node_modules or pip
- Relative imports starting with `../` or `./`
- Service layer separate from UI components

### Error Handling
- Services throw descriptive errors
- Components should handle errors gracefully
- Never crash the app on data fetch failures
- Show user-friendly messages on failure

## Integration Points

### Person 2 (Supabase/Database)
- Execute schema.sql and policies.sql in Supabase project
- Provide VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to frontend
- Monitor database performance and query patterns

### Person 3 (Hosting/Deployment)
- Deploy frontend to Vercel
- Deploy backend to suitable Python hosting
- Configure custom domains and SSL
- Set up domain-specific environment variables

### Person 4 (UI/UX/QA)
- Refine visual design using Tailwind CSS
- Implement accessibility improvements
- Create component variations and states
- Conduct usability testing
- Update ARCHITECTURE.md with design decisions