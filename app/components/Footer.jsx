'use client'

import { useState } from 'react'
import { BRAND } from '../data/content.js'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ state: 'idle', msg: '' })

  const submit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'loading', msg: '' })
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || 'Please try again.')
      setStatus({ state: 'done', msg: data.message })
      setEmail('')
    } catch (err) {
      setStatus({ state: 'error', msg: err.message })
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-signup">
            <div className="wordmark">{BRAND.wordmark}</div>
            <div className="tagline">NABL Certified Labs · Secure Data · Built on India's DPDP Framework</div>
            <p>Sign up for the latest in personalised health, insights, and updates.</p>
            <form className="signup-row" onSubmit={submit}>
              <input
                type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                aria-label="Email address"
              />
              <button className="btn btn-cream" type="submit" disabled={status.state === 'loading'}>
                {status.state === 'loading' ? '…' : 'Get Connected'}
              </button>
            </form>
            {status.state === 'done' && <p className="form-msg ok" style={{ color: 'var(--gold)' }}>{status.msg}</p>}
            {status.state === 'error' && <p className="form-msg err" style={{ color: '#e08a78' }}>{status.msg}</p>}

            <div className="app-badges">
              <span className="app-badge"><span className="ico">▶</span><span><small>Get it on</small><b>Google Play</b></span></span>
              <span className="app-badge"><span className="ico"></span><span><small>Download on the</small><b>App Store</b></span></span>
            </div>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <a href="#what-we-test">What We Test</a>
            <a href="#pricing">Pricing</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#faqs">FAQs</a>
          </div>

          <div className="footer-col">
            <h4>Follow Us</h4>
            <a href="https://www.linkedin.com/company/duramaterhealth/posts/" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              LinkedIn
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} DuraMater Health. All rights reserved.</span>
          <span className="legal">
            <a href="#">Terms</a><a href="#">Privacy Policy</a><a href="#">Medical Consent</a><a href="#">DPDP Compliance</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
