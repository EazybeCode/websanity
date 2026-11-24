import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getAlternates } from '@/lib/seo-helpers'
import { getCaseStudiesPageContent } from '@/data/case-studies-content'
import { getCaseStudyCardOverrides } from '@/lib/sanity-queries'
import { SoftwareRatingSchema } from '@/components/seo/SoftwareRatingSchema'
import { pageDates, withPageDates } from '@/lib/page-dates'

export const dynamic = 'force-static'
// Re-render every minute so logos uploaded in Sanity show up.
export const revalidate = 60

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

async function baseMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = getCaseStudiesPageContent(locale)
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: getAlternates(locale, '/case-studies'),
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      title: t.meta.title.replace(' | Eazybe', ''),
      description: t.meta.ogDescription,
      siteName: 'Eazybe',
    },
  }
}

const SITE_URL = 'https://eazybe.com'

// Brand guidelines v1.2 (same language as the BMC Hyundai / ITECSUR pages):
// dark hero with dot grid + one blue light, Geist Bold headings with one blue
// shimmer phrase, Geist Mono labels, 6/8/10/16px corners, corner-lit cards,
// Eazybe Blue primary CTA with a hairline-outline secondary.
const CSS = `
/* section.cs-hero outranks the generic [data-tone='dark'] background in brand-pages.css. */
.landing .v16-brand section.cs-hero {
  position: relative; padding: clamp(140px, 14vw, 176px) 0 clamp(72px, 8vw, 104px); text-align: center; color: #fff;
  background:
    radial-gradient(ellipse 60% 55% at 50% -10%, rgba(43, 89, 255, 0.4), rgba(43, 89, 255, 0) 70%),
    radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px) 0 0 / 22px 22px,
    #0b0b0c;
}
.landing .v16-brand .cs-hero ::selection, .landing .v16-brand .cs-cta ::selection { background: #2b59ff; color: #fff; }
.landing .v16-brand .cs-hero .container { max-width: 880px; }
.landing .v16-brand .cs-eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.14); background: #111114;
  font-family: 'Geist Mono', ui-monospace, monospace; font-size: 12.5px; font-weight: 500; letter-spacing: .12em; text-transform: uppercase; color: #7c98ff; }
.landing .v16-brand .cs-eyebrow::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #2ec27e; box-shadow: 0 0 10px rgba(46, 194, 126, .8); }
.landing .v16-brand .cs-hero h1 { margin: 24px auto 0; font-size: clamp(38px, 5.2vw, 64px); line-height: 1.04; letter-spacing: -0.04em !important; color: #fff; }
.landing .v16-brand .cs-hero h1 em, .landing .v16-brand .cs-cta h2 em {
  display: inline-block; font-style: normal;
  background: linear-gradient(90deg, #7c98ff 0%, #7c98ff 38%, #ffffff 50%, #7c98ff 62%, #7c98ff 100%);
  background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; color: transparent;
  filter: drop-shadow(0 0 18px rgba(43, 89, 255, 0.45)); animation: v16-brand-shim 3.5s linear infinite;
}
.landing .v16-brand .cs-lede { margin: 24px auto 0; max-width: 680px; font-size: clamp(16.5px, 1.6vw, 19px); line-height: 1.6; color: #b4b4bc; }
.landing .v16-brand .cs-hero-ctas { margin-top: 32px; display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
.landing .v16-brand .cs-foot { margin: 20px auto 0; max-width: 620px; font-size: 13.5px; line-height: 1.6; color: #8a8c93; }
.landing .v16-brand .cs-foot a { color: #7c98ff; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; }

/* Stories */
.landing .v16-brand .cs-stories { padding: clamp(72px, 8vw, 104px) 0; background: #fff; scroll-margin-top: 80px; }
.landing .v16-brand .cs-stories .container { max-width: 1180px; }
.landing .v16-brand .cs-stories-head { margin-bottom: 44px; }
/* Two cards per row on desktop (4 stories = a clean 2x2), one on phones. */
.cs-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; max-width: 1040px; margin: 0 auto; align-items: stretch; }
@media (max-width: 760px) { .cs-grid { grid-template-columns: 1fr; } }
.landing .v16-brand .cs-card {
  --tone: #7c98ff; --tone-glow: rgba(43, 89, 255, 0.45);
  position: relative; display: flex; flex-direction: column; border-radius: 16px; overflow: hidden;
  border: 1px solid transparent;
  background:
    linear-gradient(#ffffff, #ffffff) padding-box,
    linear-gradient(140deg, rgba(43, 89, 255, 0.7), #e6e6e3 30%, #e6e6e3 70%, rgba(43, 89, 255, 0.35)) border-box;
  box-shadow: 0 14px 34px rgba(43, 89, 255, 0.08);
  /* opacity/transform also carry the scroll reveal (.reveal -> .show). */
  transition: opacity .6s cubic-bezier(0.2, 0.8, 0.2, 1), transform .45s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow .25s ease;
}
.landing .v16-brand .cs-card.tone-1 { --tone: #f6c52b; --tone-glow: rgba(246, 197, 43, 0.4); }
.landing .v16-brand .cs-card.tone-2 { --tone: #3dd68c; --tone-glow: rgba(47, 191, 119, 0.42); }
.landing .v16-brand .cs-card:hover { transform: translateY(-5px); box-shadow: 0 28px 50px -14px rgba(43, 89, 255, 0.28); }

/* Cover */
.landing .v16-brand .cs-cover {
  position: relative; padding: 24px 26px 46px; min-height: 170px; color: #fff; isolation: isolate;
  background:
    radial-gradient(ellipse 75% 95% at 100% 0%, var(--tone-glow), rgba(0, 0, 0, 0) 70%),
    radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px) 0 0 / 18px 18px,
    #0b0b0c;
}
.landing .v16-brand .cs-cover::after { content: ''; position: absolute; inset: 0; z-index: -1; pointer-events: none; opacity: 0; transition: opacity .3s ease;
  background: radial-gradient(ellipse 90% 120% at 100% 0%, var(--tone-glow), rgba(0, 0, 0, 0) 75%); }
.landing .v16-brand .cs-card:hover .cs-cover::after { opacity: 1; }
.landing .v16-brand .cs-country { position: absolute; top: 18px; right: 18px; display: inline-flex; align-items: center; gap: 7px; padding: 4px 9px; border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.14); background: rgba(17, 17, 20, 0.8);
  font-family: 'Geist Mono', ui-monospace, monospace; font-size: 10.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: #d6d9e3; }
.landing .v16-brand .cs-country::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #2ec27e; }
.landing .v16-brand .cs-stat { font-family: 'Geist', sans-serif; font-weight: 700; font-size: clamp(42px, 4.4vw, 56px); line-height: 1; letter-spacing: -0.04em;
  color: var(--tone); text-shadow: 0 0 30px var(--tone-glow); font-variant-numeric: tabular-nums; }
.landing .v16-brand .cs-stat-l { margin-top: 8px; max-width: 75%; font-size: 14px; line-height: 1.45; color: #b4b4bc; }
.landing .v16-brand .cs-avatar {
  position: absolute; left: 26px; bottom: -30px; z-index: 1;
  width: 64px; height: 64px; border-radius: 12px; overflow: hidden;
  display: inline-flex; align-items: center; justify-content: center;
  background: #fff; border: 1px solid #e6e6e3; box-shadow: 0 10px 24px -10px rgba(11, 11, 12, 0.45);
  font-family: 'Geist Mono', ui-monospace, monospace; font-size: 16px; font-weight: 600; color: #2b59ff;
}
.landing .v16-brand .cs-avatar img { width: 100%; height: 100%; object-fit: contain; padding: 6px; }

/* Body */
.landing .v16-brand .cs-body { display: flex; flex-direction: column; flex: 1; padding: 44px 26px 24px; }
.landing .v16-brand .cs-card-head { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 12px; }
.landing .v16-brand .cs-company { font-size: 17px; font-weight: 700; letter-spacing: -0.01em; color: #0b0b0c; }
.landing .v16-brand .cs-industry { display: inline-block; padding: 3px 8px; border-radius: 6px; background: #eef2ff;
  font-family: 'Geist Mono', ui-monospace, monospace; font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: #2b59ff; }
.landing .v16-brand .cs-headline { margin: 16px 0 10px; font-size: 21px; font-weight: 700; line-height: 1.3; letter-spacing: -0.02em; color: #0b0b0c; }
.landing .v16-brand .cs-summary { margin: 0; font-size: 15px; line-height: 1.65; color: #5a5c64; flex: 1; }
/* !important: landing-v3.css recolours every main link on hover (the faded green). */
.landing .v16-brand .cs-link, .landing .v16-brand .cs-link:hover { color: #2b59ff !important; text-decoration: none !important; }
.landing .v16-brand .cs-link { display: inline-flex; align-items: center; gap: 6px; margin-top: 22px; padding-top: 18px; width: 100%;
  border-top: 1px solid #e6e6e3; font-size: 14.5px; font-weight: 600; }
/* Whole card is clickable through the link's overlay. */
.landing .v16-brand .cs-link::after { content: ''; position: absolute; inset: 0; border-radius: 16px; }
.landing .v16-brand .cs-link span { transition: transform .18s ease; }
.landing .v16-brand .cs-card:hover .cs-link span { transform: translateX(4px); }
.landing .v16-brand .cs-link:focus-visible { outline: none; }
.landing .v16-brand .cs-link:focus-visible::after { outline: 2px solid #2b59ff; outline-offset: 3px; }

/* Final CTA */
.landing .v16-brand .cs-cta { padding: clamp(72px, 8vw, 104px) 0; }
.landing .v16-brand .cs-cta-box { position: relative; max-width: 980px; margin: 0 auto; padding: clamp(36px, 5vw, 60px) clamp(24px, 4vw, 56px); border-radius: 16px; text-align: center;
  background: radial-gradient(ellipse 70% 80% at 50% 0%, rgba(43, 89, 255, 0.28), rgba(43, 89, 255, 0) 70%), #111114;
  border: 1px solid #2b59ff; box-shadow: 0 0 48px -12px rgba(43, 89, 255, 0.6); }
.landing .v16-brand .cs-cta h2 { margin: 0 auto; max-width: none; font-size: clamp(30px, 3.6vw, 46px); line-height: 1.1; color: #fff; }
.landing .v16-brand .cs-cta p { margin: 18px auto 0; max-width: 680px; font-size: 17px; line-height: 1.6; color: #b4b4bc; }
.landing .v16-brand .cs-cta-btns { margin-top: 30px; display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
.landing .v16-brand .cs-cta .cs-cta-demo { color: #fff !important; border-color: rgba(255, 255, 255, 0.18) !important; }
.landing .v16-brand .cs-cta .cs-cta-demo:hover { border-color: rgba(255, 255, 255, 0.5) !important; }

@media (prefers-reduced-motion: reduce) {
  .landing .v16-brand .cs-card, .landing .v16-brand .cs-link span { transition: none; }
  .landing .v16-brand .cs-card:hover { transform: none; }
  .landing .v16-brand .cs-hero h1 em, .landing .v16-brand .cs-cta h2 em { animation: none; }
}
`

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = getCaseStudiesPageContent(locale)
  const cms = await getCaseStudyCardOverrides(locale)

  const localePath = locale === 'en' ? '' : `/${locale}`
  const homeUrl = `${SITE_URL}${locale === 'en' ? '/' : `/${locale}`}`
  const pageUrl = `${SITE_URL}${localePath}/case-studies`

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.breadcrumb.home, item: homeUrl },
      { '@type': 'ListItem', position: 2, name: t.breadcrumb.current, item: pageUrl },
    ],
  }

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t.breadcrumb.current,
    url: pageUrl,
    description: t.meta.description,
    publisher: { '@type': 'Organization', name: 'Eazybe', url: SITE_URL },
  }

  return (
    <>
      <SoftwareRatingSchema locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Hero — brand dark hero (dot grid + one soft blue light), same as the case study pages. */}
      <section className="cs-hero" data-tone="dark">
        <div className="container">
          <span className="cs-eyebrow">{t.hero.tag}</span>
          <h1>
            {t.hero.h1Lead} <em>{t.hero.h1Highlight}</em>
          </h1>
          <p className="cs-lede">{t.hero.subtitle}</p>
          <div className="cs-hero-ctas">
            <a href="#stories" className="btn btn-primary btn-lg">{t.hero.cta} ↓</a>
          </div>
          <p className="cs-foot">
            {(() => {
              const text = t.hero.footnote
              const i = text.indexOf('Eazybe')
              if (i === -1) return text
              return (
                <>
                  {text.slice(0, i)}
                  <a href={`https://eazybe.com${locale === 'en' ? '/' : `/${locale}`}`}>Eazybe</a>
                  {text.slice(i + 'Eazybe'.length)}
                </>
              )
            })()}
          </p>
        </div>
      </section>

      {/* Stories */}
      <section id="stories" className="cs-stories">
        <div className="container">
          <div className="sec-head centered cs-stories-head">
            <h2>{t.grid.h2}</h2>
            <p>{t.grid.subtitle}</p>
          </div>
          <div className="cs-grid">
            {t.cards.map((c, i) => {
              const slug = c.href?.split('/').pop()
              const over = slug ? cms[slug] : undefined
              return (
              // .reveal: fades up when scrolled into view (site RevealOnScroll), staggered per card.
              <article key={c.company} className={`cs-card reveal tone-${i % 3}`} style={{ transitionDelay: `${(i % 2) * 120}ms` }}>
                {/* Dark cover: the story's headline number, like the case study heroes. */}
                <div className="cs-cover">
                  {c.country && <span className="cs-country">{c.country}</span>}
                  {c.stat && (
                    <>
                      <div className="cs-stat">{c.stat.value}</div>
                      <div className="cs-stat-l">{c.stat.label}</div>
                    </>
                  )}
                  {/* Alt text derives from the company name — no Studio field needed. */}
                  {over?.logoUrl ? (
                    <span className="cs-avatar">
                      <img src={`${over.logoUrl}?w=128&h=128&fit=max&auto=format`} alt={`${over?.company || c.company} logo`} loading="lazy" />
                    </span>
                  ) : (
                    <span className="cs-avatar" aria-hidden="true">{c.initials}</span>
                  )}
                </div>
                <div className="cs-body">
                  <div className="cs-card-head">
                    <div className="cs-company">{over?.company || c.company}</div>
                    <span className="cs-industry">{over?.industry || c.industry}</span>
                  </div>
                  <h3 className="cs-headline">{over?.headline || c.headline}</h3>
                  <p className="cs-summary">{over?.summary || c.summary}</p>
                  {c.href && (
                    <a className="cs-link" href={locale === 'en' ? c.href : `/${locale}${c.href}`}>
                      {t.grid.readStory} <span aria-hidden="true">→</span>
                    </a>
                  )}
                </div>
              </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA — dark brand section with the dot grid. */}
      <section className="cs-cta" data-tone="dark">
        <div className="container">
          <div className="cs-cta-box">
            <h2>{t.finalCta.h2}</h2>
            <p>{t.finalCta.body}</p>
            <div className="cs-cta-btns">
              <a href={locale === 'en' ? '/pricing' : `/${locale}/pricing`} className="btn btn-primary btn-lg">
                {t.finalCta.primary}
              </a>
              <a href="https://eazybe.info/demono" className="btn btn-lg cs-cta-demo">
                {t.finalCta.secondary}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// Published / last-modified dates as meta tags (article:published_time / article:modified_time).
export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return withPageDates(await baseMetadata(props), pageDates({ page: '/case-studies' }))
}
