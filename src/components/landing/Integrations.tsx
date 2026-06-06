import { useTranslations } from 'next-intl'

interface Integration {
  name: string
  file: string
}

// Self-hosted brand logos under /public/integrations/. All filenames are
// kebab-case so the URLs stay clean without URL-encoding.
const ITEMS: Integration[] = [
  { name: 'HubSpot',        file: 'hubspot.svg' },
  { name: 'Salesforce',     file: 'salesforce.svg' },
  { name: 'Zoho',           file: 'zoho.svg' },
  { name: 'Pipedrive',      file: 'pipedrive.svg' },
  { name: 'Bitrix24',       file: 'bitrix.svg' },
  { name: 'LeadSquared',    file: 'leadsquared.svg' },
  { name: 'Freshworks',     file: 'freshworks.svg' },
  { name: 'Google Sheets',  file: 'google-sheets.svg' },
  { name: 'Custom API',     file: 'custom-api.svg' },
]

export function Integrations() {
  const t = useTranslations('landingV3.integrations')
  return (
    <section className="section" data-tone="dark" id="integrations">
      <div className="container">
        <div className="sec-head centered reveal">
          <span className="sec-tag">{t('tag')}</span>
          <h2>{t('headline')} <em>{t('headlineEm')}</em> {t('headlineEnd')}</h2>
          <p style={{ maxWidth: 760, width: '100%', textAlign: 'justify', textAlignLast: 'center', hyphens: 'auto' }}>
            {t('subtitle')}
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, maxWidth: 1000, margin: '0 auto' }}>
          {ITEMS.map((i, idx) => (
            <div
              key={i.name}
              className="reveal"
              style={{
                padding: '20px 12px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 14,
                backdropFilter: 'blur(8px)',
                transitionDelay: `${idx * 0.05}s`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/integrations/${encodeURI(i.file)}`}
                alt={`${i.name} logo`}
                width={34}
                height={34}
                loading="lazy"
                style={{ width: 34, height: 34, objectFit: 'contain' }}
              />
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 16, fontWeight: 500, color: '#fff' }}>{i.name}</div>
            </div>
          ))}
        </div>
        <p className="reveal integrations-foot" style={{ textAlign: 'center', fontFamily: 'var(--f-display)', fontSize: 20, color: 'rgba(255,255,255,0.7)', marginTop: 50 }}>
          {t('footnote')}
        </p>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <a href="https://eazybe.com/integrations" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg reveal" style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>
            {t('cta')}
          </a>
        </div>
      </div>
    </section>
  )
}
