'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BRAND } from '../data/content.js'

export default function ExclusiveAccessPage() {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!code.trim()) {
      setError('Please enter your access code.')
      return
    }
    setLoading(true)
    setError('')

    const VALID_CODES = ['D22ura@894mater20health#<27>']
    if (VALID_CODES.includes(code.trim())) {
      localStorage.setItem('exclusiveAccess', 'true')
      router.push('/dashboard')
    } else {
      setError('Invalid code. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/video/hero-poster.jpg"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
          maxWidth: 'none',
          minHeight: '100%',
          minWidth: '100%',
          zIndex: 1,
          opacity: 0.7,
        }}
      >
        <source src="/assets/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.8) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: 600,
          width: '100%',
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 20,
            fontWeight: 500,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            marginBottom: 60,
            opacity: 0.9,
          }}
        >
          {BRAND.wordmark}
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(24px, 5vw, 36px)',
            fontWeight: 500,
            color: '#ffffff',
            lineHeight: 1.3,
            marginBottom: 40,
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}
        >
          Have exclusive access?<br />
          Enter your code below.
        </h1>

        {/* Input */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(''); }}
            placeholder=""
            disabled={loading}
            autoFocus
            style={{
              width: '100%',
              maxWidth: 480,
              padding: '20px 32px',
              fontSize: 18,
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              color: '#1a1a1a',
              background: '#ffffff',
              border: 'none',
              borderRadius: 50,
              outline: 'none',
              boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
              transition: 'box-shadow 0.2s ease',
            }}
            onFocus={(e) => { e.target.style.boxShadow = '0 4px 40px rgba(255,255,255,0.2)'; }}
            onBlur={(e) => { e.target.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)'; }}
          />

          {error && (
            <p style={{ color: '#ff6b6b', marginTop: 16, fontSize: 14, fontFamily: 'var(--font-display)' }}>
              {error}
            </p>
          )}
        </form>

        {/* Small helper text */}
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 12,
            color: 'rgba(255,255,255,0.5)',
            marginTop: 24,
            lineHeight: 1.5,
          }}
        >
          Contact your DuraMater representative if you do not have a code.
        </p>
      </div>
    </div>
  )
}
