'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useTrialModal } from '@/providers/TrialModalProvider'

const CYCLE = 9000
const STEP_DURATIONS = [0, 3000, 6000]

export function HowItWorks() {
  const t = useTranslations('landingV3.howItWorks')
  const { openModal } = useTrialModal()
  const wrapRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number>(0)
  const [logoActive, setLogoActive] = useState<Set<number>>(new Set())
  const [agentOn, setAgentOn] = useState<Set<number>>(new Set())

  useEffect(() => {
    const timeouts: number[] = []

    const clearAll = () => {
      timeouts.forEach((t) => clearTimeout(t))
      timeouts.length = 0
    }
    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms)
      timeouts.push(id)
      return id
    }
    const setActiveStep = (idx: number) => {
      setActive(idx)
      setLogoActive(new Set())
      setAgentOn(new Set())
      if (idx === 1) {
        ;[0, 1, 2].forEach((i) =>
          schedule(() => setLogoActive((prev) => new Set(prev).add(i)), 200 + i * 350)
        )
      } else if (idx === 2) {
        ;[0, 1, 2].forEach((i) =>
          schedule(() => setAgentOn((prev) => new Set(prev).add(i)), 300 + i * 400)
        )
      }
    }
    const runCycle = () => {
      clearAll()
      STEP_DURATIONS.forEach((ms, i) => schedule(() => setActiveStep(i), ms))
    }

    runCycle()
    const cycleTimer = window.setInterval(runCycle, CYCLE)

    return () => {
      clearInterval(cycleTimer)
      clearAll()
    }
  }, [])

  return (
    <section className="section">
      <div className="container">
        <div className="sec-head centered reveal">
          <span className="sec-tag">{t('tag')}</span>
          <h2>{t('headline')} <em>{t('headlineEm')}</em> {t('headlineEnd')}</h2>
          <p style={{ maxWidth: 760, width: '100%', textAlign: 'justify', textAlignLast: 'center', hyphens: 'auto' }}>
            {t('subtitle')}
          </p>
        </div>
        <div className="steps" ref={wrapRef}>
          <div className={`step${active === 0 ? ' active' : ''}`} data-step="1">
            <div className="step-num">1</div>
            <h3>{t('step1Title')}</h3>
            <p>{t('step1Desc')}</p>
            <div className="step-scene scene-install">
              <div className="si-browser">
                <div className="si-browser-bar">
                  <span className="si-dot" /><span className="si-dot" /><span className="si-dot" />
                  <span className="si-url">{t('step1Browser')}</span>
                  <span className="si-ext">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.5 7.27L12 12l-8.5-4.73M12 22V12"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
                  </span>
                </div>
                <div className="si-installed">
                  <span className="si-check">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  {t('step1Added')}
                </div>
              </div>
            </div>
          </div>

          <div className={`step${active === 1 ? ' active' : ''}`} data-step="2">
            <div className="step-num">2</div>
            <h3>{t('step2Title')}</h3>
            <p>{t('step2Desc')}</p>
            <div className="step-scene scene-connect">
              <div className="sc-left">
                {['hs', 'sf', 'zo'].map((slug, i) => (
                  <div key={slug} className={`sc-logo${logoActive.has(i) ? ' active' : ''}`}>
                    {slug === 'hs' && <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF7A59"><path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.984 2.21 2.21 0 00-4.42 0c0 .873.52 1.626 1.263 1.976v2.868a5.1 5.1 0 00-2.348 1.028l-6.293-4.9a2.06 2.06 0 00.054-.453 2.1 2.1 0 10-.86 1.7l6.073 4.73a5.114 5.114 0 00-1 3.4 6.4 6.4 0 1 0 12.7 0 6.4 6.4 0 0 0-6.1-6z"/></svg>}
                    {slug === 'sf' && <svg width="18" height="14" viewBox="0 0 48 34" fill="#00A1E0"><path d="M19.5 6.8c1.5-1.6 3.7-2.6 6-2.6 3.1 0 5.9 1.8 7.3 4.5 1.2-.5 2.4-.8 3.8-.8 5.3 0 9.6 4.3 9.6 9.6s-4.3 9.6-9.6 9.6c-.6 0-1.3-.1-1.9-.2-1.2 2.1-3.5 3.6-6.1 3.6-1.1 0-2.1-.3-3-.7-1.2 2.8-4 4.7-7.2 4.7-3.4 0-6.3-2-7.6-4.9-.7.1-1.3.2-2 .2C4 30 .3 26.3.3 21.7c0-3.1 1.7-5.8 4.2-7.2-.5-1.2-.8-2.5-.8-3.8C3.7 5.2 8 1 13.2 1c3 0 5.6 1.4 7.3 3.6z"/></svg>}
                    {slug === 'zo' && <svg width="16" height="16" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="4" fill="#E42527"/><path d="M7 7h9.5L8.5 16H17v2H6v-1.5L14.5 9H7V7z" fill="#fff"/></svg>}
                  </div>
                ))}
              </div>
              <div className="sc-wire">
                <span className="sc-wire-line" />
                <span className="sc-wire-orb" />
              </div>
              <div className="sc-right">
                <div className="sc-badge">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {t('step2Auth')}
                </div>
              </div>
            </div>
          </div>

          <div className={`step${active === 2 ? ' active' : ''}`} data-step="3">
            <div className="step-num">3</div>
            <h3>{t('step3Title')}</h3>
            <p>{t('step3Desc')}</p>
            <div className="step-scene scene-activate">
              {[t('step3Agent1'), t('step3Agent2'), t('step3Agent3')].map((name, i) => (
                <div key={name} className={`sa-agent${agentOn.has(i) ? ' on' : ''}`}>
                  <span className="sa-toggle"><span /></span>
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="steps-cta">
          <div className="steps-cta-line">
            <span className="steps-cta-check" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#7CC576" aria-hidden="true">
                <path d="M12 1.5l2.3 1.7 2.8-.3 1 2.7 2.7 1L20.5 9l1.7 2.3-1.7 2.3.3 2.8-2.7 1-1 2.7-2.8-.3L12 21.5l-2.3-1.7-2.8.3-1-2.7-2.7-1 .3-2.8L1.8 11.3 3.5 9l-.3-2.8 2.7-1 1-2.7 2.8.3L12 1.5z" />
                <path d="M7.5 12.2l3 3 6-6" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>{t('ctaFootnote')}</span>
          </div>
          <a href="https://eazybe.info/demono" onClick={(e) => { e.preventDefault(); openModal('demo') }} className="steps-cta-btn">{t('ctaBtn')}</a>
        </div>
      </div>
    </section>
  )
}
