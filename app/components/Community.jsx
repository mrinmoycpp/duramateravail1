'use client'

import { useReveal } from '../hooks/hooks.js'

export default function Community() {
  const ref = useReveal()
  return (
    <section className="community section" id="community" ref={ref}>
      <div className="container">
        <div className="community-head reveal">
          <span className="eyebrow">The Architecture of Health</span>
          <h2 style={{ marginTop: 14 }}>Clinical mastery meets computation.</h2>
          <p>
            True preventative health requires clinical mastery powered by kinetic data intelligence.
          </p>
        </div>
        <div className="founder reveal" style={{ backgroundImage: 'url(/assets/team/manthan.jpg)' }}>
          <span className="role">Doctor, MBBS</span>
          <h3>Dr. Manthan Patel</h3>
          <p>Engineering the clinical protocols and intervention models for hyper-personalized longevity.</p>
          <a href="https://www.linkedin.com/in/dr-manthan-patel-685997272/" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '14px', fontSize: '13px', fontWeight: 500, color: 'var(--green-bright)', textDecoration: 'underline' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
