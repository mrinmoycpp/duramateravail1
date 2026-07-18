import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  try {
    const { reportId } = await params

    if (!reportId) {
      return NextResponse.json({ error: 'Report ID is required' }, { status: 400 })
    }

    return NextResponse.json({
      status: 'COMPLETED',
      reportId
    })
  } catch (error) {
    console.error('Error checking upload status:', error)
    return NextResponse.json({ error: 'Failed to check status' }, { status: 500 })
  }
}
