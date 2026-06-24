'use client'

import React, { useEffect, useState } from 'react'
import { Calendar, X } from 'lucide-react'

// Frequency cap: once dismissed, stay hidden for this many days.
const STORAGE_KEY = 'eazybe:sales-banner'
const SUPPRESS_DAYS = 7
const SHOW_DELAY_MS = 1500
const DEMO_URL = 'https://eazybe.info/demono'

export function SalesExpertBanner() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const ts = Number(window.localStorage.getItem(STORAGE_KEY) || 0)
      if (ts && Date.now() - ts < SUPPRESS_DAYS * 86_400_000) return
    } catch {
      /* localStorage blocked — still allow the banner */
    }
    const t = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS)
    return () => window.clearTimeout(t)
  }, [])

  const dismiss = () => {
    setOpen(false)
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()))
    } catch {
      /* ignore */
    }
  }

  if (!open) return null

  return (
    <div
      role="region"
      aria-label="Talk to our sales expert"
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 60,
        background: 'var(--accent-ink)',
        color: '#fff',
        borderTop: '1px solid rgba(255,255,255,0.14)',
        boxShadow: '0 -8px 30px -12px rgba(8,10,14,0.45)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'nowrap',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12, flex: '1 1 auto', minWidth: 240 }}>
          <span
            style={{
              flexShrink: 0,
              width: 34,
              height: 34,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              background: 'rgba(255,255,255,0.16)',
            }}
          >
            <Calendar size={18} />
          </span>
          <span style={{ fontSize: 15, lineHeight: 1.45 }}>
            Scaling WhatsApp past 10 people? <strong style={{ fontWeight: 600 }}>Talk to a sales expert.</strong> We&apos;ve
            seen how setups break at that size, and we&apos;ll show you the right one in 15 minutes.
          </span>
        </span>

        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={dismiss}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 18px',
            borderRadius: 100,
            background: '#fff',
            color: 'var(--accent-ink)',
            fontWeight: 600,
            fontSize: 14,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Book a Free Demo →
        </a>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={dismiss}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: 'none',
            background: 'transparent',
            color: 'var(--paper)',
            opacity: 0.7,
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  )
}
