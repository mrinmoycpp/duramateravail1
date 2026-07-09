'use client'

import { CONDITIONS } from '../data/content.js'
import { useReveal } from '../hooks/hooks.js'

export default function Conditions() {
  const ref = useReveal()
  return (
    <section className="conditions section" ref={ref}>
      <div className="container">
        <div className="conditions-head reveal">
          <span className="eyebrow">Early Detection</span>
          <h2>Catch 40+ conditions<br />before they catch you.</h2>
          <p>
            Most conditions build silently for years. DuraMater screens for the risks that matter most
            to Indians — so you can act while it's still reversible.
          </p>
        </div>
        <div className="conditions-grid reveal">
          {CONDITIONS.map((c) => (
            <span className="condition-pill" key={c}>{c}</span>
          ))}
          <span className="condition-pill more">+ many more</span>
        </div>
      </div>
    </section>
  )
}
