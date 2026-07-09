import { NextResponse } from 'next/server'
import { createRequire } from 'module'
import { join } from 'path'

const require = createRequire(join(process.cwd(), 'package.json'))
const { storeReport, getReport } = require('./app/api/lib/pdf-parser.cjs')

export async function POST(request) {
  try {
    const body = await request.json()
    const { reportId } = body

    if (!reportId) {
      return NextResponse.json({ error: 'Report ID is required' }, { status: 400 })
    }

    const existing = getReport(reportId)
    storeReport(reportId, { ...existing, reportId, status: 'COMPLETED' })

    return NextResponse.json({ success: true, reportId })
  } catch (error) {
    console.error('Error confirming upload:', error)
    return NextResponse.json({ error: 'Failed to confirm upload' }, { status: 500 })
  }
}
