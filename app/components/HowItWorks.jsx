'use client'

import { HIW_CARDS } from '../data/content.js'
import { useReveal } from '../hooks/hooks.js'

export default function HowItWorks() {
  const ref = useReveal()

  return (
    <section className="hiw section" id="how-it-works" ref={ref}>
      <div className="container">
        <div className="hiw-head reveal">
          <h2>How it works</h2>
          <p>It starts with an advanced health check, then so much more.</p>
        </div>

        {/* normal grid: 3 cards on top row, 2 centered below */}
        <div className="hiw-grid reveal">
          {HIW_CARDS.map((c) => (
            <div className="hiw-card" key={c.n}>
              <div className="visual">
                <img src={c.img} alt={c.title} loading="lazy" />
              </div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
