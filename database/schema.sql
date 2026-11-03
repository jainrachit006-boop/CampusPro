-- Campus Intelligence - Complaints Schema
-- =========================================
-- Complaints table stores student complaints about campus facilities.
-- Used by the frontend service layer and backend API.
-- =========================================

-- Create the complaints table if it does not exist
CREATE TABLE IF NOT EXISTS complaints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    complaint_code TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Wi-Fi', 'Hostel', 'Classroom', 'Laboratory', 'Other')),
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'RAISED' CHECK (status IN ('RAISED', 'IN_PROGRESS', 'RESOLVED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    location TEXT,
    ai_summary TEXT,
    department TEXT
);

-- Create updated_at trigger to automatically update timestamp on row changes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_complaints_updated_at
    BEFORE UPDATE ON complaints
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_complaints_category ON complaints (category);
CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints (status);
CREATE INDEX IF NOT EXISTS idx_complaints_created_at ON complaints (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_complaints_status_category ON complaints (status, category);

-- Comment on columns for documentation
COMMENT ON TABLE complaints IS 'Student complaints about campus facilities (Wi-Fi, Hostel, Classroom, Laboratory, Other)';
COMMENT ON COLUMN complaints.id IS 'UUID primary key, database-generated via gen_random_uuid()';
COMMENT ON COLUMN complaints.complaint_code IS 'Unique complaint code in format CI-XXXXX, auto-generated and enforced as UNIQUE';
COMMENT ON COLUMN complaints.category IS 'Complaint category: Wi-Fi, Hostel, Classroom, Laboratory, or Other';
COMMENT ON COLUMN complaints.status IS 'Complaint status: RAISED (new), IN_PROGRESS (being worked), RESOLVED (closed)';
COMMENT ON COLUMN complaints.created_at IS 'Timestamp when the complaint was originally raised';
COMMENT ON COLUMN complaints.updated_at IS 'Timestamp of the most recent status update';
COMMENT ON COLUMN complaints.location IS 'Optional physical location associated with the complaint';
COMMENT ON COLUMN complaints.ai_summary IS 'Optional AI-generated summary of the complaint';
COMMENT ON COLUMN complaints.department IS 'Optional department responsible for resolving the complaint';