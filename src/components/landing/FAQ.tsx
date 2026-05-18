'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export function FAQ() {
  const t = useTranslations('landingV3.faq')
  const ITEMS = t.raw('items') as { q: string; a: string }[]
  const [open, setOpen] = useState<Set<number>>(new Set())
  const [showMoreMobile, setShowMoreMobile] = useState(false)
  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  const half = Math.ceil(ITEMS.length / 2)
  const columns = [ITEMS.slice(0, half), ITEMS.slice(half)]

  return (
    <section className="section" id="faq" style={{ paddingTop: 60 }}>
      <div className="container">
        <div className="sec-head centered reveal">
          <span className="sec-tag">{t('tag')}</span>
          <h2>{t('headline')} <em>{t('headlineEm')}</em>{t('headlineEnd') ? ` ${t('headlineEnd')}` : ''}</h2>
          <p style={{ maxWidth: 720, width: '100%', textAlign: 'center', hyphens: 'auto' }}>
            {t('subtitle')}
          </p>
        </div>

        <div className={`faq-grid${showMoreMobile ? ' faq-show-more' : ''}`}>
          {columns.map((column, colIdx) => (
            <div key={colIdx} className={`faq-col${colIdx === 1 ? ' faq-col-rest' : ''}`}>
              {column.map((it, i) => {
                const idx = colIdx === 0 ? i : i + half
                const isOpen = open.has(idx)
                return (
                  <div key={it.q} className={`faq-pill${isOpen ? ' open' : ''}`}>
                    <button
                      className="faq-pill-q"
                      onClick={() => toggle(idx)}
                      aria-expanded={isOpen}
                    >
                      <span>{it.q}</span>
                      <span className="faq-pill-chev" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </button>
                    <div className="faq-pill-a">
                      <div>{it.a}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {!showMoreMobile && (
          <button
            type="button"
            className="faq-mobile-more"
            onClick={() => setShowMoreMobile(true)}
          >
            {t('readMore')}
          </button>
        )}

        <p className="faq-footnote">
          {t('footnote')} <a href="https://wa.me/13024129610?text=Hi%20-%20I%20have%20a%20question%20about%20Eazybe." target="_blank" rel="noopener noreferrer">{t('footnoteLink')}</a>
        </p>
      </div>
    </section>
  )
}
