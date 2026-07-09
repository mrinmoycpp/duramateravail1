  'use client'

  import { PRESS } from '../data/content.js'

  export default function PressStrip() {
    // Duplicate the list so the marquee loops seamlessly.
    const items = [...PRESS, ...PRESS]
    return (
      <section className="press">
        <div className="container">
          <p className="press-label">Early-Detection of</p>
        </div>
        <div className="press-marquee" aria-hidden>
          <div className="press-track">
            {items.map((p, i) => <span className="press-logo" key={i}>{p}</span>)}
          </div>
        </div>
      </section>
    )
  }
