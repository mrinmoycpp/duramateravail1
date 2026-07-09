import { NextResponse } from 'next/server'
import { createUser } from '../../../lib/userStore.js'

const isEmail = (value) => typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export async function POST(request) {
  const body = await request.json().catch(() => ({}))
  const email = String(body.email || '').trim().toLowerCase()
  const password = String(body.password || '')
  const name = String(body.name || '').trim()

  if (!isEmail(email)) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 })
  }

  if (password.length < 6) {
    return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 })
  }

  try {
    const result = createUser({ email, password, name })
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 409 })
    }

    return NextResponse.json({ user: result.user })
  } catch (error) {
    if (error.message.includes('Filesystem operations not supported')) {
      return NextResponse.json(
        { error: 'Email/password authentication is not configured. Please use Google OAuth or configure a database.' },
        { status: 503 }
      )
    }
    return NextResponse.json({ error: 'Registration failed.' }, { status: 500 })
  }
}
