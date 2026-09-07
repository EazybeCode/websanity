import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getAlternates } from '@/lib/seo-helpers'
import { getAiAgentPageContent } from '@/data/whatsapp-ai-agent-content'
import { SetupSteps, FitsTabs } from '@/components/pages/WhatsappAiAgentInteractive'

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
  const t = getAiAgentPageContent(locale)
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: getAlternates(locale, '/whatsapp-ai-agent'),
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
const CHROME_STORE_URL = 'https://chromewebstore.google.com/detail/whatsapp-ai-agents-with-c/clgficggccelgifppbcaepjdkklfcefd'
const DEMO_URL = 'https://eazybe.info/demono'

// Icons stay here so the content file is pure strings.
const AGENT_ICONS = [
  // CRM Sync — refresh arrows
  <svg key="sync" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 1-15.3 6.4L3 16" /><path d="M3 12a9 9 0 0 1 15.3-6.4L21 8" /><path d="M3 21v-5h5" /><path d="M21 3v5h-5" /></svg>,
  // Lead Qualification — target
  <svg key="lead" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>,
  // Revenue — trend
  <svg key="rev" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 17 9 11 13 15 21 7" /><polyline points="15 7 21 7 21 13" /></svg>,
  // Customer Success — chat
  <svg key="cs" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M9 10h.01M13 10h.01" /></svg>,
  // CTWA — megaphone
  <svg key="ctwa" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-7-7 18-2.5-7.5L3 11z" /></svg>,
  // Agent Builder — blocks
  <svg key="builder" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /><path d="M17 14v6M14 17h6" /></svg>,
]

const AGENT_TINTS = ['#7FD6B0', '#8FB7F5', '#E8C77E', '#D8A2E8', '#F0A48A', '#9BE0E8']

export default async function WhatsappAiAgentPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = getAiAgentPageContent(locale)

  const prefix = locale === 'en' ? '' : `/${locale}`
  const homeUrl = `${SITE_URL}${locale === 'en' ? '/' : `/${locale}`}`
  const pageUrl = `${SITE_URL}${prefix}/whatsapp-ai-agent`

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.breadcrumb.home, item: homeUrl },
      { '@type': 'ListItem', position: 2, name: t.breadcrumb.current },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* ---- Liquid glass theme ------------------------------------- */
            /* Slow-drifting color blobs behind frosted panes. Blobs are
               decorative layers inside each section wrapper. */
            .aia-liquid { position: relative; overflow: hidden; }
            .aia-blob {
              position: absolute; border-radius: 50%; filter: blur(70px); opacity: .55;
              pointer-events: none; z-index: 0;
              animation: aia-drift 16s ease-in-out infinite alternate;
            }
            @keyframes aia-drift {
              from { transform: translate(-4%, -3%) scale(1); }
              to   { transform: translate(4%, 5%) scale(1.12); }
            }
            @media (prefers-reduced-motion: reduce) { .aia-blob { animation: none; } }
            .aia-z { position: relative; z-index: 1; }

            .aia-glass {
              background: rgba(255, 255, 255, 0.55);
              border: 1px solid rgba(255, 255, 255, 0.75);
              box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 18px 40px -24px rgba(15, 17, 21, 0.25);
              backdrop-filter: blur(16px) saturate(1.35);
              -webkit-backdrop-filter: blur(16px) saturate(1.35);
              border-radius: 20px;
            }
            .aia-glass-dark {
              background: rgba(255, 255, 255, 0.06);
              border: 1px solid rgba(255, 255, 255, 0.14);
              box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(14px) saturate(1.3);
              -webkit-backdrop-filter: blur(14px) saturate(1.3);
              border-radius: 20px;
            }

            /* Hero */
            .aia-hero-chips { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 26px; }
            .aia-chip {
              display: inline-flex; align-items: center; gap: 7px; padding: 7px 15px; border-radius: 999px;
              font-size: 13px; font-weight: 600; color: var(--ink-2);
              background: rgba(255, 255, 255, 0.6); border: 1px solid rgba(255, 255, 255, 0.85);
              box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 8px 18px -12px rgba(15,17,21,.25);
              backdrop-filter: blur(10px);
            }
            .aia-chip::before { content: ''; width: 7px; height: 7px; border-radius: 999px; background: var(--accent-ink); opacity: .75; }

            /* Agent cards */
            .aia-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 20px; }
            .aia-card { padding: 26px; transition: transform .2s ease, box-shadow .2s ease; }
            .aia-card:hover { transform: translateY(-3px); box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 26px 50px -26px rgba(15, 17, 21, 0.35); }
            @media (prefers-reduced-motion: reduce) { .aia-card, .aia-card:hover { transform: none; transition: none; } }
            .aia-card-icon {
              width: 42px; height: 42px; border-radius: 13px; display: flex; align-items: center; justify-content: center;
              margin-bottom: 16px;
            }
            .aia-card h3 { font-size: 16.5px; font-weight: 700; color: var(--ink); margin: 0 0 8px; }
            .aia-card p { margin: 0; font-size: 14.5px; line-height: 1.6; color: var(--ink-2); }

            /* Dark memory section */
            .aia-mem { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(28px, 5vw, 64px); align-items: center; }
            @media (max-width: 900px) { .aia-mem { grid-template-columns: 1fr; } }
            .landing .aia-mem-point { display: flex; gap: 12px; align-items: flex-start; padding: 16px 18px; color: #E8EAF0; font-size: 14.5px; line-height: 1.6; }
            .aia-mem-point + .aia-mem-point { margin-top: 12px; }
            .aia-mem-check { flex-shrink: 0; width: 22px; height: 22px; border-radius: 999px; display: flex; align-items: center; justify-content: center;
              background: color-mix(in oklab, #7FD6B0 20%, transparent); border: 1px solid color-mix(in oklab, #7FD6B0 45%, transparent); color: #7FD6B0; margin-top: 1px; }

            /* Steps — interactive: click to jump, auto-advance with a bar */
            .aia-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
            .aia-step { padding: 26px; }
            .aia-step-btn { display: block; width: 100%; text-align: left; cursor: pointer; transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease; }
            .aia-step-btn:hover { transform: translateY(-2px); }
            .aia-step-btn.is-active {
              border-color: color-mix(in oklab, var(--accent-ink) 40%, rgba(255,255,255,.75));
              box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 24px 48px -26px color-mix(in oklab, var(--accent-ink) 45%, rgba(15,17,21,.35));
            }
            .aia-step-btn:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 3px; }
            @media (prefers-reduced-motion: reduce) { .aia-step-btn, .aia-step-btn:hover { transform: none; transition: none; } }
            .aia-step-n {
              width: 40px; height: 40px; border-radius: 999px; display: flex; align-items: center; justify-content: center;
              font-family: var(--f-display); font-size: 18px; color: #fff; background: var(--accent-ink); margin-bottom: 14px;
              box-shadow: 0 10px 20px -10px color-mix(in oklab, var(--accent-ink) 70%, transparent);
              transition: background .2s ease;
            }
            .aia-step-n.is-done { background: #2E9E73; }
            .aia-step h3 { font-size: 16px; font-weight: 700; color: var(--ink); margin: 0 0 6px; }
            .aia-step p { margin: 0; font-size: 14px; line-height: 1.6; color: var(--ink-2); }
            .aia-step-bar { margin-top: 16px; height: 3px; border-radius: 3px; overflow: hidden; background: color-mix(in oklab, var(--accent-ink) 12%, transparent); }
            .aia-step-bar > span { display: block; height: 100%; width: 0; background: var(--accent-ink); border-radius: inherit; animation: aia-bar-fill 3.5s linear forwards; }
            @keyframes aia-bar-fill { to { width: 100%; } }
            @media (prefers-reduced-motion: reduce) { .aia-step-bar { display: none; } }

            /* Fits tabs — glass segmented control + fading pane */
            .aia-fits { max-width: 820px; margin: 0 auto; }
            .aia-fits-tabs { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-bottom: 22px; }
            .aia-fits-tab {
              cursor: pointer; padding: 10px 19px; border-radius: 999px; font-size: 13.5px; font-weight: 600; color: var(--ink-2);
              background: rgba(255,255,255,.55); border: 1px solid rgba(255,255,255,.8);
              backdrop-filter: blur(10px); box-shadow: inset 0 1px 0 rgba(255,255,255,.9);
              transition: background .18s ease, color .18s ease, border-color .18s ease;
            }
            .aia-fits-tab:hover { border-color: color-mix(in oklab, var(--accent-ink) 35%, rgba(255,255,255,.8)); }
            .aia-fits-tab.is-active { background: var(--accent-ink); border-color: var(--accent-ink); color: #fff; box-shadow: 0 12px 24px -12px color-mix(in oklab, var(--accent-ink) 70%, transparent); }
            .aia-fits-tab:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 3px; }
            .aia-fits-pane { padding: clamp(26px, 4vw, 40px); text-align: center; }
            .aia-fits-body { animation: aia-pane-in .35s ease; }
            @keyframes aia-pane-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
            @media (prefers-reduced-motion: reduce) { .aia-fits-body { animation: none; } }
            .aia-fits-pane h3 { font-size: 19px; font-weight: 700; color: var(--ink); margin: 0 0 10px; }
            .aia-fits-pane p { margin: 0 auto; max-width: 560px; font-size: 15px; line-height: 1.7; color: var(--ink-2); }
            .aia-fits-dots { display: flex; gap: 6px; justify-content: center; margin-top: 22px; }
            .aia-fits-dots span { width: 7px; height: 7px; border-radius: 999px; background: color-mix(in oklab, var(--accent-ink) 20%, transparent); transition: background .18s ease, transform .18s ease; }
            .aia-fits-dots span.is-active { background: var(--accent-ink); transform: scale(1.25); }

            /* FAQ */
            .aia-faq { max-width: 780px; margin: 0 auto; display: grid; gap: 12px; }
            .aia-faq details { padding: 0; overflow: hidden; }
            .aia-faq summary {
              cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; gap: 14px;
              padding: 18px 22px; font-size: 15px; font-weight: 700; color: var(--ink);
            }
            .aia-faq summary::-webkit-details-marker { display: none; }
            .aia-faq summary::after { content: '+'; font-size: 20px; font-weight: 400; color: var(--accent-ink); transition: transform .18s ease; }
            .aia-faq details[open] summary::after { transform: rotate(45deg); }
            .aia-faq details p { margin: 0; padding: 0 22px 20px; font-size: 14.5px; line-height: 1.65; color: var(--ink-2); }
            .aia-faq summary:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: -2px; border-radius: 20px; }

            /* CTAs */
            .landing .aia-btn {
              display: inline-flex; align-items: center; justify-content: center; padding: 13px 26px; border-radius: 999px;
              font-size: 15px; font-weight: 600; transition: transform .16s ease, opacity .16s ease;
            }
            .landing .aia-btn:hover { transform: translateY(-1px); opacity: .94; }
            .landing .aia-btn:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 3px; }
            .landing .aia-btn-primary { background: var(--accent-ink); color: #fff !important; box-shadow: 0 14px 28px -14px color-mix(in oklab, var(--accent-ink) 75%, transparent); }
            .landing .aia-btn-glass {
              color: var(--ink) !important; background: rgba(255,255,255,.6); border: 1px solid rgba(255,255,255,.85);
              backdrop-filter: blur(10px); box-shadow: inset 0 1px 0 rgba(255,255,255,.9);
            }
            .landing .aia-btn-glass-dark { color: #fff !important; background: rgba(255,255,255,.09); border: 1px solid rgba(255,255,255,.22); backdrop-filter: blur(10px); }
            @media (prefers-reduced-motion: reduce) { .landing .aia-btn, .landing .aia-btn:hover { transform: none; transition: none; } }
          `,
        }}
      />

      {/* Hero — light liquid glass */}
      <section className="section aia-liquid" style={{ paddingTop: 'clamp(96px, 12vw, 136px)', paddingBottom: 72, background: '#F4F6FB' }}>
        <span className="aia-blob" style={{ width: 480, height: 480, top: -140, left: '-6%', background: 'color-mix(in oklab, var(--accent-a) 55%, #fff)' }} />
        <span className="aia-blob" style={{ width: 420, height: 420, top: 40, right: '-8%', background: 'color-mix(in oklab, #8F7BE8 45%, #fff)', animationDelay: '-8s' }} />
        <span className="aia-blob" style={{ width: 300, height: 300, bottom: -120, left: '38%', background: 'color-mix(in oklab, #E8C77E 45%, #fff)', animationDelay: '-4s' }} />
        <div className="container aia-z" style={{ maxWidth: 880, textAlign: 'center' }}>
          <span className="sec-tag">{t.hero.tag}</span>
          <h1
            style={{
              fontFamily: 'var(--f-display)',
              fontWeight: 400,
              fontSize: 'clamp(34px, 5.2vw, 58px)',
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              color: 'var(--ink)',
              margin: '12px 0 0',
            }}
          >
            {t.hero.h1Lead}{' '}
            <span style={{ backgroundImage: 'linear-gradient(transparent 62%, color-mix(in oklab, var(--accent-ink) 25%, transparent) 62%)' }}>
              {t.hero.h1Highlight}
            </span>
          </h1>
          <p style={{ margin: '24px auto 0', maxWidth: 680, fontSize: 17, lineHeight: 1.65, color: 'var(--ink-2)' }}>
            {t.hero.subtitle}
          </p>
          <div className="aia-hero-chips">
            {t.hero.chips.map((c) => (
              <span key={c} className="aia-chip">{c}</span>
            ))}
          </div>
          <div style={{ marginTop: 30, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="aia-btn aia-btn-primary">{t.hero.ctaPrimary}</a>
            <a href={DEMO_URL} className="aia-btn aia-btn-glass">{t.hero.ctaSecondary}</a>
          </div>
          <p style={{ marginTop: 20, fontSize: 13, color: 'var(--ink-3)' }}>{t.hero.footnote}</p>
        </div>
      </section>

      {/* Agents grid */}
      <section className="section aia-liquid" style={{ paddingTop: 70, paddingBottom: 80, background: 'linear-gradient(180deg, #F4F6FB 0%, #ffffff 100%)' }}>
        <span className="aia-blob" style={{ width: 380, height: 380, top: '30%', left: '-10%', background: 'color-mix(in oklab, var(--accent-a) 40%, #fff)', animationDelay: '-6s' }} />
        <div className="container aia-z" style={{ maxWidth: 1180 }}>
          <div className="sec-head centered" style={{ marginBottom: 44 }}>
            <h2>{t.agents.h2}</h2>
            <p>{t.agents.subtitle}</p>
          </div>
          <div className="aia-grid">
            {t.agents.cards.map((card, i) => (
              <div key={card.name} className="aia-glass aia-card">
                <div
                  className="aia-card-icon"
                  style={{
                    background: `color-mix(in oklab, ${AGENT_TINTS[i]} 18%, #fff)`,
                    border: `1px solid color-mix(in oklab, ${AGENT_TINTS[i]} 45%, transparent)`,
                    color: `color-mix(in oklab, ${AGENT_TINTS[i]} 60%, #1c1e26)`,
                  }}
                >
                  {AGENT_ICONS[i]}
                </div>
                <h3>{card.name}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One memory — dark liquid glass */}
      <section className="section aia-liquid" data-tone="dark" style={{ paddingTop: 84, paddingBottom: 84, background: 'linear-gradient(135deg, #0B0D12 0%, #191533 55%, #101319 100%)' }}>
        <span className="aia-blob" style={{ width: 460, height: 460, top: -160, right: '-6%', background: 'rgba(127, 214, 176, 0.35)', opacity: 0.4 }} />
        <span className="aia-blob" style={{ width: 380, height: 380, bottom: -140, left: '-4%', background: 'rgba(143, 123, 232, 0.4)', opacity: 0.45, animationDelay: '-9s' }} />
        <div className="container aia-z" style={{ maxWidth: 1100 }}>
          <div className="aia-mem">
            <div>
              <h2 style={{ color: '#fff', fontFamily: 'var(--f-display)', fontWeight: 400, fontSize: 'clamp(28px, 3.6vw, 42px)', lineHeight: 1.12, letterSpacing: '-0.02em', margin: 0 }}>{t.memory.h2}</h2>
              <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.7, color: '#B9BFCE' }}>{t.memory.body}</p>
              <div style={{ marginTop: 26 }}>
                <a href={DEMO_URL} className="aia-btn aia-btn-glass-dark">{t.hero.ctaSecondary}</a>
              </div>
            </div>
            <div>
              {t.memory.points.map((p) => (
                <div key={p} className="aia-glass-dark aia-mem-point">
                  <span className="aia-mem-check" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Setup steps — interactive stepper */}
      <section className="section" style={{ paddingTop: 80, paddingBottom: 40, background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: 1100 }}>
          <div className="sec-head centered" style={{ marginBottom: 40 }}>
            <span className="sec-tag">{t.how.tag}</span>
            <h2>{t.how.h2}</h2>
            <p>{t.how.subtitle}</p>
          </div>
          <SetupSteps steps={t.how.steps} />
        </div>
      </section>

      {/* Use cases — interactive tabs */}
      <section className="section aia-liquid" style={{ paddingTop: 56, paddingBottom: 80, background: 'linear-gradient(180deg, #ffffff 0%, #F0F3FA 100%)' }}>
        <span className="aia-blob" style={{ width: 340, height: 340, bottom: -100, right: '-8%', background: 'color-mix(in oklab, #8F7BE8 35%, #fff)', animationDelay: '-5s' }} />
        <div className="container aia-z" style={{ maxWidth: 1100 }}>
          <div className="sec-head centered" style={{ marginBottom: 40 }}>
            <h2>{t.fits.h2}</h2>
            <p>{t.fits.subtitle}</p>
          </div>
          <FitsTabs cards={t.fits.cards} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ paddingTop: 70, paddingBottom: 80, background: '#F0F3FA' }}>
        <div className="container">
          <div className="sec-head centered" style={{ marginBottom: 36 }}>
            <h2>{t.faqTitle}</h2>
          </div>
          <div className="aia-faq">
            {t.faq.map((f) => (
              <details key={f.q} className="aia-glass">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — dark glass panel */}
      <section className="section aia-liquid" data-tone="dark" style={{ paddingTop: 84, paddingBottom: 96, background: 'linear-gradient(135deg, #101319 0%, #1a1633 60%, #0B0D12 100%)' }}>
        <span className="aia-blob" style={{ width: 420, height: 420, top: -120, left: '30%', background: 'rgba(127, 214, 176, 0.3)', opacity: 0.4, animationDelay: '-7s' }} />
        <div className="container aia-z" style={{ maxWidth: 860, textAlign: 'center' }}>
          <div className="aia-glass-dark" style={{ padding: 'clamp(36px, 5vw, 56px)' }}>
            <h2 style={{ color: '#fff', fontFamily: 'var(--f-display)', fontWeight: 400, fontSize: 'clamp(28px, 3.6vw, 40px)', lineHeight: 1.12, letterSpacing: '-0.02em', margin: 0 }}>{t.finalCta.h2}</h2>
            <p style={{ margin: '16px auto 0', maxWidth: 560, fontSize: 15.5, lineHeight: 1.65, color: '#B9BFCE' }}>{t.finalCta.body}</p>
            <div style={{ marginTop: 28, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="aia-btn aia-btn-primary">{t.finalCta.primary}</a>
              <a href={DEMO_URL} className="aia-btn aia-btn-glass-dark">{t.finalCta.secondary}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
