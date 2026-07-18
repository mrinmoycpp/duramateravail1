import { NextResponse } from 'next/server'

const BACKEND = 'https://api.duramaterhealth.com'

export async function GET(request, { params }) {
  const { reportId } = await params
  const auth = request.headers.get('authorization')

  const res = await fetch(`${BACKEND}/api/upload/status/${reportId}`, {
    headers: { ...(auth ? { Authorization: auth } : {}) },
  })

  const data = await res.json().catch(() => ({}))
  return NextResponse.json(data, { status: res.status })
}
