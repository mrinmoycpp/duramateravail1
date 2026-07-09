'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BRAND, NAV_LINKS } from '../data/content.js'
import { useScrolled } from '../hooks/hooks.js'
import { useAuth } from '../hooks/useAuth.js'
import Login from './Login.jsx'

export default function Nav({ onStartTesting }) {
  const [open, setOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const scrolled = useScrolled(30)
  const { user } = useAuth()
  const router = useRouter()

  const go = (href) => {
    setOpen(false)
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      } else {
        router.push('/' + href)
      }
    } else {
      router.push(href)
    }
  }

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}${scrolled ? '' : ' on-dark'}`}>
        <div className="container">
          <a href="#top" className="wordmark" onClick={(e) => { e.preventDefault(); router.push('/') }}>
            {BRAND.wordmark}
          </a>

          <nav className="nav-links">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); go(l.href) }}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="nav-right">
            {user ? (
              <button className="btn btn-cream nav-cta" onClick={() => router.push('/dashboard')}>Dashboard</button>
            ) : (
              <>
                <button className="nav-login" onClick={() => setLoginOpen(true)}>Log in</button>
                <button className="btn btn-cream nav-cta" onClick={onStartTesting}>Start Testing</button>
              </>
            )}
            <button className="hamburger" aria-label="Open menu" onClick={() => setOpen(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className={`drawer-backdrop${open ? ' open' : ''}`} onClick={() => setOpen(false)} />
      <div className={`drawer${open ? ' open' : ''}`} role="dialog" aria-modal="true">
        <div className="drawer-head">
          <span className="wordmark">{BRAND.wordmark}</span>
          <button className="drawer-close" aria-label="Close menu" onClick={() => setOpen(false)}>×</button>
        </div>
        <div className="drawer-links">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); go(l.href) }}>{l.label}</a>
          ))}
        </div>
        <hr />
        {user ? (
          <button className="btn btn-cream btn-block" onClick={() => { setOpen(false); router.push('/dashboard') }}>Dashboard</button>
        ) : (
          <>
            <button className="btn btn-outline btn-block" onClick={() => { setOpen(false); setLoginOpen(true) }}>Log in</button>
            <button className="btn btn-cream btn-block" onClick={() => { setOpen(false); onStartTesting?.() }}>Start Testing</button>
          </>
        )}
      </div>

      <Login open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}
