import { NextResponse } from 'next/server'

function getOrigin(request) {
  // In production, use the request origin to avoid localhost redirects
  if (process.env.NODE_ENV === 'production') {
    return new URL(request.url).origin
  }
  return process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin
}

function readState(value) {
  try {
    return JSON.parse(Buffer.from(value, 'base64url').toString('utf8'))
  } catch {
    return null
  }
}

function redirectWithError(request, error = 'GoogleAuthFailed') {
  const url = new URL('/', getOrigin(request))
  url.searchParams.set('error', error)
  return NextResponse.redirect(url)
}

export async function GET(request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const state = readState(requestUrl.searchParams.get('state') || '')
  const storedNonce = request.cookies.get('google_oauth_state')?.value

  if (!code || !state || !storedNonce || state.nonce !== storedNonce) {
    return redirectWithError(request)
  }

  try {
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID || '',
        client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
        redirect_uri: `${getOrigin(request)}/api/auth/google/callback`,
        grant_type: 'authorization_code',
      }),
    })

    if (!tokenRes.ok) return redirectWithError(request)

    const { access_token } = await tokenRes.json()
    const userRes = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    })

    if (!userRes.ok) return redirectWithError(request)

    const profile = await userRes.json()
    const user = {
      id: profile.sub,
      email: profile.email,
      name: profile.name || profile.email,
      picture: profile.picture,
      provider: 'google',
    }

    const redirectPath = state.redirect && state.redirect.startsWith('/') ? state.redirect : '/dashboard'
    const redirectUrl = new URL(redirectPath, getOrigin(request))
    redirectUrl.searchParams.set('user', Buffer.from(JSON.stringify(user)).toString('base64url'))

    const response = NextResponse.redirect(redirectUrl)
    response.cookies.delete('google_oauth_state')
    return response
  } catch {
    return redirectWithError(request)
  }
}
