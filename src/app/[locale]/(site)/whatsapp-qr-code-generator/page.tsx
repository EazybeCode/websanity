import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import QRCode from 'qrcode'
import { routing } from '@/i18n/routing'
import { getAlternates } from '@/lib/seo-helpers'
import { QrGeneratorClient } from '@/components/pages/QrGeneratorClient'
import { getQrPageContent } from '@/data/whatsapp-qr-content'

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
  const t = getQrPageContent(locale)
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: getAlternates(locale, '/whatsapp-qr-code-generator'),
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      title: t.meta.title.replace(' | Eazybe', ''),
      description: t.meta.ogDescription,
      siteName: 'Eazybe',
    },
  }
}

// SVG icons — kept in JSX so the translation file stays pure strings
const ICON_WEBSITE = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="2" y1="7" x2="22" y2="7" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
)
const ICON_PRINT = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" rx="1" />
  </svg>
)
const ICON_SOCIAL = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22 6 12 13 2 6" />
  </svg>
)
const ICON_CHECK = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12l5 5L20 7" />
  </svg>
)
const ICON_CHAT = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
)
const ICON_TREND = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)
const ICON_CLOCK = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)
const ICON_SHIELD = (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)
const ICON_BUBBLE = (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
)
const ICON_CIRCLE_CHECK = (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

const SITE_URL = 'https://eazybe.com'

export default async function WhatsAppQrGeneratorPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = getQrPageContent(locale)

  const sampleQr = await QRCode.toDataURL(
    'https://wa.me/13024129610?text=Hi%20-%20I%20just%20scanned%20your%20WhatsApp%20QR.',
    { width: 320, margin: 1, color: { dark: '#0F1115', light: '#FFFFFF' }, errorCorrectionLevel: 'M' },
  )

  // ─── JSON-LD: BreadcrumbList ──────────────────────────────────────────────
  const localePath = locale === 'en' ? '' : `/${locale}`
  const homeUrl = `${SITE_URL}${locale === 'en' ? '/' : `/${locale}`}`
  const pageUrl = `${SITE_URL}${localePath}/whatsapp-qr-code-generator`
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.breadcrumb.home, item: homeUrl },
      { '@type': 'ListItem', position: 2, name: t.breadcrumb.current, item: pageUrl },
    ],
  }

  // ─── JSON-LD: FAQPage (built dynamically from the localized FAQ items) ────
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }

  const useCases = [
    { title: t.useCases.websiteTitle, body: t.useCases.websiteBody, icon: ICON_WEBSITE },
    { title: t.useCases.printTitle, body: t.useCases.printBody, icon: ICON_PRINT },
    { title: t.useCases.socialTitle, body: t.useCases.socialBody, icon: ICON_SOCIAL },
  ]
  const benefits = [
    { title: t.benefits.noInstallTitle, body: t.benefits.noInstallBody, icon: ICON_CHECK },
    { title: t.benefits.prefilledTitle, body: t.benefits.prefilledBody, icon: ICON_CHAT },
    { title: t.benefits.conversionTitle, body: t.benefits.conversionBody, icon: ICON_TREND },
    { title: t.benefits.freeTitle, body: t.benefits.freeBody, icon: ICON_CLOCK },
  ]
  const benefitCards = [
    { title: t.benefitCards.scanTitle, body: t.benefitCards.scanBody, icon: ICON_SHIELD },
    { title: t.benefitCards.clickTitle, body: t.benefitCards.clickBody, icon: ICON_BUBBLE },
    { title: t.benefitCards.leadsTitle, body: t.benefitCards.leadsBody, icon: ICON_CIRCLE_CHECK },
  ]

  return (
    <>
      {/* JSON-LD structured data: BreadcrumbList + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Mobile-only centering for the hero left column */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 640px) {
              .qr-hero-left { text-align: center; }
              .qr-hero-left h1 { margin-left: auto; margin-right: auto; }
              .qr-hero-left p { margin-left: auto; margin-right: auto; }
            }
          `,
        }}
      />

      {/* Hero — two columns, text left, visual right */}
      <section className="section" style={{ paddingTop: 'clamp(96px, 12vw, 140px)', paddingBottom: 60, background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: 1180 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48, alignItems: 'center' }}>
            <div className="qr-hero-left">
              <h1 style={{ fontFamily: 'var(--f-display)', fontWeight: 400, fontSize: locale === 'en' ? 'clamp(32px, 5vw, 55px)' : 'clamp(32px, 4.2vw, 60px)', lineHeight: 1.08, letterSpacing: '-0.025em', color: 'var(--ink)', margin: 0, paddingBottom: '0.05em' }}>
                {t.hero.h1Lead} <span style={{ color: '#25D366' }}>{t.hero.h1Brand}</span> {t.hero.h1Rest}{' '}
                <span style={{ display: 'inline-block', backgroundImage: 'linear-gradient(transparent 62%, color-mix(in oklab, var(--accent-ink) 25%, transparent) 62%)', paddingBottom: 2 }}>
                  {t.hero.h1Highlight}
                </span>
              </h1>
              <p style={{ marginTop: 22, fontSize: 17, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 520 }}>
                {t.hero.subtitle}
              </p>
              <div style={{ marginTop: 28 }}>
                <a href="#qr-generator" className="btn btn-primary btn-lg">{t.hero.cta}</a>
              </div>
              <p style={{ marginTop: 18, fontSize: 13, color: 'var(--ink-3)' }}>{t.hero.footnote}</p>
            </div>

            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, margin: 'auto', width: 'min(440px, 90%)', height: 'min(440px, 90%)', background: 'radial-gradient(circle at center, color-mix(in oklab, var(--accent-ink) 22%, transparent), transparent 70%)', borderRadius: '50%', zIndex: 0 }} />
              <div style={{ position: 'relative', zIndex: 1, width: 'min(380px, 100%)', background: 'linear-gradient(180deg, #5BAA7F 0%, #4A9170 100%)', borderRadius: 18, padding: 24, color: '#ffffff', boxShadow: '0 20px 50px -16px rgba(15,17,21,0.25), 0 2px 6px rgba(15,17,21,0.08)' }}>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 18 }}>{t.preview.title}</div>
                <div style={{ fontSize: 12, opacity: 0.9, marginBottom: 6 }}>{t.preview.numberLabel}</div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.45)', borderRadius: 4, marginBottom: 6 }} />
                <div style={{ background: '#ffffff', borderRadius: 8, height: 38, marginBottom: 14 }} />
                <div style={{ fontSize: 12, opacity: 0.9, marginBottom: 6 }}>{t.preview.messageLabel}</div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.45)', borderRadius: 4, marginBottom: 6 }} />
                <div style={{ background: '#ffffff', borderRadius: 8, height: 38, marginBottom: 18 }} />
                <div style={{ display: 'flex', gap: 10 }}>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 999, padding: '10px 0', textAlign: 'center', fontSize: 13, fontWeight: 600 }}>{t.preview.btnGenerate}</div>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 999, padding: '10px 0', textAlign: 'center', fontSize: 13, fontWeight: 600 }}>{t.preview.btnExport}</div>
                </div>
                <div style={{ position: 'absolute', left: -32, bottom: -32, width: 120, height: 120, background: 'radial-gradient(circle, #C5E5D2 0%, #A8D7BA 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px -10px rgba(15,17,21,0.2)' }}>
                  <img src={sampleQr} alt={t.preview.qrAlt} width={84} height={84} style={{ width: 84, height: 84, borderRadius: 6, background: '#fff', padding: 4 }} />
                </div>
                <div style={{ position: 'absolute', right: -22, top: -22, width: 64, height: 64, background: '#25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px -8px rgba(37,211,102,0.6)' }} aria-hidden="true">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="#ffffff">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live generator */}
      <section id="qr-generator" className="section" style={{ paddingTop: 60, paddingBottom: 80, scrollMarginTop: 80, background: 'linear-gradient(180deg, #ECEFF7 0%, #ffffff 100%)' }}>
        <div className="container" style={{ maxWidth: 1100 }}>
          <div className="sec-head centered" style={{ marginBottom: 32 }}>
            <h2>{t.tryItNow.h2}</h2>
            <p>{t.tryItNow.subtitle}</p>
          </div>
          <QrGeneratorClient labels={t.generator} />
        </div>
      </section>

      {/* Use cases */}
      <section className="section" style={{ paddingTop: 70, paddingBottom: 70, background: '#F5F7FC' }}>
        <div className="container" style={{ maxWidth: 1180 }}>
          <div className="sec-head centered" style={{ marginBottom: 44 }}>
            <h2>{t.useCases.h2}</h2>
            <p>{t.useCases.subtitle}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {useCases.map((u) => (
              <article key={u.title} style={{ background: '#ffffff', border: '1px solid #E4E8F1', borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column', gap: 16, boxShadow: '0 1px 0 rgba(15,17,21,0.03), 0 12px 28px -18px rgba(15,17,21,0.18)' }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(37, 211, 102, 0.12)', color: '#1B7A41', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} aria-hidden="true">{u.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em', margin: 0, color: '#0F1115' }}>{u.title}</h3>
                <p style={{ margin: 0, color: '#2A2E38', fontSize: 15, lineHeight: 1.6 }}>{u.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="section" style={{ paddingTop: 50, paddingBottom: 70, background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: 1180 }}>
          <div className="sec-head centered" style={{ marginBottom: 24 }}>
            <h2>{t.seo.h2}</h2>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: '#2A2E38', margin: '0 0 16px' }}>{t.seo.p1}</p>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: '#2A2E38', margin: '0 0 32px' }}>
            {t.seo.p2Pre}
            <code style={{ fontFamily: 'var(--f-mono, ui-monospace, monospace)', background: '#F1F4F9', border: '1px solid #E4E8F1', padding: '2px 6px', borderRadius: 6, fontSize: '0.92em', color: '#0F1115' }}>
              https://wa.me/[country code + phone number]?text=[message]
            </code>
            {t.seo.p2Post}
          </p>
          <h3 style={{ fontFamily: 'var(--f-display)', fontWeight: 400, fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.15, letterSpacing: '-0.018em', color: 'var(--ink)', textWrap: 'balance', margin: '40px 0 16px', textAlign: 'center' }}>{t.seo.h3}</h3>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: '#2A2E38', margin: '0 0 16px' }}>{t.seo.p3}</p>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: '#2A2E38', margin: 0 }}>
            {t.seo.p4Pre}
            <a href={locale === 'en' ? '/' : `/${locale}`} style={{ color: '#5B4BAE', fontWeight: 500 }}>{t.seo.p4LinkText}</a>
            {t.seo.p4Post}
          </p>
        </div>
      </section>

      {/* Benefits — dark island */}
      <section className="section" data-tone="dark" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="container" style={{ maxWidth: 1180 }}>
          <div className="sec-head centered" style={{ marginBottom: 48 }}>
            <h2>{t.benefits.h2Lead} <em>{t.benefits.h2Em}</em></h2>
            <p>{t.benefits.subtitle}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {benefits.map((b) => (
              <article key={b.title} style={{ background: '#181B24', border: '1px solid #2A2F3E', borderRadius: 16, padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: 'rgba(91, 75, 174, 0.18)', border: '1px solid rgba(91, 75, 174, 0.35)', color: '#A78BFA', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} aria-hidden="true">{b.icon}</div>
                <h3 style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.01em', margin: 0, color: '#F0F3FA' }}>{b.title}</h3>
                <p style={{ margin: 0, color: '#9AA0B0', fontSize: 14.5, lineHeight: 1.6 }}>{b.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Benefit cards — iris-accent on lavender */}
      <section className="section" style={{ paddingTop: 80, paddingBottom: 80, background: 'linear-gradient(180deg, #ffffff 0%, #F3F0FA 100%)' }}>
        <div className="container" style={{ maxWidth: 1180 }}>
          <div className="sec-head centered" style={{ marginBottom: 48, maxWidth: 880 }}>
            <h2>{t.benefitCards.h2Lead} <em style={{ color: '#5B4BAE' }}>{t.benefitCards.h2Em}</em></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {benefitCards.map((card) => (
              <article key={card.title} style={{ background: '#ffffff', border: '1px solid #DDD4F0', borderRadius: 18, padding: 32, display: 'flex', flexDirection: 'column', gap: 18, boxShadow: '0 1px 0 rgba(91, 75, 174, 0.04), 0 14px 32px -20px rgba(91, 75, 174, 0.25)', position: 'relative', overflow: 'hidden' }}>
                <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #A78BFA 0%, #5B4BAE 100%)' }} />
                <div style={{ width: 60, height: 60, borderRadius: 14, background: 'linear-gradient(135deg, #EAE3F8 0%, #C8B7E8 100%)', color: '#5B4BAE', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} aria-hidden="true">{card.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em', margin: 0, color: '#0F1115' }}>{card.title}</h3>
                <p style={{ margin: 0, color: '#3D2F5C', fontSize: 15, lineHeight: 1.6 }}>{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" data-tone="dark" style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="sec-head centered" style={{ marginBottom: 32 }}>
            <h2>{t.faq.h2}</h2>
          </div>
          <div className="faq-grid">
            <div className="faq-col">
              {t.faq.items.slice(0, Math.ceil(t.faq.items.length / 2)).map((f) => (
                <details key={f.q} className="faq-pill">
                  <summary className="faq-pill-q">
                    <span>{f.q}</span>
                    <span className="faq-pill-chev" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </summary>
                  <div className="faq-pill-a"><div>{f.a}</div></div>
                </details>
              ))}
            </div>
            <div className="faq-col faq-col-rest">
              {t.faq.items.slice(Math.ceil(t.faq.items.length / 2)).map((f) => (
                <details key={f.q} className="faq-pill">
                  <summary className="faq-pill-q">
                    <span>{f.q}</span>
                    <span className="faq-pill-chev" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </summary>
                  <div className="faq-pill-a"><div>{f.a}</div></div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 80, paddingBottom: 100, background: '#ffffff', borderTop: '1px solid #E4E8F1' }}>
        <div className="container" style={{ maxWidth: 760, textAlign: 'center' }}>
          <span style={{ display: 'inline-block', padding: '6px 14px', borderRadius: 999, background: 'rgba(91, 75, 174, 0.1)', color: '#5B4BAE', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>{t.cta.badge}</span>
          <div className="sec-head centered" style={{ marginBottom: 18 }}>
            <h2>{t.cta.h2}</h2>
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: '#2A4150', margin: '0 auto 32px', maxWidth: 580 }}>{t.cta.subtitle}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://eazybe.info/6c2a82" target="_blank" rel="noopener noreferrer" className="btn btn-primary">{t.cta.primary}</a>
            <a href="https://eazybe.info/demono" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: '#5B4BAE', color: '#ffffff' }}>{t.cta.secondary}</a>
          </div>
          <p style={{ marginTop: 22, fontSize: 13, color: '#5A6070' }}>{t.cta.footnote}</p>
        </div>
      </section>
    </>
  )
}
