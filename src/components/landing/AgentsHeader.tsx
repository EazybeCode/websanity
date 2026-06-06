import { useTranslations } from 'next-intl'

export function AgentsHeader() {
  const t = useTranslations('landingV3.agentsHeader')
  return (
    <section className="agents-header" id="agents">
      <div className="container">
        <div className="sec-head centered reveal">
          <span className="sec-tag">{t('tag')}</span>
          <h2>{t('headline')} <em>{t('headlineEm')}</em> {t('headlineRest')}</h2>
          <p style={{ maxWidth: 720, width: '100%', textAlign: 'center', hyphens: 'auto' }}>
            {t('subtitle')}
          </p>
          <p style={{ maxWidth: 720, width: '100%', textAlign: 'center', marginTop: 10, fontWeight: 500, color: 'var(--ink-2)' }}>
            {t('subtitleNote')}
          </p>
        </div>
      </div>
    </section>
  )
}
