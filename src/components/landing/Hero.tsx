'use client'

import { useEffect, useRef, useState } from 'react'
import { SigninModal } from './SigninModal'

const EXAMPLES = [
  'Qualify inbound leads with BANT and route hot ones to my top rep…',
  'Sync every WhatsApp conversation to HubSpot automatically…',
  'Flag stalled deals and ping the owner when a customer goes quiet 48h…',
  'Reply in Portuguese to after-hours leads and book them into my calendar…',
  "Draft a follow-up in my voice when a prospect hasn't replied in 3 days…",
  'Alert my manager when any deal over $50k goes silent…',
]

export function Hero() {
  const [value, setValue] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [placeholder, setPlaceholder] = useState('Alert my manager when any deal over $50k goes silent…')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const focused = useRef(false)

  // Rotating placeholder typewriter
  useEffect(() => {
    let mounted = true
    let exampleIdx = 0
    let charIdx = 0
    let typing = true
    let timeoutId: number | undefined

    const tick = () => {
      if (!mounted) return
      if (focused.current || value) {
        timeoutId = window.setTimeout(tick, 400)
        return
      }
      const target = EXAMPLES[exampleIdx]
      if (typing) {
        if (charIdx < target.length) {
          charIdx++
          setPlaceholder(target.slice(0, charIdx) + '▏')
          timeoutId = window.setTimeout(tick, 35 + Math.random() * 40)
          return
        }
        typing = false
        timeoutId = window.setTimeout(tick, 2200)
        return
      }
      if (charIdx > 0) {
        charIdx--
        setPlaceholder(target.slice(0, charIdx) + '▏')
        timeoutId = window.setTimeout(tick, 15)
        return
      }
      typing = true
      exampleIdx = (exampleIdx + 1) % EXAMPLES.length
      timeoutId = window.setTimeout(tick, 100)
    }
    tick()
    return () => {
      mounted = false
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [value])

  // Auto-grow textarea
  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 160) + 'px'
  }, [value])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setModalOpen(true)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      setModalOpen(true)
    }
  }

  return (
    <>
      <section className="hero" data-tone="dark">
        <div className="float-layer" aria-hidden>
          <div className="float-tile" style={{ top: '16%', left: '4%' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </div>
          <div className="float-tile card" style={{ top: '30%', left: '2%' }}>
            <div className="fdot" style={{ background: 'linear-gradient(135deg, var(--accent-a), var(--accent-b))' }}>
              <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <div><span className="ftxt">Lead qualified</span><span className="fsub">BANT · 92% match</span></div>
          </div>
          <div className="float-tile" style={{ top: '48%', left: '6%' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF7A59"><path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.984 2.21 2.21 0 00-4.42 0c0 .873.52 1.626 1.263 1.976v2.868a5.1 5.1 0 00-2.348 1.028l-6.293-4.9a2.06 2.06 0 00.054-.453 2.1 2.1 0 10-.86 1.7l6.073 4.73a5.113 5.113 0 00-.118 1.077c0 .393.046.777.132 1.147l-2.51 1.468a2.028 2.028 0 00-1.253-.437 2.062 2.062 0 102.062 2.063c0-.209-.034-.41-.09-.603l2.428-1.417a5.134 5.134 0 003.894 1.794 5.15 5.15 0 005.15-5.15 5.148 5.148 0 00-4.431-5.06z"/></svg>
          </div>
          <div className="float-tile card" style={{ top: '66%', left: '3%' }}>
            <div className="fdot" style={{ background: 'var(--bg-2)', color: 'var(--ok)' }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
            </div>
            <div><span className="ftxt">CRM synced</span><span className="fsub">2,847 conversations</span></div>
          </div>
          <div className="float-tile" style={{ top: '14%', right: '6%' }}>
            <svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#1A1A1A"/><circle cx="12" cy="12" r="3" fill="#2ED06E"/></svg>
          </div>
          <div className="float-tile card" style={{ top: '28%', right: '2%' }}>
            <div className="fdot" style={{ background: 'linear-gradient(135deg, var(--accent-b), var(--accent-c))' }}>
              <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <div><span className="ftxt">Pipeline updated</span><span className="fsub">$24.5k · 3 deals</span></div>
          </div>
          <div className="float-tile" style={{ top: '48%', right: '5%' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#D32F2F"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45L12 11.08 5.1 7.63 12 4.18z"/></svg>
          </div>
          <div className="float-tile card" style={{ top: '64%', right: '3%' }}>
            <div className="fdot" style={{ background: 'linear-gradient(135deg, var(--accent-a), var(--accent-ink))' }}>
              <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
            </div>
            <div><span className="ftxt">Agent replied</span><span className="fsub">3 leads · 12s</span></div>
          </div>
        </div>

        <div className="container hero-inner">
          <span className="hero-tag">
            <span className="pulse" /> WHATSAPP AI · CRM-NATIVE · 24/7
          </span>
          <h1>Sell on WhatsApp. <em>See it all in your CRM.</em></h1>
          <p className="hero-sub">
            AI agents trained on your best chats. Sync every conversation to your CRM. Qualify leads while you sleep.
          </p>

          <div className="prompt-wrap">
            <div className="prompt-orb" />
            <form className="prompt-box" onSubmit={onSubmit}>
              <div className="prompt-inner">
                <div className="prompt-icon" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4m0 12v4m-9-9h4m12 0h4M5.636 5.636l2.828 2.828m7.072 7.072l2.828 2.828M5.636 18.364l2.828-2.828m7.072-7.072l2.828-2.828"/></svg>
                </div>
                <textarea
                  ref={textareaRef}
                  className="prompt-input"
                  rows={1}
                  placeholder={placeholder}
                  spellCheck={false}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKeyDown}
                  onFocus={() => { focused.current = true }}
                  onBlur={() => { focused.current = false }}
                />
                <button className="prompt-send" type="submit" aria-label="Build agent">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
                </button>
              </div>
            </form>
            <div className="prompt-hint">
              <span>Press <kbd>Enter</kbd> to build · Free forever plan</span>
            </div>
          </div>

          <div className="trust">
            <span><svg viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg> 4.6 on HubSpot</span>
            <span className="sep" />
            <span>2,000+ sales teams</span>
            <span className="sep" />
            <span>40+ countries</span>
            <span className="sep" />
            <span>Meta Business Partner</span>
          </div>
        </div>
      </section>

      <SigninModal open={modalOpen} prompt={value} onClose={() => setModalOpen(false)} />
    </>
  )
}
