'use client'

import { useTranslations } from 'next-intl'

const ROW1 = [
  ['676859615a3ec360e3bc5d4c_university%20living.svg', 'University Living'],
  ['67685bae06432a9005e774af_satrack.svg', 'Satrack'],
  ['68d25a15f02d0e1fc5306a4d_orbidi.svg', 'Orbidi'],
  ['67685961ca70cc2713405aac_pw.svg', 'Physics Wallah'],
  ['6768596177cb968e98f60728_wanderon.svg', 'WanderOn'],
  ['67685ab1ca70cc27134152fa_studyin.svg', 'Studyin'],
  ['686e2d4a3d0a9398961d72d1_kreedo%20logo.svg', 'Kreedo'],
  ['686e2d4a1f16e978af267356_travclan%20logo.svg', 'TravClan'],
  ['68d25a141898ff58b264ab16_uniacco.svg', 'Uniacco'],
  ['68d25a158e7a74d2a6ce2193_unicreds.svg', 'Unicreds'],
] as const

const ROW2 = [
  ['68d259050172254d374cf358_buyco.svg', 'Buyco'],
  ['68d25a14a54fe3f4af5ae758_wanderson.svg', 'Wanderson'],
  ['68d25a143e538dd32cc89691_br%20marketing.svg', 'BR Marketing'],
  ['68d25a157766b001fd9135d1_pickyour%20trail.svg', 'PickYourTrail'],
  ['68d25a16d52764746d130664_motochile.svg', 'Motochile'],
  ['68d25a15fca5f9ee4d1ca693_alto%20qi.svg', 'Alto QI'],
  ['68d2538dfc57d68938d78ed8_habi.webp', 'Habi'],
  ['68d25392e01ab88e0c9940a3_toku.webp', 'Toku'],
  ['68d25390bf14e7cc65047a8e_nuvemshop.webp', 'Nuvemshop'],
  ['68d2538dcc1a11c6624bb394_belvo.webp', 'Belvo'],
] as const

const BASE = 'https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/'

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
              <img key={`r1-${i}`} src={BASE + slug} alt={alt as string} referrerPolicy="no-referrer"  loading="lazy"/>
            ))}
          </div>
        </div>

        <div className="logo-marquee">
          <div className="logo-track bwd">
            {[...ROW2, ...ROW2].map(([slug, alt], i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={`r2-${i}`} src={BASE + slug} alt={alt as string} referrerPolicy="no-referrer"  loading="lazy"/>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
