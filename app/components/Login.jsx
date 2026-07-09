"use client"

import { useEffect, useState } from 'react'
import { BRAND } from '../data/content.js'
import { useAuth } from '../hooks/useAuth.js'

export default function Login({ open, onClose }) {
  const { signInWithEmail, registerWithEmail, signInWithGoogle } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState({ state: 'idle', msg: '' })
  const [activeTab, setActiveTab] = useState('terms')
  const [termsAccepted, setTermsAccepted] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) {
      setEmail('')
      setPassword('')
      setName('')
      setStatus({ state: 'idle', msg: '' })
      setActiveTab('terms')
      return
    }
    const accepted = localStorage.getItem('termsAccepted') === 'true'
    setTermsAccepted(accepted)
    
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('error') === 'GoogleAuthFailed') {
      setStatus({ state: 'error', msg: 'Google Sign In failed. Please try again.' })
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    setActiveTab(accepted ? 'sign-in' : 'terms')
  }, [open])

  if (!open) return null

  const close = () => {
    onClose && onClose()
    setTimeout(() => { 
      setEmail('')
      setPassword('')
      setName('')
      setStatus({ state: 'idle', msg: '' }) 
    }, 300)
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) return
    setStatus({ state: 'loading', msg: '' })

    let error;
    if (activeTab === 'register') {
      const res = await registerWithEmail(email, password, name)
      error = res.error
    } else {
      const res = await signInWithEmail(email, password)
      error = res.error
    }

    if (error) {
      setStatus({ state: 'error', msg: error.message })
    } else {
      setStatus({ state: 'success', msg: '' })
      window.location.href = '/exclusive-access'
    }
  }

  const handleGoogleAuth = () => {
    if (!termsAccepted || status.state === 'loading') return
    setStatus({ state: 'loading', msg: '' })
    signInWithGoogle(activeTab === 'register' ? 'register' : 'login')
  }

  const handleAcceptTerms = () => {
    localStorage.setItem('termsAccepted', 'true')
    setTermsAccepted(true)
    setActiveTab('sign-in')
  }

  return (
    <div className="drawer-backdrop open" onClick={close} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="waitlist-card" onClick={(e) => e.stopPropagation()} style={{ position: 'relative', maxWidth: 640, width: '100%' }}>
        <button className="drawer-close" style={{ color: 'var(--ink)', position: 'absolute', top: 16, right: 18 }} onClick={close} aria-label="Close">×</button>

        <div className="tabs" style={{ padding: '0 24px 10px' }}>
          <button
            className={`${activeTab === 'sign-in' ? 'active' : ''} ${!termsAccepted ? 'disabled' : ''}`}
            disabled={!termsAccepted}
            onClick={() => termsAccepted && setActiveTab('sign-in')}
          >
            Sign in
          </button>
          <button
            className={`${activeTab === 'register' ? 'active' : ''} ${!termsAccepted ? 'disabled' : ''}`}
            disabled={!termsAccepted}
            onClick={() => termsAccepted && setActiveTab('register')}
          >
            Create Account
          </button>
          <button className={activeTab === 'terms' ? 'active' : ''} onClick={() => setActiveTab('terms')}>Terms</button>
        </div>

        {status.state === 'success' ? (
          <div className="success-box">
            <div className="check">✓</div>
            <h3>{activeTab === 'register' ? 'Account Created!' : 'Signed In Successfully'}</h3>
            <p className="hint">Redirecting to your dashboard...</p>
          </div>
        ) : (
          <>
            {(activeTab === 'sign-in' || activeTab === 'register') ? (
              <>
                <span className="wl-eyebrow">{BRAND.display}</span>
                <h2 className="wl-title">{activeTab === 'register' ? 'Create an Account' : 'Welcome Back'}</h2>
                <p className="wl-sub">Access your health dashboard, reports and personalised plan.</p>

                <form onSubmit={handleEmailSubmit}>
                  {activeTab === 'register' && (
                    <div className="field" style={{ marginBottom: 16 }}>
                      <label>Name</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" disabled={!termsAccepted} />
                    </div>
                  )}
                  <div className="field" style={{ marginBottom: 16 }}>
                    <label>Email</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" disabled={!termsAccepted} />
                  </div>
                  <div className="field">
                    <label>Password</label>
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" disabled={!termsAccepted} minLength={6} />
                  </div>
                  
                  {status.state === 'error' && <p className="form-msg err" style={{ marginTop: 12 }}>{status.msg}</p>}
                  
                  <button className="btn btn-green btn-block" style={{ marginTop: 24 }} disabled={status.state === 'loading' || !termsAccepted}>
                    {status.state === 'loading' ? 'Processing…' : (activeTab === 'register' ? 'Create Account' : 'Sign In')}
                  </button>
                </form>

                <div style={{ margin: '24px 0', textAlign: 'center', color: 'var(--sub)', fontSize: '0.9rem', position: 'relative' }}>
                  <hr style={{ border: 'none', borderTop: '1px solid var(--border)', position: 'absolute', top: '50%', width: '100%', margin: 0, zIndex: 0 }} />
                  <span style={{ background: 'var(--card-bg)', padding: '0 12px', position: 'relative', zIndex: 1 }}>OR</span>
                </div>

                <button 
                  className="btn btn-block" 
                  onClick={handleGoogleAuth}
                  disabled={!termsAccepted || status.state === 'loading'}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#fff', color: '#333', border: '1px solid #ddd' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  {status.state === 'loading' ? 'Redirecting...' : (activeTab === 'register' ? 'Sign up with Google' : 'Sign in with Google')}
                </button>
              </>
            ) : (
              <>
                <span className="wl-eyebrow">{BRAND.display}</span>
                <h2 className="wl-title">Terms & Conditions</h2>
                <p className="wl-sub">Review our terms before signing in.</p>
                <div style={{ padding: '18px 0' }}>
                  <p>
                    By continuing, you agree to our <a href="#" style={{ color: 'var(--ink)', textDecoration: 'underline' }}>Terms</a> and <a href="#" style={{ color: 'var(--ink)', textDecoration: 'underline' }}>Privacy Policy</a>.
                  </p>
                  <p>We use your email to create an account and store your preferences securely. Your data is protected according to our policies.</p>
                </div>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 16 }}>
                  <button className="btn btn-green" onClick={handleAcceptTerms}>Accept & continue</button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
