import { NextResponse } from 'next/server'

const BACKEND = 'https://api.duramaterhealth.com'

export async function POST(request) {
  const body = await request.json().catch(() => ({}))
  const auth = request.headers.get('authorization')

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)

  try {
    const res = await fetch(`${BACKEND}/api/upload/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(auth ? { Authorization: auth } : {}),
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    })
    clearTimeout(timeout)
    const data = await res.json().catch(() => ({}))
    return NextResponse.json(data, { status: res.status })
  } catch {
    clearTimeout(timeout)
    return NextResponse.json({ success: true })
  }
}
