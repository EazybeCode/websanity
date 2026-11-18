import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { getWaPricingPageContent, WA_PRICING_PATH_BY_LOCALE } from '@/data/whatsapp-pricing-content'
import { getToolsPageContent, type ToolCard } from '@/data/tools-content'
import { WhatsappPricingCalculatorClient } from '@/components/pages/WhatsappPricingCalculatorClient'

/**
 * Shared implementation for the WhatsApp pricing calculator. The tool has a
 * translated slug per locale (see WA_PRICING_PATH_BY_LOCALE), so four thin
 * route folders render this one component — each folder owns one locale's
 * slug and redirects every other locale to its own URL.
 */

const SITE_URL = 'https://eazybe.com'

export function buildWaPricingMetadata(locale: string): Metadata {
  const t = getWaPricingPageContent(locale)
  const path = WA_PRICING_PATH_BY_LOCALE[locale] ?? WA_PRICING_PATH_BY_LOCALE.en
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `${SITE_URL}${path}`,
      // Hand-built (instead of getAlternates) because each locale lives at a
      // different slug, not the same path with a prefix.
      languages: {
        en: `${SITE_URL}${WA_PRICING_PATH_BY_LOCALE.en}`,
        'pt-BR': `${SITE_URL}${WA_PRICING_PATH_BY_LOCALE.br}`,
        es: `${SITE_URL}${WA_PRICING_PATH_BY_LOCALE.es}`,
        tr: `${SITE_URL}${WA_PRICING_PATH_BY_LOCALE.tr}`,
        'x-default': `${SITE_URL}${WA_PRICING_PATH_BY_LOCALE.en}`,
      },
    },
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
const ICON_RATES = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
)
const ICON_INSTANT = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

// Icons for the "More free tools" strip, keyed by the tool hub's icon names.
const TOOL_ICONS: Record<ToolCard['icon'], ReactNode> = {
  qr: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zM21 21h-4M21 17v4" />
    </svg>
  ),
  link: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  widget: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  calculator: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="16" y1="14" x2="16" y2="18" />
      <path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M8 18h.01M12 18h.01" />
    </svg>
  ),
}

/** Wraps the first occurrence of each term in a link, at render time, so the
 *  translated copy stays plain strings. A term that doesn't appear in the
 *  text is skipped, which lets one call handle every locale. */
function linkTerms(
  text: string,
  links: Array<{ term: string; href: string; className?: string }>,
): ReactNode {
  let nodes: ReactNode[] = [text]
  for (const { term, href, className } of links) {
    const next: ReactNode[] = []
    let done = false
    for (const node of nodes) {
      if (done || typeof node !== 'string') {
        next.push(node)
        continue
      }
      const i = node.indexOf(term)
      if (i === -1) {
        next.push(node)
        continue
      }
      next.push(
        node.slice(0, i),
        <a key={term} className={className ?? 'wpc-brand-link'} href={href}>{term}</a>,
        node.slice(i + term.length),
      )
      done = true
    }
    nodes = next
  }
  return <>{nodes}</>
}

// "BSPs may add their own fees" phrasing per locale — anchors the /comparison
// link inside the rates-accuracy FAQ answer.
const BSP_TERM_BY_LOCALE: Record<string, string> = {
  en: 'business solution providers',
  br: 'provedores de solução',
  es: 'proveedores de soluciones',
  tr: 'çözüm sağlayıcılar',
}

export function WhatsappPricingPage({ locale }: { locale: string }) {
  const t = getWaPricingPageContent(locale)
  const toolsContent = getToolsPageContent(locale)

  const prefix = locale === 'en' ? '' : `/${locale}`
  const homePath = locale === 'en' ? '/' : `/${locale}`
  const toolsPath = `${prefix}/tools`
  const homeUrl = `${SITE_URL}${homePath}`
  const pageUrl = `${SITE_URL}${WA_PRICING_PATH_BY_LOCALE[locale] ?? WA_PRICING_PATH_BY_LOCALE.en}`

  // The other free tools, linked from the strip above the final CTA. Each
  // locale's hub already carries localized names/slugs; drop this page itself.
  const selfPath = WA_PRICING_PATH_BY_LOCALE[locale] ?? WA_PRICING_PATH_BY_LOCALE.en
  const otherTools = toolsContent.tools
    .map((tool) => ({ ...tool, path: `${prefix}${tool.href}` }))
    .filter((tool) => tool.path !== selfPath)

  // Links applied to translated copy at render time. CRM names are spelled the
  // same in every locale; the BSP phrase is locale-specific. "Eazybe" is
  // deliberately linked only once on the page — in the dark tie-in section —
  // so it stays out of these maps.
  const finalCtaLinks = [
    { term: 'HubSpot', href: `${prefix}/hubspot-whatsapp-integration` },
    { term: 'Salesforce', href: `${prefix}/salesforce-whatsapp-integration` },
    { term: 'Zoho', href: `${prefix}/zoho-whatsapp-integration` },
    { term: 'Pipedrive', href: `${prefix}/pipedrive-whatsapp-integration` },
  ]
  const faqLinks = [
    { term: BSP_TERM_BY_LOCALE[locale] ?? BSP_TERM_BY_LOCALE.en, href: `${prefix}/comparison`, className: 'wpc-faq-link' },
  ]

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.breadcrumb.home, item: homeUrl },
      { '@type': 'ListItem', position: 2, name: toolsContent.breadcrumb.current, item: `${SITE_URL}${toolsPath}` },
      { '@type': 'ListItem', position: 3, name: t.breadcrumb.current, item: pageUrl },
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
    { title: t.whyUse.ratesTitle, body: t.whyUse.ratesBody, icon: ICON_RATES },
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

      <style dangerouslySetInnerHTML={{ __html: WPC_CSS }} />

      {/* Hero: brand dark page-hero, one blue phrase */}
      <section className="page-hero wpc-hero" data-tone="dark">
        <div className="container">
          <nav className="wpc-crumbs" aria-label="Breadcrumb">
            <ol>
              <li><a href={homePath}>{t.breadcrumb.home}</a></li>
              <li><a href={toolsPath}>{toolsContent.breadcrumb.current}</a></li>
              <li aria-current="page">{t.breadcrumb.current}</li>
            </ol>
          </nav>
          <span className="sec-tag">{t.hero.tag}</span>
          <h1>{t.hero.h1Lead} <em>{t.hero.h1Highlight}</em></h1>
          <p className="lede">{t.hero.subtitle}</p>
          <div className="wpc-hero-cta">
            <a href="#pricing-calculator" className="btn btn-primary btn-lg">{t.hero.cta}</a>
          </div>
          <p className="wpc-foot">{t.hero.footnote}</p>
        </div>
      </section>

      {/* Calculator */}
      <section id="pricing-calculator" className="wpc-sec">
        <div className="container wpc-wide">
          <div className="sec-head centered wpc-head">
            <h2>{t.calculator.h2}</h2>
            <p>{t.calculator.subtitle}</p>
          </div>
          <WhatsappPricingCalculatorClient labels={t.calculator} locale={locale} />
        </div>
      </section>

      {/* How pricing works */}
      <section className="wpc-sec wpc-alt">
        <div className="container wpc-wide">
          <div className="sec-head centered wpc-head">
            <h2>{t.howTo.h2}</h2>
            <p>{t.howTo.subtitle}</p>
          </div>
          <div className="wpc-grid3">
            {steps.map((s, i) => (
              <div key={s.title} className="wpc-card">
                <span className="wpc-step">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulas */}
      <section className="wpc-sec">
        <div className="container wpc-wide">
          <div className="sec-head centered wpc-head">
            <h2>{t.formulas.h2}</h2>
            <p>{t.formulas.subtitle}</p>
          </div>
          <div className="wpc-formulas">
            {t.formulas.items.map((f) => (
              <div key={f.name} className="wpc-formula">
                <b>{f.name}</b>
                <code>{f.formula}</code>
                <span>{f.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why use this */}
      <section className="wpc-sec wpc-alt">
        <div className="container wpc-wide">
          <div className="sec-head centered wpc-head">
            <h2>{t.whyUse.h2}</h2>
            <p>{t.whyUse.subtitle}</p>
          </div>
          <div className="wpc-grid4">
            {benefits.map((b) => (
              <div key={b.title} className="wpc-card">
                <span className="wpc-ic" aria-hidden="true">{b.icon}</span>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product tie-in */}
      <section className="wpc-sec" data-tone="dark">
        <div className="container wpc-narrow">
          <div className="sec-head centered wpc-head">
            <h2>{t.attribution.h2}</h2>
            <p>{t.attribution.body}</p>
          </div>
          <ul className="wpc-points">
            {attributionPoints.map((p) => (
              <li key={p}>
                <span className="wpc-tick" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {/* Brand link goes to the locale's own homepage. */}
                <span>{linkTerms(p, [{ term: 'Eazybe', href: homeUrl }])}</span>
              </li>
            ))}
          </ul>
          <div className="wpc-center">
            <a href={locale === 'en' ? '/integrations' : `/${locale}/integrations`} className="btn btn-primary btn-lg">
              {t.attribution.cta}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="wpc-sec">
        <div className="container wpc-wide">
          <div className="sec-head centered wpc-head">
            <h2>{t.faq.h2}</h2>
            <p>{t.faq.subtitle}</p>
          </div>
          <div className="wpc-faq">
            {[t.faq.items.slice(0, Math.ceil(t.faq.items.length / 2)), t.faq.items.slice(Math.ceil(t.faq.items.length / 2))].map(
              (column, colIdx) => (
                <div key={colIdx} className="wpc-faq-col">
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
                        <div>{linkTerms(item.a, faqLinks)}</div>
                      </div>
                    </details>
                  ))}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* More free tools */}
      <section className="wpc-sec wpc-alt">
        <div className="container wpc-wide">
          <div className="sec-head centered wpc-head">
            <h2>{t.moreTools.h2}</h2>
          </div>
          <div className="wpc-tools-grid">
            {otherTools.map((tool) => (
              <a key={tool.path} className="wpc-tool-card" href={tool.path}>
                <span className="wpc-tool-icon">{TOOL_ICONS[tool.icon]}</span>
                <span className="wpc-tool-name">{tool.name}</span>
                <span className="wpc-tool-tag">{tool.tagline}</span>
                <span className="wpc-tool-cta">{toolsContent.grid.tryIt} →</span>
              </a>
            ))}
          </div>
          <div className="wpc-center wpc-all">
            <a className="btn btn-outline" href={toolsPath}>{t.moreTools.allTools}</a>
          </div>
        </div>
      </section>

      {/* Final CTA: the site's brand final-cta block */}
      <section className="final-cta" data-tone="dark">
        <div className="container">
          <h2>{t.finalCta.h2}</h2>
          <p className="sub">{linkTerms(t.finalCta.body, finalCtaLinks)}</p>
          <div className="ctas">
            <a href={locale === 'en' ? '/pricing' : `/${locale}/pricing`} className="btn btn-primary btn-lg">
              {t.finalCta.primary}
            </a>
            <a href="https://eazybe.info/demono" className="btn btn-outline btn-lg">
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
const WPC_CSS = `
  .landing .v16-brand .wpc-hero { padding: 160px 0 84px; text-align: center; }
  .landing .v16-brand .wpc-hero h1 { margin-inline: auto; max-width: 20ch; }
  .landing .v16-brand .wpc-hero .lede { margin: 20px auto 0; max-width: 640px; }
  .wpc-hero-cta { margin-top: 28px; }
  .wpc-foot { margin: 16px 0 0; font-size: 13px; color: var(--ink-3); }
  .wpc-crumbs { margin-bottom: 18px; font-size: 13px; color: var(--ink-3); }
  .wpc-crumbs ol { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; }
  .wpc-crumbs li + li::before { content: '›'; margin-right: 6px; color: var(--ink-4); }
  .landing .wpc-crumbs a { color: var(--ink-3); transition: color .16s ease; }
  .landing .wpc-crumbs a:hover { color: var(--ink); }
  .landing .wpc-crumbs a:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 2px; }
  .landing .v16-brand .wpc-sec { padding: 88px 0; scroll-margin-top: 72px; background: var(--bg); }
  .landing .v16-brand .wpc-alt { background: var(--bg-2); }
  .wpc-wide { max-width: 1140px; }
  .wpc-narrow { max-width: 820px; }
  .landing .v16-brand .wpc-head { margin-bottom: 40px; }
  .landing .v16-brand .wpc-head p { max-width: 680px; margin-inline: auto; }
  .wpc-grid3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
  .wpc-grid4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
  .wpc-card { display: flex; flex-direction: column; gap: 10px; padding: 24px; background: var(--paper); border: 1px solid var(--line); border-radius: 16px; }
  .landing .v16-brand .wpc-card h3 { margin: 4px 0 0; font-size: 18px; font-weight: 700; letter-spacing: -.02em; color: var(--ink); }
  .wpc-card p { margin: 0; font-size: 15px; line-height: 1.6; color: var(--ink-2); }
  .wpc-step { font-family: var(--f-mono); font-size: 12px; font-weight: 600; letter-spacing: .08em; color: var(--accent-ink); }
  .wpc-ic, .wpc-tool-icon { width: 44px; height: 44px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; border-radius: 10px;
    color: var(--accent-ink); background: color-mix(in oklab, var(--accent-ink) 10%, var(--paper)); border: 1px solid color-mix(in oklab, var(--accent-ink) 24%, var(--line)); }
  .wpc-ic svg { width: 22px; height: 22px; }
  .wpc-formulas { border-top: 1px solid var(--line); max-width: 1000px; margin-inline: auto; }
  .wpc-formula { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.3fr) minmax(0, 1.4fr); gap: 20px; padding: 16px 0; border-bottom: 1px solid var(--line); align-items: baseline; }
  .wpc-formula b { font-size: 15px; color: var(--ink); }
  .wpc-formula code { font-family: var(--f-mono); font-size: 13px; line-height: 1.5; color: var(--accent-ink); overflow-wrap: anywhere; }
  .wpc-formula span { font-size: 14px; line-height: 1.5; color: var(--ink-3); }
  .wpc-points { list-style: none; padding: 0; margin: 0 auto 32px; max-width: 620px; display: grid; gap: 12px; }
  .wpc-points li { display: flex; gap: 12px; align-items: flex-start; font-size: 15px; line-height: 1.6; color: var(--ink-2); }
  .wpc-tick { flex-shrink: 0; width: 20px; height: 20px; margin-top: 2px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; background: var(--ok); color: #0b0b0c; }
  .wpc-center { text-align: center; }
  .wpc-all { margin-top: 32px; }
  .wpc-faq { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px 20px; align-items: start; max-width: 1040px; margin-inline: auto; }
  .wpc-faq-col { display: grid; gap: 12px; }
  /* .landing a { color: inherit } outranks a bare class, so scope the link rules. */
  .landing .wpc-brand-link, .landing .wpc-faq-link {
    color: var(--accent-ink); font-weight: 600;
    border-bottom: 1px solid color-mix(in oklab, var(--accent-ink) 35%, transparent);
    transition: color .16s ease, border-color .16s ease;
  }
  .landing .wpc-brand-link:hover, .landing .wpc-faq-link:hover { color: var(--ink); border-color: var(--ink); }
  .landing .wpc-brand-link:focus-visible, .landing .wpc-faq-link:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 2px; }
  /* The final-cta block isn't a [data-tone] child token scope for links, so pin the dark-ground link colour. */
  .landing .v16-brand .final-cta .wpc-brand-link { color: #7c98ff; border-color: rgba(124, 152, 255, .45); }
  .landing .v16-brand .final-cta .wpc-brand-link:hover { color: #fff; border-color: #fff; }
  /* "More free tools" strip */
  .wpc-tools-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
  .landing .wpc-tool-card {
    display: flex; flex-direction: column; align-items: flex-start;
    background: var(--paper); border: 1px solid var(--line); border-radius: 16px; padding: 24px;
    transition: border-color .16s ease, transform .16s ease;
  }
  .landing .wpc-tool-card:hover { border-color: color-mix(in oklab, var(--accent-ink) 45%, var(--line)); transform: translateY(-2px); }
  .landing .wpc-tool-card:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 2px; }
  .wpc-tool-name { margin-top: 14px; font-size: 16px; font-weight: 700; line-height: 1.35; letter-spacing: -.01em; color: var(--ink); }
  .wpc-tool-tag { margin-top: 6px; font-size: 14px; line-height: 1.55; color: var(--ink-3); flex: 1; }
  .wpc-tool-cta { margin-top: 16px; font-size: 14px; font-weight: 600; color: var(--accent-ink); }
  .wpc-tool-card:hover .wpc-tool-cta { text-decoration: underline; text-underline-offset: 3px; }
  @media (prefers-reduced-motion: reduce) {
    .landing .wpc-tool-card { transition: none; }
    .landing .wpc-tool-card:hover { transform: none; }
  }
  @media (max-width: 1000px) { .wpc-grid4 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 860px) {
    .landing .v16-brand .wpc-hero { padding: 130px 0 64px; }
    .landing .v16-brand .wpc-sec { padding: 64px 0; }
    .wpc-grid3, .wpc-faq { grid-template-columns: minmax(0, 1fr); }
    .wpc-formula { grid-template-columns: minmax(0, 1fr); gap: 6px; }
  }
  @media (max-width: 560px) { .wpc-grid4 { grid-template-columns: minmax(0, 1fr); } }
`
