import { STORAGE_MESSAGES, ERROR_MESSAGES } from '../constants/messages.js'

export class StorageService {
  #storageKey

  constructor(storageKey) {
    if (!storageKey) {
      throw new Error(ERROR_MESSAGES.INVALID_STORAGE_KEY)
    }
    this.#storageKey = storageKey
  }

  save(data) {
    try {
      if (!data) {
        console.warn(ERROR_MESSAGES.NO_DATA_TO_SAVE)
        return false
      }

      const jsonData = JSON.stringify(data)
      localStorage.setItem(this.#storageKey, jsonData)
      console.log(STORAGE_MESSAGES.SAVE_SUCCESS)
      return true
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        console.error(STORAGE_MESSAGES.QUOTA_EXCEEDED)
      } else {
        console.error(`${STORAGE_MESSAGES.SAVE_FAILED}: ${error.message}`)
      }
      return false
    }
  }

  load() {
    try {
      const stored = localStorage.getItem(this.#storageKey)
      
      if (!stored) {
        console.log(STORAGE_MESSAGES.NO_DATA_FOUND)
        return null
      }
      
      const data = JSON.parse(stored)
      console.log(STORAGE_MESSAGES.LOAD_SUCCESS)
      return data
    } catch (error) {
      console.error(`${STORAGE_MESSAGES.LOAD_FAILED}: ${error.message}`)
      console.warn(STORAGE_MESSAGES.CORRUPT_DATA)
      this.clear()
      return null
    }
  }

  clear() {
    try {
      localStorage.removeItem(this.#storageKey)
      console.log(STORAGE_MESSAGES.CLEAR_SUCCESS)
      return true
    } catch (error) {
      console.error(`${STORAGE_MESSAGES.CLEAR_FAILED}: ${error.message}`)
      return false
    }
  }

  exists() {
    try {
      return localStorage.getItem(this.#storageKey) !== null
    } catch (error) {
      console.error(`${STORAGE_MESSAGES.CHECK_FAILED}: ${error.message}`)
      return false
    }
  }
}