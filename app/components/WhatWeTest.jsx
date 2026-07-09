'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { TEST_CATEGORIES, BRAND } from '../data/content.js'
import { useReveal } from '../hooks/hooks.js'

function CategoryCard({ cat }) {
  return (
    <div className={`cat-card${cat.tint ? ' tint' : ''}`}>
      <div className="bg" style={{ backgroundImage: `url(${cat.texture})` }} />
      <div className="top">
        <h3>{cat.name}</h3>
        <span className="count">{cat.markers} markers</span>
      </div>
      <div className="chips">
        {cat.chips.map((c) => <span className="chip" key={c}>{c}</span>)}
        <span className="chip">+{cat.more} more</span>
      </div>
      <p className="cat-why">Why: {cat.why}</p>
    </div>
  )
}

export default function WhatWeTest() {
  const ref = useReveal()
  const trackRef = useRef(null)

  // Slide by one card width (with the gap) in either direction.
  const slide = (dir) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('.cat-card, .explore-card')
    const step = card ? card.offsetWidth + 18 : el.clientWidth / 3
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section className="wwt section" id="what-we-test" ref={ref} style={{position: 'relative', overflow:'hidden'}}>
      <video autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} src="/assets/video/wwt-bg.mp4" />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1 }} />
      <div className="container" style={{ position: 'relative',zIndex:2, color: 'white'}}>
        <div className="wwt-head reveal">
          <h2>
            Most annual physicals in India
          </h2>
        </div>

        <div className="cat-carousel-wrap reveal">
          <button className="cat-arrow left" aria-label="Previous" onClick={() => slide(-1)}>‹</button>
          <div className="cat-carousel" ref={trackRef}>
            {TEST_CATEGORIES.map((c) => <CategoryCard cat={c} key={c.key} />)}
            <div className="explore-card">
              <div>
                <h3>Explore All</h3>
                <p style={{ color: 'var(--ink-soft)', marginTop: 8 }}>{BRAND.markers} biomarkers tested across every major system.</p>
              </div>
              <Link className="btn btn-dark" href="/tests" style={{ alignSelf: 'flex-start' }}>See full list</Link>
            </div>
          </div>
          <button className="cat-arrow right" aria-label="Next" onClick={() => slide(1)}>›</button>
        </div>
      </div>
    </section>
  )
}
