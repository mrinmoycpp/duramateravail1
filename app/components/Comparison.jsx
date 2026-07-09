'use client'
'use client'

import { COMPARISON, BRAND } from '../data/content.js'
import { useReveal } from '../hooks/hooks.js'

export default function Comparison() {
  const ref = useReveal()
  return (
    <section className="compare section" ref={ref}>
      <div className="container">
        <div className="compare-head reveal">
          <h2>A wellcare team in your pocket for {BRAND.pricePerDay}/day</h2>
          <p>
            {BRAND.display} combines advanced lab testing, your complete medical history, wearable data
            and clinician-built protocols into one membership — the standard of care that private health
            programs charge several times more for.
          </p>
        </div>

        <div className="compare-wrap reveal">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Features</th>
                {COMPARISON.columns.map((c, i) => (
                  <th key={c} className={i === 0 ? 'col-dm' : ''}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.rows.map((r) => (
                <tr key={r.feature}>
                  <td>{r.feature}</td>
                  {r.values.map((v, i) => (
                    <td key={i} className={i === 0 ? 'col-dm' : ''}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="compare-note">* Indicative comparison for preventive healthcare services in India.</p>
      </div>
    </section>
  )
}
