'use client'
export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import AnnouncementBar from './components/AnnouncementBar.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import PressStrip from './components/PressStrip.jsx'
import Crisis from './components/Crisis.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import WhatWeTest from './components/WhatWeTest.jsx'
import Conditions from './components/Conditions.jsx'
import Membership from './components/Membership.jsx'
import Comparison from './components/Comparison.jsx'
import SeeEverything from './components/SeeEverything.jsx'
import Faq from './components/Faq.jsx'
import Community from './components/Community.jsx'
import Footer from './components/Footer.jsx'
import StartTesting from './components/StartTesting.jsx'
import Waitlist from './components/Waitlist.jsx'

export default function Landing() {
  const [testingOpen, setTestingOpen] = useState(false)
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const open = () => setTestingOpen(true)

  useEffect(() => {
    document.body.style.overflow = testingOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [testingOpen])

  return (
    <>
      <AnnouncementBar onJoinWaitlist={() => setWaitlistOpen(true)} />
      <Nav onStartTesting={open} />
      <main>
        <Hero onStartTesting={open} />
        <Crisis />
        <HowItWorks />
        <WhatWeTest />
        
        <PressStrip />
        <Membership onStartTesting={open} />
        <Comparison />
        <SeeEverything onStartTesting={open} />
        <Faq />
        <Community />
      </main>
      <Footer />
      <StartTesting open={testingOpen} onClose={() => setTestingOpen(false)} />
      <Waitlist open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  )
}
