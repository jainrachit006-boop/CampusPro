# Architecture - Campus Intelligence

## System Architecture

### Overview
Campus Intelligence follows a three-tier architecture:

1. **Frontend** (Vite + React) - User interface, complaint submission, viewing, and interaction
2. **Backend** (FastAPI + Python) - API layer, business logic, AI request handling, authentication
3. **Database** (Supabase PostgreSQL) - Persistent data storage, RLS policies, query optimization

### Data Flow

#### Complaint Submission
1. Student fills out complaint form in frontend
2. Frontend calls `createComplaint()` service function
3. Service sends data to Supabase via REST API
4. Backend may validate and process the request
5. AI summary may be generated via OpenRouter (future)
6. Complaint appears in dashboard

#### Priority Queue
1. Admin views `/priority` page
2. Frontend calls `getPriorityComplaints()` from utility
3. Priority engine calculates urgency scores dynamically
4. Results sorted by: Category Weight + floor(Hours Pending / 24)
5. Top 3 highest-priority complaints displayed

#### Status Updates
1. Admin updates complaint status in frontend
2. Frontend calls `updateComplaintStatus(id, status)`
3. Service updates the record in Supabase
4. Backend may log the change or trigger notifications
5. UI reflects the updated status

### Technology Decisions

#### Frontend
- **Vite + React** for fast development and building
- **React Router** for client-side routing
- **Tailwind CSS** for utility-first styling
- **Lucide React** for consistent icons
- **Recharts** for data visualization
- **Supabase JavaScript SDK** for database operations
- **Mock data adapter** for development without Supabase credentials

#### Backend
- **FastAPI** for modern, fast API development
- **Uvicorn** as the ASGI server
- **CORS middleware** with environment-configurable origins
- **OpenRouter integration** placeholder for future AI features

#### Database
- **Supabase PostgreSQL** with Row Level Security
- **UUID primary keys** database-generated via `gen_random_uuid()`
- **Unique complaint codes** auto-generated and enforced
- **Trigger-based timestamp** management (`updated_at`)
- **RLS policies** scoping anonymous access to SELECT only

### Security Model

- **Anonymous access**: READ-only via RLS policies (SELECT on complaints)
- **Authenticated access**: INSERT (new complaints), UPDATE (status changes), DELETE (resolved cleanup)
- **No secrets in frontend**: VITE_SUPABASE_ANON_KEY only, never service-role key
- **OpenRouter keys**: Only in backend, never exposed to frontend

### Extensibility Points

1. **AI Integration**: OpenRouter API can be hooked into backend `/api/ai` endpoint
2. **New Categories**: Add to check constraint in schema.sql and CATEGORY_WEIGHTS in priorityEngine.js
3. **New Fields**: Add to schema.sql and update service layer accordingly
4. **New Routes**: Add to frontend App.jsx and create corresponding page component