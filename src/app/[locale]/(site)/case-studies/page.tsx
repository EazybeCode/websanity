import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getAlternates } from '@/lib/seo-helpers'
import { getCaseStudiesPageContent } from '@/data/case-studies-content'
import { getCaseStudyCardOverrides } from '@/lib/sanity-queries'

export const dynamic = 'force-static'
// Re-render every minute so logos uploaded in Sanity show up.
export const revalidate = 60

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* Cards keep a sane width and center when there are only a few. */
            .cs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 400px)); gap: 22px; align-items: stretch; justify-content: center; }
            .cs-card {
              display: flex; flex-direction: column; align-items: flex-start;
              background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 26px;
              transition: border-color .16s ease, transform .16s ease, box-shadow .16s ease;
            }
            .cs-card:hover {
              border-color: color-mix(in oklab, var(--accent-a) 50%, var(--line));
              transform: translateY(-2px);
              box-shadow: 0 12px 26px -18px rgba(15, 17, 21, 0.35);
            }
            .cs-card-head { display: flex; align-items: center; gap: 12px; }
            .cs-avatar {
              width: 44px; height: 44px; flex-shrink: 0; border-radius: 11px;
              display: inline-flex; align-items: center; justify-content: center;
              background: color-mix(in oklab, var(--accent-a) 14%, #fff);
              border: 1px solid color-mix(in oklab, var(--accent-a) 32%, var(--line));
              font-family: var(--f-mono); font-size: 13px; font-weight: 600; color: var(--accent-ink);
              overflow: hidden;
            }
            .cs-avatar img { width: 100%; height: 100%; object-fit: contain; padding: 4px; background: #fff; border-radius: inherit; }
            .cs-company { font-size: 15px; font-weight: 700; color: var(--ink); }
            .cs-industry { display: inline-block; margin-top: 3px; font-size: 12px; padding: 2px 9px; border-radius: 100px;
              background: var(--bg-2); border: 1px solid var(--line); color: var(--ink-3); }
            .cs-headline { margin: 16px 0 8px; font-size: 18px; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; color: var(--ink); }
            .cs-summary { margin: 0; font-size: 14.5px; line-height: 1.6; color: var(--ink-2); flex: 1; }
            .landing .cs-link { margin-top: 16px; font-size: 13.5px; font-weight: 600; color: var(--accent-ink); }
            .landing .cs-link:hover { text-decoration: underline; text-underline-offset: 3px; }
            .landing .cs-link:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 2px; }
            /* Final CTA heading spans the full container. */
            .cs-cta-head h2 { max-width: none; }
            .cs-cta-head p { max-width: 720px; }
            .landing .cs-cta-demo { background: #5b4bae; color: #ffffff; }
            .landing .cs-cta-demo:hover { background: #4c3f95; color: #ffffff; }
            .landing .cs-cta-demo:focus-visible { outline: 2px solid #5b4bae; outline-offset: 3px; }
            @media (prefers-reduced-motion: reduce) {
              .cs-card { transition: none; }
              .cs-card:hover { transform: none; }
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
            <a href="#stories" className="btn btn-primary btn-lg">{t.hero.cta}</a>
          </div>
          <p style={{ marginTop: 18, fontSize: 13, color: 'var(--ink-3)' }}>
            {(() => {
              const text = t.hero.footnote
              const i = text.indexOf('Eazybe')
              if (i === -1) return text
              return (
                <>
                  {text.slice(0, i)}
                  <a
                    href={`https://eazybe.com${locale === 'en' ? '/' : `/${locale}`}`}
                    style={{ color: 'var(--accent-ink)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}
                  >
                    Eazybe
                  </a>
                  {text.slice(i + 'Eazybe'.length)}
                </>
              )
            })()}
          </p>
        </div>
      </section>

      {/* Stories */}
      <section id="stories" className="section" style={{ paddingTop: 40, paddingBottom: 80, scrollMarginTop: 80, background: 'linear-gradient(180deg, #ECEFF7 0%, #ffffff 100%)' }}>
        <div className="container" style={{ maxWidth: 1180 }}>
          <div className="sec-head centered" style={{ marginBottom: 40 }}>
            <h2>{t.grid.h2}</h2>
            <p>{t.grid.subtitle}</p>
          </div>
          <div className="cs-grid">
            {t.cards.map((c) => {
              const slug = c.href?.split('/').pop()
              const over = slug ? cms[slug] : undefined
              return (
              <article key={c.company} className="cs-card">
                <div className="cs-card-head">
                  <span className="cs-avatar" aria-hidden="true">
                    {over?.logoUrl ? <img src={`${over.logoUrl}?w=88&h=88&fit=max&auto=format`} alt="" loading="lazy" /> : c.initials}
                  </span>
                  <div>
                    <div className="cs-company">{over?.company || c.company}</div>
                    <span className="cs-industry">{over?.industry || c.industry}</span>
                  </div>
                </div>
                <h3 className="cs-headline">{over?.headline || c.headline}</h3>
                <p className="cs-summary">{over?.summary || c.summary}</p>
                {c.href && (
                  <a className="cs-link" href={locale === 'en' ? c.href : `/${locale}${c.href}`}>
                    {t.grid.readStory} →
                  </a>
                )}
              </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section" style={{ paddingTop: 70, paddingBottom: 90, background: '#F5F7FC' }}>
        <div className="container" style={{ maxWidth: 1100, textAlign: 'center' }}>
          <div className="sec-head centered cs-cta-head" style={{ marginBottom: 28 }}>
            <h2>{t.finalCta.h2}</h2>
            <p>{t.finalCta.body}</p>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={locale === 'en' ? '/pricing' : `/${locale}/pricing`} className="btn btn-primary btn-lg">
              {t.finalCta.primary}
            </a>
            <a href="https://eazybe.info/demono" className="btn btn-lg cs-cta-demo">
              {t.finalCta.secondary}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
