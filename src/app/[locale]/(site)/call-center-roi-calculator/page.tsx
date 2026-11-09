import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getAlternates } from '@/lib/seo-helpers'
import { getCallCenterRoiContent } from '@/data/call-center-roi-content'
import { getCallingUi } from '@/data/calling-i18n'
import { CallCenterRoiCalculatorClient } from '@/components/pages/CallCenterRoiCalculatorClient'
import { BASE_DEFAULTS, MONEY_DEFAULTS, PRESETS, computeCallCenterRoi } from '@/lib/call-center-roi'
import { PAGE_AUTHOR, pageDates, withPageAuthor, withPageDates } from '@/lib/page-dates'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const SITE_URL = 'https://eazybe.com'
const PATH = '/call-center-roi-calculator'
// Same listing + UTM as the other calling pages.
const CHROME_STORE_URL =
  'https://chromewebstore.google.com/detail/whatsapp-ai-agents-with-c/aihpfgoknheimieofcfjiobnmddldjeb?utm_medium=Organic&utm_source=website&utm_campaign=eazybe%20workspace'
const DEMO_URL = 'https://eazybe.info/demono'
const PAGE_DATES = pageDates({ page: PATH })
const LANG: Record<string, string> = { en: 'en-US', es: 'es', br: 'pt-BR', tr: 'tr' }
const OG_LOCALE: Record<string, string> = { en: 'en_US', es: 'es_ES', br: 'pt_BR', tr: 'tr_TR' }
const prefixFor = (locale: string) => (locale === 'en' ? '' : `/${locale}`)

async function baseMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getCallCenterRoiContent(locale)
  const image = { url: `${SITE_URL}/og/call-center-roi-${locale}.jpg`, width: 1200, height: 630, alt: t.meta.ogTitle }
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: getAlternates(locale, PATH),
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}${prefixFor(locale)}${PATH}`,
      title: t.meta.ogTitle,
      description: t.meta.ogDescription,
      siteName: 'Eazybe',
      locale: OG_LOCALE[locale] ?? 'en_US',
      images: [image],
    },
    twitter: { card: 'summary_large_image', title: t.meta.ogTitle, description: t.meta.ogDescription, images: [image.url] },
  }
}

// Brand guidelines v1.2 (components/pages/brand-pages.css): flat white and ink
// sections, one blue phrase per heading, 6/8/10/16px corners, 1px hairlines.
const PAGE_CSS = `
  .landing .v16-brand .ccp-hero { padding: 180px 0 84px; text-align: center; }
  .landing .v16-brand .ccp-hero h1 { margin-inline: auto; }
  .landing .v16-brand .ccp-hero .lede { margin: 20px auto 0; max-width: 680px; }
  .ccp-foot { margin: 16px 0 0; font-size: 13px; color: var(--ink-3); }
  .landing .v16-brand .ccp-sec { padding: 88px 0; scroll-margin-top: 72px; }
  .landing .v16-brand .ccp-alt { background: var(--bg-2); }
  .ccp-head { max-width: 720px; margin: 0 0 40px; }
  .landing .v16-brand .ccp-head-center { margin-inline: auto; text-align: center; }
  .landing .v16-brand .ccp-head-center h2, .landing .v16-brand .ccp-head-center p { margin-inline: auto; text-align: center; }
  .ccp-grid3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
  .ccp-card { padding: 24px; background: var(--paper); border: 1px solid var(--line); border-radius: 10px; }
  .landing .v16-brand .ccp-card h3 { margin: 0 0 8px; font-size: 18px; color: var(--ink); }
  .ccp-card p { margin: 0; font-size: 15px; line-height: 1.6; color: var(--ink-2); }
  .landing .v16-brand .ccp-card a { display: inline-block; margin-top: 12px; padding: 4px 0; font-size: 14px; font-weight: 600; color: var(--accent-ink); }
  .landing .v16-brand .ccp-card a:hover { text-decoration: underline; }
  .ccp-more { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 4px 20px; margin: 28px 0 0; font-size: 15px; color: var(--ink-3); }
  .landing .v16-brand .ccp-more a { padding: 8px 0; font-weight: 600; color: var(--accent-ink); }
  .landing .v16-brand .ccp-more a:hover { text-decoration: underline; }
  .ccp-formulas { border-top: 1px solid var(--line); }
  .ccp-formula { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.5fr) minmax(0, 1.3fr); gap: 20px; padding: 16px 0; border-bottom: 1px solid var(--line); align-items: baseline; }
  .ccp-formula b { font-size: 15px; color: var(--ink); }
  .ccp-formula code { font-family: var(--f-mono); font-size: 13px; line-height: 1.5; color: var(--accent-ink); overflow-wrap: anywhere; }
  .ccp-formula span { font-size: 14px; line-height: 1.5; color: var(--ink-3); }
  .ccp-example { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 56px; align-items: start; }
  .ccp-example .ccp-head { margin: 0; }
  .ccp-example-note { margin: 20px 0 0; font-size: 16px; line-height: 1.6; color: var(--ink-2); }
  .ccp-table { width: 100%; border-collapse: collapse; background: var(--paper); border: 1px solid var(--line); border-radius: 10px; overflow: hidden; }
  .ccp-table th, .ccp-table td { padding: 14px 18px; font-size: 15px; text-align: left; border-bottom: 1px solid var(--line); }
  .ccp-table tr:last-child th, .ccp-table tr:last-child td { border-bottom: 0; }
  .ccp-table th { font-weight: 400; color: var(--ink-2); }
  .ccp-table td { font-weight: 700; color: var(--ink); text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
  .ccp-faq { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px 20px; align-items: start; }
  .ccp-faq-col { display: grid; gap: 12px; }
  @media (max-width: 860px) {
    .landing .v16-brand .ccp-hero { padding: 140px 0 60px; }
    .landing .v16-brand .ccp-sec { padding: 64px 0; }
    .ccp-grid3, .ccp-example, .ccp-faq { grid-template-columns: minmax(0, 1fr); }
    .ccp-example { gap: 28px; }
    .ccp-formula { grid-template-columns: minmax(0, 1fr); gap: 6px; }
  }
`

function Heading({ lead, em, sub, center }: { lead: string; em: string; sub?: string; center?: boolean }) {
  return (
    <div className={`sec-head ccp-head${center ? ' ccp-head-center' : ''}`}>
      <h2>{lead} <em>{em}</em></h2>
      {sub && <p>{sub}</p>}
    </div>
  )
}

export default async function CallCenterRoiCalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = getCallCenterRoiContent(locale)
  const c = t.calculator
  const prefix = prefixFor(locale)
  const callingUi = getCallingUi(locale)
  const moreCalling: [string, string][] = [
    [callingUi.common.crumbCalling, '/calling'],
    ...['virtual-phone-number', 'sim-based-calling', 'sim-vs-cloud-calling'].map((slug): [string, string] => [callingUi.products[slug].name, `/calling/${slug}`]),
  ]
  const pageUrl = `${SITE_URL}${prefix}${PATH}`

  // The worked example runs through the calculator's own function.
  const example = computeCallCenterRoi({ ...BASE_DEFAULTS, ...MONEY_DEFAULTS.en, ...PRESETS.cautious, useTimeFor: 'cost' })
  const usd = new Intl.NumberFormat(LANG[locale] ?? 'en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
  const count = new Intl.NumberFormat(LANG[locale] ?? 'en-US', { maximumFractionDigits: 0 })
  const exampleRows: [string, string][] = [
    [c.hoursSaved, `${count.format(example.hoursSaved)} ${c.units.hours}`],
    [c.laborSaved, usd.format(example.laborSaved)],
    [c.softwareCost, usd.format(-example.softwareMonthly)],
    [c.monthlyNet, usd.format(example.monthlyNet)],
    [c.firstYearNet, usd.format(example.firstYearNet)],
    [c.roi, `${count.format(example.roiPct ?? 0)}%`],
    [c.payback, c.underOneMonth],
  ]

  const half = Math.ceil(t.faq.items.length / 2)
  const faqColumns = [t.faq.items.slice(0, half), t.faq.items.slice(half)]

  const inLanguage = LANG[locale] ?? 'en-US'
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: t.meta.title,
      description: t.meta.description,
      inLanguage,
      ...(PAGE_DATES ? { datePublished: PAGE_DATES.published, dateModified: PAGE_DATES.modified } : {}),
      author: PAGE_AUTHOR,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: t.breadcrumb.current,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      description: t.meta.description,
      inLanguage,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@type': 'Organization', name: 'Eazybe', url: SITE_URL },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t.breadcrumb.home, item: `${SITE_URL}${prefix || '/'}` },
        { '@type': 'ListItem', position: 2, name: t.breadcrumb.tools, item: `${SITE_URL}${prefix}/tools` },
        { '@type': 'ListItem', position: 3, name: t.breadcrumb.current, item: pageUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: t.faq.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ]

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />

      <section className="page-hero ccp-hero" data-tone="dark">
        <div className="container">
          <span className="sec-tag">{t.hero.tag}</span>
          <h1>{t.hero.h1Lead} <em>{t.hero.h1Em}</em></h1>
          <p className="lede">{t.hero.lede}</p>
          <div style={{ marginTop: 28 }}>
            <a href="#calculator" className="btn btn-primary btn-lg">{t.hero.cta}</a>
          </div>
          <p className="ccp-foot">{t.hero.footnote}</p>
        </div>
      </section>

      <section id="calculator" className="ccp-sec">
        <div className="container">
          <Heading center lead={t.calculatorHead.h2} em={t.calculatorHead.h2Em} sub={t.calculatorHead.sub} />
          <CallCenterRoiCalculatorClient labels={c} locale={locale} />
        </div>
      </section>

      <section className="ccp-sec ccp-alt">
        <div className="container ccp-example">
          <div>
            <Heading lead={t.example.h2} em={t.example.h2Em} sub={t.example.sub} />
            <p className="ccp-example-note">{t.example.note}</p>
          </div>
          <table className="ccp-table">
            <tbody>
              {exampleRows.map(([label, value]) => (
                <tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="ccp-sec">
        <div className="container">
          <Heading center lead={t.method.h2} em={t.method.h2Em} sub={t.method.sub} />
          <div className="ccp-formulas">
            {t.method.items.map((f) => (
              <div className="ccp-formula" key={f.name}>
                <b>{f.name}</b>
                <code>{f.formula}</code>
                <span>{f.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ccp-sec ccp-alt">
        <div className="container">
          <Heading center lead={t.leftOut.h2} em={t.leftOut.h2Em} sub={t.leftOut.sub} />
          <div className="ccp-grid3">
            {t.leftOut.items.map((item) => (
              <div className="ccp-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ccp-sec" data-tone="dark">
        <div className="container">
          <Heading center lead={t.eazybe.h2} em={t.eazybe.h2Em} sub={t.eazybe.sub} />
          <div className="ccp-grid3">
            {t.eazybe.items.map((item) => (
              <div className="ccp-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <a href={`${prefix}${item.href}`}>{item.link}</a>
              </div>
            ))}
          </div>
          <p className="ccp-more">
            <span>{t.eazybe.more}</span>
            {moreCalling.map(([label, href]) => <a key={href} href={`${prefix}${href}`}>{label}</a>)}
          </p>
        </div>
      </section>

      <section className="ccp-sec">
        <div className="container">
          <Heading center lead={t.faq.h2} em={t.faq.h2Em} />
          <div className="ccp-faq">
            {faqColumns.map((column, i) => (
              <div className="ccp-faq-col" key={i}>
                {column.map((item) => (
                  <details className="faq-pill" key={item.q}>
                    <summary className="faq-pill-q">
                      <span>{item.q}</span>
                      <span className="faq-pill-chev" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                      </span>
                    </summary>
                    <div className="faq-pill-a"><div>{item.a}</div></div>
                  </details>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta" data-tone="dark">
        <div className="container">
          <h2>{t.finalCta.h2} <em>{t.finalCta.h2Em}</em></h2>
          <p className="sub">{t.finalCta.body}</p>
          <div className="ctas">
            <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">{t.finalCta.primary}</a>
            <a href={DEMO_URL} className="btn btn-outline btn-lg">{t.finalCta.secondary}</a>
          </div>
        </div>
      </section>
    </>
  )
}

// Published / last-modified dates as meta tags, plus Eazybe as the page author.
export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params
  return withPageAuthor(withPageDates(await baseMetadata(props), PAGE_DATES), locale)
}
