export const STORAGE_MESSAGES = {
  SAVE_SUCCESS: 'Data saved to localStorage',
  SAVE_FAILED: 'Failed to save to localStorage',
  LOAD_SUCCESS: 'Data loaded from localStorage',
  LOAD_FAILED: 'Failed to load from localStorage',
  NO_DATA_FOUND: 'No stored data found',
  CLEAR_SUCCESS: 'Data cleared from localStorage',
  CLEAR_FAILED: 'Failed to clear localStorage',
  CHECK_FAILED: 'Failed to check localStorage',
  QUOTA_EXCEEDED: 'LocalStorage is full!',
  NOT_AVAILABLE: 'LocalStorage is not available',
  CORRUPT_DATA: 'Stored data is corrupt, clearing...'
}

export const ERROR_MESSAGES = {
  INVALID_STORAGE_KEY: 'StorageService requires a valid storage key string.',
  NO_DATA_TO_SAVE: 'No data provided to save.',
}