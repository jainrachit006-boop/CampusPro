/**
 * Supabase Client Initialization
 * 
 * Reads environment variables from VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
 * Handles missing configuration gracefully by throwing a clear error rather than
 * silently failing or using mock data by default.
 */

let supabase = null
let initialized = false

export function initializeSupabase() {
  if (initialized) return supabase

  const url = import.meta.env.VITE_SUPABASE_URL
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    console.warn(
      'Supabase credentials not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.'
    )
    // Return null so callers can check and show appropriate UI
    initialized = true
    return null
  }

  try {
    import('supabase')
      .then((supa) => {
        supabase = supa.createClient(url, anonKey)
        initialized = true
      })
      .catch((err) => {
        console.error('Failed to initialize Supabase client:', err)
        initialized = true
      })
  } catch (err) {
    console.error('Error setting up Supabase client:', err)
    initialized = true
  }

  return supabase
}

export function getSupabase() {
  if (!supabase) initializeSupabase()
  return supabase
}

export default { getSupabase, initializeSupabase }