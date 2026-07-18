import { NextResponse } from 'next/server'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'https://api.duramaterhealth.com'

export async function PUT(request, { params }) {
  try {
    const { reportId } = await params
    if (!reportId) {
      return NextResponse.json({ error: 'Report ID is required' }, { status: 400 })
    }

    const formData = await request.formData()

    const headers = {}
    const auth = request.headers.get('authorization')
    if (auth) headers['authorization'] = auth

    const res = await fetch(`${BACKEND}/api/upload/file/${reportId}`, {
      method: 'PUT',
      headers,
      body: formData,
    })

    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    console.error('Error proxying file upload:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
