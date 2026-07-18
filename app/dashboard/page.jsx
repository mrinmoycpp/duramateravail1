'use client'
export const dynamic = 'force-dynamic'

import { useMemo, useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BRAND } from '../data/content.js'
import { STATUS_META } from '../data/dashboard.js'
import { useAuth } from '../hooks/useAuth.js'

const API = ''



function Sparkline({ history, color }) {
  const w = 84, h = 28, pad = 3
  const min = Math.min(...history), max = Math.max(...history)
  const span = max - min || 1
  const pts = history.map((v, i) => {
    const x = pad + (i / (history.length - 1)) * (w - pad * 2)
    const y = h - pad - ((v - min) / span) * (h - pad * 2)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  const last = pts[pts.length - 1].split(',')
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden>
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r="2.6" fill={color} />
    </svg>
  )
}

/* Sidebar */
const SIDE_MENU = [
  { id: 'Overview', label: 'Home', icon: '⊞' },
  { id: 'Plan',      label: 'Plan',       icon: '☰' },
  { id: 'Services',  label: 'Services',   icon: '✦' },
  { id: 'Reports',   label: 'Reports',    icon: '📋' },
  { id: 'Community', label: 'Community',  icon: '🤝' },
]
const SIDE_CONNECT = []
const SIDE_BOTTOM = []

/* Plan page */
function PlanPage() {
  return (
    <div className="dm-page">
      <h1 className="dm-page-title">Your plan</h1>
      <p className="dm-page-sub">Personalised recommendations based on your latest results</p>
      <div className="dm-pending-banner">
        <span className="dm-pending-dot" />
        <span>Pending action — book your consultation before May 19, 2025</span>
      </div>

      <div className="dm-plan-grid">
        {[{ title: 'Protocol plan', desc: 'Your personalised health protocol is ready. Book a consultation with your Duramater physician to walk through next steps.', cta: '🔒 Coming soon', dark: true }].map(c => (
          <div key={c.title} className={`dm-plan-card${c.dark ? ' dm-plan-dark' : ''}`}>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
            <button className="dm-plan-btn" disabled={c.cta && c.cta.includes('Coming soon')}>{c.cta}</button>
          </div>
        ))}
      </div>

      <div className="dm-plan-section">
        <h2 className="dm-plan-section-title">Action plan</h2>
        <div className="dm-plan-grid">
          {[
            { title: 'Food plan', desc: 'Personalised dietary guidance to support your biomarkers, metabolic health, and overall longevity goals.', cta: '🔒 Coming soon' },
            { title: 'Supplementary plan', desc: 'Recommended supplements and timing to support your recovery, nutrient balance, and biological age improvement.', cta: '🔒 Coming soon' },
          ].map(c => (
            <div key={c.title} className="dm-plan-card">
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <button className="dm-plan-btn" disabled>{c.cta}</button>
            </div>
          ))}
        </div>
      </div>

      <div className="dm-progress-card">
        <h3>Protocol progress</h3>
        {[{ label: 'LDL reduction plan', pct: 78, color: '#3ecf8e' }, { label: 'Vitamin D supplementation', pct: 45, color: '#d8a93a' }, { label: 'Uric acid dietary protocol', pct: 30, color: '#d56aa6' }].map(p => (
          <div key={p.label} className="dm-prog-item">
            <div className="dm-prog-meta"><span>{p.label}</span><span>{p.pct}%</span></div>
            <div className="dm-prog-bar"><div className="dm-prog-fill" style={{ width: `${p.pct}%`, background: p.color }} /></div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Services page */
const SERVICES = [
  { icon: '🧬', title: 'Genetic testing', desc: 'Full genomic sequencing to understand your health predispositions and longevity potential.', bg: '#e6f1fb', color: '#185FA5', cta: '🔒 Coming soon' },
  { icon: '🏃', title: 'VO2 Max test', desc: 'Lab-grade cardiorespiratory fitness — one of the strongest longevity predictors.', bg: '#faeeda', color: '#854F0B', cta: '🔒 Coming soon' },
  { icon: '🔬', title: 'Full body MRI', desc: 'Head-to-toe MRI screening with AI-assisted analysis and physician review.', bg: '#eeedfe', color: '#534AB7', cta: '🔒 Coming soon' },
  { icon: '📊', title: 'DEXA scan', desc: 'Body composition and bone density — integrated directly into your dashboard.', bg: '#e1f5ee', color: '#0F6E56', cta: '🔒 Coming soon' },
  { icon: '🦠', title: 'Gut microbiome test', desc: 'Deep sequencing of your gut microbiome with personalised nutrition recommendations.', bg: '#fcebeb', color: '#A32D2D', cta: '🔒 Coming soon' },
]
function ServicesPage() {
  return (
    <div className="dm-page">
      <h1 className="dm-page-title">Services</h1>
      <p className="dm-page-sub">All Duramater services available to you</p>
      <div className="dm-svc-grid">
        {SERVICES.map(s => (
          <div key={s.title} className="dm-svc-card">
            <div className="dm-svc-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <button className="dm-svc-btn" disabled>{s.cta}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Community page */
const COMM_CATEGORIES = ['All', 'Running', 'Fitness', 'Yoga', 'Workshop']
const COMM_EVENTS = [
  { id: 1, category: 'Running', title: 'DuraMater 10K — Mumbai Edition', date: 'Aug 17, 2026', time: '6:00 AM', location: 'Marine Drive, Mumbai', description: 'A timed 10K run along the iconic Marine Drive seafront. Includes post-race health screening with DuraMater biomarker spotlight.', spots: 250, difficulty: 'Intermediate' },
  { id: 2, category: 'Fitness', title: 'Functional Strength Bootcamp', date: 'Aug 24, 2026', time: '7:00 AM', location: 'Cubbon Park, Bengaluru', description: 'A 90-minute outdoor strength session led by certified coaches. Full-body circuits, mobility drills, and cooldown stretches.', spots: 60, difficulty: 'All Levels' },
  { id: 3, category: 'Yoga', title: 'Sunrise Yoga & Breathwork', date: 'Sep 1, 2026', time: '5:30 AM', location: 'Lodhi Garden, New Delhi', description: 'An open-air session combining Hatha yoga flows with guided pranayama. Perfect for beginners and regulars alike.', spots: 80, difficulty: 'Beginner' },
  { id: 4, category: 'Workshop', title: 'Metabolic Health Masterclass', date: 'Sep 8, 2026', time: '10:00 AM', location: 'Online — Zoom', description: 'A deep-dive into insulin resistance, metabolic syndrome, and how your blood markers decode your metabolic age. Led by DuraMater physicians.', spots: 500, difficulty: 'All Levels' },
  { id: 5, category: 'Running', title: 'Trail Run — Sahyadri Hills', date: 'Sep 15, 2026', time: '5:00 AM', location: 'Lonavala, Maharashtra', description: 'A 15K trail run through the Western Ghats. Technical terrain, stunning views, and post-run nutrition packs included.', spots: 100, difficulty: 'Advanced' },
  { id: 6, category: 'Fitness', title: 'HIIT in the Park', date: 'Sep 22, 2026', time: '6:30 AM', location: 'Lalbagh, Bengaluru', description: 'A 45-minute high-intensity interval session. Tabata, plyometrics, and partner drills to push your cardiovascular limits.', spots: 40, difficulty: 'Intermediate' },
  { id: 7, category: 'Yoga', title: 'Yin Yoga & Recovery', date: 'Oct 5, 2026', time: '6:00 PM', location: 'The Yoga House, Mumbai', description: 'A slow, restorative Yin session focused on deep connective tissue release. Ideal for athletes and desk workers.', spots: 30, difficulty: 'Beginner' },
  { id: 8, category: 'Workshop', title: 'Heart Health & Longevity Talk', date: 'Oct 12, 2026', time: '11:00 AM', location: 'ITC Grand Chola, Chennai', description: 'A live panel with cardiologists on ApoB, Lp(a), and the markers that actually predict heart disease — beyond just cholesterol.', spots: 200, difficulty: 'All Levels' },
  { id: 9, category: 'Running', title: 'DuraMater 5K — Beginner Friendly', date: 'Oct 20, 2026', time: '6:30 AM', location: 'Hussain Sagar, Hyderabad', description: 'Your first 5K starts here. Paced groups, hydration stations, and a finisher medal. No experience required.', spots: 300, difficulty: 'Beginner' },
]
const COMM_DIFF_COLORS = {
  'Beginner': { bg: 'rgba(62,207,142,0.12)', color: '#2dbf82' },
  'Intermediate': { bg: 'rgba(216,169,58,0.14)', color: '#b08a22' },
  'Advanced': { bg: 'rgba(180,84,63,0.12)', color: '#b4543f' },
  'All Levels': { bg: 'rgba(100,100,200,0.1)', color: '#6366f1' },
}

function CommunityPage() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? COMM_EVENTS : COMM_EVENTS.filter(e => e.category === filter)

  const EventIcon = ({ category }) => {
    if (category === 'Running') return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="4" r="2"/><path d="M10 20v-4L7.5 13H5M19 13h-4l-3-4v4l3 3"/></svg>)
    if (category === 'Fitness') return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6.5 6.5 11 11M3 10l7-7M14 21l7-7M6.5 12.5l5-5M12.5 18.5l5-5"/></svg>)
    if (category === 'Yoga') return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2"/><path d="M12 7v10M5 12h14M8 15l4-3 4 3M9 9l3-2 3 2"/></svg>)
    return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h20v14H2zM8 21h8M12 17v4M7 8h10M7 12h6"/></svg>)
  }

  return (
    <div className="dm-page">
      <h1 className="dm-page-title">Community</h1>
      <p className="dm-page-sub">Move together. Join DuraMater fitness events, running groups, yoga sessions, and health workshops.</p>

      <div className="comm-stats" style={{ marginTop: 20 }}>
        <div className="comm-stat">
          <span className="comm-stat-num">{COMM_EVENTS.length}</span>
          <span className="comm-stat-label">Upcoming Events</span>
        </div>
        <div className="comm-stat">
          <span className="comm-stat-num">{new Set(COMM_EVENTS.map(e => e.location.split(',').pop()?.trim())).size}+</span>
          <span className="comm-stat-label">Cities</span>
        </div>
        <div className="comm-stat">
          <span className="comm-stat-num">{COMM_EVENTS.reduce((a, e) => a + e.spots, 0).toLocaleString()}</span>
          <span className="comm-stat-label">Total Spots</span>
        </div>
      </div>

      <div className="comm-filters" style={{ marginTop: 20 }}>
        {COMM_CATEGORIES.map(cat => (
          <button key={cat} className={`comm-filter-btn${filter === cat ? ' active' : ''}`} onClick={() => setFilter(cat)}>{cat}</button>
        ))}
      </div>

      <div className="comm-grid" style={{ marginTop: 24 }}>
        {filtered.map(event => {
          const diffStyle = COMM_DIFF_COLORS[event.difficulty] || COMM_DIFF_COLORS['All Levels']
          return (
            <div key={event.id} className="comm-card">
              <div className="comm-card-top">
                <span className="comm-card-icon"><EventIcon category={event.category} /></span>
                <span className="comm-card-cat">{event.category}</span>
              </div>
              <h3 className="comm-card-title">{event.title}</h3>
              <p className="comm-card-desc">{event.description}</p>
              <div className="comm-card-meta">
                <div className="comm-card-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  <span>{event.date} · {event.time}</span>
                </div>
                <div className="comm-card-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>{event.location}</span>
                </div>
              </div>
              <div className="comm-card-footer">
                <span className="comm-card-diff" style={{ background: diffStyle.bg, color: diffStyle.color }}>{event.difficulty}</span>
                <span className="comm-card-spots">{event.spots} spots</span>
              </div>
              <button className="btn comm-card-cta" disabled style={{ background: '#e6e4d7', color: 'var(--ink-soft)', border: '1px solid var(--line)', cursor: 'not-allowed', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Coming Soon
              </button>
            </div>
          )
        })}
      </div>
      {filtered.length === 0 && (
        <div className="comm-empty">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.4 }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <p>No events in this category yet. Check back soon!</p>
        </div>
      )}
    </div>
  )
}

/* Reports + Timeline combined */
function CombinedReportsTimelinePage({ liveBiomarkers, reportMeta }) {
  const bloodReports = reportMeta ? [reportMeta] : []

  const keyBiomarkers = liveBiomarkers
    ? liveBiomarkers.filter(b =>
        ['Cholesterol', 'LDL', 'HDL', 'Triglycerides', 'Hemoglobin', 'Ferritin', 'Vitamin D'].some(k =>
          b.name.toLowerCase().includes(k.toLowerCase())
        )
      ).slice(0, 8)
    : []

  return (
    <div className="dm-page">
      <h1 className="dm-page-title">Reports</h1>
      <p className="dm-page-sub">Your lab reports and blood-panel timeline</p>

      <div className="dm-report-list">
        {bloodReports.length === 0 && (
          <div className="dm-empty" style={{ padding: '24px 0' }}>No reports uploaded yet. Upload a lab report from the Overview tab.</div>
        )}
        {bloodReports.map((r, i) => (
          <div key={i} className="dm-report-row">
            <div className="dm-report-icon">📄</div>
            <div>
              <div className="dm-report-name">{r.fileName || 'Lab Report'}</div>
              <div className="dm-report-date">Completed {r.date} · {r.biomarkerCount || 0} biomarkers</div>
            </div>
            <button className="dm-report-dl" disabled>↓ Download</button>
          </div>
        ))}
      </div>

      {keyBiomarkers.length > 0 && (
        <>
          <h2 style={{ marginTop: 26 }}>Key biomarkers from latest panel</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginTop: 12 }}>
            {keyBiomarkers.map(k => (
              <div key={k.name} className="dm-bio-mini">
                <div style={{ fontWeight: 600 }}>{k.name}</div>
                <div style={{ color: 'var(--ink-soft)' }}>{k.value} {k.unit}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* Category score / insight defaults (used only when backend does not return a value for that category) */
const DEFAULT_CATEGORY_SCORES = {
  'Heart Health': null, 'Thyroid Health': null, 'Immune Health': null,
  'Hormone Health': null, 'Metabolic Health': null, 'Nutrient Status': null,
  'Liver Health': null, 'Kidney Health': null, 'Inflammation Markers': null,
  'Hematology': null, 'Cancer Prevention': null,
}

const DEFAULT_CATEGORY_INSIGHTS = {
  'Heart Health': '', 'Thyroid Health': '', 'Immune Health': '',
  'Hormone Health': '', 'Metabolic Health': '', 'Nutrient Status': '',
  'Liver Health': '', 'Kidney Health': '', 'Inflammation Markers': '',
  'Hematology': '', 'Cancer Prevention': '',
}

/* Main dashboard */
const DATA_NAV = ['Heart Health','Thyroid Health','Immune Health','Hormone Health','Metabolic Health','Nutrient Status','Liver Health','Kidney Health','Inflammation Markers','Hematology','Cancer Prevention']
const BIOMARKER_TABS = ['All Biomarkers', ...DATA_NAV]
const CATEGORY_MAP = {
  'Heart Health': 'Cardiometabolic',
  'Thyroid Health': 'Thyroid',
  'Immune Health': 'Energy & Blood',
  'Hormone Health': 'Hormones',
  'Metabolic Health': 'Metabolic',
  'Nutrient Status': 'Nutrient Status',
  'Liver Health': 'Liver',
  'Kidney Health': 'Kidney',
  'Inflammation Markers': 'Inflammation',
  'Hematology': 'Hematology',
  'Cancer Prevention': 'Tumor Markers',
}

export default function Dashboard() {
  const router = useRouter()
  const { user: authUser, loading, signOut } = useAuth()
  const user = authUser

  // All live state starts null — populated exclusively from the backend
  const [liveSummary, setLiveSummary] = useState(null)
  const [liveBiomarkers, setLiveBiomarkers] = useState(null)
  const [liveCategoryScores, setLiveCategoryScores] = useState(DEFAULT_CATEGORY_SCORES)
  const [liveCategoryInsights, setLiveCategoryInsights] = useState(DEFAULT_CATEGORY_INSIGHTS)
  const [liveRiskFlags, setLiveRiskFlags] = useState([])
  const [reportMeta, setReportMeta] = useState(null)

  const [tab, setTab] = useState('Overview')
  const [dataNav, setDataNav] = useState('All Biomarkers')
  const [query, setQuery] = useState('')
   const [statusFilter, setStatusFilter] = useState('all')
  const [report, setReport] = useState(null)
  const fileRef = useRef(null)

  const [profileOpen, setProfileOpen] = useState(false)
  const [modalType, setModalType] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const profileRef = useRef(null)

  useEffect(() => {
    if (!loading && !authUser) {
      router.replace('/?auth=required')
    }
  }, [authUser, loading, router])

  useEffect(() => {
    if (!loading && authUser) {
      const hasAccess = localStorage.getItem('exclusiveAccess') === 'true'
      if (!hasAccess) {
        router.replace('/exclusive-access')
      }
    }
  }, [authUser, loading, router])

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // On mount: auto-load the latest completed report if auth is ready
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token || !authUser) return

    const loadLatestReport = async () => {
      try {
        const latestRes = await fetch(`${API}/api/upload/reports/latest`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (!latestRes.ok) return
        const latestData = await latestRes.json()
        if (latestData && latestData.reportId) {
          setReport({ name: latestData.fileName || 'Latest Report', status: 'COMPLETED', reportId: latestData.reportId })
          fetchResult(latestData.reportId, token)
        }
      } catch (err) {
        console.error('Failed to load latest report:', err)
      }
    }
    loadLatestReport()
  }, [authUser])

  const rows = useMemo(() => {
    if (!liveBiomarkers) return []
    const q = query.trim().toLowerCase()
    return liveBiomarkers.filter((b) =>
      (statusFilter === 'all' || b.status === statusFilter) &&
      (!q || b.name.toLowerCase().includes(q) || b.system.toLowerCase().includes(q)),
    )
  }, [query, statusFilter, liveBiomarkers])

  const isScoreTab = dataNav === 'Duramater Score'

  const categoryRows = useMemo(() => {
    if (dataNav === 'All Biomarkers') return rows
    if (isScoreTab) return []
    const system = CATEGORY_MAP[dataNav]
    return rows.filter((b) =>
      system ? b.system === system || b.name.toLowerCase().includes(dataNav.toLowerCase())
             : b.system === dataNav || b.name.toLowerCase().includes(dataNav.toLowerCase()),
    )
  }, [rows, dataNav, isScoreTab])

  const sectionStats = useMemo(() => {
    const counts = { optimal: 0, normal: 0, out: 0 }
    categoryRows.forEach((b) => { counts[b.status] = (counts[b.status] || 0) + 1 })
    return { total: categoryRows.length, ...counts }
  }, [categoryRows])

  const groups = useMemo(() => {
    const map = new Map()
    categoryRows.forEach((r) => { if (!map.has(r.system)) map.set(r.system, []); map.get(r.system).push(r) })
    return [...map.entries()]
  }, [categoryRows])

  const onTab = (t) => { if (t === 'Home') return router.push('/'); setTab(t) }

  const onUpload = async (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    e.target.value = ''
    try {
      setReport({ name: f.name, status: 'UPLOADING' })
      // Clear out the previous report's data while the new one processes
      setLiveBiomarkers(null)
      setLiveSummary(null)
      setLiveCategoryScores(DEFAULT_CATEGORY_SCORES)
      setLiveCategoryInsights(DEFAULT_CATEGORY_INSIGHTS)
      
      const token = localStorage.getItem('token')

      // Step 1 — Get presigned upload URL
      
      const urlRes = await fetch(`${API}/api/upload/url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ fileName: f.name, mimeType: f.type || 'application/pdf', fileSizeBytes: f.size })
      })
      console.log(urlRes)
      if (!urlRes.ok) {
        const errData = await urlRes.json().catch(() => ({}))
        throw new Error(errData.error || 'Failed to get upload URL')
      }
      const { uploadUrl, reportId } = await urlRes.json()

      // Step 2 — Upload file to local server (PUT with FormData)
      const formData = new FormData()
      formData.append('file', f)
      console.log('Uploading to:', uploadUrl)
      const s3Res = await fetch(uploadUrl, {
        method: 'PUT',
        body: formData
      })
      console.log('Upload response status:', s3Res.status)
      if (!s3Res.ok) throw new Error('Failed to upload file')

      const uploadData = await s3Res.json()

      // If the PUT returned parsed results directly, use them (Vercel-compatible)
      if (uploadData.result) {
        setReport({ name: f.name, status: 'COMPLETED', reportId })
        try { applyResult(uploadData.result) } catch (applyErr) { console.error('applyResult error:', applyErr) }
        return
      }

      // Step 3 — Confirm upload & start inline processing
      console.log('Confirming upload for reportId:', reportId)
      const confirmRes = await fetch(`${API}/api/upload/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ reportId })
      })
      console.log('Confirm response status:', confirmRes.status)
      if (!confirmRes.ok) throw new Error('Failed to confirm upload')

      setReport({ name: f.name, status: 'PROCESSING', reportId })

      // Step 4 — Poll status every 3 s
      const poll = setInterval(async () => {
        try {
          const statusRes = await fetch(`${API}/api/upload/status/${reportId}`, {
            headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) }
          })
          if (!statusRes.ok) {
            console.error('Status check failed:', statusRes.status)
            return
          }
          const statusData = await statusRes.json()
          console.log('Status:', statusData.status)
          if (statusData.status === 'COMPLETED') {
            clearInterval(poll)
            setReport({ name: f.name, status: 'COMPLETED', reportId })
            fetchResult(reportId, token)
          } else if (statusData.status === 'FAILED') {
            clearInterval(poll)
            setReport({ name: f.name, status: 'FAILED', errorMsg: 'Processing failed. Please try again.' })
          }
        } catch (pollErr) {
          console.error('Poll error:', pollErr)
        }
      }, 3000)

    } catch (err) {
      console.error(err)
      setReport({ name: f.name, status: 'FAILED', errorMsg: err.message || String(err) })
    }
  }

  // Apply parsed result data to dashboard state (shared by fetchResult and PUT response)
  const applyResult = (data) => {
      // --- Map biomarkers ---
      const mappedBiomarkers = (data.biomarkers || []).map(b => {
        let mappedStatus = 'normal'
        if (b.status === 'NORMAL') mappedStatus = 'optimal'
        else if (['HIGH', 'LOW', 'CRITICAL_HIGH', 'CRITICAL_LOW'].includes(b.status)) mappedStatus = 'out'

        let labelOverride = undefined
        if (
          b.rawName.toLowerCase().includes('b12') ||
          b.rawName.toLowerCase().includes('cobalamin') ||
          b.rawName.toLowerCase().includes('vitamin b12')
        ) {
          const val = Number(b.parsedValue)
          if (val >= 200 && val <= 300) {
            mappedStatus = 'normal'
            labelOverride = 'Borderline'
          }
        }

        let mappedSystem = b.biomarkerDefinition?.category || 'Other'
        if      (mappedSystem === 'LIPID_PANEL')    mappedSystem = 'Cardiometabolic'
        else if (mappedSystem === 'LIVER_FUNCTION')  mappedSystem = 'Liver'
        else if (mappedSystem === 'KIDNEY_FUNCTION') mappedSystem = 'Kidney'
        else if (mappedSystem === 'CBC')             mappedSystem = 'Hematology'
        else if (mappedSystem === 'THYROID')         mappedSystem = 'Thyroid'
        else if (mappedSystem === 'METABOLIC' || mappedSystem === 'DIABETES') mappedSystem = 'Metabolic'
        else if (mappedSystem === 'INFLAMMATION')    mappedSystem = 'Inflammation'
        else if (mappedSystem === 'HORMONES')        mappedSystem = 'Hormones'
        else if (mappedSystem === 'VITAMINS')        mappedSystem = 'Nutrient Status'
        else if (mappedSystem === 'ELECTROLYTES')    mappedSystem = 'Energy & Blood'
        else if (mappedSystem === 'TUMOR_MARKERS')   mappedSystem = 'Tumor Markers'
        else {
          mappedSystem = mappedSystem.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')
        }

        return {
          name: b.rawName,
          system: mappedSystem,
          status: mappedStatus,
          statusLabel: labelOverride,
          value: b.parsedValue !== null && b.parsedValue !== undefined
            ? b.parsedValue.toString()
            : (b.rawValue || '—'),
          unit: b.unit || '',
          range: [b.appliedRefMin ?? 0, b.appliedRefMax ?? 0],
          history: [Number(b.parsedValue) || 0],
        }
      })

      setLiveBiomarkers(mappedBiomarkers)

      // --- Compute summary counts ---
      const optimalCount = mappedBiomarkers.filter(b => b.status === 'optimal').length
      const normalCount  = mappedBiomarkers.filter(b => b.status === 'normal').length
      const outCount     = mappedBiomarkers.filter(b => b.status === 'out').length

      const overallScoreObj = (data.healthScores || []).find(hs => hs.category === 'OVERALL')
      const overallScoreVal = overallScoreObj ? overallScoreObj.score : null

      const ageMarker = mappedBiomarkers.find(m => m.name.toLowerCase() === 'age')
      const chronoAge = ageMarker ? parseInt(ageMarker.value, 10) : 40

      let bioAge = null
      if (overallScoreVal !== null) {
        const delta = (overallScoreVal - 75) * -0.6
        bioAge = {
          value: Math.round(chronoAge + delta),
          delta: Math.abs(delta) > 0 ? (delta > 0 ? `+${Math.round(delta)}` : `${Math.round(delta)}`) : '0',
          label: delta > 0 ? 'years older' : (delta < 0 ? 'years younger' : 'same as chronological')
        }
      }

      setLiveSummary({
        score: {
          value: overallScoreVal,
          outOf: 100,
          message: overallScoreObj?.summary || 'Score calculated from your latest report.',
        },
        bioAge,
        results: {
          optimal: optimalCount,
          normal: normalCount,
          outOfRange: outCount,
          asOf: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        },
      })

      // --- Map category scores & insights from backend ---
      const newCategoryScores   = { ...DEFAULT_CATEGORY_SCORES }
      const newCategoryInsights = { ...DEFAULT_CATEGORY_INSIGHTS }

      ;(data.healthScores || []).forEach(hs => {
        const map = {
          'LIPID_PANEL':     'Heart Health',
          'THYROID':         'Thyroid Health',
          'METABOLIC':       'Metabolic Health',
          'DIABETES':        'Metabolic Health',
          'LIVER_FUNCTION':  'Liver Health',
          'KIDNEY_FUNCTION': 'Kidney Health',
          'INFLAMMATION':    'Inflammation Markers',
          'CBC':             'Hematology',
          'VITAMINS':        'Nutrient Status',
          'HORMONES':        'Hormone Health',
          'ELECTROLYTES':    'Immune Health',
          'TUMOR_MARKERS':   'Cancer Prevention',
        }
        const frontendCat = map[hs.category]
        if (frontendCat) {
          newCategoryScores[frontendCat] = hs.score
          if (hs.summary) newCategoryInsights[frontendCat] = hs.summary
        }
      })

      setLiveCategoryScores(newCategoryScores)
      setLiveCategoryInsights(newCategoryInsights)
      setLiveRiskFlags(data.riskFlags || [])

      // Store metadata for Reports tab
      setReportMeta({
        fileName: data.fileName,
        date: data.reportDate
          ? new Date(data.reportDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
          : new Date(data.updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        biomarkerCount: mappedBiomarkers.length,
      })
  }

  // Fetch results from backend and map into frontend-friendly shapes
  const fetchResult = async (reportId, token) => {
    try {
      const res = await fetch(`${API}/api/upload/result/${reportId}`, {
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) }
      })
      if (!res.ok) throw new Error('Failed to fetch result')
      const data = await res.json()
      applyResult(data)
    } catch (err) {
      console.error('fetchResult error:', err)
    }
  }

  const hasData = liveBiomarkers !== null

  if (loading || !authUser) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--cream)', color: 'var(--ink)' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>Checking your session...</div>
      </div>
    )
  }

  const renderContentBody = () => (
    <div className="dm-content">
      {tab === 'Plan'     && <PlanPage />}
      {tab === 'Services' && <ServicesPage />}
      {tab === 'Reports'  && <CombinedReportsTimelinePage liveBiomarkers={liveBiomarkers} reportMeta={reportMeta} />}
      {tab === 'Community' && <CommunityPage />}
      {tab === 'Overview' && (
        <div>
          <div className="dash-head">
            <h1>Welcome, {user?.name?.split(' ')[0]}</h1>
            {report ? (
              <div className="dash-uploaded" style={{ margin: 0 }}>
                ✓ <b>{report.name}</b>{' '}
                {report.status === 'UPLOADING'   ? 'uploading...'
                 : report.status === 'PROCESSING' ? 'processing...'
                 : report.status === 'FAILED'     ? <span style={{ color: 'red' }}>failed: {report.errorMsg}</span>
                 : 'processed'}
                <button className="dash-reupload" onClick={() => fileRef.current?.click()}>Upload another</button>
              </div>
            ) : (
              <button className="dash-records" onClick={() => fileRef.current?.click()}>↑ Upload Lab Report</button>
            )}
          </div>

          <div className="dm-hero-cards">
            <div className="dm-sc-card">
              <div className="dm-sc-bg" />
              <div className="dm-sc-z">
                <div className="dm-sc-top">
                  <div className="dm-sc-label">Overall Wellness Score</div>
                  <div style={{ textAlign: 'right' }}>
                    {liveSummary ? (
                      <>
                        <div className="dm-sc-num">{liveSummary.score.value ?? '—'}</div>
                        <div className="dm-sc-status">Behavior Change Summary</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>Not a diagnosis</div>
                      </>
                    ) : (
                      <>
                        <div className="dm-sc-num" style={{ fontSize: 22, opacity: 0.6 }}>—</div>
                        <div className="dm-sc-status" style={{ opacity: 0.6 }}>Upload a report</div>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <div className="dm-sc-track">
                    <div className="dm-sc-fill" style={{ width: `${liveSummary?.score?.value ?? 0}%` }} />
                    <div className="dm-sc-mkr" style={{ left: `${liveSummary?.score?.value ?? 0}%` }} />
                  </div>
                  <div className="dm-sc-lbls"><span>0</span><span>60</span><span>80</span><span>100</span></div>
                </div>
              </div>
            </div>

            <div className="dm-ba-card">
              <div className="dm-ba-bg" />
              <div className="dm-ba-z">
                <div className="dm-ba-top">
                  <div className="dm-ba-label">Results Summary</div>
                  <div style={{ textAlign: 'right' }}>
                    {liveSummary ? (
                      <>
                        <div className="dm-ba-age-lbl">Markers</div>
                        <div className="dm-ba-num" style={{ fontSize: 68, lineHeight: 1 }}>
                          {liveSummary.results.outOfRange + liveSummary.results.optimal + liveSummary.results.normal}
                        </div>
                        <div className="dm-ba-sub" style={{ color: '#ffb3b3' }}>{liveSummary.results.outOfRange} Out of Range</div>
                      </>
                    ) : (
                      <>
                        <div className="dm-ba-num" style={{ fontSize: 22, opacity: 0.6 }}>—</div>
                        <div className="dm-ba-sub" style={{ opacity: 0.6 }}>No report yet</div>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <div className="dm-sc-track">
                    <div className="dm-sc-fill" style={{ width: '100%', background: 'linear-gradient(90deg, #d4a84b 0%, #2f5233 50%, #dc2626 100%)' }} />
                  </div>
                  <div className="dm-sc-lbls"><span>Optimal</span><span>Normal</span><span>Out of Range</span></div>
                </div>
              </div>
            </div>

            <div className="dm-ba-card" style={{ background: 'linear-gradient(135deg, #0e1e38 0%, #1a365d 100%)' }}>
              <div className="dm-ba-bg" style={{ opacity: 0.15 }} />
              <div className="dm-ba-z">
                <div className="dm-ba-top">
                  <div className="dm-ba-label">Biological Age</div>
                  <div style={{ textAlign: 'right' }}>
                    {liveSummary?.bioAge ? (
                      <>
                        <div className="dm-ba-age-lbl">Estimated</div>
                        <div className="dm-ba-num" style={{ fontSize: 68, lineHeight: 1 }}>{liveSummary.bioAge.value}</div>
                        <div className="dm-ba-sub" style={{ color: '#93c5fd' }}>
                          {liveSummary.bioAge.value > 40 ? 'Older than actual' : 'Younger than actual'}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="dm-ba-num" style={{ fontSize: 22, opacity: 0.6 }}>—</div>
                        <div className="dm-ba-sub" style={{ opacity: 0.6 }}>Upload report</div>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-display)', fontWeight: 500 }}>
                    Based on phenotypic age calculation
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="dash-overview-grid">
            <div className="dash-left-col">
              {liveRiskFlags.length > 0 && (
                <div className="dash-risks">
                  <div className="dash-risks-header">
                    <div className="dash-risks-badge">{liveRiskFlags.length}</div>
                    <h2>Attention Required</h2>
                  </div>
                  <div className="dash-risk-list">
                    {liveRiskFlags.map((r, i) => {
                      const isHigh = r.status === 'HIGH' || r.status === 'CRITICAL_HIGH'
                      return (
                        <div className="dash-risk-item" key={i}>
                          <div className={`dash-risk-icon ${isHigh ? 'high' : 'low'}`}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                            </svg>
                          </div>
                          <div className="dash-risk-body">
                            <div className="dash-risk-top">
                              <span className="dash-risk-name">{r.biomarkerName}</span>
                              <span className={`dash-risk-status ${isHigh ? 'high' : 'low'}`}>
                                {isHigh ? 'Above Range' : 'Below Range'}
                              </span>
                            </div>
                            <div className="dash-risk-detail">
                              <span className="dash-risk-val">{r.value}</span>
                              <span className="dash-risk-range">{r.referenceRange}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              <div className="dash-card">
                <div className="dash-card-header">
                  <h2>{dataNav}</h2>
                  {liveCategoryScores[dataNav] !== undefined && (
                    <span className="dm-cat-score-badge">
                      Score: <b>{liveCategoryScores[dataNav]}</b>/100
                    </span>
                  )}
                </div>

                {liveCategoryInsights[dataNav] && (
                  <div className="dm-cat-insight-card">
                    <div style={{ display: 'flex', gap: 10 }}>
                      <span>💡</span>
                      <div>
                        <strong>Category Insight:</strong>
                        <p>{liveCategoryInsights[dataNav]}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="dash-controls">
                  <div className="dash-search">
                    <span aria-hidden>⌕</span>
                    <input 
                      value={query} 
                      onChange={(e) => setQuery(e.target.value)} 
                      placeholder="Search biomarkers or categories…" 
                    />
                  </div>
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="all">All statuses</option>
                    <option value="optimal">Optimal</option>
                    <option value="normal">Normal</option>
                    <option value="out">Out of Range</option>
                  </select>
                </div>

                <div className="dash-table">
                  <div className="dash-trow dash-thead">
                    <span>Marker</span>
                    <span>Status</span>
                    <span>Result</span>
                    <span className="hide-mobile">Reference range</span>
                    <span className="hide-mobile">Trend</span>
                  </div>

                  {!hasData && (
                    <div className="dash-empty" style={{ padding: '40px 0', textAlign: 'center' }}>
                      <div style={{ fontSize: 32, marginBottom: 12 }}>🧬</div>
                      <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>No lab report uploaded yet</div>
                      <div style={{ color: 'var(--ink-soft)', fontSize: 14, marginBottom: 18 }}>
                        Upload a blood panel PDF to see your real biomarker values, health scores, and risk flags.
                      </div>
                      <button className="dash-records" onClick={() => fileRef.current?.click()}>↑ Upload Lab Report</button>
                    </div>
                  )}

                  {hasData && groups.length === 0 && (
                    <div className="dash-empty">No markers match your search.</div>
                  )}

                  {hasData && groups.map(([system, items]) => (
                    <div key={system}>
                      <div className="dash-group-label">{system}</div>
                      {items.map((b) => {
                        const meta = STATUS_META[b.status]
                        return (
                          <div className="dash-trow" key={b.name}>
                            <span className="d-name">{b.name}</span>
                            <span className="d-status"><i style={{ background: meta.color }} />{b.statusLabel || meta.label}</span>
                            <span className="d-value">{b.value} <em>{b.unit}</em></span>
                            <span className="d-range hide-mobile">{b.range[0]} – {b.range[1]}</span>
                            <span className="d-history hide-mobile"><Sparkline history={b.history} color={meta.color} /></span>
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="dm-layout">
      {/* ── DESKTOP ONLY LAYOUT ───────────────────────── */}
      <div className="dm-desktop-layout">
        <aside className="dm-sidebar">
          <div className="dm-sb-logo" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>{BRAND.wordmark}</div>
          <div className="dm-sb-section">
            <div className="dm-sb-label">Biomarkers</div>
            <nav className="dm-sb-nav">
              {BIOMARKER_TABS.map((item, i) => (
                <a key={i} className={dataNav === item ? 'active' : ''} onClick={() => setDataNav(item)}>
                  {item}
                </a>
              ))}
            </nav>
          </div>
          <div className="dm-sb-divider" />
          <div className="dm-sb-section">
            <div className="dm-sb-label"></div>
            <nav className="dm-sb-nav">{SIDE_CONNECT.map(item => (<a key={item.label}><span className="dm-nav-icon">{item.icon}</span>{item.label}</a>))}</nav>
          </div>
          <div className="dm-sb-bottom">
            <nav className="dm-sb-nav">{SIDE_BOTTOM.map(item => (<a key={item.label}><span className="dm-nav-icon">{item.icon}</span>{item.label}</a>))}</nav>
          </div>
        </aside>

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <header className={`nav scrolled dash-nav`} style={{ position: 'sticky', top: 12, zIndex: 60 }}>
            <div className="container">
              <a className="wordmark" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
                {BRAND.wordmark}
              </a>

              <nav className="nav-links">
                {SIDE_MENU.map((item, i) => (
                  <a
                    key={i}
                    onClick={() => onTab(item.id)}
                    style={{
                      cursor: 'pointer',
                      opacity: tab === item.id ? 1 : 0.6,
                      fontWeight: tab === item.id ? 600 : 500,
                      borderBottom: tab === item.id ? '2px solid var(--ink)' : '2px solid transparent',
                      paddingBottom: 2,
                      transition: 'all 0.2s'
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="nav-right">
                <div className="nav-profile-wrap" ref={profileRef}>
                  <button 
                    className="nav-profile-btn" 
                    aria-label="Profile" 
                    onClick={() => setProfileOpen(!profileOpen)}
                    title="View Profile Actions"
                  >
                    {user.name?.[0]?.toUpperCase() ?? 'D'}
                  </button>

                  {profileOpen && (
                    <div className="nav-profile-dropdown">
                      <div className="nav-profile-header">
                        <div className="nav-profile-name">{user.name || 'User'}</div>
                        <div className="nav-profile-email">{user.email || 'user@duramater.com'}</div>
                        
                        <div className="nav-profile-summary">
                          <div className="nav-profile-summary-title">Health Summary</div>
                          <div className="nav-profile-summary-grid">
                            <div className="nav-profile-summary-item">
                              <span>Score</span>
                              <b>{liveSummary ? `${liveSummary.score.value}/100` : '—'}</b>
                            </div>
                            <div className="nav-profile-summary-item">
                              <span>Bio Age</span>
                              <b>{liveSummary?.bioAge ? `${liveSummary.bioAge.value} yrs` : '—'}</b>
                            </div>
                            <div className="nav-profile-summary-item">
                              <span>Optimal</span>
                              <b>{liveSummary ? liveSummary.results.optimal : '—'}</b>
                            </div>
                            <div className="nav-profile-summary-item">
                              <span>Out of Range</span>
                              <b>{liveSummary ? liveSummary.results.outOfRange : '—'}</b>
                            </div>
                          </div>
                        </div>
                      </div>

                      <a 
                        href="https://www.linkedin.com/company/duramaterhealth/posts/" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="nav-profile-linkedin"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        DuraMater on LinkedIn
                      </a>

                      <div className="nav-profile-menu">
                        <button className="nav-profile-item" onClick={() => { setProfileOpen(false); setTab('Community'); }}>Community Events</button>
                        <button className="nav-profile-item" onClick={() => { setProfileOpen(false); setModalType('account'); }}>Account Details</button>
                        <button className="nav-profile-item" onClick={() => { setProfileOpen(false); setModalType('password'); }}>Change Password</button>
                        <button className="nav-profile-item" onClick={() => { setProfileOpen(false); setModalType('referral'); }}>Refer a Friend</button>
                        <button className="nav-profile-item" onClick={() => { setProfileOpen(false); setModalType('payment'); }}>Billing & Payments</button>
                        <button className="nav-profile-item" onClick={() => { setProfileOpen(false); setModalType('help'); }}>Need Help?</button>
                        <button className="nav-profile-item" onClick={() => { setProfileOpen(false); setModalType('about'); }}>About Us</button>
                        <button className="nav-profile-item danger" onClick={() => { signOut(); window.location.href = '/'; }}>Logout</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          <div style={{ flex: 1 }}>
            {renderContentBody()}
          </div>
        </div>
      </div>

      {/* ── MOBILE ONLY LAYOUT ────────────────────────── */}
      <div className="dm-mobile-layout">
        <header className={`nav scrolled dash-nav-mobile`} style={{ position: 'sticky', top: 12, zIndex: 60 }}>
          <div className="container">
            <div className="dash-nav-row">
              {/* Hamburger Menu Toggle (Three Bars) - Visible on Mobile Only */}
              <button
                className="dash-hamburger-btn"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <span />
                <span />
                <span />
              </button>

              {/* Logo wordmark - Visible on Mobile Only */}
              <a className="wordmark dash-logo-mobile" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
                {BRAND.wordmark}
              </a>
            </div>

            {/* Mobile Biomarker scroller - Visible on mobile only, when Overview tab is active */}
            {tab === 'Overview' && (
              <div className="dash-biomarkers-mobile show-mobile-only">
                <nav className="dm-sb-nav">
                  {BIOMARKER_TABS.map((item, i) => (
                    <a key={i} className={dataNav === item ? 'active' : ''} onClick={() => setDataNav(item)}>
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </header>

        <div className="dm-content-wrapper" style={{ flex: 1 }}>
          {renderContentBody()}
        </div>
      </div>

      {/* Account Details & Custom Modals */}
      {modalType && (
        <div className="dm-modal-backdrop" onClick={() => setModalType(null)}>
          <div className="dm-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="dm-modal-close" aria-label="Close modal" onClick={() => setModalType(null)}>×</button>
            {modalType === 'account' && (
              <div>
                <h3>Account Details</h3>
                <div className="dm-modal-field"><strong>Name:</strong> {user?.name || 'User'}</div>
                <div className="dm-modal-field"><strong>Email:</strong> {user?.email || 'user@duramater.com'}</div>
                <div className="dm-modal-field"><strong>Member Type:</strong> Premium Annual Membership</div>
                <div className="dm-modal-field"><strong>Status:</strong> Active</div>
              </div>
            )}
            {modalType === 'password' && (
              <div>
                <h3>Change Password</h3>
                <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 12 }}>Update your account access password below.</p>
                <div className="field" style={{ marginTop: 0 }}>
                  <label>Current Password</label>
                  <input type="password" placeholder="••••••••" disabled />
                </div>
                <div className="field">
                  <label>New Password</label>
                  <input type="password" placeholder="••••••••" disabled />
                </div>
                <button className="btn btn-cream btn-block" style={{ marginTop: 16 }} onClick={() => setModalType(null)}>Save Changes (🔒 Coming Soon)</button>
              </div>
            )}
            {modalType === 'referral' && (
              <div>
                <h3>Refer a Friend</h3>
                <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.4, marginBottom: 16 }}>
                  Share DuraMater with your friends and family. They get ₹1,000 off their first year, and you get ₹1,000 credit!
                </p>
                <div style={{ display: 'flex', gap: 10, background: 'rgba(21,27,26,0.04)', padding: 12, borderRadius: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>DURAMATER-REF-5693</span>
                  <button className="btn" style={{ padding: '8px 12px', fontSize: 12, background: 'var(--ink)', color: '#fff' }} onClick={() => alert('Referral code copied!')}>Copy</button>
                </div>
              </div>
            )}
            {modalType === 'payment' && (
              <div>
                <h3>Billing & Payments</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>Annual Health Membership</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>Renews Aug 2026</div>
                  </div>
                  <div style={{ fontWeight: 600 }}>₹10,800/yr</div>
                </div>
                <div style={{ padding: '12px 0', fontSize: 13, color: 'var(--ink-soft)' }}>
                  Payment Method: Primary Card ending in 4242
                </div>
                <button className="btn btn-outline btn-block" style={{ marginTop: 14 }} disabled>Manage Subscription</button>
              </div>
            )}
            {modalType === 'help' && (
              <div>
                <h3>Need Help?</h3>
                <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.5, marginBottom: 14 }}>
                  Our patient care team is available 24/7.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ padding: 12, background: 'rgba(21,27,26,0.04)', borderRadius: 10 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>Email Support</div>
                    <a href="mailto:support@duramater.com" style={{ fontSize: 13, color: 'var(--green)', fontWeight: 500 }}>support@duramater.com</a>
                  </div>
                  <div style={{ padding: 12, background: 'rgba(21,27,26,0.04)', borderRadius: 10 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>Phone Support</div>
                    <a href="tel:+919876543210" style={{ fontSize: 13, color: 'var(--green)', fontWeight: 500 }}>+91 98765 43210</a>
                  </div>
                </div>
              </div>
            )}
            {modalType === 'about' && (
              <div>
                <h3>About DuraMater</h3>
                <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: 12 }}>
                  DuraMater is a preventative health program engineered to discover and intercept chronic diseases years before symptoms appear.
                </p>
                <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                  Our model leverages 120+ clinical biomarkers, biological age calculations, and personalized physician protocols to extend healthspan and longevity.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer menu */}
      <div className={`dm-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <button className="dm-drawer-close" onClick={() => setMobileMenuOpen(false)}>×</button>
        <div className="dm-drawer-logo">{BRAND.wordmark}</div>
  
        
        {/* User Profile Info Card */}
        <div className="dm-drawer-profile">
          <div className="dm-drawer-profile-name">{user.name || 'User'}</div>
          <div className="dm-drawer-profile-email">{user.email || 'user@duramater.com'}</div>
          
          <div className="dm-drawer-summary-grid">
            <div className="dm-drawer-summary-item">
              <span>Score</span>
              <b>{liveSummary ? `${liveSummary.score.value}/100` : '—'}</b>
            </div>
            <div className="dm-drawer-summary-item">
              <span>Bio Age</span>
              <b>{liveSummary?.bioAge ? `${liveSummary.bioAge.value} yrs` : '—'}</b>
            </div>
          </div>
        </div>

        {/* Dashboard Pages Navigation */}
        <div className="dm-drawer-nav">
          {SIDE_MENU.map((item, i) => (
            <a 
              key={i} 
              className={`dm-drawer-nav-item ${tab === item.id ? 'active' : ''}`}
              onClick={() => { setTab(item.id); setMobileMenuOpen(false); }}
            >
              <span>{item.label}</span>
              {tab === item.id && <span style={{ fontSize: 14 }}>•</span>}
            </a>
          ))}
        </div>

        {/* User Profile Submenu / Actions */}
        <div className="dm-drawer-menu">
          <button className="dm-drawer-menu-item" onClick={() => { setMobileMenuOpen(false); setTab('Community'); }}>Community Events</button>
          <button className="dm-drawer-menu-item" onClick={() => { setMobileMenuOpen(false); setModalType('account'); }}>Account Details</button>
          <button className="dm-drawer-menu-item" onClick={() => { setMobileMenuOpen(false); setModalType('password'); }}>Change Password</button>
          <button className="dm-drawer-menu-item" onClick={() => { setMobileMenuOpen(false); setModalType('referral'); }}>Refer a Friend</button>
          <button className="dm-drawer-menu-item" onClick={() => { setMobileMenuOpen(false); setModalType('payment'); }}>Billing & Payments</button>
          <button className="dm-drawer-menu-item" onClick={() => { setMobileMenuOpen(false); setModalType('help'); }}>Need Help?</button>
          <button className="dm-drawer-menu-item" onClick={() => { setMobileMenuOpen(false); setModalType('about'); }}>About Us</button>
          <button className="dm-drawer-menu-item danger" onClick={() => { signOut(); window.location.href = '/'; }}>Logout</button>
        </div>
      </div>

      {/* Hidden file input for lab report upload */}
      <input
        ref={fileRef}
        type="file"
        accept=".pdf"
        style={{ display: 'none' }}
        onChange={onUpload}
      />
    </div>
  )
}
