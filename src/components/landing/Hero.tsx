'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

const EXAMPLES = [
  'Qualify inbound leads with BANT and route hot ones to my top rep…',
  'Sync every WhatsApp conversation to HubSpot automatically…',
  'Flag stalled deals and ping the owner when a customer goes quiet 48h…',
  'Reply in Portuguese to after-hours leads and book them into my calendar…',
  "Draft a follow-up in my voice when a prospect hasn't replied in 3 days…",
  'Alert my manager when any deal over $50k goes silent…',
]


export function Hero() {
  const t = useTranslations('landingV3.hero')
  const [value, setValue] = useState('')
  const [placeholder, setPlaceholder] = useState('Alert my manager when any deal over $50k goes silent…')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const focused = useRef(false)

  const redirectToApp = () => {
    window.open('https://eazybe.info/85c80b', '_blank', 'noopener,noreferrer')
  }

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
    redirectToApp()
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      redirectToApp()
    }
  }

  return (
    <>
      <section className="hero" data-tone="dark">
        <div className="container hero-inner">
          <span className="hero-tag">
            <span className="pulse" /> {t('tag')}
          </span>
          <h1>{t('headline')} <em>{t('headlineEm')}</em></h1>
          <p className="hero-sub">{t('subtitle')}</p>

          <div className="prompt-wrap">
            <div className="prompt-orb" />
            <label htmlFor="agent-prompt" className="prompt-label">
              <span className="prompt-label-dot" />
              {t('promptLabel')}
              <span className="prompt-label-arrow">↓</span>
            </label>
            <form className="prompt-box" onSubmit={onSubmit}>
              <div className="prompt-inner">
                <div className="prompt-icon" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4m0 12v4m-9-9h4m12 0h4M5.636 5.636l2.828 2.828m7.072 7.072l2.828 2.828M5.636 18.364l2.828-2.828m7.072-7.072l2.828-2.828"/></svg>
                </div>
                <textarea
                  ref={textareaRef}
                  id="agent-prompt"
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
                <button className="prompt-send" type="submit" aria-label={t('promptLabel')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
                </button>
              </div>
            </form>
            <div className="prompt-hint">
              <span>{t.rich('promptHint', { kbd: (chunks) => <kbd>{chunks}</kbd> })}</span>
            </div>
          </div>

          <div className="trust">
            <span><svg viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg> {t('trustHubspot')}</span>
            <span className="sep" />
            <span>{t('trustTeams')}</span>
            <span className="sep" />
            <span>{t('trustCountries')}</span>
            <span className="sep" />
            <span>{t('trustMeta')}</span>
          </div>
        </div>
      </section>

    </>
  )
}
