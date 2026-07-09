'use client'

import { useEffect, useState } from 'react'
import { BRAND } from '../data/content.js'

export default function Hero({ onStartTesting }) {
  // Pick the portrait video on phones, landscape on desktop — render only one.
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.matchMedia('(max-width: 700px)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 700px)')
    const on = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  const video = isMobile
    ? { src: '/assets/video/hero-mobile.mp4', poster: '/assets/video/hero-mobile-poster.jpg' }
    : { src: '/assets/video/hero.mp4', poster: '/assets/video/hero-poster.jpg' }

  return (
    <section className="hero" id="top">
      <video 
        key={video.src} 
        className="hero-video" 
        autoPlay 
        muted 
        loop 
        playsInline 
        poster={video.poster}
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
          opacity: 0.82
        }}
      >
        <source src={video.src} type="video/mp4" />
      </video>
      <div className="container">
        <div className="hero-content">
          <span className="hero-tag">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.5 2.5 4.5-5" />
            </svg>
            HSA/FSA Eligible
          </span>
          <p className="hero-tagline">Now Every Indian Can Have a Personal Health Strategy</p>
          <button className="btn btn-cream" onClick={onStartTesting}>Start Testing</button>
          <p className="hero-note">{BRAND.markers} advanced lab tests included</p>
        </div>
      </div>
    </section>
  )
}
