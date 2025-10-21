import { STORAGE_MESSAGES, ERROR_MESSAGES } from '../constants/messages.js'

/**
 * Handles saving, loading, and clearing data from localStorage.
 * Provides error handling and consistent log messages.
 */
export class StorageService {
  #storageKey

  /**
   * @param {string} storageKey - The key used to identify stored data.
   * @throws {Error} If no valid key is provided.
   */
  constructor(storageKey) {
    if (!storageKey) {
      throw new Error(ERROR_MESSAGES.INVALID_STORAGE_KEY)
    }
    this.#storageKey = storageKey
  }

  /**
   * Saves data to localStorage.
   * @param {Object} data - The data object to save.
   * @returns {boolean} True if successful, otherwise false.
   */
  save(data) {
    if (!data) {
      this.#log('warn', ERROR_MESSAGES.NO_DATA_TO_SAVE)
      return false
    }

    try {
      const json = JSON.stringify(data)
      localStorage.setItem(this.#storageKey, json)
      this.#log('log', STORAGE_MESSAGES.SAVE_SUCCESS)
      return true
    } catch (error) {
      this.#handleSaveError(error)
      return false
    }
  }

  /**
   * Loads and parses data from localStorage.
   * @returns {Object|null} The parsed data, or null if nothing found or invalid.
   */
  load() {
    try {
      const stored = localStorage.getItem(this.#storageKey)
      if (!stored) {
        this.#log('log', STORAGE_MESSAGES.NO_DATA_FOUND)
        return null
      }

      const data = JSON.parse(stored)
      this.#log('log', STORAGE_MESSAGES.LOAD_SUCCESS)
      return data
    } catch (error) {
      this.#log('error', `${STORAGE_MESSAGES.LOAD_FAILED}: ${error.message}`)
      this.#log('warn', STORAGE_MESSAGES.CORRUPT_DATA)
      this.clear()
      return null
    }
  }

  /**
   * Clears all data stored under this key.
   * @returns {boolean} True if successful, otherwise false.
   */
  clear() {
    try {
      localStorage.removeItem(this.#storageKey)
      this.#log('log', STORAGE_MESSAGES.CLEAR_SUCCESS)
      return true
    } catch (error) {
      this.#log('error', `${STORAGE_MESSAGES.CLEAR_FAILED}: ${error.message}`)
      return false
    }
  }

  /**
   * Checks if any data exists for this key.
   * @returns {boolean} True if data exists, otherwise false.
   */
  exists() {
    try {
      return localStorage.getItem(this.#storageKey) !== null
    } catch (error) {
      this.#log('error', `${STORAGE_MESSAGES.CHECK_FAILED}: ${error.message}`)
      return false
    }
  }

  /**
   * Logs messages consistently.
   * @param {'log'|'warn'|'error'} type - The log level.
   * @param {string} message - The message to display.
   */
  #log(type, message) {
    const fn = console[type] || console.log
    fn(message)
  }

  /**
   * Handles errors specific to the save operation.
   * @param {Error} error - The thrown error.
   */
  #handleSaveError(error) {
    if (error.name === 'QuotaExceededError') {
      this.#log('error', STORAGE_MESSAGES.QUOTA_EXCEEDED)
    } else {
      this.#log('error', `${STORAGE_MESSAGES.SAVE_FAILED}: ${error.message}`)
    }
  }
}