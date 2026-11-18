import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getAlternates } from '@/lib/seo-helpers'
import { getRoiPageContent } from '@/data/marketing-roi-content'
import { MarketingRoiCalculatorClient } from '@/components/pages/MarketingRoiCalculatorClient'
import { pageDates, withPageDates } from '@/lib/page-dates'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

async function baseMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = getRoiPageContent(locale)
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: getAlternates(locale, '/marketing-roi-calculator'),
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      title: t.meta.title.replace(' | Eazybe', ''),
      description: t.meta.ogDescription,
      siteName: 'Eazybe',
    },
  }
}

// SVG icons live here so the translation file stays pure strings.
const ICON_FREE = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)
const ICON_PRIVATE = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="10" width="16" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
)
const ICON_COMPLETE = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="6" y1="20" x2="6" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="18" y1="20" x2="18" y2="14" />
  </svg>
)
const ICON_INSTANT = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const SITE_URL = 'https://eazybe.com'

/** Links the first "Eazybe" in a sentence to the homepage. Done at render time
 *  rather than by splitting the string in the content file, because every
 *  locale's copy already contains the brand name verbatim. */
function linkBrand(text: string) {
  const BRAND = 'Eazybe'
  const i = text.indexOf(BRAND)
  if (i === -1) return text
  return (
    <>
      {text.slice(0, i)}
      <a className="roi-brand-link" href={SITE_URL}>{BRAND}</a>
      {text.slice(i + BRAND.length)}
    </>
  )
}

export default async function MarketingRoiCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = getRoiPageContent(locale)

  const localePath = locale === 'en' ? '' : `/${locale}`
  const homeUrl = `${SITE_URL}${locale === 'en' ? '/' : `/${locale}`}`
  const pageUrl = `${SITE_URL}${localePath}/marketing-roi-calculator`

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.breadcrumb.home, item: homeUrl },
      { '@type': 'ListItem', position: 2, name: t.breadcrumb.current, item: pageUrl },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  // The tool itself is a free browser-side app — declare it so it can surface
  // as a software result rather than only as a generic page.
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: t.breadcrumb.current,
    url: pageUrl,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    description: t.meta.description,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: { '@type': 'Organization', name: 'Eazybe', url: SITE_URL },
  }

  const benefits = [
    { title: t.whyUse.freeTitle, body: t.whyUse.freeBody, icon: ICON_FREE },
    { title: t.whyUse.privateTitle, body: t.whyUse.privateBody, icon: ICON_PRIVATE },
    { title: t.whyUse.completeTitle, body: t.whyUse.completeBody, icon: ICON_COMPLETE },
    { title: t.whyUse.instantTitle, body: t.whyUse.instantBody, icon: ICON_INSTANT },
  ]

  const steps = [
    { title: t.howTo.step1Title, body: t.howTo.step1Body },
    { title: t.howTo.step2Title, body: t.howTo.step2Body },
    { title: t.howTo.step3Title, body: t.howTo.step3Body },
  ]

  const attributionPoints = [t.attribution.point1, t.attribution.point2, t.attribution.point3]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />

      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />

      {/* Hero: brand dark page-hero, one blue phrase */}
      <section className="page-hero mr-hero" data-tone="dark">
        <div className="container">
          <span className="sec-tag">{t.hero.tag}</span>
          <h1>{t.hero.h1Lead} <em>{t.hero.h1Highlight}</em></h1>
          <p className="lede">{t.hero.subtitle}</p>
          <div className="mr-hero-cta">
            <a href="#roi-calculator" className="btn btn-primary btn-lg">{t.hero.cta}</a>
          </div>
          <p className="mr-foot">{t.hero.footnote}</p>
        </div>
      </section>

      {/* Calculator */}
      <section id="roi-calculator" className="mr-sec">
        <div className="container mr-wide">
          <div className="sec-head centered mr-head">
            <h2>{t.calculator.h2}</h2>
            <p>{t.calculator.subtitle}</p>
          </div>
          <MarketingRoiCalculatorClient labels={t.calculator} locale={locale} />
        </div>
      </section>

      {/* How to calculate */}
      <section className="mr-sec mr-alt">
        <div className="container mr-wide">
          <div className="sec-head centered mr-head">
            <h2>{t.howTo.h2}</h2>
            <p>{t.howTo.subtitle}</p>
          </div>
          <div className="mr-grid3">
            {steps.map((s, i) => (
              <div key={s.title} className="mr-card">
                <span className="mr-step">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulas */}
      <section className="mr-sec">
        <div className="container mr-wide">
          <div className="sec-head centered mr-head">
            <h2>{t.formulas.h2}</h2>
            <p>{t.formulas.subtitle}</p>
          </div>
          <div className="mr-formulas">
            {t.formulas.items.map((f) => (
              <div key={f.name} className="mr-formula">
                <b>{f.name}</b>
                <code>{f.formula}</code>
                <span>{f.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why use this */}
      <section className="mr-sec mr-alt">
        <div className="container mr-wide">
          <div className="sec-head centered mr-head">
            <h2>{t.whyUse.h2}</h2>
            <p>{t.whyUse.subtitle}</p>
          </div>
          <div className="mr-grid4">
            {benefits.map((b) => (
              <div key={b.title} className="mr-card">
                <span className="mr-ic" aria-hidden="true">{b.icon}</span>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Attribution / product tie-in */}
      <section className="mr-sec" data-tone="dark">
        <div className="container mr-narrow">
          <div className="sec-head centered mr-head">
            <h2>{t.attribution.h2}</h2>
            <p>{t.attribution.body}</p>
          </div>
          <ul className="mr-points">
            {attributionPoints.map((p) => (
              <li key={p}>
                <span className="mr-tick" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mr-center">
            <a href={locale === 'en' ? '/integrations' : `/${locale}/integrations`} className="btn btn-primary btn-lg">
              {t.attribution.cta}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mr-sec">
        <div className="container mr-wide">
          <div className="sec-head centered mr-head">
            <h2>{t.faq.h2}</h2>
            <p>{t.faq.subtitle}</p>
          </div>
          <div className="mr-faq">
            {[t.faq.items.slice(0, Math.ceil(t.faq.items.length / 2)), t.faq.items.slice(Math.ceil(t.faq.items.length / 2))].map(
              (column, colIdx) => (
                <div key={colIdx} className="mr-faq-col">
                  {column.map((item) => (
                    <details key={item.q} className="faq-pill">
                      <summary className="faq-pill-q">
                        <span>{item.q}</span>
                        <span className="faq-pill-chev" aria-hidden="true">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </span>
                      </summary>
                      <div className="faq-pill-a">
                        <div>{item.a}</div>
                      </div>
                    </details>
                  ))}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Final CTA: the site's brand final-cta block */}
      <section className="final-cta" data-tone="dark">
        <div className="container">
          <h2>{t.finalCta.h2}</h2>
          <p className="sub">{linkBrand(t.finalCta.body)}</p>
          <div className="ctas">
            <a href={locale === 'en' ? '/pricing' : `/${locale}/pricing`} className="btn btn-primary btn-lg">
              {t.finalCta.primary}
            </a>
            <a href={locale === 'en' ? '/become-our-partner' : `/${locale}/become-our-partner`} className="btn btn-outline btn-lg">
              {t.finalCta.secondary}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

// Brand guidelines v1.2 (components/pages/brand-pages.css): dark page-hero, flat
// white / #f4f4f5 sections, one blue phrase per heading, 10/16px corners, hairlines.
const PAGE_CSS = `
  .landing .v16-brand .mr-hero { padding: 180px 0 84px; text-align: center; }
  .landing .v16-brand .mr-hero h1 { margin-inline: auto; max-width: 20ch; }
  .landing .v16-brand .mr-hero .lede { margin: 20px auto 0; max-width: 640px; }
  .mr-hero-cta { margin-top: 28px; }
  .mr-foot { margin: 16px 0 0; font-size: 13px; color: var(--ink-3); }
  .landing .v16-brand .mr-sec { padding: 88px 0; scroll-margin-top: 72px; background: var(--bg); }
  .landing .v16-brand .mr-alt { background: var(--bg-2); }
  .mr-wide { max-width: 1140px; }
  .mr-narrow { max-width: 820px; }
  .landing .v16-brand .mr-head { margin-bottom: 40px; }
  .landing .v16-brand .mr-head p { max-width: 680px; margin-inline: auto; }
  .mr-grid3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
  .mr-grid4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
  .mr-card { display: flex; flex-direction: column; gap: 10px; padding: 24px; background: var(--paper); border: 1px solid var(--line); border-radius: 16px; }
  .landing .v16-brand .mr-card h3 { margin: 4px 0 0; font-size: 18px; font-weight: 700; letter-spacing: -.02em; color: var(--ink); }
  .mr-card p { margin: 0; font-size: 15px; line-height: 1.6; color: var(--ink-2); }
  .mr-step { font-family: var(--f-mono); font-size: 12px; font-weight: 600; letter-spacing: .08em; color: var(--accent-ink); }
  .mr-ic { width: 44px; height: 44px; display: inline-flex; align-items: center; justify-content: center; border-radius: 10px;
    color: var(--accent-ink); background: color-mix(in oklab, var(--accent-ink) 10%, var(--paper)); border: 1px solid color-mix(in oklab, var(--accent-ink) 24%, var(--line)); }
  .mr-ic svg { width: 22px; height: 22px; }
  .mr-formulas { border-top: 1px solid var(--line); max-width: 1000px; margin-inline: auto; }
  .mr-formula { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.3fr) minmax(0, 1.4fr); gap: 20px; padding: 16px 0; border-bottom: 1px solid var(--line); align-items: baseline; }
  .mr-formula b { font-size: 15px; color: var(--ink); }
  .mr-formula code { font-family: var(--f-mono); font-size: 13px; line-height: 1.5; color: var(--accent-ink); overflow-wrap: anywhere; }
  .mr-formula span { font-size: 14px; line-height: 1.5; color: var(--ink-3); }
  .mr-points { list-style: none; padding: 0; margin: 0 auto 32px; max-width: 620px; display: grid; gap: 12px; }
  .mr-points li { display: flex; gap: 12px; align-items: flex-start; font-size: 15px; line-height: 1.6; color: var(--ink-2); }
  .mr-tick { flex-shrink: 0; width: 20px; height: 20px; margin-top: 2px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; background: var(--ok); color: #0b0b0c; }
  .mr-center { text-align: center; }
  .mr-faq { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px 20px; align-items: start; max-width: 1040px; margin-inline: auto; }
  .mr-faq-col { display: grid; gap: 12px; }
  /* .landing a { color: inherit } outranks a bare class, so scope it. */
  .landing .roi-brand-link { color: var(--accent-ink); font-weight: 600; border-bottom: 1px solid color-mix(in oklab, var(--accent-ink) 35%, transparent); }
  .landing .roi-brand-link:hover { color: var(--ink); border-color: var(--ink); }
  .landing .roi-brand-link:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 2px; }
  @media (max-width: 1000px) { .mr-grid4 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 860px) {
    .landing .v16-brand .mr-hero { padding: 140px 0 64px; }
    .landing .v16-brand .mr-sec { padding: 64px 0; }
    .mr-grid3, .mr-faq { grid-template-columns: minmax(0, 1fr); }
    .mr-formula { grid-template-columns: minmax(0, 1fr); gap: 6px; }
  }
  @media (max-width: 560px) { .mr-grid4 { grid-template-columns: minmax(0, 1fr); } }
`

// Published / last-modified dates as meta tags (article:published_time / article:modified_time).
export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return withPageDates(await baseMetadata(props), pageDates({ page: '/marketing-roi-calculator' }))
}
