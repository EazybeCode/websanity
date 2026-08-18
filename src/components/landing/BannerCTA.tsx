import { useTranslations } from 'next-intl'

const APP_LINK = 'https://eazybe.info/1f46a7'

export function BannerCTA() {
  const t = useTranslations('landingV3.bannerCta')
  return (
    <section className="banner-cta-wrap">
      <div className="container">
        <a href={APP_LINK} className="banner-cta" target="_blank" rel="noopener noreferrer">
          <span className="banner-cta-rail" aria-hidden="true" />
          <span className="banner-cta-glow" aria-hidden="true" />

          <div className="banner-cta-icon" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bea.png" alt="Bea — Eazybe's WhatsApp AI agent assistant" className="banner-cta-img" loading="lazy"/>
          </div>

          <div className="banner-cta-copy">
            <div className="banner-cta-eyebrow">
              <span className="banner-cta-dot" /> {t('eyebrow')}
            </div>
            <h3>
              {t('headline')}
            </h3>
            <p>{t('subtitle')}</p>
          </div>

          <span className="banner-cta-btn">
            {t('button')}
          </span>
        </a>
      </div>
    </section>
  )
}
