import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { fileName, mimeType, fileSizeBytes } = body

    if (!fileName) {
      return NextResponse.json({ error: 'File name is required' }, { status: 400 })
    }

    // Generate a unique report ID
    const reportId = `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // For now, we'll use a simple upload URL that points to our own API
    // In production, this would be a presigned S3 URL
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
