'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Mobile-only. Appears after 40% scroll, scrolls to the hero form (never opens
 * a second one), and hides while a form is on screen — a bar covering the form
 * it points at is a leak, not a shortcut. Text never changes on any section.
 */
export default function StickyCta({ label }: { label: string }) {
  const [show, setShow] = useState(false)
  const formVisible = useRef(false)
  const past40 = useRef(false)

  useEffect(() => {
    const sync = () => setShow(past40.current && !formVisible.current)

    const onScroll = () => {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      past40.current = scrollable > 0 && window.scrollY / scrollable >= 0.4
      sync()
    }

    const observers: IntersectionObserver[] = []
    document.querySelectorAll('[data-wc-form]').forEach((el) => {
      const o = new IntersectionObserver(
        ([e]) => {
          formVisible.current = e.isIntersecting
          sync()
        },
        { threshold: 0.15 }
      )
      o.observe(el)
      observers.push(o)
    })

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      observers.forEach((o) => o.disconnect())
    }
  }, [])

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-wc-rule bg-white/95 px-4 pt-3 backdrop-blur-md transition-transform duration-200 lg:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <a
        href="#hero-form"
        tabIndex={show ? 0 : -1}
        onClick={() => {
          window.dataLayer = window.dataLayer || []
          window.dataLayer.push({ event: 'sticky_cta_click' })
        }}
        className="wc-btn flex h-[54px] w-full items-center justify-center rounded-xl bg-wc-accent px-6 text-[16px] font-semibold text-white no-underline shadow-[0_14px_34px_-16px_rgba(14,122,70,0.7)]"
      >
        {label}
      </a>
    </div>
  )
}
