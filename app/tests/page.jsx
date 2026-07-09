'use client'
export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import StartTesting from '../components/StartTesting.jsx'
import BiomarkerDetail from '../components/BiomarkerDetail.jsx'
import { BRAND } from '../data/content.js'

export default function AllTests() {
  const [testingOpen, setTestingOpen] = useState(false)
  const open = () => setTestingOpen(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.overflow = testingOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [testingOpen])

  return (
    <>
      <Nav onStartTesting={open} />
      <main>
        <section className="tests-hero">
          <img className="tests-hero-bg" src="/assets/photos/tests-hero.jpg" alt="" />
          <div className="container">
            <div className="tests-hero-content">
              <Link href="/" className="tests-back">← Back to home</Link>
              <h1 className="tests-hero-title">What We Test</h1>
              <p className="tests-hero-sub">
                Here's everything we test in your {BRAND.display} Health Membership — {BRAND.markers} biomarkers
                across every major system, scored 0–100, not just "normal/abnormal."
              </p>
            </div>
          </div>
        </section>
        <section className="tests-body section">
          <div className="container">
            <BiomarkerDetail />
          </div>
        </section>
      </main>
      <Footer />
      <StartTesting open={testingOpen} onClose={() => setTestingOpen(false)} />
    </>
  )
}
