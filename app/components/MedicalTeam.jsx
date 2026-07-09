'use client'

import { TEAM, TEAM_INSTITUTES } from '../data/content.js'
import { useReveal } from '../hooks/hooks.js'

export default function MedicalTeam() {
  const ref = useReveal()
  return (
    <section className="team section" id="team" ref={ref}>
      <div className="container">
        <div className="team-head reveal">
          <span className="eyebrow">The Clinical Team</span>
          <h2>Every report, reviewed by a doctor.</h2>
          <p>
            DuraMater isn't an app spitting out numbers. Every result is reviewed by certified MBBS/MD
            clinicians who flag what needs attention — and explain what it means for you.
          </p>
        </div>

        <div className="team-grid reveal">
          {TEAM.map((m) => (
            <div className="team-card" key={m.name}>
              <div className="avatar" aria-hidden>{m.initials}</div>
              <h3>{m.name}</h3>
              <div className="team-role">{m.role}</div>
              <div className="team-cred">{m.cred}</div>
            </div>
          ))}
        </div>

        <div className="team-institutes reveal">
          <span className="institutes-label">Trained at India's leading institutes</span>
          <div className="institutes-row">
            {TEAM_INSTITUTES.map((i) => <span key={i}>{i}</span>)}
          </div>
        </div>
      </div>
    </section>
  )
}
