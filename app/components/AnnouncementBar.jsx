'use client'

export default function AnnouncementBar({ onJoinWaitlist }) {
  return (
    <div className="announce">
      <div className="container">
        <span className="muted">Introducing DuraMater:</span>
        <button className="announce-cta" onClick={onJoinWaitlist}>
          Join the Waitlist
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  )
}
