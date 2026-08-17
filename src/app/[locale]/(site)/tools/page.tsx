import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getAlternates } from '@/lib/seo-helpers'
import { getToolsPageContent } from '@/data/tools-content'
import { ToolsGridClient } from '@/components/pages/ToolsGridClient'

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
  const t = getToolsPageContent(locale)
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: getAlternates(locale, '/tools'),
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

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = getToolsPageContent(locale)

  const localePath = locale === 'en' ? '' : `/${locale}`
  const homeUrl = `${SITE_URL}${locale === 'en' ? '/' : `/${locale}`}`
  const pageUrl = `${SITE_URL}${localePath}/tools`
  // Tools keep their own top-level URLs; this page only points at them.
  const toolUrl = (href: string) => `${SITE_URL}${localePath}${href}`

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.breadcrumb.home, item: homeUrl },
      { '@type': 'ListItem', position: 2, name: t.breadcrumb.current, item: pageUrl },
    ],
  }

  // A directory page is an ItemList of the things it lists.
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t.breadcrumb.current,
    itemListOrder: 'https://schema.org/ItemListUnordered',
    numberOfItems: t.tools.length,
    itemListElement: t.tools.map((tool, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'WebApplication',
        name: tool.name,
        description: tool.tagline,
        url: toolUrl(tool.href),
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
    })),
  }

  const reasons = [
    { title: t.why.freeTitle, body: t.why.freeBody },
    { title: t.why.noSignupTitle, body: t.why.noSignupBody },
    { title: t.why.browserTitle, body: t.why.browserBody },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .why-card { background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 26px; }
          `,
        }}
      />

      {/* Hero */}
      <section className="section" style={{ paddingTop: 'clamp(96px, 12vw, 132px)', paddingBottom: 48, background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: 860, textAlign: 'center' }}>
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
          <p style={{ margin: '22px auto 0', maxWidth: 660, fontSize: 17, lineHeight: 1.6, color: 'var(--ink-2)' }}>
            {t.hero.subtitle}
          </p>
          <div style={{ marginTop: 28 }}>
            <a href="#tools" className="btn btn-primary btn-lg">{t.hero.cta}</a>
          </div>
          <p style={{ marginTop: 18, fontSize: 13, color: 'var(--ink-3)' }}>{t.hero.footnote}</p>
        </div>
      </section>

      {/* Tool grid — every card links to the tool's own top-level URL */}
      <section
        id="tools"
        className="section"
        style={{ paddingTop: 40, paddingBottom: 80, scrollMarginTop: 80, background: 'linear-gradient(180deg, #ECEFF7 0%, #ffffff 100%)' }}
      >
        <div className="container" style={{ maxWidth: 1140 }}>
          <div className="sec-head centered" style={{ marginBottom: 36 }}>
            <h2>{t.grid.h2}</h2>
            <p>{t.grid.subtitle}</p>
          </div>
          <ToolsGridClient tools={t.tools} labels={{ ...t.grid, ...t.filter }} locale={locale} />
        </div>
      </section>

      {/* Why free */}
      <section className="section" style={{ paddingTop: 70, paddingBottom: 70, background: '#F5F7FC' }}>
        <div className="container" style={{ maxWidth: 1100 }}>
          <div className="sec-head centered" style={{ marginBottom: 40 }}>
            <h2>{t.why.h2}</h2>
            <p>{t.why.subtitle}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22 }}>
            {reasons.map((r) => (
              <div key={r.title} className="why-card">
                <h3 style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 700, color: 'var(--ink)' }}>{r.title}</h3>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink-2)' }}>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section" data-tone="dark" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="container" style={{ maxWidth: 1000, textAlign: 'center' }}>
          <div className="sec-head centered" style={{ marginBottom: 28 }}>
            <h2>{t.finalCta.h2}</h2>
            <p>{t.finalCta.body}</p>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={locale === 'en' ? '/pricing' : `/${locale}/pricing`} className="btn btn-primary btn-lg">
              {t.finalCta.primary}
            </a>
            <a href={locale === 'en' ? '/integrations' : `/${locale}/integrations`} className="btn btn-outline btn-lg">
              {t.finalCta.secondary}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
