import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { fileName, mimeType, fileSizeBytes } = body

    if (!fileName) {
      return NextResponse.json({ error: 'File name is required' }, { status: 400 })
    }

    const reportId = `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const uploadUrl = `/api/upload/file/${reportId}`

    return NextResponse.json({
      uploadUrl,
      reportId
    })
  } catch (error) {
    console.error('Error generating upload URL:', error)
    return NextResponse.json({ error: 'Failed to generate upload URL' }, { status: 500 })
  }
}
