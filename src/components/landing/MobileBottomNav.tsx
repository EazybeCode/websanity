'use client'

import { useEffect, useState } from 'react'

const WA_LINK =
  'https://wa.me/13023356201?text=Hi%20-%20I%27d%20like%20to%20see%20how%20Eazybe%20works.'

export function MobileBottomNav() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false
    const THRESHOLD = 8 // px — ignore micro-scrolls

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        const y = window.scrollY
        const diff = y - lastY
        if (y < 80) {
          // Always show near the top
          setHidden(false)
        } else if (Math.abs(diff) > THRESHOLD) {
          setHidden(diff > 0) // scrolling down hides, scrolling up shows
        }
        lastY = y
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`mob-tabbar${hidden ? ' hidden' : ''}`} aria-label="Quick actions">
      <a href="#" className="mob-tab active" aria-current="page">
        <span className="mob-tab-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V9.5z" />
          </svg>
        </span>
        <span className="mob-tab-label">Home</span>
      </a>

      <a href={WA_LINK} className="mob-tab mob-tab-wa" target="_blank" rel="noopener noreferrer">
        <span className="mob-tab-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" />
          </svg>
          <span className="mob-tab-pulse" aria-hidden="true" />
        </span>
        <span className="mob-tab-label">WhatsApp</span>
      </a>

      <a href="#agents" className="mob-tab">
        <span className="mob-tab-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <circle cx="9" cy="11" r="1.6" fill="currentColor" />
            <circle cx="15" cy="11" r="1.6" fill="currentColor" />
            <path d="M9 16c.9.7 2 1.1 3 1.1s2.1-.4 3-1.1" />
          </svg>
        </span>
        <span className="mob-tab-label">Agents</span>
      </a>

      <a href="#" className="mob-tab">
        <span className="mob-tab-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <polyline points="3 7 12 13 21 7" />
          </svg>
        </span>
        <span className="mob-tab-label">Demo</span>
      </a>

      <a href="https://eazybe.com/pricing" className="mob-tab" target="_blank" rel="noopener noreferrer">
        <span className="mob-tab-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.83z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
        </span>
        <span className="mob-tab-label">Pricing</span>
      </a>
    </nav>
  )
}
