'use client'

import { useEffect, useState } from 'react'
import { MEMBERSHIP_FEATURES, BRAND } from '../data/content.js'
import { useReveal } from '../hooks/hooks.js'

// Real Superpower marketing photos, brand name swapped to duramater.
const SLIDES = [
  { src: '/assets/slideshow/membership-1.jpg', alt: 'Your new health membership' },
  { src: '/assets/slideshow/membership-2.jpg', alt: 'Reviewing your health data' },
  { src: '/assets/slideshow/membership-3.jpg', alt: 'Your health, in your pocket' },
]

export default function Membership({ onStartTesting }) {
  const ref = useReveal()
  const [i, setI] = useState(0)
  const n = SLIDES.length

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % n), 4200)
    return () => clearInterval(t)
  }, [n])

  return (
    <section className="membership section" id="pricing" ref={ref}>
      <div className="container">
        <div className="mb-grid">
          <div className="mb-carousel reveal">
            <div className="mb-track" style={{ transform: `translateX(-${i * 100}%)` }}>
              {SLIDES.map((s) => (
                <div className="mb-slide" key={s.src}>
                  <img src={s.src} alt={s.alt} loading="lazy" />
                </div>
              ))}
            </div>
            <div className="mb-dots">
              {SLIDES.map((s, idx) => <i key={s.src} className={idx === i ? 'active' : ''} />)}
            </div>
          </div>

          <div className="reveal">
            <h2 className="mb-h">Your membership starts here</h2>
            <div className="mb-plan">{BRAND.display} Annual Membership</div>
            <div className="mb-price">
              <span className="amt">{BRAND.pricePerYear}</span>
              <span className="per">/ year</span>
            </div>
            <p className="mb-chai">That's {BRAND.pricePerDay} per day — less than a cup of chai outside.</p>

            <ul className="mb-feats">
              {MEMBERSHIP_FEATURES.map((f) => (
                <li key={f}><span className="tick">✓</span>{f}</li>
              ))}
            </ul>

            <button className="btn btn-green btn-block" style={{ marginTop: 26 }} onClick={onStartTesting}>
              Join Now →
            </button>
            <p className="mb-foot">No insurance required. No doctor's referral needed. Cancel anytime.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
