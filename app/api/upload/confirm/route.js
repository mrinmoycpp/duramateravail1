import { NextResponse } from 'next/server'

const globalKey = '__duramater_report_store__'
if (!globalThis[globalKey]) globalThis[globalKey] = new Map()
const reports = globalThis[globalKey]

export async function POST(request) {
  try {
    const body = await request.json()
    const { reportId } = body

    if (!reportId) {
      return NextResponse.json({ error: 'Report ID is required' }, { status: 400 })
    }

    const existing = reports.get(reportId) || {}
    reports.set(reportId, { ...existing, reportId, status: 'COMPLETED', createdAt: existing.createdAt || Date.now() })

    return NextResponse.json({ success: true, reportId })
  } catch (error) {
    console.error('Error confirming upload:', error)
    return NextResponse.json({ error: 'Failed to confirm upload' }, { status: 500 })
  }
}
