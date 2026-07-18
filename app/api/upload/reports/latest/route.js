import { NextResponse } from 'next/server'

const globalKey = '__duramater_report_store__'
if (!globalThis[globalKey]) globalThis[globalKey] = new Map()
const reports = globalThis[globalKey]

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let latest = null
    for (const [, report] of reports) {
      if (!latest || report.createdAt > latest.createdAt) {
        latest = { ...report }
      }
    }

    if (!latest) {
      return NextResponse.json({ error: 'No reports found' }, { status: 404 })
    }

    return NextResponse.json({
      reportId: latest.reportId,
      fileName: latest.fileName || `report_${latest.reportId}.pdf`,
    })
  } catch (error) {
    console.error('Error fetching latest report:', error)
    return NextResponse.json({ error: 'Failed to fetch latest report' }, { status: 500 })
  }
}
