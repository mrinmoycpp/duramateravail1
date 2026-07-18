import { NextResponse } from 'next/server'

const bufKey = '__duramater_pdf_buffers__'
if (!globalThis[bufKey]) globalThis[bufKey] = new Map()
const pdfBuffers = globalThis[bufKey]

const globalKey = '__duramater_report_store__'
if (!globalThis[globalKey]) globalThis[globalKey] = new Map()
const reports = globalThis[globalKey]

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

    pdfBuffers.set(reportId, buffer)

    reports.set(reportId, { reportId, fileName: file.name, status: 'UPLOADED', createdAt: Date.now() })

    return NextResponse.json({ success: true, reportId })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
