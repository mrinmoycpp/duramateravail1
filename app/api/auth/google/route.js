import { NextResponse } from 'next/server'
import crypto from 'node:crypto'

function getOrigin(request) {
  // In production, use the request origin to avoid localhost redirects
  if (process.env.NODE_ENV === 'production') {
    return new URL(request.url).origin
  }
  return process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin
}

export async function GET(request) {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'Google OAuth is not configured. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.' },
      { status: 500 }
    )
  }

  const requestUrl = new URL(request.url)
  const mode = requestUrl.searchParams.get('mode') === 'register' ? 'register' : 'login'
  const redirect = requestUrl.searchParams.get('redirect') || '/dashboard'
  const nonce = crypto.randomBytes(16).toString('hex')
  const state = Buffer.from(JSON.stringify({ mode, redirect, nonce })).toString('base64url')

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${getOrigin(request)}/api/auth/google/callback`,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    prompt: 'select_account',
  })

  const response = NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`)
  response.cookies.set('google_oauth_state', nonce, {
    httpOnly: true,
    sameSite: 'lax',
    secure: requestUrl.protocol === 'https:',
    maxAge: 10 * 60,
    path: '/',
  })

  return response
}
