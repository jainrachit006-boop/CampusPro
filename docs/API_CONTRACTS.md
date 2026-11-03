# API Contracts - Campus Intelligence

## Backend API (FastAPI)

### Base URL
`http://localhost:8000/api`

### Health Check

**GET /api/health**

| Field | Type | Description |
|-------|------|-------------|
| status | string | Always "healthy" |
| service | string | Service name: "campus-intelligence-backend" |
| version | string | API version: "1.0.0" |

**Response:**
```json
{
  "status": "healthy",
  "service": "campus-intelligence-backend",
  "version": "1.0.0"
}
```

### Complaint Endpoints (Future)

**POST /api/complaints**
- Create a new complaint
- Requires authenticated session (service-role key)
- Body: { category, description, status, location, ai_summary, department }

**GET /api/complaints**
- List complaints with optional filters
- Query params: status, category

**PATCH /api/complaints/{id}**
- Update complaint status
- Requires authenticated session

## Frontend Service Layer

### Services (`frontend/src/services/`)

#### `supabase.js`
- `initializeSupabase()` - Initialize Supabase client
- `getSupabase()` - Get configured Supabase client
- Returns null if credentials unavailable (graceful degradation)

#### `complaintService.js`
- `createComplaint(data)` - Create new complaint
  - Data: { category, description, status, location, ai_summary, department }
  - Returns created complaint object
  - Uses mock data if Supabase not configured
  
- `getComplaints(filters)` - Get complaints with optional filters
  - Filters: { status, category }
  - Returns array of complaint objects
  - Uses mock data if Supabase not configured
  
- `updateComplaintStatus(id, status)` - Update complaint status
  - id: complaint UUID
  - status: "RAISED" | "IN_PROGRESS" | "RESOLVED"
  - Returns updated complaint
  - Uses mock data if Supabase not configured
  
- `getComplaintById(id)` - Get single complaint by ID
  - id: complaint UUID
  - Returns complaint object or throws error

#### `priorityEngine.js`
- `getPriorityComplaints(options)` - Get top priority complaints
  - Options: { limit: number } (default: 3)
  - Returns array of complaints with urgencyScore added
  - Excludes RESOLVED complaints
  - Sorts by: urgency descending, oldest created_at, then ID

#### `localStorage.js`
- `getItem(key)` - Get stored value
- `setItem(key, value)` - Store value
- `removeItem(key)` - Remove stored value
- `clear()` - Clear all storage
- `isAvailable()` - Check if available
- `getKeys()` - List all keys

## API Contract Summary

| Category | Endpoint | Auth | Description |
|----------|----------|------|-------------|
| Health | GET /api/health | None | Service health check |
| Complaints | POST /api/complaints | authenticated | Create new complaint |
| Complaints | GET /api/complaints | authenticated | List complaints |
| Complaints | PATCH /api/complaints/{id} | authenticated | Update status |
| Priority | N/A (client-side) | None | Calculated in frontend |