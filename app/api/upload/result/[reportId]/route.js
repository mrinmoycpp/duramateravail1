import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { execFile } from 'child_process'
import { promisify } from 'util'

const execFileAsync = promisify(execFile)

const UPLOAD_DIR = path.join(process.cwd(), '.uploads')
const SCRIPT_PATH = path.join(process.cwd(), 'scripts', 'parse-pdf.js')

const globalKey = '__duramater_report_store__'
if (!globalThis[globalKey]) globalThis[globalKey] = new Map()
const reports = globalThis[globalKey]

const resultCache = new Map()

export async function GET(request, { params }) {
  try {
    const { reportId } = await params

    if (!reportId) {
      return NextResponse.json({ error: 'Report ID is required' }, { status: 400 })
    }

    if (resultCache.has(reportId)) {
      const cached = resultCache.get(reportId)
      return NextResponse.json(cached)
    }

    const stored = reports.get(reportId)
    const fileName = stored?.fileName || `report_${reportId}.pdf`

    const filePath = path.join(UPLOAD_DIR, `${reportId}.pdf`)
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ fileName, reportDate: new Date().toISOString(), updatedAt: new Date().toISOString(), biomarkers: [], healthScores: [], riskFlags: [] })
    }

    const { stdout } = await execFileAsync('node', [SCRIPT_PATH, filePath], { timeout: 30000 })
    const parsed = JSON.parse(stdout.trim())

    if (parsed.error) {
      console.error('PDF parse error:', parsed.error)
      return NextResponse.json({ fileName, reportDate: new Date().toISOString(), updatedAt: new Date().toISOString(), biomarkers: [], healthScores: [], riskFlags: [], parseError: parsed.error })
    }

    const result = {
      fileName,
      reportDate: new Date(stored?.createdAt || Date.now()).toISOString(),
      updatedAt: new Date().toISOString(),
      biomarkers: parsed.biomarkers || [],
      healthScores: parsed.healthScores || [],
      riskFlags: parsed.riskFlags || [],
    }

    resultCache.set(reportId, result)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching upload result:', error)
    return NextResponse.json({ error: 'Failed to fetch result' }, { status: 500 })
  }
}
