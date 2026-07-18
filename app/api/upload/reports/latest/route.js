import { NextResponse } from 'next/server'

const BACKEND = 'https://api.duramaterhealth.com'

export async function GET(request) {
  const auth = request.headers.get('authorization')

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)

  try {
    const res = await fetch(`${BACKEND}/api/upload/reports/latest`, {
      headers: { ...(auth ? { Authorization: auth } : {}) },
      signal: controller.signal,
    })
    clearTimeout(timeout)

    if (!res.ok) {
      return NextResponse.json({ error: 'No reports found' }, { status: res.status })
    }

    const data = await res.json().catch(() => ({}))
    return NextResponse.json(data)
  } catch (err) {
    clearTimeout(timeout)
    return NextResponse.json({ error: 'No reports found' }, { status: 404 })
  }
}
