'use client'

import { useTranslations } from 'next-intl'
import { useTrialModal } from '@/providers/TrialModalProvider'

const APP_LINK = 'https://eazybe.info/6c2a82'

export function BannerCTA() {
  const t = useTranslations('landingV3.bannerCta')
  const { openModal } = useTrialModal()
  return (
    <section className="banner-cta-wrap">
      <div className="container">
        {/* Opens the trial form; after submit the user is sent to the demo
            shortlink. Direct APP_LINK href kept as a no-JS fallback. */}
        <a
          href={APP_LINK}
          onClick={(e) => { e.preventDefault(); openModal('trial', { redirectUrl: 'https://eazybe.info/demono' }) }}
          className="banner-cta"
        >
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
