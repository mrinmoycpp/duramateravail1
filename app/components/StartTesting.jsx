'use client'

import { useState } from 'react'
import { BRAND } from '../data/content.js'
import { emailViaWeb3Forms } from '../lib/lead.js'

const STEPS = ['Patient', 'Location', 'Schedule']
const TIME_SLOTS = ['7:00–9:00 AM', '9:00–11:00 AM', '11:00 AM–1:00 PM', '4:00–6:00 PM']

export default function StartTesting({ open, onClose }) {
  const [step, setStep] = useState(0)
  const [patient, setPatient] = useState({ firstName: '', lastName: '', dob: '', sex: '', email: '', phone: '' })
  const [location, setLocation] = useState({ mode: 'home', address: '', city: '', pincode: '' })
  const [schedule, setSchedule] = useState({ date: '', slot: '' })
  const [status, setStatus] = useState({ state: 'idle', msg: '' })

  if (!open) return null

  const setP = (k) => (e) => setPatient({ ...patient, [k]: e.target.value })
  const setL = (k) => (e) => setLocation({ ...location, [k]: e.target.value })
  const setS = (k) => (e) => setSchedule({ ...schedule, [k]: e.target.value })

  const canNext =
    step === 0
      ? patient.firstName && patient.lastName && patient.dob && patient.sex
      : step === 1
        ? location.city && location.pincode && (location.mode === 'lab' || location.address)
        : schedule.date && schedule.slot

  const submit = async () => {
    setStatus({ state: 'loading', msg: '' })
    try {
      const res = await fetch('/api/start-testing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patient, location, schedule }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || 'Something went wrong.')
      // email the appointment to the team (client-side Web3Forms, like the waitlist)
      const name = `${patient.firstName} ${patient.lastName}`.trim()
      emailViaWeb3Forms(`New DuraMater appointment: ${name}`, {
        name, email: patient.email, phone: patient.phone, city: location.city,
        dob: patient.dob, sex: patient.sex,
        collection: location.mode, address: location.address, pincode: location.pincode,
        date: schedule.date, slot: schedule.slot,
      })
      setStatus({ state: 'done', msg: data.message })
    } catch (err) {
      setStatus({ state: 'error', msg: err.message })
    }
  }

  const close = () => {
    onClose()
    setTimeout(() => { setStep(0); setStatus({ state: 'idle', msg: '' }) }, 300)
  }

  return (
    <div className="drawer-backdrop open" onClick={close} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflowY: 'auto', padding: '40px 16px' }}>
      <div className="start" onClick={(e) => e.stopPropagation()} style={{ background: 'var(--cream)', borderRadius: 'var(--radius)', maxWidth: 1040, width: '100%', padding: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span className="wordmark" style={{ color: 'var(--ink)' }}>{BRAND.wordmark}</span>
          <button className="drawer-close" style={{ color: 'var(--ink)' }} onClick={close} aria-label="Close">×</button>
        </div>

        <div className="start-grid">
          <div>
            <h2>Secure your appointment.</h2>
            <p className="lead">
              A certified phlebotomist arrives at your home or office. A quick, painless draw — comprehensive
              results and your 100-day protocol delivered in 72 hours.
            </p>
            <div className="start-steps">
              {[
                ['120+ Biomarkers Analyzed', 'From foundational hormones to advanced cardiovascular and cellular-aging metrics.'],
                ['In-Home Collection', 'NABL-certified professionals collect your sample from the comfort of home.'],
                ['Actionable AI Protocol', "We don't just give you numbers — we give you a daily plan for nutrition, supplements and lifestyle."],
              ].map(([t, d], i) => (
                <div className="start-step" key={t}>
                  <span className="n">{i + 1}</span>
                  <div><b>{t}</b><p>{d}</p></div>
                </div>
              ))}
            </div>
            <div className="due">
              <div className="due-row"><span>Total Due Today</span><b>₹0</b></div>
              <small>Payment is collected securely after your sample is drawn and successfully processed at our lab.</small>
            </div>
          </div>

          <div className="form-card">
            {status.state === 'done' ? (
              <div className="success-box">
                <div className="check">✓</div>
                <h3>You're booked!</h3>
                <p className="hint">{status.msg} We'll confirm your slot over email and SMS shortly.</p>
                <button className="btn btn-green" onClick={close}>Done</button>
              </div>
            ) : (
              <>
                <div className="form-tabs">
                  {STEPS.map((s, i) => (
                    <button key={s} className={i === step ? 'active' : ''} disabled={i > step} onClick={() => i < step && setStep(i)}>{s}</button>
                  ))}
                </div>

                {step === 0 && (
                  <>
                    <h3>Who is this test for?</h3>
                    <p className="hint">Enter your legal details as they appear on your ID.</p>
                    <div className="field-row">
                      <div className="field"><label>First name</label><input value={patient.firstName} onChange={setP('firstName')} placeholder="Jane" /></div>
                      <div className="field"><label>Last name</label><input value={patient.lastName} onChange={setP('lastName')} placeholder="Doe" /></div>
                    </div>
                    <div className="field-row">
                      <div className="field"><label>Date of birth</label><input type="date" value={patient.dob} onChange={setP('dob')} /></div>
                      <div className="field"><label>Biological sex</label>
                        <select value={patient.sex} onChange={setP('sex')}>
                          <option value="">Select</option><option>Female</option><option>Male</option><option>Intersex</option>
                        </select>
                      </div>
                    </div>
                    <div className="field"><label>Email</label><input type="email" value={patient.email} onChange={setP('email')} placeholder="you@email.com" /></div>
                    <div className="field"><label>Phone</label><input value={patient.phone} onChange={setP('phone')} placeholder="+91 ..." /></div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <h3>Where should we collect?</h3>
                    <p className="hint">Home collection is available in select cities.</p>
                    <div className="field"><label>Collection mode</label>
                      <select value={location.mode} onChange={setL('mode')}>
                        <option value="home">Home collection</option><option value="lab">Visit a NABL lab</option>
                      </select>
                    </div>
                    {location.mode === 'home' && (
                      <div className="field"><label>Address</label><input value={location.address} onChange={setL('address')} placeholder="Flat, street, area" /></div>
                    )}
                    <div className="field-row">
                      <div className="field"><label>City</label><input value={location.city} onChange={setL('city')} placeholder="Ahmedabad" /></div>
                      <div className="field"><label>Pincode</label><input value={location.pincode} onChange={setL('pincode')} placeholder="380001" /></div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h3>Pick a time.</h3>
                    <p className="hint">Choose a date and a collection window.</p>
                    <div className="field"><label>Preferred date</label><input type="date" value={schedule.date} onChange={setS('date')} /></div>
                    <div className="field"><label>Time slot</label>
                      <select value={schedule.slot} onChange={setS('slot')}>
                        <option value="">Select a slot</option>
                        {TIME_SLOTS.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                  </>
                )}

                {status.state === 'error' && <p className="form-msg err">{status.msg}</p>}

                <div className="form-actions">
                  {step > 0 && <button className="btn btn-dark" onClick={() => setStep(step - 1)}>Back</button>}
                  {step < 2
                    ? <button className="btn btn-green btn-block" disabled={!canNext} onClick={() => setStep(step + 1)}>Continue</button>
                    : <button className="btn btn-green btn-block" disabled={!canNext || status.state === 'loading'} onClick={submit}>
                        {status.state === 'loading' ? 'Booking…' : 'Confirm appointment'}
                      </button>}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
