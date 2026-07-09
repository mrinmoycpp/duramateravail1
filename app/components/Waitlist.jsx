'use client'

import { useEffect, useState } from 'react'
import { BRAND } from '../data/content.js'
import { submitLead } from '../lib/lead.js'

const WAITLIST_COUNT = '2,400+' // social proof — adjust anytime

export default function Waitlist({ open, onClose }) {
  const [form, setForm] = useState({ email: '', name: '', phone: '', city: '' })
  const [status, setStatus] = useState({ state: 'idle', msg: '' })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'loading', msg: '' })
    try {
      const data = await submitLead({ ...form, source: 'waitlist-modal' })
      if (!data.ok) throw new Error(data.error || 'Please try again.')
      setStatus({ state: 'done', msg: data.message })
    } catch (err) {
      setStatus({ state: 'error', msg: err.message })
    }
  }

  const close = () => {
    onClose()
    setTimeout(() => { setForm({ email: '', name: '', phone: '', city: '' }); setStatus({ state: 'idle', msg: '' }) }, 300)
  }

  return (
    <div className="drawer-backdrop open" onClick={close} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="waitlist-card" onClick={(e) => e.stopPropagation()}>
        <button className="drawer-close" style={{ color: 'var(--ink)', position: 'absolute', top: 16, right: 18 }} onClick={close} aria-label="Close">×</button>

        {status.state === 'done' ? (
          <div className="success-box">
            <div className="check">✓</div>
            <h3>You're on the list!</h3>
            <p className="hint">{status.msg} We'll notify you the moment we launch{form.city ? ` in ${form.city}` : ' in your city'}.</p>
            <button className="btn btn-green" onClick={close}>Done</button>
          </div>
        ) : (
          <>
            <span className="wl-eyebrow">Introducing {BRAND.display}</span>
            <h2 className="wl-title">Join the waitlist.</h2>
            <p className="wl-sub">
              Be first in line. Waitlist members get <b>early access</b> and <b>launch pricing</b> when
              we go live in your city.
            </p>

            <form onSubmit={submit}>
              <div className="field">
                <label>Email *</label>
                <input type="email" required value={form.email} onChange={set('email')} placeholder="you@email.com" />
              </div>
              <div className="field-row">
                <div className="field"><label>Name</label><input value={form.name} onChange={set('name')} placeholder="Your name" /></div>
                <div className="field"><label>Phone</label><input value={form.phone} onChange={set('phone')} placeholder="+91 ..." /></div>
              </div>
              <div className="field"><label>City</label><input value={form.city} onChange={set('city')} placeholder="e.g. Ahmedabad" /></div>

              {status.state === 'error' && <p className="form-msg err">{status.msg}</p>}

              <button className="btn btn-green btn-block" style={{ marginTop: 18 }} disabled={status.state === 'loading'}>
                {status.state === 'loading' ? 'Joining…' : 'Join the waitlist →'}
              </button>
            </form>

            <p className="wl-proof">Join <b>{WAITLIST_COUNT}</b> Indians already on the list.</p>
          </>
        )}
      </div>
    </div>
  )
}
