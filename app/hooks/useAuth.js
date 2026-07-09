'use client'
import { useCallback, useEffect, useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || ''

function apiPath(path) {
  return `${API_BASE}${path}`
}

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if we are returning from Google OAuth
    const urlParams = new URLSearchParams(window.location.search)
    const encodedUser = urlParams.get('user')

    if (encodedUser) {
      try {
        const googleUser = JSON.parse(atob(encodedUser.replace(/-/g, '+').replace(/_/g, '/')))
        localStorage.setItem('user', JSON.stringify(googleUser))
        setUser(googleUser)
      } catch (e) {
        // ignore malformed payload
      }
      window.history.replaceState({}, document.title, window.location.pathname)
      setLoading(false)
      return
    }

    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const signInWithEmail = useCallback(async (email, password) => {
    try {
      const res = await fetch(apiPath('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        return { error: { message: errData.error || 'Failed to sign in' } }
      }

      const { user: loggedInUser } = await res.json()
      localStorage.setItem('user', JSON.stringify(loggedInUser))
      setUser(loggedInUser)
      return { data: { user: loggedInUser } }
    } catch (err) {
      return { error: { message: err.message } }
    }
  }, [])

  const registerWithEmail = useCallback(async (email, password, name) => {
    try {
      const res = await fetch(apiPath('/api/auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        return { error: { message: errData.error || 'Failed to register' } }
      }

      const { user: loggedInUser } = await res.json()
      localStorage.setItem('user', JSON.stringify(loggedInUser))
      setUser(loggedInUser)
      return { data: { user: loggedInUser } }
    } catch (err) {
      return { error: { message: err.message } }
    }
  }, [])

  const signInWithGoogle = useCallback((mode = 'login') => {
    const authMode = mode === 'register' ? 'register' : 'login'
    localStorage.setItem('googleAuthMode', authMode)

    const params = new URLSearchParams({
      mode: authMode,
      redirect: '/exclusive-access',
    })

    window.location.href = `/api/auth/google?${params.toString()}`
  }, [])

  const signOut = useCallback(async () => {
    localStorage.removeItem('user')
    setUser(null)
  }, [])

  return { user, loading, signInWithEmail, registerWithEmail, signInWithGoogle, signOut }
}
