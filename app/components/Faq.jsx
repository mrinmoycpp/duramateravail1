'use client'

import { useState } from 'react'
import { FAQS } from '../data/content.js'
import { useReveal } from '../hooks/hooks.js'

export default function Faq() {
  const ref = useReveal()
  const [open, setOpen] = useState(0)
  return (
    <section className="faq section" id="faqs" ref={ref}>
      <div className="container reveal">
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div className="faq-item" key={f.q}>
                <button className="faq-q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                  {f.q}<span className="pm" aria-hidden>+</span>
                </button>
                <div className={`faq-a${isOpen ? ' open' : ''}`}>
                  <div className="inner">{f.a}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
