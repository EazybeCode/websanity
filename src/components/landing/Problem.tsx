'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'

const CYCLE_MS = 7000

export function Problem() {
  const t = useTranslations('landingV3.problem')
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid || !('IntersectionObserver' in window)) return
    const cards = grid.querySelectorAll<HTMLElement>('.p-card')
    let visible = false
    let loopTimer: number | null = null
    const fire = () => {
      if (!visible) return
      cards.forEach((c) => c.classList.remove('in-view'))
      requestAnimationFrame(() =>
        requestAnimationFrame(() => cards.forEach((c) => c.classList.add('in-view')))
      )
    }
    const start = () => {
      if (loopTimer) return
      fire()
      loopTimer = window.setInterval(fire, CYCLE_MS)
    }
    const stop = () => {
      if (loopTimer) {
        clearInterval(loopTimer)
        loopTimer = null
      }
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          visible = e.isIntersecting
          if (visible) start()
          else stop()
        }
      },
      { threshold: 0.25 }
    )
    io.observe(grid)
    return () => { io.disconnect(); stop() }
  }, [])

  return (
    <section className="problem">
      <div className="container">
        <div className="sec-head centered reveal">
          <span className="sec-tag">{t('tag')}</span>
          <h2>{t('headline')} <em>{t('headlineEm')}</em>{t('headlineRest')}</h2>
          <p>{t('subtitle')}</p>
        </div>
        <div className="problem-grid" ref={gridRef}>
          <div className="p-card reveal">
            <div className="idx">{t('card1Idx')}</div>
            <h3>{t('card1Title')} <em>{t('card1TitleEm')}</em></h3>
            <p>{t('card1Desc')}</p>
            <div className="p-visual">
              <div className="scene-crm">
                <div className="crm-head">
                  <span><span className="dot" />{t('card1CrmHead')}</span>
                  <span>Q4</span>
                </div>
                <div className="crm-rows">
                  <div className="crm-row" />
                  <div className="crm-row" />
                  <div className="crm-row" />
                  <div className="crm-row" />
                  <div className="crm-empty">{t('card1CrmEmpty')}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-card reveal" style={{ transitionDelay: '.1s' }}>
            <div className="idx">{t('card2Idx')}</div>
            <h3>{t('card2Title')} <em>{t('card2TitleEm')}</em></h3>
            <p>{t('card2Desc')}</p>
            <div className="p-visual">
              <div className="scene-chat">
                <div className="chat-bubble them">{t('card2ChatMsg')}</div>
                <div className="chat-bubble time">{t('card2ChatTime')}</div>
                <div className="chat-bubble you"><span className="typing-dots"><span /><span /><span /></span></div>
                <div className="chat-competitor">
                  <span className="x">⏳</span>
                  <span>{t('card2Competitor')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-card reveal" style={{ transitionDelay: '.2s' }}>
            <div className="idx">{t('card3Idx')}</div>
            <h3>{t('card3Title')} <em>{t('card3TitleEm')}</em></h3>
            <p>{t('card3Desc')}</p>
            <div className="p-visual">
              <div className="scene-buried">
                <div className="buried-chart">
                  <svg viewBox="0 0 100 60" preserveAspectRatio="none">
                    <path className="area" d="M0,15 L15,18 L30,28 L45,32 L60,42 L75,48 L100,55 L100,60 L0,60 Z" />
                    <path className="line" d="M0,15 L15,18 L30,28 L45,32 L60,42 L75,48 L100,55" />
                    <circle className="dot" cx="0" cy="15" r="1.8" />
                    <circle className="dot" cx="30" cy="28" r="1.8" />
                    <circle className="dot" cx="60" cy="42" r="1.8" />
                    <circle className="dot" cx="100" cy="55" r="1.8" />
                    <text className="label" x="100" y="9" textAnchor="end">{t('card3ChartLabel')}</text>
                  </svg>
                </div>
                <div className="buried-label">{t('card3BuriedLabel')}</div>
                <div className="buried-stack">
                  <div className="buried-row" />
                  <div className="buried-row" />
                  <div className="buried-row" />
                  <div className="buried-row" />
                  <div className="buried-row" />
                  <div className="buried-row" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-card reveal" style={{ transitionDelay: '.3s' }}>
            <div className="idx">{t('card4Idx')}</div>
            <h3>{t('card4Title')} <em>{t('card4TitleEm')}</em></h3>
            <p>{t('card4Desc')}</p>
            <div className="p-visual">
              <div className="scene-chat">
                <div className="chat-bubble them">{t('card4ChatMsg1')}</div>
                <div className="chat-bubble them">{t('card4ChatMsg2')}</div>
                <div className="chat-bubble time">{t('card4ChatTime')}</div>
                <div className="chat-competitor">
                  <span className="x">⏳</span>
                  <span>{t('card4Competitor')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="problem-foot reveal">{t('footnote')} <span>{t('footnoteEm')}</span> {t('footnoteRest')}</p>

        <div className="steps-cta">
          <div className="steps-cta-line">
            <span className="steps-cta-check" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#7CC576" aria-hidden="true">
                <path d="M12 1.5l2.3 1.7 2.8-.3 1 2.7 2.7 1L20.5 9l1.7 2.3-1.7 2.3.3 2.8-2.7 1-1 2.7-2.8-.3L12 21.5l-2.3-1.7-2.8.3-1-2.7-2.7-1 .3-2.8L1.8 11.3 3.5 9l-.3-2.8 2.7-1 1-2.7 2.8.3L12 1.5z" />
                <path d="M7.5 12.2l3 3 6-6" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>{t('stepsCtaText')}</span>
          </div>
          <a href="#agents" className="steps-cta-btn">{t('stepsCtaBtn')}</a>
        </div>
      </div>
    </section>
  )
}
