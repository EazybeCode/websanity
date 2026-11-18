'use client'

import { useEffect } from 'react'

export function RevealOnScroll() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      // No IO support — just show everything (including anything rendered later).
      const showAll = () =>
        document.querySelectorAll<HTMLElement>('.landing .reveal:not(.show)').forEach((el) => el.classList.add('show'))
      showAll()
      const mo = new MutationObserver(showAll)
      mo.observe(document.body, { childList: true, subtree: true })
      return () => mo.disconnect()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0, rootMargin: '0px 0px 80px 0px' }
    )

    const tracked = new WeakSet<Element>()
    // Handle every .reveal element not seen yet. Runs on mount and again whenever
    // the DOM changes: page content can render after this effect (e.g. while a
    // stylesheet loads, or client-only sections), and those elements must not be
    // left at opacity:0.
    const scan = () => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>('.landing .reveal')).filter(
        (el) => !tracked.has(el) && !el.classList.contains('show'),
      )
      if (!elements.length) return
      // Immediately reveal anything already in (or above) the viewport so
      // sections users land on don't sit at opacity:0 waiting for a scroll event.
      // Read all rects BEFORE writing any classes: classList.add invalidates
      // layout, so interleaving read/write forces a reflow per element
      // (Lighthouse "forced reflow" diagnostic).
      const viewportH = window.innerHeight
      const rects = elements.map((el) => el.getBoundingClientRect())
      elements.forEach((el, i) => {
        tracked.add(el)
        const rect = rects[i]
        const inView = rect.top < viewportH && rect.bottom > 0
        if (inView || rect.bottom <= 0) el.classList.add('show')
        else observer.observe(el)
      })
    }
    scan()

    let pending = 0
    const mo = new MutationObserver(() => {
      if (pending) return
      pending = requestAnimationFrame(() => {
        pending = 0
        scan()
      })
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      mo.disconnect()
      observer.disconnect()
      if (pending) cancelAnimationFrame(pending)
    }
  }, [])

  return null
}
