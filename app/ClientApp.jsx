'use client'
import { useEffect, useState } from 'react'

// Prevents any child from rendering during SSR
export default function ClientApp({ children }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return <>{children}</>
}
