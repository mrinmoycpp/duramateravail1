'use client'
import { useEffect, useRef, useState } from 'react'

// Adds an "in" class when the element scrolls into view (for .reveal animations).
export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    const nodes = el.querySelectorAll('.reveal')
    nodes.forEach((n, i) => {
      const parent = n.parentElement
      const order = parent ? [...parent.children].filter((c) => c.classList.contains('reveal')).indexOf(n) : i
      n.style.transitionDelay = `${Math.min(order, 6) * 80}ms`
      io.observe(n)
    })
    if (el.classList.contains('reveal')) io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

// True once the page has scrolled past `offset` pixels.
export function useScrolled(offset = 40) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])
  return scrolled
}
