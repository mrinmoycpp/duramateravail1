'use client'

import { useState } from 'react'
import { CHART, STAT_PILLS } from '../data/content.js'
import { useReveal } from '../hooks/hooks.js'

// --- Legacy capsule chart — KEPT for reference per request, no longer rendered ---
// eslint-disable-next-line no-unused-vars
function CapsuleChartLegacy() {
  const [age, setAge] = useState('30+')
  const data = CHART.groups[age]
  const h = (v) => `${Math.min(100, (v / CHART.yMax) * 100)}%`

  return (
    <div className="chart-card reveal">
      <div style={{ textAlign: 'center' }}>
        <div className="age-toggle">
          <button className={age === '30+' ? 'active' : ''} onClick={() => setAge('30+')}>Ages 30+</button>
          <button className={age === '18-30' ? 'active' : ''} onClick={() => setAge('18-30')}>Ages 18–30</button>
        </div>
      </div>

      <div className="chart-legend">
        <span><i className="lg-yet" />Yet to be found</span>
        <span><i className="lg-known" />Known cases</span>
        <span><i className="lg-deaths" />Annual deaths</span>
        <span><i className="lg-burden" />Burden with DuraMater</span>
      </div>

      <div className="chart">
        <div className="chart-yaxis">
          {CHART.ticks.map((t) => <span key={t}>{t} Cr</span>)}
        </div>
        <div className="chart-plot">
          <div className="chart-bars">
            {data.map((d) => (
              <div className="bar-group" key={d.label}>
                <div className="bar-stack">
                  <div className="bar bar-yet" style={{ height: h(d.yet) }} />
                  <div className="bar bar-known" style={{ height: h(d.known) }} />
                  <div className="bar bar-burden" style={{ height: h(d.burden) }} />
                  <div className="bar bar-deaths" style={{ height: h(d.deaths) }} />
                </div>
              </div>
            ))}
          </div>
          <div className="chart-xaxis">
            {data.map((d) => <span key={d.label}>{d.label}</span>)}
          </div>
        </div>
      </div>
    </div>
  )
}

// --- New, plain-language visual: how many Indians are diagnosed vs still hidden ---
function SimpleChart() {
  const [age, setAge] = useState('30+')
  const rows = CHART.groups[age].map((d) => {
    const total = d.known + d.yet
    return { ...d, total, pct: Math.round((d.yet / total) * 100) }
  })
  const max = Math.max(...rows.map((r) => r.total))

  return (
    <div className="chart-card reveal">
      <div style={{ textAlign: 'center' }}>
        <div className="age-toggle">
          <button className={age === '30+' ? 'active' : ''} onClick={() => setAge('30+')}>Ages 30+</button>
          <button className={age === '18-30' ? 'active' : ''} onClick={() => setAge('18-30')}>Ages 18–30</button>
        </div>
      </div>

      <p className="simple-intro">
        For every Indian who <em>knows</em> they're sick, many more don't. The pale part of each bar
        is how many are still undiagnosed — silently at risk.
      </p>

      <div className="simple-legend">
        <span><i className="sl-known" />Already diagnosed</span>
        <span><i className="sl-hidden" />Undiagnosed — silent</span>
      </div>

      <div className="simple-rows">
        {rows.map((r) => (
          <div className="simple-row" key={r.label}>
            <div className="sr-label">{r.label}</div>
            <div className="sr-track">
              <div className="sr-bar">
                <div className="sr-known" style={{ width: `${(r.known / max) * 100}%` }} />
                <div className="sr-hidden" style={{ width: `${(r.yet / max) * 100}%` }} />
              </div>
              <span className="sr-total">{r.total.toFixed(1)} Cr affected</span>
            </div>
            <div className="sr-stat"><b>{r.pct}%</b><span>don't know</span></div>
          </div>
        ))}
      </div>

      <p className="chart-foot">Figures in crore (Cr) of people. Pale = estimated undiagnosed; solid = already diagnosed.</p>
    </div>
  )
}

export default function Crisis() {
  const ref = useReveal()
  return (
    <section className="crisis section" id="why" ref={ref}>
      <span className="watermark" aria-hidden>WHY</span>
      <div className="container">
        <div className="crisis-head reveal">
          <span className="eyebrow">The Invisible Crisis</span>
          <h2>What you can't feel <em>is what harms you most.</em></h2>
        </div>
        <p className="crisis-body reveal">
          India's biggest health crisis isn't the diseases you know about. It's the ones silently
          building inside millions of people right now.
        </p>
        <p className="crisis-source reveal">
          Projections based on WHO risk-reduction guidelines and DPP Clinical Trial algorithms applied
          to ICMR baseline data. Sources: ICMR-INDIAB 2023, Lancet India, WHO India Country Profile 2024.
        </p>

        <div className="stat-pills reveal">
          {STAT_PILLS.map((s, i) => (
            <div className="stat-pill" key={i}>
              <span className="ico" aria-hidden>{s.icon}</span>
              <span><b>{s.text}</b>{s.src && <span className="src"> — {s.src}</span>}</span>
            </div>
          ))}
        </div>

        <SimpleChart />
      </div>
    </section>
  )
}
