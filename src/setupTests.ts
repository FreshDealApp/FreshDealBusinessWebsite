import '@testing-library/jest-dom'
import { vi } from 'vitest'

vi.mock('./redux/Api/apiService', () => ({
  API_BASE_URL: '',
  TOKEN_KEY: 'token',
  getStoredToken: () => null,
  setStoredToken: () => {},
  removeStoredToken: () => {},
  getAuthHeaders: () => ({}),
  authenticatedApiCall: vi.fn()
}));
