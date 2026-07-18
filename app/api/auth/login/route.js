import { NextResponse } from 'next/server'

const BACKEND = 'https://api.duramaterhealth.com'

export async function POST(request) {
  const body = await request.json().catch(() => ({}))
  const res = await fetch(`${BACKEND}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  return NextResponse.json(data, { status: res.status })
}
