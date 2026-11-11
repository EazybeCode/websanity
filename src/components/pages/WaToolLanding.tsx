import type { ReactNode } from 'react'

/*
 * Shared brand-v1.2 layout for the three WhatsApp generator tools
 * (/whatsapp-qr-code-generator, /whatsapp-chat-link-generator, /whatsapp-chat-widget).
 * Same section order the pages always had; only the styling is shared:
 * dark page-hero, flat white / #f4f4f5 sections, one blue phrase per heading,
 * 10/16px corners, 1px hairlines, brand final-cta. Classes come from
 * components/pages/brand-pages.css (applied site-wide via .v16-brand).
 */

export interface WaToolItem {
  title: string
  body: string
  icon: ReactNode
}

export interface WaToolLandingProps {
  locale: string
  anchorId: string
  hero: { tag: string; h1Lead: string; h1Brand: string; h1Rest: string; h1Highlight: string; subtitle: string; cta: string; footnote: string }
  tryItNow: { h2: string; subtitle: string }
  generator: ReactNode
  useCases: { h2: string; subtitle: string; items: WaToolItem[] }
  seo: { h2: string; p1: string; p2Pre: string; p2Post: string; h3: string; p3: string; p4Pre: string; p4LinkText: string; p4Post: string }
  /** The wa.me URL pattern shown inline in the explainer. */
  snippet: string
  benefits: { h2Lead: string; h2Em: string; subtitle: string; items: WaToolItem[] }
  benefitCards: { h2Lead: string; h2Em: string; items: WaToolItem[] }
  faq: { h2: string; items: Array<{ q: string; a: string }> }
  cta: { badge: string; h2: string; subtitle: string; primary: string; secondary: string; footnote: string }
}

const TRIAL_URL = 'https://eazybe.info/6c2a82'
const DEMO_URL = 'https://eazybe.info/demono'

const CSS = `
  .landing .v16-brand .wt-hero { padding: 180px 0 84px; text-align: center; }
  .landing .v16-brand .wt-hero h1 { margin-inline: auto; max-width: 20ch; }
  .landing .v16-brand .wt-hero .lede { margin: 20px auto 0; max-width: 640px; }
  .wt-hero-cta { margin-top: 28px; }
  .wt-foot { margin: 16px 0 0; font-size: 13px; color: var(--ink-3); }
  .landing .v16-brand .wt-sec { padding: 88px 0; scroll-margin-top: 72px; background: var(--bg); }
  .landing .v16-brand .wt-alt { background: var(--bg-2); }
  .wt-wide { max-width: 1140px; }
  .landing .v16-brand .wt-head { margin-bottom: 40px; }
  .landing .v16-brand .wt-head p { max-width: 640px; margin-inline: auto; }
  .wt-grid3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
  .wt-grid4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
  .wt-card { display: flex; flex-direction: column; gap: 14px; padding: 24px; background: var(--paper); border: 1px solid var(--line); border-radius: 16px; }
  .landing .v16-brand .wt-card h3 { margin: 0; font-size: 18px; font-weight: 700; letter-spacing: -.02em; color: var(--ink); }
  .wt-card p { margin: 0; font-size: 15px; line-height: 1.6; color: var(--ink-2); }
  .wt-ic { width: 44px; height: 44px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; border-radius: 10px;
    color: var(--accent-ink); background: color-mix(in oklab, var(--accent-ink) 10%, var(--paper)); border: 1px solid color-mix(in oklab, var(--accent-ink) 24%, var(--line)); }
  .wt-ic svg { width: 22px; height: 22px; }
  .wt-prose { max-width: 760px; margin-inline: auto; }
  .wt-prose p { margin: 0 0 16px; font-size: 16px; line-height: 1.7; color: var(--ink-2); }
  .landing .v16-brand .wt-prose h3 { margin: 40px 0 14px; font-size: clamp(22px, 2.4vw, 28px); font-weight: 700; line-height: 1.2; letter-spacing: -.025em; color: var(--ink); }
  .wt-prose code { font-family: var(--f-mono); font-size: .9em; padding: 2px 6px; border-radius: 6px; background: var(--bg-2); border: 1px solid var(--line); color: var(--ink); overflow-wrap: anywhere; }
  .landing .v16-brand .wt-prose a { color: var(--accent-ink); font-weight: 600; }
  .landing .v16-brand .wt-prose a:hover { text-decoration: underline; }
  .wt-faq { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px 20px; align-items: start; max-width: 1040px; margin-inline: auto; }
  .wt-faq-col { display: grid; gap: 12px; }
  .wt-cta-foot { margin: 18px 0 0; font-size: 13px; color: var(--ink-3); }
  @media (max-width: 1000px) { .wt-grid4 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 860px) {
    .landing .v16-brand .wt-hero { padding: 140px 0 64px; }
    .landing .v16-brand .wt-sec { padding: 64px 0; }
    .wt-grid3, .wt-faq { grid-template-columns: minmax(0, 1fr); }
  }
  @media (max-width: 560px) { .wt-grid4 { grid-template-columns: minmax(0, 1fr); } }
`

function Cards({ items }: { items: WaToolItem[] }) {
  return (
    <>
      {items.map((item) => (
        <article key={item.title} className="wt-card">
          <span className="wt-ic" aria-hidden="true">{item.icon}</span>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </article>
      ))}
    </>
  )
}

const CHEVRON = (
  <span className="faq-pill-chev" aria-hidden="true">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </span>
)

export function WaToolLanding(p: WaToolLandingProps) {
  const h1Text = [p.hero.h1Lead, p.hero.h1Brand, p.hero.h1Rest].filter(Boolean).join(' ')
  const half = Math.ceil(p.faq.items.length / 2)
  const faqColumns = [p.faq.items.slice(0, half), p.faq.items.slice(half)]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Hero: brand dark page-hero, one blue phrase */}
      <section className="page-hero wt-hero" data-tone="dark">
        <div className="container">
          <span className="sec-tag">{p.hero.tag}</span>
          <h1>
            {h1Text}
            {p.hero.h1Highlight && <> <em>{p.hero.h1Highlight}</em></>}
          </h1>
          <p className="lede">{p.hero.subtitle}</p>
          <div className="wt-hero-cta">
            <a href={`#${p.anchorId}`} className="btn btn-primary btn-lg">{p.hero.cta}</a>
          </div>
          <p className="wt-foot">{p.hero.footnote}</p>
        </div>
      </section>

      {/* The tool itself */}
      <section id={p.anchorId} className="wt-sec">
        <div className="container wt-wide">
          <div className="sec-head centered wt-head">
            <h2>{p.tryItNow.h2}</h2>
            <p>{p.tryItNow.subtitle}</p>
          </div>
          {p.generator}
        </div>
      </section>

      {/* Use cases */}
      <section className="wt-sec wt-alt">
        <div className="container wt-wide">
          <div className="sec-head centered wt-head">
            <h2>{p.useCases.h2}</h2>
            <p>{p.useCases.subtitle}</p>
          </div>
          <div className="wt-grid3"><Cards items={p.useCases.items} /></div>
        </div>
      </section>

      {/* Explainer */}
      <section className="wt-sec">
        <div className="container wt-wide">
          <div className="sec-head centered wt-head">
            <h2>{p.seo.h2}</h2>
          </div>
          <div className="wt-prose">
            <p>{p.seo.p1}</p>
            <p>{p.seo.p2Pre}<code>{p.snippet}</code>{p.seo.p2Post}</p>
            <h3>{p.seo.h3}</h3>
            <p>{p.seo.p3}</p>
            <p>
              {p.seo.p4Pre}
              <a href={p.locale === 'en' ? '/' : `/${p.locale}`}>{p.seo.p4LinkText}</a>
              {p.seo.p4Post}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits: dark island */}
      <section className="wt-sec" data-tone="dark">
        <div className="container wt-wide">
          <div className="sec-head centered wt-head">
            <h2>{p.benefits.h2Lead} <em>{p.benefits.h2Em}</em></h2>
            <p>{p.benefits.subtitle}</p>
          </div>
          <div className="wt-grid4"><Cards items={p.benefits.items} /></div>
        </div>
      </section>

      {/* What it does for the business */}
      <section className="wt-sec wt-alt">
        <div className="container wt-wide">
          <div className="sec-head centered wt-head">
            <h2>{p.benefitCards.h2Lead} <em>{p.benefitCards.h2Em}</em></h2>
          </div>
          <div className="wt-grid3"><Cards items={p.benefitCards.items} /></div>
        </div>
      </section>

      {/* FAQ */}
      <section className="wt-sec">
        <div className="container wt-wide">
          <div className="sec-head centered wt-head">
            <h2>{p.faq.h2}</h2>
          </div>
          <div className="wt-faq">
            {faqColumns.map((column, i) => (
              <div className="wt-faq-col" key={i}>
                {column.map((f) => (
                  <details key={f.q} className="faq-pill">
                    <summary className="faq-pill-q">
                      <span>{f.q}</span>
                      {CHEVRON}
                    </summary>
                    <div className="faq-pill-a"><div>{f.a}</div></div>
                  </details>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA: the site's brand final-cta block */}
      <section className="final-cta" data-tone="dark">
        <div className="container">
          <span className="sec-tag">{p.cta.badge}</span>
          <h2>{p.cta.h2}</h2>
          <p className="sub">{p.cta.subtitle}</p>
          <div className="ctas">
            <a href={TRIAL_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">{p.cta.primary}</a>
            <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg">{p.cta.secondary}</a>
          </div>
          <p className="wt-cta-foot">{p.cta.footnote}</p>
        </div>
      </section>
    </>
  )
}
