'use client'

import React, { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { openChromeExtensionStorePopup } from '@/utils/openChromeExtensionStore'

// Frequency capping: once shown and dismissed, don't show again for this many days.
const STORAGE_KEY = 'eazybe:welcome-popup'
const SUPPRESS_DAYS = 7
const SHOW_DELAY_MS = 2000 // 2s after landing

const TRIAL_URL = 'https://eazybe.info/web'
const DEMO_URL = 'https://eazybe.info/demono'

export function WelcomePopup() {
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Schedule the popup 2s after mount, unless it was dismissed recently.
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const ts = Number(window.localStorage.getItem(STORAGE_KEY) || 0)
      if (ts && Date.now() - ts < SUPPRESS_DAYS * 86_400_000) return
    } catch {
      /* localStorage blocked — still allow the popup */
    }
    const timer = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [])

  const dismiss = () => {
    setOpen(false)
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()))
    } catch {
      /* ignore */
    }
  }

  // While open: lock scroll, close on Esc, move focus to the close button.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Start your free WhatsApp trial"
      onClick={dismiss}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        background: 'rgba(8,10,14,0.6)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 560,
          background: 'var(--paper)',
          borderRadius: 20,
          border: '1px solid var(--line)',
          boxShadow: '0 30px 80px -20px rgba(8,10,14,0.5)',
          padding: 'clamp(30px, 5vw, 44px)',
          textAlign: 'center',
        }}
      >
        <button
          ref={closeRef}
          type="button"
          aria-label="Close"
          onClick={dismiss}
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            width: 34,
            height: 34,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            border: '1px solid var(--line)',
            background: 'var(--paper)',
            color: 'var(--ink-3)',
            cursor: 'pointer',
          }}
        >
          <X size={18} />
        </button>

        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '7px 14px',
            borderRadius: 100,
            background: 'rgba(124,92,255,0.10)',
            color: 'var(--accent-ink)',
            fontFamily: 'var(--f-mono)',
            fontSize: 12,
            fontWeight: 600,
            lineHeight: 1.3,
            marginBottom: 20,
          }}
        >
          🏆 &quot;CTX Growth Champion Year 2025&quot; awarded by WhatsApp
        </span>

        <h2
          style={{
            fontFamily: 'var(--f-display)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            fontSize: 'clamp(28px, 5vw, 42px)',
            marginBottom: 16,
          }}
        >
          <span style={{ color: '#22c55e' }}>5X Your Revenue</span>
          <br />
          <span style={{ color: 'var(--ink)' }}>with the Power of WhatsApp</span>
        </h2>

        <p
          style={{
            fontSize: 16,
            color: 'var(--ink-3)',
            lineHeight: 1.55,
            maxWidth: 460,
            margin: '0 auto 28px',
          }}
        >
          Broadcast, Automate, Engage, Sell — do everything with the AI-powered WhatsApp Marketing &amp;
          Engagement Platform. Powered by Official WhatsApp APIs ⚡
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={TRIAL_URL}
            className="btn btn-primary btn-lg"
            onClick={(e) => {
              e.preventDefault()
              dismiss()
              openChromeExtensionStorePopup(TRIAL_URL)
            }}
          >
            Start 14-Day FREE Trial →
          </a>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-lg"
            onClick={dismiss}
          >
            Join Live Demo →
          </a>
        </div>
      </div>
    </div>
  )
}
