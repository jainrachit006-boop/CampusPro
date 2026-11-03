/**
 * Priority Engine for Campus Intelligence
 * 
 * Implements the official urgency formula:
 * Urgency Score = Category Weight + floor(Hours Pending / 24)
 * 
 * Weights (official):
 *   Wi-Fi = 2
 *   Hostel = 2
 *   Classroom = 1
 *   Laboratory = 3
 *   Other = 1 (default until team agrees otherwise)
 * 
 * Requirements:
 * - Exclude resolved complaints
 * - Calculate age dynamically from created_at
 * - Sort descending by urgency
 * - Break ties using oldest submission first
 * - If timestamps equal, sort by complaint ID
 * - Return the three highest-priority complaints
 * 
 * The engine is deterministic and independent of React components.
 * It does not store urgency scores in the database.
 */

import { getCategoryWeights, getComplaints as getRawComplaints } from '../services/complaintService.js'

/**
 * Category weights per the official formula.
 * Do not invent additional scoring factors or alter the official formula.
 */
const CATEGORY_WEIGHTS = {
  Wi-Fi: 2,
  Hostel: 2,
  Classroom: 1,
  Laboratory: 3,
  Other: 1, // Default weight until team agrees otherwise
}

/**
 * Calculate urgency score for a complaint.
 * Urgency Score = Category Weight + floor(Hours Pending / 24)
 * 
 * @param {Object} complaint - Complaint object with created_at and category
 * @returns {number} Urgency score (higher = more urgent)
 */
function calculateUrgency(complaint) {
  const category = complaint.category || 'Other'
  const weight = CATEGORY_WEIGHTS[category] || CATEGORY_WEIGHTS.Other

  // Calculate hours pending from created_at
  const createdAt = new Date(complaint.created_at).getTime()
  const now = new Date().getTime()
  const hoursPending = Math.floor((now - createdAt) / (1000 * 60 * 60))

  return weight + Math.floor(hoursPending / 24)
}

/**
 * Get all complaints, excluding resolved ones, sorted by urgency.
 * 
 * @param {Object} options - Optional options
 * @param {number} options.limit - Maximum number of complaints to return (default: 3)
 * @returns {Array} Complaints sorted descending by urgency, then oldest first, then by ID
 */
export function getPriorityComplaints(options = {}) {
  const limit = options.limit !== undefined ? options.limit : 3

  // Get all complaints from the service
  const allComplaints = getRawComplaints({})

  // Exclude resolved complaints
  const unresolved = allComplaints.filter(
    (complaint) => complaint.status !== 'RESOLVED'
  )

  // Calculate urgency for each and sort
  const withUrgency = unresolved.map((complaint) => ({
    ...complaint,
    urgencyScore: calculateUrgency(complaint),
  }))

  // Sort: descending by urgency, then oldest submission first (ascending created_at),
  // then by complaint ID if timestamps are equal
  const sorted = withUrgency.sort((a, b) => {
    // Primary: descending urgency (higher score first)
    if (b.urgencyScore !== a.urgencyScore) {
      return b.urgencyScore - a.urgencyScore
    }

    // Secondary: oldest submission first (earlier created_at)
    const aDate = new Date(a.created_at).getTime()
    const bDate = new Date(b.created_at).getTime()
    if (aDate !== bDate) {
      return aDate - bDate // oldest first
    }

    // Tertiary: sort by complaint ID (ascending)
    if (a.id < b.id) return -1
    if (a.id > b.id) return 1
    return 0
  })

  // Return the top N highest-priority complaints
  return sorted.slice(0, limit)
}

/**
 * Get the top 3 priority complaints (default).
 * This is the primary export used by the UI.
 * 
 * @returns {Array} Three highest-priority unresolved complaints
 */
export default getPriorityComplaints

/**
 * Get category weights map.
 * 
 * @returns {Object} Map of category -> weight
 */
export { CATEGORY_WEIGHTS }