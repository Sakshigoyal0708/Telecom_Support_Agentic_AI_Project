import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
const TOKEN_KEY = 'telecom_auth_token'
const USER_KEY = 'telecom_auth_user'

const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export function setAuthSession(payload) {
  if (!payload?.token || !payload?.user) {
    throw new Error('Invalid auth payload')
  }

  localStorage.setItem(TOKEN_KEY, payload.token)
  localStorage.setItem(USER_KEY, JSON.stringify(payload.user))
}

export function clearAuthSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getStoredUser() {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch {
    clearAuthSession()
    return null
  }
}

export async function loginApi({ email, password }) {
  const response = await http.post('/api/auth/login', { email, password })
  return response.data
}

export async function registerApi({ fullName, email, phone, password, role = 'user' }) {
  const response = await http.post('/api/auth/register', {
    fullName,
    email,
    phone,
    password,
    role,
  })
  return response.data
}

export async function getMeApi(token) {
  const resolvedToken = token || getStoredToken()
  if (!resolvedToken) {
    throw new Error('No auth token found')
  }

  const response = await http.get('/api/auth/me', {
    headers: {
      Authorization: `Bearer ${resolvedToken}`,
    },
  })

  return response.data
}

export async function logoutApi(token) {
  const resolvedToken = token || getStoredToken()
  if (!resolvedToken) {
    return { success: true }
  }

  try {
    const response = await http.post(
      '/api/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${resolvedToken}`,
        },
      }
    )

    return response.data
  } catch (error) {
    if (error?.response?.status === 404 || error?.response?.status === 405) {
      return { success: true, fallback: true }
    }

    throw error
  }
}
