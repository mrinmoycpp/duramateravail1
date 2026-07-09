import { NextResponse } from 'next/server'
import { createRequire } from 'module'
import { join } from 'path'

const require = createRequire(join(process.cwd(), 'package.json'))
const { getReport, parseReport } = require('./app/api/lib/pdf-parser.cjs')

export async function GET(request, { params }) {
  try {
    const { reportId } = await params

    if (!reportId) {
      return NextResponse.json({ error: 'Report ID is required' }, { status: 400 })
    }

    const stored = getReport(reportId)
    const fileName = stored?.fileName || `report_${reportId}.pdf`

    const parsed = await parseReport(reportId)

    if (!parsed) {
      return NextResponse.json({
        fileName,
        reportDate: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        biomarkers: [],
        healthScores: [],
        riskFlags: [],
      })
    }

    parsed.fileName = fileName

    return NextResponse.json(parsed)
  } catch (error) {
    console.error('Error fetching upload result:', error)
    return NextResponse.json({ error: 'Failed to fetch result' }, { status: 500 })
  }
}
