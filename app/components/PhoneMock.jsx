'use client'

// Code-built phone mockups for the "How it works" cards (no branded images).

function Frame({ children, dark }) {
  return (
    <div className="phone">
      <div className="notch" />
      <div className="phone-screen" style={dark ? { padding: 0 } : undefined}>{children}</div>
    </div>
  )
}

const ORGANS = [
  { name: 'Heart', c: '#b4543f' },
  { name: 'Gut', c: '#c98a3b' },
  { name: 'Liver', c: '#6f8a5f' },
  { name: 'Hormones', c: '#8a6f9e' },
  { name: 'Kidney', c: '#4a78a8' },
  { name: 'Metabolism', c: '#d0a93f' },
]

export default function PhoneMock({ type }) {
  if (type === 'data') {
    return (
      <Frame>
        <div className="phone-row">
          <span className="muted-sm">9:41</span>
          <span className="phone-title" style={{ fontSize: 12 }}>DuraMater</span>
          <span className="muted-sm">▮▮</span>
        </div>
        <div className="phone-title" style={{ marginTop: 14 }}>Your Data</div>
        <div className="muted-sm">120 biomarkers</div>
        <ul className="mini-list">
          {ORGANS.map((o) => (
            <li key={o.name}>
              <span className="dot-ico" style={{ background: o.c }}>✓</span>{o.name}
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', gap: 18, marginTop: 12 }}>
          <div><div className="score-big">82<span style={{ fontSize: 12 }}>/100</span></div><div className="muted-sm">health score</div></div>
          <div><div className="score-big">24</div><div className="muted-sm">biological age</div></div>
        </div>
      </Frame>
    )
  }

  if (type === 'bioage') {
    return (
      <Frame dark>
        <div className="bioage-screen" style={{ padding: 16 }}>
          <div className="ring">
            <div className="score-big">30.3</div>
            <div style={{ fontSize: 9, opacity: 0.8 }}>biological age</div>
          </div>
          <p style={{ textAlign: 'center', marginTop: 16, fontSize: 12 }}>Your biological age is 30.3</p>
          <p style={{ textAlign: 'center', fontSize: 9, opacity: 0.7 }}>10.3 years younger than your chronological age</p>
        </div>
      </Frame>
    )
  }

  if (type === 'score') {
    return (
      <Frame>
        <div className="phone-title" style={{ marginTop: 6 }}>Welcome, Manthan</div>
        <div className="muted-sm">Record from 29 Apr 2028</div>
        <div style={{ background: 'linear-gradient(160deg,#20301a,#0c130a)', color: '#fff', borderRadius: 12, padding: 14, marginTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="score-big" style={{ fontSize: 40 }}>91</div>
            <div><div style={{ fontSize: 11 }}>DuraMater Score</div><div style={{ fontSize: 9, opacity: 0.8 }}>out of 100 · 33 markers</div></div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
          {['Upload', 'Records', 'Reset'].map((b) => (
            <span key={b} style={{ flex: 1, textAlign: 'center', border: '1px solid #e2e0d6', borderRadius: 8, padding: '7px 0', fontSize: 10 }}>{b}</span>
          ))}
        </div>
      </Frame>
    )
  }

  if (type === 'records') {
    return (
      <Frame>
        <div className="phone-title" style={{ marginTop: 6, fontSize: 14 }}>Health Records</div>
        <div className="muted-sm">All in one secure place</div>
        {['Blood Panel — 05/2028', 'Cardiology Report', 'Imaging — Full Body', 'Past Lab Reports'].map((r) => (
          <div className="records-card" key={r}>
            <span className="fldr" />
            <div style={{ fontSize: 10 }}>{r}<div className="muted-sm">🔒 secure</div></div>
          </div>
        ))}
      </Frame>
    )
  }

  // appointment (default)
  return (
    <>
      <img className="appt-photo" src="/assets/photos/lifestyle1.jpg" alt="" />
      <div className="appt-chip">
        <span className="dot-ico" style={{ background: '#6f8a5f', width: 22, height: 22 }}>✓</span>
        <div style={{ fontSize: 12 }}>
          <b>Appointment confirmed</b>
          <div style={{ opacity: 0.8, fontSize: 10 }}>Fri, 11:00am · NABL Lab / Home</div>
        </div>
      </div>
    </>
  )
}
