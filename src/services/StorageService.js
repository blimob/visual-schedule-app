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
      const jsonData = JSON.stringify(data)
      localStorage.setItem(this.#storageKey, jsonData)

    }
  }

  load() {
    const data = localStorage.getItem(this.#storageKey)
    return data ? JSON.parse(data) : null
  }

  clear() {
    localStorage.removeItem(this.#storageKey)
  }

  exists() {
    return localStorage.getItem(this.#storageKey) !== null
  }
}