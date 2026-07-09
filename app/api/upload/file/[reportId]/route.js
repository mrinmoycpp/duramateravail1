import { NextResponse } from 'next/server'
import { createRequire } from 'module'
import { join } from 'path'

const require = createRequire(join(process.cwd(), 'package.json'))
const { saveFile, storeReport } = require('./app/api/lib/pdf-parser.cjs')

export async function PUT(request, { params }) {
  try {
    const { reportId } = await params

    const formData = await request.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    saveFile(reportId, buffer)
    storeReport(reportId, { reportId, fileName: file.name, status: 'UPLOADED' })

    return NextResponse.json({ success: true, reportId })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
