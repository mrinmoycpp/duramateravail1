'use client'

import { useState } from 'react'
import { TEST_DETAIL } from '../data/content.js'

// Tabbed biomarker accordion (Heart Health / Liver Health / …). Lives on the
// dedicated "All tests" page, opened from the "See full list" button.
export default function BiomarkerDetail() {
  const [tab, setTab] = useState(0)
  const [openRow, setOpenRow] = useState(null)
  const group = TEST_DETAIL[tab]

  return (
    <div className="wwt-detail">
      <p className="detail-intro">
        Biomarkers are measurable indicators in your blood and other systems that reveal how your body is
        functioning — across hormones, metabolism, inflammation, heart health and more. We combine advanced
        lab testing with your lifestyle, medical history and wearable data so you understand what your results
        mean, why they matter, and what to do about them.
      </p>

      <div className="tabs">
        {TEST_DETAIL.map((d, i) => (
          <button key={d.group} className={i === tab ? 'active' : ''} onClick={() => { setTab(i); setOpenRow(null) }}>
            {d.group}
          </button>
        ))}
      </div>

      <h3 className="detail-title">{group.group}</h3>
      <div className="detail-list">
        {group.markers.map((m, i) => (
          <div key={m}>
            <div className="row">
              <span>{m}</span>
              <button aria-label="Toggle details" onClick={() => setOpenRow(openRow === i ? null : i)}>
                {openRow === i ? '−' : '+'}
              </button>
            </div>
            {openRow === i && (
              <p className="ans">
                {m} is measured as part of your {group.group.toLowerCase()} panel and scored against
                optimal ranges — not just the standard "normal/abnormal" cutoff — then explained in your report.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
