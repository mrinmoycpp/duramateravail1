import { NextResponse } from 'next/server'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'https://api.duramaterhealth.com'

export async function GET(request, { params }) {
  try {
    const { reportId } = await params
    if (!reportId) {
      return NextResponse.json({ error: 'Report ID is required' }, { status: 400 })
    }

    const headers = {}
    const auth = request.headers.get('authorization')
    if (auth) headers['authorization'] = auth

    const res = await fetch(`${BACKEND}/api/upload/result/${reportId}`, { headers })

    if (!res.ok) {
      const err = await res.text()
      return NextResponse.json({ error: err || 'Backend error' }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error proxying result:', error)
    return NextResponse.json({ error: 'Failed to fetch result' }, { status: 500 })
  }
}
