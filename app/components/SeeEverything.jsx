'use client'

import { BRAND } from '../data/content.js'
import { useReveal } from '../hooks/hooks.js'

export default function SeeEverything({ onStartTesting }) {
  const ref = useReveal()
  return (
    <section className="see section" ref={ref}>
      <div className="container reveal">
        <h2>See Everything.<br />Change Everything.</h2>
        <p>
          Your annual physical tests 14 markers and sends you home. {BRAND.display} tests {BRAND.markers},
          connects your wearables and medical history, and gives you a 100-day plan built from all of it.
          {' '}{BRAND.pricePerDay}/day.
        </p>
        <button className="btn btn-cream" onClick={onStartTesting}>Start Testing</button>
        <p className="note">Cancel anytime · Home sample collection available</p>
      </div>
    </section>
  )
}
