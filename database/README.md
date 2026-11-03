# Campus Intelligence - Database

## Schema: `schema.sql`

Defines the `complaints` table with the following structure:

- `id`: UUID primary key, database-generated via `gen_random_uuid()`
- `complaint_code`: Unique complaint code (format: CI-XXXXX), enforced UNIQUE
- `category`: Complaint category with check constraint: Wi-Fi, Hostel, Classroom, Laboratory, Other
- `description`: Free-text description of the complaint
- `status`: Enum-like status: RAISED, IN_PROGRESS, RESOLVED (default: RAISED)
- `created_at`: Timestamp of when complaint was raised (default: NOW())
- `updated_at`: Timestamp of last status update (default: NOW(), auto-updated via trigger)
- `location`: Optional physical location text
- `ai_summary`: Optional AI-generated summary
- `department`: Optional responsible department

A trigger automatically updates `updated_at` on every row modification.

Indexes are created on `category`, `status`, `created_at`, and a composite `(status, category)` for common query patterns.

## Policies: `policies.sql`

Row Level Security (RLS) policies for the `complaints` table:

| Policy | Type | Access | Description |
|--------|------|--------|-------------|
| Allow public read access | SELECT | `anon` | Anonymous users may view all complaints |
| Allow authenticated insert | INSERT | `authenticated` | Authenticated users may submit new complaints |
| Allow authenticated update status | UPDATE | `authenticated` | Authenticated users may update status only |
| Allow admin delete | DELETE | `authenticated` | Only RESOLVED complaints may be deleted |

Anonymous access is deliberately scoped to SELECT only. All write operations require
authenticated sessions. This allows the system to function as a public demo where
anyone can view complaints, while write operations remain protected.

## Setup Instructions

1. Create a Supabase project at https://supabase.com
2. Run the schema.sql script in the Supabase SQL editor
3. Run the policies.sql script to enable RLS and apply policies
4. Note the Supabase project URL and anon key for frontend configuration
5. The backend will use the service-role key for authenticated operations