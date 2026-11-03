/**
 * Complaint Service Layer
 * 
 * Defines the interface for complaint operations. Currently implements a
 * mock-data adapter when Supabase is not configured, and is designed to
 * be replaced by Supabase-backed implementation later without rewriting
 * UI components.
 */

import { getSupabase, initializeSupabase } from './supabase.js'

// Mock complaint data for development
const MOCK_COMPLAINTS = [
  {
    id: '1',
    complaint_code: 'CI-000001',
    category: 'Wi-Fi',
    description: 'Wi-Fi unavailable in hostel',
    status: 'RAISED',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    location: null,
    ai_summary: null,
    department: null,
  },
  {
    id: '2',
    complaint_code: 'CI-000002',
    category: 'Hostel',
    description: 'Room heater not working',
    status: 'IN_PROGRESS',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    location: null,
    ai_summary: null,
    department: null,
  },
  {
    id: '3',
    complaint_code: 'CI-000003',
    category: 'Classroom',
    description: 'Projector not functioning',
    status: 'RESOLVED',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    location: null,
    ai_summary: null,
    department: null,
  },
]

// Category weights for priority engine
const CATEGORY_WEIGHTS = {
  Wi-Fi: 2,
  Hostel: 2,
  Classroom: 1,
  Laboratory: 3,
  Other: 1,
}

/**
 * Check if Supabase is available and return the client, or fall back to mock mode.
 */
function useMockData() {
  const supa = initializeSupabase()
  return supa === null
}

/**
 * Create a new complaint.
 * @param {Object} data - Complaint data {category, description, status, location, ai_summary, department}
 * @returns {Promise<Object>} Created complaint
 */
export async function createComplaint(data) {
  const usingMock = useMockData()

  if (usingMock) {
    const complaint = {
      id: Math.random().toString(36).substr(2, 9),
      complaint_code: `CI-${String(MOCK_COMPLAINTS.length + 1).padStart(6, '0')}`,
      category: data.category,
      description: data.description,
      status: data.status || 'RAISED',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      location: data.location || null,
      ai_summary: data.ai_summary || null,
      department: data.department || null,
    }
    MOCK_COMPLAINTS.push(complaint)
    return complaint
  }

  const supa = getSupabase()
  if (!supa) {
    throw new Error('Supabase not configured. Cannot create complaint.')
  }

  const { data: result, error } = await supa
    .from('complaints')
    .insert([data])
    .select()
    .single()

  if (error) throw error
  return result
}

/**
 * Get all complaints, optionally filtered.
 * @param {Object} filters - Optional filters {status, category}
 * @returns {Promise<Array>} List of complaints
 */
export async function getComplaints(filters = {}) {
  const usingMock = useMockData()

  if (usingMock) {
    let results = [...MOCK_COMPLAINTS]

    if (filters.status) {
      results = results.filter((c) => c.status === filters.status)
    }
    if (filters.category) {
      results = results.filter((c) => c.category === filters.category)
    }

    return results
  }

  const supa = getSupabase()
  if (!supa) {
    throw new Error('Supabase not configured. Cannot retrieve complaints.')
  }

  let query = supa.from('complaints').select('*')

  if (filters.status) {
    query = query.eq('status', filters.status)
  }
  if (filters.category) {
    query = query.eq('category', filters.category)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

/**
 * Get a single complaint by ID.
 * @param {string} id - Complaint ID
 * @returns {Promise<Object>} Complaint data
 */
export async function getComplaintById(id) {
  const usingMock = useMockData()

  if (usingMock) {
    const complaint = MOCK_COMPLAINTS.find((c) => c.id === id)
    if (complaint) return complaint
    throw new Error('Complaint not found in mock data.')
  }

  const supa = getSupabase()
  if (!supa) {
    throw new Error('Supabase not configured. Cannot retrieve complaint.')
  }

  const { data, error } = await supa.from('complaints').select('*').eq('id', id).single()

  if (error) throw error
  return data
}

/**
 * Update complaint status.
 * @param {string} id - Complaint ID
 * @param {string} status - New status
 * @returns {Promise<Object>} Updated complaint
 */
export async function updateComplaintStatus(id, status) {
  const usingMock = useMockData()

  if (usingMock) {
    const complaint = MOCK_COMPLAINTS.find((c) => c.id === id)
    if (!complaint) throw new Error('Complaint not found in mock data.')

    complaint.status = status
    complaint.updated_at = new Date().toISOString()
    return { ...complaint }
  }

  const supa = getSupabase()
  if (!supa) {
    throw new Error('Supabase not configured. Cannot update complaint status.')
  }

  const { data, error } = await supa
    .from('complaints')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Get category weights for priority engine.
 * @returns {Object} Map of category -> weight
 */
export function getCategoryWeights() {
  return { ...CATEGORY_WEIGHTS }
}

export default { createComplaint, getComplaints, updateComplaintStatus, getComplaintById, getCategoryWeights }