import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getAlternates } from '@/lib/seo-helpers'
import { getRoiPageContent } from '@/data/marketing-roi-content'
import { MarketingRoiCalculatorClient } from '@/components/pages/MarketingRoiCalculatorClient'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
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

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .roi-formula-row {
              display: grid;
              grid-template-columns: minmax(170px, 1fr) minmax(190px, 1.1fr) minmax(190px, 1.4fr);
              gap: 16px;
              align-items: baseline;
              padding: 16px 20px;
              background: #fff;
              border: 1px solid var(--line);
              border-radius: 12px;
            }
            .roi-formula-code {
              font-family: var(--f-mono);
              font-size: 13px;
              color: var(--accent-ink);
              background: color-mix(in oklab, var(--accent-a) 12%, transparent);
              padding: 4px 8px;
              border-radius: 6px;
              justify-self: start;
              overflow-wrap: anywhere;
            }
            /* Final CTA heading spans the full container instead of wrapping into
               a narrow column; the body copy keeps a readable measure. */
            .roi-cta-head h2 { max-width: none; }
            .roi-cta-head p { max-width: 720px; }
            /* Filled accent secondary CTA. #5b4bae is the same violet the shared
               button styles already use for hover, so this stays on-palette.
               Selectors are prefixed with .landing because the shared rule
               ".landing a { color: inherit }" scores (0,1,1) and would otherwise
               outrank a bare class, pulling the label back to ink. */
            .landing .roi-cta-demo { background: #5b4bae; color: #ffffff; }
            .landing .roi-cta-demo:hover { background: #4c3f95; color: #ffffff; }
            .landing .roi-cta-demo > * { color: #ffffff; }
            .landing .roi-cta-demo:focus-visible { outline: 2px solid #5b4bae; outline-offset: 3px; }
            .roi-step { background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 26px; }
            .roi-benefit { background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 26px;
              transition: border-color .16s ease, transform .16s ease; }
            .roi-benefit:hover { border-color: color-mix(in oklab, var(--accent-a) 40%, var(--line)); }
            @media (max-width: 760px) {
              .roi-formula-row { grid-template-columns: 1fr; gap: 8px; padding: 16px; }
            }
            @media (prefers-reduced-motion: reduce) {
              .roi-benefit { transition: none; }
            }
          `,
        }}
      />

      {/* Hero */}
      <section className="section" style={{ paddingTop: 'clamp(96px, 12vw, 132px)', paddingBottom: 48, background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: 820, textAlign: 'center' }}>
          <span className="sec-tag">{t.hero.tag}</span>
          <h1
            style={{
              fontFamily: 'var(--f-display)',
              fontWeight: 400,
              fontSize: 'clamp(34px, 5.2vw, 56px)',
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              color: 'var(--ink)',
              margin: '10px 0 0',
              paddingBottom: '0.05em',
            }}
          >
            {t.hero.h1Lead}{' '}
            <span
              style={{
                display: 'inline-block',
                backgroundImage:
                  'linear-gradient(transparent 62%, color-mix(in oklab, var(--accent-ink) 25%, transparent) 62%)',
                paddingBottom: 2,
              }}
            >
              {t.hero.h1Highlight}
            </span>
          </h1>
          <p style={{ margin: '22px auto 0', maxWidth: 640, fontSize: 17, lineHeight: 1.6, color: 'var(--ink-2)' }}>
            {t.hero.subtitle}
          </p>
          <div style={{ marginTop: 28 }}>
            <a href="#roi-calculator" className="btn btn-primary btn-lg">{t.hero.cta}</a>
          </div>
          <p style={{ marginTop: 18, fontSize: 13, color: 'var(--ink-3)' }}>{t.hero.footnote}</p>
        </div>
      </section>

      {/* Calculator */}
      <section
        id="roi-calculator"
        className="section"
        style={{ paddingTop: 40, paddingBottom: 80, scrollMarginTop: 80, background: 'linear-gradient(180deg, #ECEFF7 0%, #ffffff 100%)' }}
      >
        <div className="container" style={{ maxWidth: 1100 }}>
          <div className="sec-head centered" style={{ marginBottom: 32 }}>
            <h2>{t.calculator.h2}</h2>
            <p>{t.calculator.subtitle}</p>
          </div>
          <MarketingRoiCalculatorClient labels={t.calculator} locale={locale} />
        </div>
      </section>

      {/* How to calculate */}
      <section className="section" style={{ paddingTop: 70, paddingBottom: 70, background: '#F5F7FC' }}>
        <div className="container" style={{ maxWidth: 1100 }}>
          <div className="sec-head centered" style={{ marginBottom: 44 }}>
            <h2>{t.howTo.h2}</h2>
            <p>{t.howTo.subtitle}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="roi-step"
              >
                <div
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--accent-ink)',
                    letterSpacing: '0.08em',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{ margin: '10px 0 8px', fontSize: 18, fontWeight: 700, color: 'var(--ink)' }}>{s.title}</h3>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink-2)' }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulas */}
      <section className="section" style={{ paddingTop: 70, paddingBottom: 70 }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <div className="sec-head centered" style={{ marginBottom: 40 }}>
            <h2>{t.formulas.h2}</h2>
            <p>{t.formulas.subtitle}</p>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {t.formulas.items.map((f) => (
              <div key={f.name} className="roi-formula-row">
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{f.name}</div>
                <code className="roi-formula-code">{f.formula}</code>
                <div style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-3)' }}>{f.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why use this */}
      <section className="section" style={{ paddingTop: 70, paddingBottom: 70, background: '#F5F7FC' }}>
        <div className="container" style={{ maxWidth: 1180 }}>
          <div className="sec-head centered" style={{ marginBottom: 44 }}>
            <h2>{t.whyUse.h2}</h2>
            <p>{t.whyUse.subtitle}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
            {benefits.map((b) => (
              <div key={b.title} className="roi-benefit">
                <div style={{ color: 'var(--accent-ink)' }}>{b.icon}</div>
                <h3 style={{ margin: '12px 0 8px', fontSize: 17, fontWeight: 700, color: 'var(--ink)' }}>{b.title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)' }}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Attribution / product tie-in */}
      <section className="section" data-tone="dark" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="sec-head centered" style={{ marginBottom: 28 }}>
            <h2>{t.attribution.h2}</h2>
          </div>
          <p style={{ margin: '0 auto 24px', maxWidth: 680, fontSize: 16, lineHeight: 1.7, color: 'var(--ink-2)', textAlign: 'center' }}>
            {t.attribution.body}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 auto 30px', maxWidth: 620, display: 'grid', gap: 10 }}>
            {attributionPoints.map((p) => (
              <li key={p} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 15, lineHeight: 1.6, color: 'var(--ink-2)' }}>
                <span style={{ color: 'var(--accent-ink)', flexShrink: 0, marginTop: 3 }} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div style={{ textAlign: 'center' }}>
            <a href={locale === 'en' ? '/integrations' : `/${locale}/integrations`} className="btn btn-primary">
              {t.attribution.cta}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq-ink" style={{ paddingTop: 70, paddingBottom: 70 }}>
        <div className="container" style={{ maxWidth: 1100 }}>
          <div className="sec-head centered" style={{ marginBottom: 40 }}>
            <h2>{t.faq.h2}</h2>
            <p>{t.faq.subtitle}</p>
          </div>
          <div className="faq-grid">
            {[t.faq.items.slice(0, Math.ceil(t.faq.items.length / 2)), t.faq.items.slice(Math.ceil(t.faq.items.length / 2))].map(
              (column, colIdx) => (
                <div key={colIdx} className={`faq-col${colIdx === 1 ? ' faq-col-rest' : ''}`}>
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

      {/* Final CTA */}
      <section className="section" style={{ paddingTop: 70, paddingBottom: 90, background: '#F5F7FC' }}>
        <div className="container" style={{ maxWidth: 1100, textAlign: 'center' }}>
          <div className="sec-head centered roi-cta-head" style={{ marginBottom: 28 }}>
            <h2>{t.finalCta.h2}</h2>
            <p>{t.finalCta.body}</p>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={locale === 'en' ? '/pricing' : `/${locale}/pricing`} className="btn btn-primary btn-lg">
              {t.finalCta.primary}
            </a>
            <a href={locale === 'en' ? '/become-our-partner' : `/${locale}/become-our-partner`} className="btn btn-lg roi-cta-demo">
              {t.finalCta.secondary}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
