'use client'

import { useTranslations } from 'next-intl'

// Self-hosted client logos under /public/clients/. Same 10 logos drive
// both rows of the marquee — ROW1 in original order (forward scroll),
// ROW2 in reverse order (backward scroll) so the two rows don't visually
// duplicate at any given moment.
const LOGOS = [
  ['university-living-logo.svg', 'University Living'],
  ['satrack-logo.svg', 'Satrack'],
  ['orbidi-logo.svg', 'Orbidi'],
  ['pw-logo.svg', 'Physics Wallah'],
  ['wanderon-logo.svg', 'WanderOn'],
  ['studyin-logo.svg', 'Studyin'],
  ['kreedo-logo.svg', 'Kreedo'],
  ['travclan-logo.svg', 'TravClan'],
  ['uniacco-logo.svg', 'Uniacco'],
  ['unicreds-logo.svg', 'Unicreds'],
] as const

const ROW1 = LOGOS
const ROW2 = [...LOGOS].reverse()

export function LogoBar() {
  const t = useTranslations('landingV3.logoBar')
  return (
    <section className="logo-bar" style={{ padding: '70px 0 50px' }}>
      <div className="container">
        <p className="logo-bar-label">{t('trustedBy')}</p>

        <div className="logo-marquee">
          <div className="logo-track fwd">
            {[...ROW1, ...ROW1].map(([slug, alt], i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={`r1-${i}`} src={`/clients/${slug}`} alt={alt as string} loading="lazy" />
            ))}
          </div>
        </div>

        <div className="logo-marquee">
          <div className="logo-track bwd">
            {[...ROW2, ...ROW2].map(([slug, alt], i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={`r2-${i}`} src={`/clients/${slug}`} alt={alt as string} loading="lazy" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
