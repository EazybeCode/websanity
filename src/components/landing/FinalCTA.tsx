'use client'

import { useTranslations } from 'next-intl'

export function FinalCTA() {
  const t = useTranslations('landingV3.finalCta')
  return (
    <section className="final-cta" data-tone="dark">
      <div className="container">
        <h2 className="reveal">{t('headline')} <em>{t('headlineEm')}</em></h2>
        <p className="sub reveal">{t('subtitle')}</p>
        <div className="ctas reveal">
          <a
            href="#bea-form"
            className="btn btn-primary btn-lg"
            onClick={(e) => {
              e.preventDefault()
              window.dispatchEvent(new Event('eazybe:open-bea-form'))
            }}
          >
            {t('talkToAgent')}
          </a>
          <a href="https://eazybe.info/demono" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg">{t('bookDemo')}</a>
        </div>

        <div className="final-cta-trust">
          <div className="final-cta-trust-line">
            <span className="fct-item">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="#FFB74A" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              {t('trustHubspot')}
            </span>
            <span className="fct-sep" />
            <span className="fct-item">{t('trustTeams')}</span>
            <span className="fct-sep" />
            <span className="fct-item">{t('trustCountries')}</span>
            <span className="fct-sep" />
            <span className="fct-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true"><path d="M12 .297C5.444.297.156 5.585.156 12.143c0 4.918 3.166 9.084 7.553 10.55v-7.469H5.62v-3.08h2.09v-2.34c0-2.07 1.26-3.198 3.108-3.198.883 0 1.643.066 1.864.095v2.16h-1.28c-1.005 0-1.2.478-1.2 1.18v1.546h2.4l-.313 2.42a1.94 1.94 0 01-.04.06h-2.047v8.453c5.41-.85 9.55-5.534 9.55-11.183C23.844 5.585 18.556.297 12 .297z" /></svg>
              {t('trustMeta')}
            </span>
            <span className="fct-sep" />
            <span className="fct-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7CC576" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2l3 1.5 3 .5v6.5c0 4.5-3 7.5-6 9-3-1.5-6-4.5-6-9V4l3-.5L12 2z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              {t('trustCompliance')}
            </span>
          </div>

          <div className="final-cta-flags">
            <span className="fct-flag" title="India">🇮🇳</span>
            <span className="fct-flag" title="Brazil">🇧🇷</span>
            <span className="fct-flag" title="Mexico">🇲🇽</span>
            <span className="fct-flag" title="Spain">🇪🇸</span>
            <span className="fct-flag" title="United Arab Emirates">🇦🇪</span>
            <span className="fct-flag" title="Turkey">🇹🇷</span>
            <span className="fct-flag" title="Colombia">🇨🇴</span>
            <span className="fct-flag" title="Indonesia">🇮🇩</span>
            <span className="fct-flag" title="United Kingdom">🇬🇧</span>
            <span className="fct-flag" title="United States">🇺🇸</span>
            <span className="fct-flag-more">{t('moreCountries')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
