/**
 * LocalStorage Utility for Campus Intelligence
 * 
 * Important guidelines:
 * - LocalStorage is a cache, not the authoritative shared database.
 * - Never claim that LocalStorage synchronizes devices.
 * - Do not implement complicated offline synchronization.
 * - Supabase will become the shared source of truth.
 * - Handle browser storage errors gracefully.
 * 
 * This utility provides simple get/set/remove operations with error handling.
 * It does not persist across browsers or devices.
 */

/**
 * Safely get an item from LocalStorage.
 * 
 * @param {string} key - The storage key
 * @returns {any} The parsed value, or null if not found or on error
 */
export function getItem(key) {
  try {
    const stored = localStorage.getItem(key)
    if (stored === null) return null
    return JSON.parse(stored)
  } catch (error) {
    console.warn(`LocalStorage getItem error for key "${key}":`, error)
    return null
  }
}

/**
 * Safely set an item in LocalStorage.
 * 
 * @param {string} key - The storage key
 * @param {any} value - The value to store (will be JSON-stringified)
 * @returns {boolean} true if successful, false otherwise
 */
export function setItem(key, value) {
  try {
    const serialized = JSON.stringify(value)
    localStorage.setItem(key, serialized)
    return true
  } catch (error) {
    console.error(`LocalStorage setItem error for key "${key}":`, error)
    return false
  }
}

/**
 * Safely remove an item from LocalStorage.
 * 
 * @param {string} key - The storage key to remove
 * @returns {boolean} true if successful, false otherwise
 */
export function removeItem(key) {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`LocalStorage removeItem error for key "${key}":`, error)
    return false
  }
}

/**
 * Safely clear all local storage (use with caution).
 * 
 * @returns {boolean} true if successful, false otherwise
 */
export function clear() {
  try {
    localStorage.clear()
    return true
  } catch (error) {
    console.error('LocalStorage clear error:', error)
    return false
  }
}

/**
 * Check if LocalStorage is available.
 * 
 * @returns {boolean} true if LocalStorage is available, false otherwise
 */
export function isAvailable() {
  try {
    const testKey = '__test__'
    localStorage.setItem(testKey, 'test')
    localStorage.removeItem(testKey)
    return true
  } catch (error) {
    console.warn('LocalStorage is not available in this browser')
    return false
  }
}

/**
 * Get all stored keys (excluding internal/temp keys).
 * 
 * @returns {Array} List of storage keys
 */
export function getKeys() {
  try {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
      keys.push(localStorage.key(i))
    }
    return keys
  } catch (error) {
    console.error('LocalStorage getKeys error:', error)
    return []
  }
}