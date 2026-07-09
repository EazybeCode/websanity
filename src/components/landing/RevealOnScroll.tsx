'use client'

import { useEffect } from 'react'

export function RevealOnScroll() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.landing .reveal'))

    // Immediately reveal anything already in (or above) the viewport so
    // sections users land on don't sit at opacity:0 waiting for a scroll event.
    // Read all rects BEFORE writing any classes: classList.add invalidates
    // layout, so interleaving read/write forces a reflow per element
    // (Lighthouse "forced reflow" diagnostic).
    const viewportH = window.innerHeight
    const rects = elements.map((el) => el.getBoundingClientRect())
    elements.forEach((el, i) => {
      const rect = rects[i]
      const inView = rect.top < viewportH && rect.bottom > 0
      if (inView || rect.bottom <= 0) el.classList.add('show')
    })

    if (!('IntersectionObserver' in window)) {
      // No IO support — just show everything
      elements.forEach((el) => el.classList.add('show'))
      return
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
    elements.forEach((el) => {
      if (!el.classList.contains('show')) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return null
}
