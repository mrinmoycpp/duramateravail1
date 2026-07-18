import { NextResponse } from 'next/server'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'https://api.duramaterhealth.com'

export async function GET(request) {
  try {
    const headers = {}
    const auth = request.headers.get('authorization')
    if (auth) headers['authorization'] = auth

    const res = await fetch(`${BACKEND}/api/upload/reports/latest`, { headers })

    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    console.error('Error proxying latest report:', error)
    return NextResponse.json({ error: 'Failed to fetch latest report' }, { status: 500 })
  }
}
