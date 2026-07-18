import { NextResponse } from 'next/server'

const BACKEND = 'https://api.duramaterhealth.com'

export async function POST(request) {
  const body = await request.json().catch(() => ({}))
  const auth = request.headers.get('authorization')

  const res = await fetch(`${BACKEND}/api/upload/url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(auth ? { Authorization: auth } : {}),
    },
    body: JSON.stringify(body),
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) return NextResponse.json(data, { status: res.status })

  const localUploadUrl = `/api/upload/file/${data.reportId}?bk=${encodeURIComponent(data.uploadUrl)}`

  return NextResponse.json({
    uploadUrl: localUploadUrl,
    reportId: data.reportId,
    fileKey: data.fileKey,
    expiresInSeconds: data.expiresInSeconds,
  })
}
