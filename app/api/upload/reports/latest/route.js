import { NextResponse } from 'next/server'
import { createRequire } from 'module'
import { join } from 'path'

const require = createRequire(join(process.cwd(), 'package.json'))
const { getLatestReport } = require('./app/api/lib/pdf-parser.cjs')

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const latest = getLatestReport()

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
