import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getAlternates } from '@/lib/seo-helpers'
import { getCaseStudiesPageContent } from '@/data/case-studies-content'
import { getCaseStudyCardOverrides } from '@/lib/sanity-queries'
import { SoftwareRatingSchema } from '@/components/seo/SoftwareRatingSchema'
import { pageDates, withPageDates } from '@/lib/page-dates'

export const dynamic = 'force-static'
// Re-render every minute so logos uploaded in Sanity show up.
export const revalidate = 60

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

async function baseMetadata({
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

// Brand guidelines v1.2 (same language as the BMC Hyundai / ITECSUR pages):
// dark hero with dot grid + one blue light, Geist Bold headings with one blue
// shimmer phrase, Geist Mono labels, 6/8/10/16px corners, corner-lit cards,
// Eazybe Blue primary CTA with a hairline-outline secondary.
const CSS = `
/* section.cs-hero outranks the generic [data-tone='dark'] background in brand-pages.css. */
.landing .v16-brand section.cs-hero {
  position: relative; padding: clamp(140px, 14vw, 176px) 0 clamp(72px, 8vw, 104px); text-align: center; color: #fff;
  background:
    radial-gradient(ellipse 60% 55% at 50% -10%, rgba(43, 89, 255, 0.4), rgba(43, 89, 255, 0) 70%),
    radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px) 0 0 / 22px 22px,
    #0b0b0c;
}
.landing .v16-brand .cs-hero ::selection, .landing .v16-brand .cs-cta ::selection { background: #2b59ff; color: #fff; }
.landing .v16-brand .cs-hero .container { max-width: 880px; }
.landing .v16-brand .cs-eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.14); background: #111114;
  font-family: 'Geist Mono', ui-monospace, monospace; font-size: 12.5px; font-weight: 500; letter-spacing: .12em; text-transform: uppercase; color: #7c98ff; }
.landing .v16-brand .cs-eyebrow::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #2ec27e; box-shadow: 0 0 10px rgba(46, 194, 126, .8); }
.landing .v16-brand .cs-hero h1 { margin: 24px auto 0; font-size: clamp(38px, 5.2vw, 64px); line-height: 1.04; letter-spacing: -0.04em !important; color: #fff; }
.landing .v16-brand .cs-hero h1 em, .landing .v16-brand .cs-cta h2 em {
  display: inline-block; font-style: normal;
  background: linear-gradient(90deg, #7c98ff 0%, #7c98ff 38%, #ffffff 50%, #7c98ff 62%, #7c98ff 100%);
  background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; color: transparent;
  filter: drop-shadow(0 0 18px rgba(43, 89, 255, 0.45)); animation: v16-brand-shim 3.5s linear infinite;
}
.landing .v16-brand .cs-lede { margin: 24px auto 0; max-width: 680px; font-size: clamp(16.5px, 1.6vw, 19px); line-height: 1.6; color: #b4b4bc; }
.landing .v16-brand .cs-hero-ctas { margin-top: 32px; display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
.landing .v16-brand .cs-foot { margin: 20px auto 0; max-width: 620px; font-size: 13.5px; line-height: 1.6; color: #8a8c93; }
.landing .v16-brand .cs-foot a { color: #7c98ff; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; }

/* Stories */
.landing .v16-brand .cs-stories { padding: clamp(72px, 8vw, 104px) 0; background: #fff; scroll-margin-top: 80px; }
.landing .v16-brand .cs-stories .container { max-width: 1180px; }
.landing .v16-brand .cs-stories-head { margin-bottom: 44px; }
/* Featured story: wide corner-lit card, media left (photo or dark cover), copy right. */
.landing .v16-brand .cs-feat {
  position: relative; display: grid; grid-template-columns: minmax(0, 1.08fr) minmax(0, 1fr); max-width: 1040px; margin: 0 auto clamp(72px, 8vw, 104px);
  border-radius: 16px; overflow: hidden; border: 1px solid transparent;
  background:
    linear-gradient(#ffffff, #ffffff) padding-box,
    linear-gradient(140deg, #2b59ff, #c9d5ff 35%, #e6e6e3 65%, rgba(43, 89, 255, 0.6)) border-box;
  box-shadow: 0 30px 70px -30px rgba(43, 89, 255, 0.45);
  transition: opacity .6s cubic-bezier(0.2, 0.8, 0.2, 1), transform .6s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow .25s ease;
}
.landing .v16-brand .cs-feat:hover { box-shadow: 0 36px 80px -28px rgba(43, 89, 255, 0.6); }
.landing .v16-brand .cs-feat-media {
  position: relative; display: block; min-height: 420px; overflow: hidden; color: #fff; text-decoration: none !important;
  background:
    radial-gradient(ellipse 80% 90% at 100% 0%, rgba(43, 89, 255, 0.5), rgba(0, 0, 0, 0) 70%),
    radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px) 0 0 / 18px 18px,
    #0b0b0c;
}
.landing .v16-brand .cs-feat-media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform .8s cubic-bezier(0.2, 0.8, 0.2, 1); }
.landing .v16-brand .cs-feat:hover .cs-feat-media img { transform: scale(1.04); }
.landing .v16-brand .cs-feat-media::after { content: ''; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(180deg, rgba(11, 11, 12, 0) 35%, rgba(11, 11, 12, 0.88) 100%); }
.landing .v16-brand .cs-feat-media .cs-country { z-index: 2; left: 20px; right: auto; top: 20px; }
.landing .v16-brand .cs-feat-stat { position: absolute; left: 26px; right: 26px; bottom: 24px; z-index: 2; display: block; }
.landing .v16-brand .cs-feat-stat b { display: block; font-family: 'Geist', sans-serif; font-weight: 700; font-size: clamp(52px, 6vw, 76px); line-height: 1; letter-spacing: -0.045em;
  color: #7c98ff; text-shadow: 0 0 36px rgba(43, 89, 255, 0.6); }
.landing .v16-brand .cs-feat-stat span { display: block; margin-top: 8px; max-width: 360px; font-size: 15px; line-height: 1.45; color: #e6e6e8; }
.landing .v16-brand .cs-feat-body { display: flex; flex-direction: column; justify-content: center; padding: clamp(28px, 4vw, 48px); }
.landing .v16-brand .cs-feat-tag { display: inline-flex; align-items: center; gap: 8px; align-self: flex-start;
  font-family: 'Geist Mono', ui-monospace, monospace; font-size: 12px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: #2b59ff; }
.landing .v16-brand .cs-feat-live { width: 8px; height: 8px; border-radius: 50%; background: #2ec27e; box-shadow: 0 0 0 0 rgba(46, 194, 126, .6); animation: cs-live 1.8s ease-out infinite; }
@keyframes cs-live { 0% { box-shadow: 0 0 0 0 rgba(46, 194, 126, .6); } 100% { box-shadow: 0 0 0 9px rgba(46, 194, 126, 0); } }
.landing .v16-brand .cs-new { margin-left: 4px; padding: 3px 8px; border-radius: 6px; background: #2b59ff; color: #fff; letter-spacing: .08em; }
.landing .v16-brand .cs-feat-co { display: flex; align-items: center; gap: 14px; margin-top: 22px; }
.landing .v16-brand .cs-feat-logo { width: 56px; height: 56px; flex-shrink: 0; border-radius: 12px; overflow: hidden; display: inline-flex; align-items: center; justify-content: center;
  background: #fff; border: 1px solid #e6e6e3; font-family: 'Geist Mono', ui-monospace, monospace; font-weight: 600; color: #2b59ff; }
.landing .v16-brand .cs-feat-logo img { width: 100%; height: 100%; object-fit: contain; padding: 6px; }
.landing .v16-brand .cs-feat-co .cs-industry { margin-top: 5px; }
.landing .v16-brand .cs-feat-h { margin: 22px 0 12px; font-size: clamp(24px, 2.6vw, 32px); font-weight: 700; line-height: 1.2; letter-spacing: -0.03em; color: #0b0b0c; }
.landing .v16-brand .cs-feat-p { margin: 0 0 28px; font-size: 16px; line-height: 1.65; color: #5a5c64; }
.landing .v16-brand .cs-feat-cta span { display: inline-block; transition: transform .18s ease; }
.landing .v16-brand .cs-feat:hover .cs-feat-cta span { transform: translateX(4px); }
@media (max-width: 860px) {
  .landing .v16-brand .cs-feat { grid-template-columns: 1fr; }
  .landing .v16-brand .cs-feat-media { min-height: 280px; }
}
@media (prefers-reduced-motion: reduce) {
  .landing .v16-brand .cs-feat-live { animation: none; }
  .landing .v16-brand .cs-feat-media img, .landing .v16-brand .cs-feat-cta span { transition: none; }
}

/* Two cards per row on desktop (4 stories = a clean 2x2), one on phones. */
.cs-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; max-width: 1040px; margin: 0 auto; align-items: stretch; }
.cs-grid.cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); max-width: 1180px; }
@media (max-width: 1080px) { .cs-grid.cols-3 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 760px) { .cs-grid, .cs-grid.cols-3 { grid-template-columns: 1fr; } }
.landing .v16-brand .cs-card {
  --tone: #7c98ff; --tone-glow: rgba(43, 89, 255, 0.45);
  position: relative; display: flex; flex-direction: column; border-radius: 16px; overflow: hidden;
  border: 1px solid transparent;
  background:
    linear-gradient(#ffffff, #ffffff) padding-box,
    linear-gradient(140deg, rgba(43, 89, 255, 0.7), #e6e6e3 30%, #e6e6e3 70%, rgba(43, 89, 255, 0.35)) border-box;
  box-shadow: 0 14px 34px rgba(43, 89, 255, 0.08);
  /* opacity/transform also carry the scroll reveal (.reveal -> .show). */
  transition: opacity .6s cubic-bezier(0.2, 0.8, 0.2, 1), transform .45s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow .25s ease;
}
.landing .v16-brand .cs-card.tone-1 { --tone: #f6c52b; --tone-glow: rgba(246, 197, 43, 0.4); }
.landing .v16-brand .cs-card.tone-2 { --tone: #3dd68c; --tone-glow: rgba(47, 191, 119, 0.42); }
.landing .v16-brand .cs-card:hover { transform: translateY(-5px); box-shadow: 0 28px 50px -14px rgba(43, 89, 255, 0.28); }

/* Cover */
.landing .v16-brand .cs-cover {
  position: relative; padding: 24px 26px 46px; min-height: 170px; color: #fff; isolation: isolate;
  background:
    radial-gradient(ellipse 75% 95% at 100% 0%, var(--tone-glow), rgba(0, 0, 0, 0) 70%),
    radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px) 0 0 / 18px 18px,
    #0b0b0c;
}
.landing .v16-brand .cs-cover::after { content: ''; position: absolute; inset: 0; z-index: -1; pointer-events: none; opacity: 0; transition: opacity .3s ease;
  background: radial-gradient(ellipse 90% 120% at 100% 0%, var(--tone-glow), rgba(0, 0, 0, 0) 75%); }
.landing .v16-brand .cs-card:hover .cs-cover::after { opacity: 1; }
.landing .v16-brand .cs-country { position: absolute; top: 18px; right: 18px; display: inline-flex; align-items: center; gap: 7px; padding: 4px 9px; border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.14); background: rgba(17, 17, 20, 0.8);
  font-family: 'Geist Mono', ui-monospace, monospace; font-size: 10.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: #d6d9e3; }
.landing .v16-brand .cs-country::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #2ec27e; }
.landing .v16-brand .cs-stat { font-family: 'Geist', sans-serif; font-weight: 700; font-size: clamp(42px, 4.4vw, 56px); line-height: 1; letter-spacing: -0.04em;
  color: var(--tone); text-shadow: 0 0 30px var(--tone-glow); font-variant-numeric: tabular-nums; }
.landing .v16-brand .cs-stat-l { margin-top: 8px; max-width: 75%; font-size: 14px; line-height: 1.45; color: #b4b4bc; }
.landing .v16-brand .cs-avatar {
  position: absolute; left: 26px; bottom: -30px; z-index: 1;
  width: 64px; height: 64px; border-radius: 12px; overflow: hidden;
  display: inline-flex; align-items: center; justify-content: center;
  background: #fff; border: 1px solid #e6e6e3; box-shadow: 0 10px 24px -10px rgba(11, 11, 12, 0.45);
  font-family: 'Geist Mono', ui-monospace, monospace; font-size: 16px; font-weight: 600; color: #2b59ff;
}
.landing .v16-brand .cs-avatar img { width: 100%; height: 100%; object-fit: contain; padding: 6px; }

/* Body */
.landing .v16-brand .cs-body { display: flex; flex-direction: column; flex: 1; padding: 44px 26px 24px; }
.landing .v16-brand .cs-card-head { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 12px; }
.landing .v16-brand .cs-company { font-size: 17px; font-weight: 700; letter-spacing: -0.01em; color: #0b0b0c; }
.landing .v16-brand .cs-industry { display: inline-block; padding: 3px 8px; border-radius: 6px; background: #eef2ff;
  font-family: 'Geist Mono', ui-monospace, monospace; font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: #2b59ff; }
.landing .v16-brand .cs-headline { margin: 16px 0 10px; font-size: 21px; font-weight: 700; line-height: 1.3; letter-spacing: -0.02em; color: #0b0b0c; }
.landing .v16-brand .cs-summary { margin: 0; font-size: 15px; line-height: 1.65; color: #5a5c64; flex: 1; }
/* !important: landing-v3.css recolours every main link on hover (the faded green). */
.landing .v16-brand .cs-link, .landing .v16-brand .cs-link:hover { color: #2b59ff !important; text-decoration: none !important; }
.landing .v16-brand .cs-link { display: inline-flex; align-items: center; gap: 6px; margin-top: 22px; padding-top: 18px; width: 100%;
  border-top: 1px solid #e6e6e3; font-size: 14.5px; font-weight: 600; }
/* Whole card is clickable through the link's overlay. */
.landing .v16-brand .cs-link::after { content: ''; position: absolute; inset: 0; border-radius: 16px; }
.landing .v16-brand .cs-link span { transition: transform .18s ease; }
.landing .v16-brand .cs-card:hover .cs-link span { transform: translateX(4px); }
.landing .v16-brand .cs-link:focus-visible { outline: none; }
.landing .v16-brand .cs-link:focus-visible::after { outline: 2px solid #2b59ff; outline-offset: 3px; }

/* Final CTA */
.landing .v16-brand .cs-cta { padding: clamp(72px, 8vw, 104px) 0; }
.landing .v16-brand .cs-cta-box { position: relative; max-width: 980px; margin: 0 auto; padding: clamp(36px, 5vw, 60px) clamp(24px, 4vw, 56px); border-radius: 16px; text-align: center;
  background: radial-gradient(ellipse 70% 80% at 50% 0%, rgba(43, 89, 255, 0.28), rgba(43, 89, 255, 0) 70%), #111114;
  border: 1px solid #2b59ff; box-shadow: 0 0 48px -12px rgba(43, 89, 255, 0.6); }
.landing .v16-brand .cs-cta h2 { margin: 0 auto; max-width: none; font-size: clamp(30px, 3.6vw, 46px); line-height: 1.1; color: #fff; }
.landing .v16-brand .cs-cta p { margin: 18px auto 0; max-width: 680px; font-size: 17px; line-height: 1.6; color: #b4b4bc; }
.landing .v16-brand .cs-cta-btns { margin-top: 30px; display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
.landing .v16-brand .cs-cta .cs-cta-demo { color: #fff !important; border-color: rgba(255, 255, 255, 0.18) !important; }
.landing .v16-brand .cs-cta .cs-cta-demo:hover { border-color: rgba(255, 255, 255, 0.5) !important; }

@media (prefers-reduced-motion: reduce) {
  .landing .v16-brand .cs-card, .landing .v16-brand .cs-link span { transition: none; }
  .landing .v16-brand .cs-card:hover { transform: none; }
  .landing .v16-brand .cs-hero h1 em, .landing .v16-brand .cs-cta h2 em { animation: none; }
}
`

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = getCaseStudiesPageContent(locale)
  const cms = await getCaseStudyCardOverrides(locale)

  // Featured story: the newest PUBLISHED case study by Sanity "Published at".
  // Publishing a new story in Studio moves it here on its own (revalidate 60s).
  // If Sanity is unreachable, the last card in the code list (newest added) wins.
  const slugOf = (c: { href?: string }) => c.href?.split('/').pop() ?? ''
  const linked = t.cards.filter((c) => c.href)
  const byDate = linked
    .filter((c) => cms[slugOf(c)]?.publishedAt)
    .sort((a, b) => Date.parse(cms[slugOf(b)]!.publishedAt!) - Date.parse(cms[slugOf(a)]!.publishedAt!))
  const featured = byDate[0] ?? linked[linked.length - 1]
  const rest = t.cards.filter((c) => c !== featured)

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
      <SoftwareRatingSchema locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Hero — brand dark hero (dot grid + one soft blue light), same as the case study pages. */}
      <section className="cs-hero" data-tone="dark">
        <div className="container">
          <span className="cs-eyebrow">{t.hero.tag}</span>
          <h1>
            {t.hero.h1Lead} <em>{t.hero.h1Highlight}</em>
          </h1>
          <p className="cs-lede">{t.hero.subtitle}</p>
          <div className="cs-hero-ctas">
            <a href="#stories" className="btn btn-primary btn-lg">{t.hero.cta} ↓</a>
          </div>
          <p className="cs-foot">
            {(() => {
              const text = t.hero.footnote
              const i = text.indexOf('Eazybe')
              if (i === -1) return text
              return (
                <>
                  {text.slice(0, i)}
                  <a href={`https://eazybe.com${locale === 'en' ? '/' : `/${locale}`}`}>Eazybe</a>
                  {text.slice(i + 'Eazybe'.length)}
                </>
              )
            })()}
          </p>
        </div>
      </section>

      {/* Stories */}
      <section id="stories" className="cs-stories">
        <div className="container">
          {/* Featured: the newest published story (Sanity "Published at"), large. */}
          {featured && (() => {
            const c = featured
            const over = cms[slugOf(c)]
            const href = locale === 'en' ? c.href! : `/${locale}${c.href}`
            const company = over?.company || c.company
            return (
              <article className="cs-feat reveal" aria-labelledby="cs-feat-title">
                <a className="cs-feat-media" href={href} tabIndex={-1} aria-hidden="true">
                  {over?.featuredImageUrl && (
                    <img src={`${over.featuredImageUrl}?w=1200&h=860&fit=crop&auto=format`} alt="" width={1200} height={860} />
                  )}
                  {c.country && <span className="cs-country">{c.country}</span>}
                  {c.stat && (
                    <span className="cs-feat-stat">
                      <b>{c.stat.value}</b>
                      <span>{c.stat.label}</span>
                    </span>
                  )}
                </a>
                <div className="cs-feat-body">
                  <div className="cs-feat-tag">
                    <span className="cs-feat-live" aria-hidden="true" />
                    {t.featured.tag}
                    <span className="cs-new">{t.featured.badge}</span>
                  </div>
                  <div className="cs-feat-co">
                    {over?.logoUrl ? (
                      <span className="cs-feat-logo">
                        <img src={`${over.logoUrl}?w=128&h=128&fit=max&auto=format`} alt={`${company} logo`} loading="lazy" />
                      </span>
                    ) : (
                      <span className="cs-feat-logo" aria-hidden="true">{c.initials}</span>
                    )}
                    <div>
                      <div className="cs-company">{company}</div>
                      <span className="cs-industry">{over?.industry || c.industry}</span>
                    </div>
                  </div>
                  <h3 id="cs-feat-title" className="cs-feat-h">{over?.headline || c.headline}</h3>
                  <p className="cs-feat-p">{over?.summary || c.summary}</p>
                  <div>
                    <a className="btn btn-primary btn-lg cs-feat-cta" href={href}>
                      {t.featured.cta} <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </article>
            )
          })()}

          <div className="sec-head centered cs-stories-head">
            <h2>{t.grid.h2}</h2>
            <p>{t.grid.subtitle}</p>
          </div>
          {/* 2 or 4 cards: 2 per row; 3, 5, 6…: 3 per row, so no card sits alone. */}
          <div className={`cs-grid${rest.length === 2 || rest.length === 4 ? '' : ' cols-3'}`}>
            {rest.map((c, i) => {
              const slug = c.href?.split('/').pop()
              const over = slug ? cms[slug] : undefined
              return (
              // .reveal: fades up when scrolled into view (site RevealOnScroll), staggered per card.
              <article key={c.company} className={`cs-card reveal tone-${i % 3}`} style={{ transitionDelay: `${(i % 3) * 120}ms` }}>
                {/* Dark cover: the story's headline number, like the case study heroes. */}
                <div className="cs-cover">
                  {c.country && <span className="cs-country">{c.country}</span>}
                  {c.stat && (
                    <>
                      <div className="cs-stat">{c.stat.value}</div>
                      <div className="cs-stat-l">{c.stat.label}</div>
                    </>
                  )}
                  {/* Alt text derives from the company name — no Studio field needed. */}
                  {over?.logoUrl ? (
                    <span className="cs-avatar">
                      <img src={`${over.logoUrl}?w=128&h=128&fit=max&auto=format`} alt={`${over?.company || c.company} logo`} loading="lazy" />
                    </span>
                  ) : (
                    <span className="cs-avatar" aria-hidden="true">{c.initials}</span>
                  )}
                </div>
                <div className="cs-body">
                  <div className="cs-card-head">
                    <div className="cs-company">{over?.company || c.company}</div>
                    <span className="cs-industry">{over?.industry || c.industry}</span>
                  </div>
                  <h3 className="cs-headline">{over?.headline || c.headline}</h3>
                  <p className="cs-summary">{over?.summary || c.summary}</p>
                  {c.href && (
                    <a className="cs-link" href={locale === 'en' ? c.href : `/${locale}${c.href}`}>
                      {t.grid.readStory} <span aria-hidden="true">→</span>
                    </a>
                  )}
                </div>
              </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA — dark brand section with the dot grid. */}
      <section className="cs-cta" data-tone="dark">
        <div className="container">
          <div className="cs-cta-box">
            <h2>{t.finalCta.h2}</h2>
            <p>{t.finalCta.body}</p>
            <div className="cs-cta-btns">
              <a href={locale === 'en' ? '/pricing' : `/${locale}/pricing`} className="btn btn-primary btn-lg">
                {t.finalCta.primary}
              </a>
              <a href="https://eazybe.info/demono" className="btn btn-lg cs-cta-demo">
                {t.finalCta.secondary}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// Published / last-modified dates as meta tags (article:published_time / article:modified_time).
export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return withPageDates(await baseMetadata(props), pageDates({ page: '/case-studies' }))
}
