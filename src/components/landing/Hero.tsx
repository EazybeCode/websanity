'use client'

import { useTranslations } from 'next-intl'

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

          {/* Hero social proof — a single slim row under the subtitle.
              Star rating on the left, customer logos on the right. No
              container, no divider, no duplicated "TRUSTED BY" label —
              logos at low opacity imply the meaning. */}
          <div className="hero-proof" aria-label="Customer trust">
            <div className="hero-proof-rating">
              <span className="hero-proof-stars" aria-hidden>★★★★★</span>
              <span className="hero-proof-rating-num">4.6 on HubSpot</span>
            </div>
            <div className="hero-proof-logos">
              {[
                ['university-living-logo.svg', 'University Living'],
                ['travclan-logo.svg', 'TravClan'],
                ['pw-logo.svg', 'Physics Wallah'],
                ['wanderon-logo.svg', 'WanderOn'],
                ['satrack-logo.svg', 'Satrack'],
              ].map(([slug, alt]) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={slug} src={`/clients/${slug}`} alt={alt} loading="lazy" />
              ))}
            </div>
          </div>

          <div className="hero-cta-pair" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginTop: 28, marginBottom: 40 }}>
            <a
              href="https://calendly.com/d/cw67-pt3-y2m"
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
              target="_blank"
              rel="noopener noreferrer"
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

          {/* Rating moved up into hero-proof; bottom strip now carries
              only the volume/reach signals so it doesn't duplicate. */}
          <div className="trust">
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
