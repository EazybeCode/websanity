'use client'

import { useTranslations } from 'next-intl'
import { openChromeExtensionStorePopup } from '@/utils/openChromeExtensionStore'

export function Hero() {
  const t = useTranslations('landingV3.hero')

  return (
    <>
      <section className="hero" data-tone="dark">
        <div className="container hero-inner">
          <span className="hero-tag">
            <span className="pulse" /> {t('tag')}
          </span>
          <h1>
            {t.rich('headline', { em: (chunks) => <em>{chunks}</em>, br: () => <br /> })}
            {t('headlineEm') ? <> <em>{t('headlineEm')}</em></> : null}
          </h1>
          <div className="hero-sub-group">
            <p className="hero-sub">{t('subtitle')}</p>
            <p className="hero-sub">{t('subtitle2')}</p>
          </div>

          <div className="hero-cta-pair" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginTop: 28, marginBottom: 40 }}>
            <a
              href="https://eazybe.info/demono"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-lg"
              style={{
                background: '#0F1115',
                color: '#ffffff',
                border: '1.5px solid #ffffff',
                padding: '16px 30px',
                fontSize: 16,
                fontWeight: 600,
                boxShadow: '0 10px 28px -8px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              {t('ctaBookDemo')}
            </a>
            <a
              href="https://eazybe.info/web"
              onClick={(e) => {
                e.preventDefault()
                openChromeExtensionStorePopup('https://eazybe.info/web')
              }}
              className="btn btn-primary btn-lg"
              style={{
                background: '#6c5cc1',
                color: '#ffffff',
                border: '1.5px solid transparent',
                padding: '16px 30px',
                fontSize: 16,
                fontWeight: 600,
                boxShadow: '0 12px 32px -8px rgba(108,92,193,0.6), 0 1px 2px rgba(108,92,193,0.3)',
              }}
            >
              {t('ctaStartFree')}
            </a>
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
