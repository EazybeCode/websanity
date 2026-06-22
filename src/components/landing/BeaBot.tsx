'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { LeadGenerationForm } from '@/components/lead/LeadGenerationForm'

export function BeaBot() {
  const t = useTranslations('landingV3.beaForm')
  // Open by default on desktop (≥1024px) — mobile users start with the form
  // collapsed and tap Bea to open it. Starting closed avoids an SSR/CSR
  // hydration mismatch; the desktop auto-open happens client-side after mount.
  const [open, setOpen] = useState(false)

  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(min-width: 1024px)')
    if (mq.matches) setOpen(true)
  }, [])

  // Other CTAs (FinalCTA, MidCTA, FAQ footnote, Nav "Contact Sales", mobile
  // bottom nav) dispatch this event to open the lead form instead of jumping
  // straight to WhatsApp — the form is the lead-capture gate.
  useEffect(() => {
    const handler = () => {
      setOpen(true)
      setPulse(true)
      window.setTimeout(() => setPulse(false), 1200)
      window.setTimeout(() => {
        document.querySelector('.bea-corner-form')?.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }, 80)
    }
    window.addEventListener('eazybe:open-bea-form', handler)
    return () => window.removeEventListener('eazybe:open-bea-form', handler)
  }, [])

  return (
    <>
      <button
        type="button"
        className={`bea-wrap${open ? ' is-active' : ''}`}
        aria-label="Talk to Bea — open lead form"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="bea-tooltip" aria-hidden={open}>
          <div className="bea-tooltip-name">Hi, I&apos;m <em>Bea</em></div>
          <div className="bea-tooltip-msg">Tell me what your agent should do — I&apos;ll build it on WhatsApp in minutes.</div>
          <div className="bea-tooltip-cta">Build an agent <span>→</span></div>
        </div>
        <div className="bea-bot">
          <span className="bea-ring" />
          <span className="bea-ring r2" />
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <defs>
              <linearGradient id="beaBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F5F7FC" />
                <stop offset="60%" stopColor="#D8DEF0" />
                <stop offset="100%" stopColor="#A8B3CC" />
              </linearGradient>
              <linearGradient id="beaScreenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1A1D27" />
                <stop offset="100%" stopColor="#0A0C10" />
              </linearGradient>
              <radialGradient id="beaWingGrad" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#A8E3C5" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#7FD6B0" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#7FD6B0" stopOpacity="0.4" />
              </radialGradient>
            </defs>

            <ellipse className="bea-shadow" cx="50" cy="94" rx="22" ry="3" fill="#000" opacity="0.18" />

            <g className="bea-wing left">
              <ellipse cx="22" cy="36" rx="14" ry="20" fill="url(#beaWingGrad)" transform="rotate(-22 22 36)" />
              <ellipse cx="22" cy="34" rx="6" ry="14" fill="#fff" opacity="0.35" transform="rotate(-22 22 34)" />
            </g>
            <g className="bea-wing right">
              <ellipse cx="78" cy="36" rx="14" ry="20" fill="url(#beaWingGrad)" transform="rotate(22 78 36)" />
              <ellipse cx="78" cy="34" rx="6" ry="14" fill="#fff" opacity="0.35" transform="rotate(22 78 34)" />
            </g>

            <g className="bea-antenna">
              <path d="M 50 18 Q 50 10 50 6" stroke="#3C4658" strokeWidth="2" strokeLinecap="round" fill="none" />
              <circle cx="50" cy="5" r="4" fill="#F5F7FC" stroke="#3C4658" strokeWidth="1" />
              <circle cx="50" cy="5" r="2" fill="#7FD6B0">
                <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" />
              </circle>
            </g>

            <g className="bea-body">
              <ellipse cx="50" cy="52" rx="32" ry="34" fill="url(#beaBodyGrad)" stroke="#A8B3CC" strokeWidth="0.5" />
              <ellipse cx="40" cy="34" rx="14" ry="8" fill="#fff" opacity="0.55" />
              <ellipse cx="50" cy="54" rx="22" ry="20" fill="url(#beaScreenGrad)" />
              <ellipse cx="42" cy="42" rx="6" ry="3" fill="#fff" opacity="0.18" />

              <g className="bea-eye" fill="none" stroke="#7FD6B0" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 39 54 L 43 49 L 47 54" />
                <path d="M 53 54 L 57 49 L 61 54" />
              </g>

              <g fill="#7FD6B0">
                <circle className="bea-dot d1" cx="45" cy="62" r="1.4" />
                <circle className="bea-dot d2" cx="50" cy="62" r="1.4" />
                <circle className="bea-dot d3" cx="55" cy="62" r="1.4" />
              </g>

              <circle cx="20" cy="58" r="3" fill="#A8B3CC" />
              <circle cx="80" cy="58" r="3" fill="#A8B3CC" />
            </g>
          </svg>
        </div>
      </button>

      {open && (
        <div className={`bea-corner-form${pulse ? ' is-pulsing' : ''}`} role="dialog" aria-label="Talk to Bea">
          <button
            type="button"
            className="bea-corner-close"
            onClick={() => setOpen(false)}
            aria-label="Minimize"
          >
            <X size={16} />
          </button>
          <div className="bea-form-head">
            <h3>{t('headTitle')} <em>{t('headTitleEm')}</em></h3>
            <p>{t('headSubtitle')}</p>
          </div>
          <LeadGenerationForm />
        </div>
      )}
    </>
  )
}
