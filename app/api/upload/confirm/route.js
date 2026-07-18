import { NextResponse } from 'next/server'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'https://api.duramaterhealth.com'

export async function POST(request) {
  try {
    const body = await request.json()
    const headers = { 'Content-Type': 'application/json' }
    const auth = request.headers.get('authorization')
    if (auth) headers['authorization'] = auth

    const res = await fetch(`${BACKEND}/api/upload/confirm`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })

    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    console.error('Error proxying confirm:', error)
    return NextResponse.json({ error: 'Failed to confirm upload' }, { status: 500 })
  }
}
