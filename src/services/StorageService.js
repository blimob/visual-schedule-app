export class StorageService {
  #storageKey

  constructor(storageKey) {
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