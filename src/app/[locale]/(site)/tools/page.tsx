import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getAlternates } from '@/lib/seo-helpers'
import { getToolsPageContent } from '@/data/tools-content'
import { ToolsGridClient } from '@/components/pages/ToolsGridClient'
import { SoftwareRatingSchema } from '@/components/seo/SoftwareRatingSchema'
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
      <SoftwareRatingSchema locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />

      {/* Hero: brand dark page-hero, Geist Bold with one blue phrase */}
      <section className="page-hero tl-hero" data-tone="dark">
        <div className="container">
          <span className="sec-tag">{t.hero.tag}</span>
          <h1>{withEm(t.hero.h1)}</h1>
          <p className="lede">{t.hero.subtitle}</p>
          <div className="tl-hero-cta">
            <a href="#tools" className="btn btn-primary btn-lg">{t.hero.cta}</a>
          </div>
          <p className="tl-foot">{t.hero.footnote}</p>
        </div>
      </section>

      {/* Tool grid: every card links to the tool's own top-level URL */}
      <section id="tools" className="tl-sec">
        <div className="container tl-wide">
          <div className="sec-head centered tl-head">
            <h2>{withEm(t.grid.h2)}</h2>
            <p>{t.grid.subtitle}</p>
          </div>
          <ToolsGridClient tools={t.tools} labels={{ ...t.grid, ...t.filter }} locale={locale} />
        </div>
      </section>

      {/* Why free */}
      <section className="tl-sec tl-alt">
        <div className="container tl-wide">
          <div className="sec-head centered tl-head">
            <h2>{withEm(t.why.h2)}</h2>
            <p>{t.why.subtitle}</p>
          </div>
          <div className="tl-why">
            {reasons.map((r) => (
              <div key={r.title} className="card tl-why-card">
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA: the site's brand final-cta block */}
      <section className="final-cta" data-tone="dark">
        <div className="container">
          <h2>{withEm(t.finalCta.h2)}</h2>
          <p className="sub">{t.finalCta.body}</p>
          <div className="ctas">
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

/** Renders the heading's *marked* phrase as <em> (the brand's one blue phrase). */
function withEm(text: string) {
  return text.split(/\*([^*]+)\*/).map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : part))
}

const PAGE_CSS = `
  .landing .v16-brand .tl-hero { padding: 180px 0 84px; text-align: center; }
  .landing .v16-brand .tl-hero h1 { margin-inline: auto; max-width: 22ch; }
  .landing .v16-brand .tl-hero .lede { margin: 20px auto 0; max-width: 640px; }
  .tl-hero-cta { margin-top: 28px; }
  .tl-foot { margin: 16px 0 0; font-size: 13px; color: var(--ink-3); }
  .landing .v16-brand .tl-sec { padding: 88px 0; scroll-margin-top: 72px; background: var(--bg); }
  .landing .v16-brand .tl-alt { background: var(--bg-2); }
  .tl-wide { max-width: 1140px; }
  .landing .v16-brand .tl-head { margin-bottom: 40px; }
  .landing .v16-brand .tl-head p { max-width: 640px; margin-inline: auto; }
  .tl-why { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
  .landing .v16-brand .tl-why-card { padding: 28px; border-radius: 16px; background: #fff; }
  .tl-why-card h3 { margin: 0 0 8px; font-size: 18px; color: var(--ink); }
  .tl-why-card p { margin: 0; font-size: 15px; line-height: 1.6; color: var(--ink-2); }
  @media (max-width: 900px) {
    .landing .v16-brand .tl-hero { padding: 140px 0 64px; }
    .landing .v16-brand .tl-sec { padding: 64px 0; }
    .tl-why { grid-template-columns: minmax(0, 1fr); }
  }
`

// Published / last-modified dates as meta tags (article:published_time / article:modified_time).
export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return withPageDates(await baseMetadata(props), pageDates({ page: '/tools' }))
}
