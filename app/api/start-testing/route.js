import { NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'

const DATA_DIR = path.join(process.cwd(), 'server', 'data')
fs.mkdirSync(DATA_DIR, { recursive: true })

function appendRecord(file, record) {
  const fp = path.join(DATA_DIR, file)
  let arr = []
  try {
    arr = JSON.parse(fs.readFileSync(fp, 'utf8'))
    if (!Array.isArray(arr)) arr = []
  } catch { arr = [] }
  const entry = { ...record, id: arr.length + 1, createdAt: new Date().toISOString() }
  arr.push(entry)
  fs.writeFileSync(fp, JSON.stringify(arr, null, 2))
  return entry
}

const isEmail = (v) => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

async function forwardLead(kind, data) {
  if (!process.env.SHEET_WEBHOOK_URL) return
  try {
    await fetch(process.env.SHEET_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, ...data }),
    })
  } catch (e) {
    console.error('[sheet]', e.message)
  }
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}))
  const { patient = {}, location = {}, schedule = {} } = body

  if (!patient.firstName || !patient.lastName) {
    return NextResponse.json({ ok: false, error: 'First and last name are required.' }, { status: 400 })
  }
  if (patient.email && !isEmail(patient.email)) {
    return NextResponse.json({ ok: false, error: 'Email looks invalid.' }, { status: 400 })
  }

  const entry = appendRecord('appointments.json', { patient, location, schedule })
  await forwardLead('appointment booking', {
    email: patient.email || '',
    name: `${patient.firstName} ${patient.lastName}`.trim(),
    phone: patient.phone || '',
    city: location.city || '',
    details: JSON.stringify({ patient, location, schedule }),
  })

  return NextResponse.json({ ok: true, id: entry.id, message: 'Appointment request received.' })
}
