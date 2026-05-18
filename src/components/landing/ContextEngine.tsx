'use client'

import { useTranslations } from 'next-intl'

export function ContextEngine() {
  const t = useTranslations('landingV3.contextEngine')
  return (
    <section className="section" data-tone="dark" style={{ padding: '90px 0 80px' }}>
      <div className="container">
        <div className="ce-pill reveal">
          <div className="ce-tag">
            <span className="ce-tag-dot" />
            {t('tag')}
          </div>
          <div className="ce-flow">
            <span className="ce-node n1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366"><path d="M12 2C6.49 2 2 6.49 2 12c0 1.89.53 3.7 1.54 5.28L2 22l4.84-1.5c1.52.83 3.24 1.27 4.99 1.27h.01c5.51 0 10-4.49 10.01-10 0-2.67-1.04-5.18-2.93-7.07z"/></svg>
              {t('whatsapp')}
            </span>
            <span className="ce-arrow" aria-hidden>
              <span className="ce-arrow-line" />
              <span className="ce-arrow-pip" />
              <span className="ce-arrow-head" />
            </span>
            <em className="ce-brain">{t('brain')}</em>
            <span className="ce-arrow" aria-hidden>
              <span className="ce-arrow-line" />
              <span className="ce-arrow-pip" />
              <span className="ce-arrow-head" />
            </span>
            <span className="ce-node n3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF7A59"><circle cx="12" cy="12" r="10" /></svg>
              {t('crm')}
            </span>
          </div>
          <p className="ce-note">
            {t('note')}
          </p>
        </div>
      </div>
    </section>
  )
}
