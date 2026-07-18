import { NextResponse } from 'next/server'

export async function PUT(request, { params }) {
  try {
    const { reportId } = await params
    const url = new URL(request.url)
    const backendUrl = url.searchParams.get('bk')

    if (!backendUrl) {
      return NextResponse.json({ error: 'Missing backend upload URL' }, { status: 400 })
    }

    const formData = await request.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const auth = request.headers.get('authorization')

    const backendForm = new FormData()
    backendForm.append('file', file)

    const res = await fetch(backendUrl, {
      method: 'PUT',
      headers: { ...(auth ? { Authorization: auth } : {}) },
      body: backendForm,
    })

    const data = await res.json().catch(() => ({}))

    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
