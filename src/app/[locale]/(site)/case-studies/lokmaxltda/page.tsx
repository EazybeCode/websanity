import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getCanonicalOnly } from '@/lib/seo-helpers'
import { getLokmaxContent } from '@/data/case-study-lokmax'
import { getCaseStudy } from '@/lib/sanity-queries'
import { CaseStudyBody, caseStudyReadMinutes, type PtBlock } from '@/components/pages/CaseStudyBody'

// Content is managed in Sanity ("Case Studies" section). A PUBLISHED caseStudy
// doc with this slug takes over the article; the static content below is the
// fallback while none exists. Re-render at most once a minute so Studio
// publishes go live on their own.
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
  const t = getLokmaxContent(locale)
  const doc = await getCaseStudy('lokmaxltda', locale)
  return {
    title: doc?.metaTitle || t.meta.title,
    description: doc?.metaDescription || t.meta.description,
    // Noindex for now. Canonical-only alternates: noindex pages must not
    // declare hreflang clusters.
    alternates: getCanonicalOnly(locale, '/case-studies/lokmaxltda'),
    robots: { index: false, follow: false },
    openGraph: {
      type: 'article',
      title: (doc?.ogTitle || doc?.metaTitle || t.meta.title).replace(' | Eazybe', ''),
      description: doc?.ogDescription || t.meta.ogDescription,
      siteName: 'Eazybe',
    },
  }
}

const SITE_URL = 'https://eazybe.com'

const ShareIcons = {
  linkedin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45z" />
    </svg>
  ),
  x: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41z" />
    </svg>
  ),
  whatsapp: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.7.25-1.29.18-1.42-.08-.12-.28-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.83 9.83 0 0 1-1.51-5.26c0-5.44 4.43-9.86 9.89-9.86a9.8 9.8 0 0 1 6.98 2.9 9.8 9.8 0 0 1 2.9 6.98c0 5.44-4.44 9.87-9.88 9.87zm8.41-18.28A11.79 11.79 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.59 5.95L.06 24l6.3-1.65a11.9 11.9 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.16-3.48-8.4z" />
    </svg>
  ),
}

export default async function LokmaxCaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = getLokmaxContent(locale)
  const doc = await getCaseStudy('lokmaxltda', locale)

  const prefix = locale === 'en' ? '' : `/${locale}`
  const homeUrl = `${SITE_URL}${locale === 'en' ? '/' : `/${locale}`}`
  const hubUrl = `${SITE_URL}${prefix}/case-studies`
  const pageUrl = `${SITE_URL}${prefix}/case-studies/lokmaxltda`
  const headline = doc?.title ?? `${t.hero.h1Lead} ${t.hero.h1Highlight}`

  // CMS-driven hero values, with the static content as fallback.
  const company: string = doc?.company ?? 'Lokmax'
  const initials = company
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w: string) => w[0]!.toUpperCase())
    .join('')
    .padEnd(2, company.slice(1, 2).toUpperCase())
    .slice(0, 2)
  const logoUrl: string | null = doc?.logoUrl ?? null
  const heroEyebrow = doc?.industry ? `Case Study · ${doc.industry}` : t.hero.eyebrow
  const heroDek = doc?.excerpt || t.hero.subtitle
  const heroFacts: { value: string; label: string }[] = doc?.facts?.length ? doc.facts : t.hero.facts
  const bylineSub = doc
    ? `${doc.referredBy ? `A growth story referred by ${doc.referredBy} · ` : ''}${caseStudyReadMinutes(doc.body as PtBlock[])} min read`
    : `${t.hero.referral} · ${t.article.readTime}`

  // Hero byline shows the author profile when one is set in Sanity; the
  // company stays on the dark facts card and breadcrumb.
  const heroAuthor: { name: string; slug?: string; image?: string; position?: string } | null =
    doc?.author?.name ? doc.author : null
  const authorUrl = heroAuthor?.slug ? `${prefix}/blog/authors/${heroAuthor.slug}` : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.breadcrumb.home, item: homeUrl },
      { '@type': 'ListItem', position: 2, name: t.breadcrumb.hub, item: hubUrl },
      { '@type': 'ListItem', position: 3, name: t.breadcrumb.current, item: pageUrl },
    ],
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description: t.meta.description,
    url: pageUrl,
    publisher: { '@type': 'Organization', name: 'Eazybe', url: SITE_URL },
    about: { '@type': 'Organization', name: 'Lokmax' },
  }

  const share = [
    { label: 'LinkedIn', icon: ShareIcons.linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}` },
    { label: 'X', icon: ShareIcons.x, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(headline)}` },
    { label: 'WhatsApp', icon: ShareIcons.whatsapp, href: `https://wa.me/?text=${encodeURIComponent(`${headline} ${pageUrl}`)}` },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .lka-crumbs { font-size: 13px; color: var(--ink-3); margin-bottom: 20px; }
            .lka-crumbs ol { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; }
            .lka-crumbs li + li::before { content: '›'; margin-right: 6px; color: var(--ink-4); }
            .landing .lka-crumbs a { color: var(--ink-3); }
            .landing .lka-crumbs a:hover { color: var(--accent-ink); }
            .landing .lka-crumbs a:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 2px; }

            /* Split hero: text left, visual right on a soft blob. */
            .lka-hgrid { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); gap: clamp(32px, 5vw, 72px); align-items: center; }
            /* .landing scope so the white text beats the landing theme's inherited ink color */
            .landing .lka-pill {
              display: inline-block; padding: 5px 14px; border-radius: 8px;
              background: var(--accent-ink); color: #fff !important;
              font-size: 12.5px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase;
            }
            .lka-byline { display: flex; align-items: center; gap: 12px; margin-top: 30px; }
            .lka-avatar {
              width: 46px; height: 46px; flex-shrink: 0; border-radius: 999px;
              display: inline-flex; align-items: center; justify-content: center;
              background: color-mix(in oklab, var(--accent-a) 16%, #fff);
              border: 1px solid color-mix(in oklab, var(--accent-a) 40%, var(--line));
              font-family: var(--f-mono); font-size: 14px; font-weight: 600; color: var(--accent-ink);
              overflow: hidden;
            }
            .lka-avatar img { width: 100%; height: 100%; object-fit: contain; padding: 5px; background: #fff; border-radius: inherit; }
            .lka-byline-name { font-size: 15px; font-weight: 700; color: var(--ink); }
            .landing a.lka-byline-link { display: inline-block; color: var(--ink); }
            .landing a.lka-byline-link:hover { color: var(--accent-ink); }
            .lka-byline-sub { margin-top: 2px; font-size: 13.5px; color: var(--ink-3); }
            .lka-visual-wrap { position: relative; }
            .lka-visual-wrap::before {
              content: ''; position: absolute; inset: -12% -18% -18% -8%; z-index: 0; border-radius: 48% 52% 55% 45% / 55% 48% 52% 45%;
              background: radial-gradient(circle at 65% 35%, color-mix(in oklab, var(--accent-a) 26%, #fff) 0%, color-mix(in oklab, var(--accent-a) 8%, #fff) 55%, transparent 78%);
              pointer-events: none;
            }
            .lka-visual {
              position: relative; z-index: 1; border-radius: 22px; padding: clamp(26px, 3vw, 38px);
              background: linear-gradient(135deg, #0B0D12 0%, #1a1633 55%, #14171E 100%);
              border: 1px solid #252935; color: #F0F3FA;
              box-shadow: 0 24px 50px -28px rgba(15, 17, 21, 0.5);
            }
            .lka-visual-mark {
              width: 74px; height: 74px; border-radius: 18px; margin-bottom: 26px;
              display: inline-flex; align-items: center; justify-content: center;
              background: color-mix(in oklab, #7FD6B0 16%, transparent);
              border: 1px solid color-mix(in oklab, #7FD6B0 45%, transparent);
              font-family: var(--f-mono); font-size: 24px; font-weight: 600; color: #7FD6B0;
              position: relative; overflow: visible;
            }
            /* Liquid-glass logo tile: the logo's own colors bleed out as a soft
               blurred glow behind a frosted pane. */
            .lka-visual-mark.has-logo {
              background: rgba(255, 255, 255, 0.08);
              border: 1px solid rgba(255, 255, 255, 0.22);
              backdrop-filter: blur(14px) saturate(1.4);
              -webkit-backdrop-filter: blur(14px) saturate(1.4);
              box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 10px 30px -12px rgba(0, 0, 0, 0.6);
            }
            .lka-visual-mark .lka-mark-glow {
              position: absolute; inset: -22%; z-index: 0; border-radius: inherit;
              object-fit: contain; width: 144%; height: 144%;
              filter: blur(22px) saturate(1.8) brightness(1.15);
              opacity: 0.75; pointer-events: none;
              animation: lka-glow-drift 7s ease-in-out infinite alternate;
            }
            .lka-visual-mark .lka-mark-img {
              position: relative; z-index: 1; width: 100%; height: 100%;
              object-fit: contain; padding: 12px; border-radius: inherit;
            }
            @keyframes lka-glow-drift {
              from { transform: translate(-3%, -2%) scale(1); opacity: 0.6; }
              to   { transform: translate(3%, 2%) scale(1.08); opacity: 0.85; }
            }
            @media (prefers-reduced-motion: reduce) {
              .lka-visual-mark .lka-mark-glow { animation: none; }
            }
            .lka-visual-facts { display: grid; grid-template-columns: 1fr 1fr; gap: 22px 24px; }
            /* Explicit colors: the panel sits in a light section, so inherited
               ink would render dark-on-dark. */
            .landing .lka-visual-v { font-size: 21px; font-weight: 700; letter-spacing: -0.01em; font-variant-numeric: tabular-nums; color: #F0F3FA; }
            .landing .lka-visual-l { margin-top: 4px; font-family: var(--f-mono); font-size: 10.5px; letter-spacing: .09em; text-transform: uppercase; color: #B9BFCE; }
            @media (max-width: 900px) {
              .lka-hgrid { grid-template-columns: 1fr; }
              .lka-visual-wrap { margin-top: 8px; }
            }
            .lka-share { display: flex; align-items: center; gap: 8px; margin-top: 22px; }
            .lka-share-label { font-family: var(--f-mono); font-size: 11px; letter-spacing: .08em; text-transform: uppercase; }
            .landing .lka-share a {
              width: 34px; height: 34px; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center;
              color: var(--ink-2); background: #fff; border: 1px solid var(--line);
              transition: color .16s ease, border-color .16s ease, transform .16s ease;
            }
            .landing .lka-share a:hover { color: var(--accent-ink); border-color: color-mix(in oklab, var(--accent-a) 50%, var(--line)); transform: translateY(-1px); }
            .landing .lka-share a:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 2px; }

            /* Article layout: sticky TOC on the left (aligned with the hero's
               left edge), prose beside it. */
            /* Single centered reading column, equal air left and right. */
            .lka-layout { max-width: 880px; margin: 0 auto; }

            .lka-prose h2 { font-family: var(--f-display); font-weight: 400; font-size: clamp(26px, 3vw, 34px);
              letter-spacing: -0.02em; line-height: 1.2; color: var(--ink); margin: 52px 0 18px; scroll-margin-top: 96px; }
            .lka-prose h2:first-child { margin-top: 0; }
            .lka-prose h3 { font-size: 19px; font-weight: 700; color: var(--ink); margin: 32px 0 10px; }
            .lka-prose p { margin: 0 0 18px; font-size: 16.5px; line-height: 1.75; color: var(--ink-2); }
            /* Highlighted hyperlinks — .landing scope needed to beat .landing a { color: inherit } */
            .landing .lka-prose a {
              color: var(--accent-ink); font-weight: 600;
              text-decoration: underline; text-decoration-color: color-mix(in oklab, var(--accent-ink) 45%, transparent);
              text-decoration-thickness: 1.5px; text-underline-offset: 3px;
              transition: color .15s ease, text-decoration-color .15s ease, background .15s ease;
            }
            .landing .lka-prose a:hover {
              color: color-mix(in oklab, var(--accent-ink) 80%, #000);
              text-decoration-color: currentColor;
              background: color-mix(in oklab, var(--accent-ink) 10%, transparent);
              border-radius: 3px;
            }
            .landing .lka-prose a:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 2px; border-radius: 3px; }
            .lka-prose ul { margin: 0 0 18px; padding-left: 0; list-style: none; display: grid; gap: 8px; }
            .lka-prose ul li { font-size: 15px; line-height: 1.6; color: var(--ink-3); font-style: italic;
              padding-left: 14px; border-left: 2px solid color-mix(in oklab, var(--accent-ink) 40%, var(--line)); }

            .lka-chat {
              margin: 0 0 10px; padding: 14px 18px; border-radius: 14px 14px 14px 4px;
              background: color-mix(in oklab, #0E7A46 7%, #fff);
              border: 1px solid color-mix(in oklab, #0E7A46 24%, var(--line));
              font-size: 15px; line-height: 1.6; color: var(--ink-2);
            }
            .lka-chat:last-of-type { margin-bottom: 18px; }

            .lka-pull {
              margin: 26px 0; padding: 22px 26px;
              background: color-mix(in oklab, var(--accent-a) 10%, #fff);
              border-left: 4px solid var(--accent-ink); border-radius: 0 14px 14px 0;
              font-family: var(--f-display); font-size: clamp(19px, 2.2vw, 23px); line-height: 1.45;
              letter-spacing: -0.01em; color: var(--ink);
            }
            .lka-example {
              margin: 0 0 18px; padding: 12px 14px; border-radius: 10px;
              background: var(--bg-2); border: 1px dashed var(--line-2);
              font-family: var(--f-mono); font-size: 13px; line-height: 1.6; color: var(--ink-2);
            }

            .lka-inline-cta {
              margin: 40px 0; padding: 26px 28px; border-radius: 16px;
              background: linear-gradient(120deg, color-mix(in oklab, var(--accent-a) 14%, #fff), #fff);
              border: 1px solid color-mix(in oklab, var(--accent-a) 40%, var(--line));
            }
            .lka-inline-cta h3 { margin: 0 0 6px; font-size: 19px; font-weight: 700; color: var(--ink); }
            .lka-inline-cta p { margin: 0 0 16px; font-size: 14.5px; line-height: 1.6; color: var(--ink-2); }

            .lka-table-wrap { overflow-x: auto; margin: 8px 0 18px; }
            .lka-table { width: 100%; border-collapse: separate; border-spacing: 0 10px; min-width: 620px; }
            .lka-table th { font-family: var(--f-mono); font-size: 11px; letter-spacing: .1em; text-transform: uppercase;
              color: var(--ink-3); text-align: left; padding: 0 16px 2px; font-weight: 600; }
            .lka-table td { background: #fff; border: 1px solid var(--line); border-left: none; border-right: none;
              padding: 14px 16px; font-size: 14px; line-height: 1.55; vertical-align: top; }
            .lka-table td:first-child { border-left: 1px solid var(--line); border-radius: 12px 0 0 12px;
              font-weight: 700; color: var(--ink); white-space: nowrap; }
            .lka-table td:last-child { border-right: 1px solid var(--line); border-radius: 0 12px 12px 0; }
            .lka-x { color: #B4232A; font-weight: 700; margin-right: 8px; }
            .lka-check { color: #0E7A46; font-weight: 700; margin-right: 8px; }
            .lka-before { color: var(--ink-3); }
            .lka-after { color: var(--ink-2); }

            .lka-shift-from { font-size: 13.5px; color: var(--ink-3); text-decoration: line-through;
              text-decoration-color: color-mix(in oklab, #B4232A 55%, transparent); }

            .lka-closing {
              margin: 44px 0 0; padding: 28px 30px; border-radius: 16px; background: var(--bg-2);
              border: 1px solid var(--line);
              font-family: var(--f-display); font-size: clamp(18px, 2.2vw, 22px); line-height: 1.5;
              letter-spacing: -0.01em; color: var(--ink-2);
            }

            /* CMS-rendered body extras. */
            .lka-cms-quote {
              margin: 0 0 14px; padding: 14px 18px; border-radius: 14px 14px 14px 4px;
              background: color-mix(in oklab, #0E7A46 7%, #fff);
              border: 1px solid color-mix(in oklab, #0E7A46 24%, var(--line));
              font-size: 15px; line-height: 1.6; color: var(--ink-2);
            }
            .lka-cms-callout {
              margin: 0 0 18px; padding: 18px 22px; border-radius: 14px;
              background: color-mix(in oklab, var(--accent-a) 10%, #fff);
              border: 1px solid color-mix(in oklab, var(--accent-a) 36%, var(--line));
            }
            .lka-cms-callout p:last-child { margin-bottom: 0; }
            .lka-cms-figure { margin: 0 0 18px; }
            .lka-cms-figure img { width: 100%; height: auto; border-radius: 14px; border: 1px solid var(--line); }
            .lka-cms-figure figcaption { margin-top: 8px; font-size: 13px; color: var(--ink-3); text-align: center; }
            /* Author profile card (case-study only) */
            .lka-author {
              margin-top: 56px; padding: clamp(24px, 3vw, 34px); border-radius: 20px;
              display: flex; gap: 22px; align-items: flex-start;
              background: color-mix(in oklab, var(--accent-a) 7%, #fff);
              border: 1px solid color-mix(in oklab, var(--accent-a) 28%, var(--line));
            }
            .lka-author-img {
              width: 84px; height: 84px; flex-shrink: 0; border-radius: 18px; object-fit: cover;
              border: 2px solid color-mix(in oklab, var(--accent-a) 55%, #fff);
            }
            .lka-author-mono {
              width: 84px; height: 84px; flex-shrink: 0; border-radius: 18px;
              display: inline-flex; align-items: center; justify-content: center;
              background: color-mix(in oklab, var(--accent-a) 18%, #fff);
              border: 1px solid color-mix(in oklab, var(--accent-a) 45%, var(--line));
              font-family: var(--f-mono); font-size: 30px; font-weight: 600; color: var(--accent-ink);
            }
            .lka-author-label {
              font-family: var(--f-mono); font-size: 11px; letter-spacing: .09em;
              text-transform: uppercase; color: var(--ink-3);
            }
            .landing .lka-author-name {
              display: inline-block; margin-top: 6px; font-size: 20px; font-weight: 700; color: var(--ink);
            }
            .landing a.lka-author-name:hover { color: var(--accent-ink); }
            .lka-author-role { margin-top: 2px; font-size: 13.5px; font-weight: 600; color: var(--accent-ink); }
            .lka-author-bio { margin: 10px 0 0; font-size: 15px; line-height: 1.7; color: var(--ink-2); }
            @media (max-width: 640px) {
              .lka-author { flex-direction: column; align-items: center; text-align: center; }
            }
            .lka-prose ol { margin: 0 0 18px; padding-left: 22px; display: grid; gap: 8px; }
            .lka-prose ol li { font-size: 15.5px; line-height: 1.65; color: var(--ink-2); }
            .lka-kt {
              margin: 0 0 34px; padding: 20px 24px; border-radius: 14px;
              background: var(--bg-2); border: 1px solid var(--line);
            }
            .lka-kt-t { font-family: var(--f-mono); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 10px; }
            .lka-kt ul li { font-style: normal; color: var(--ink-2); }
            .lka-cta-head h2 { max-width: none; }
            .lka-cta-head p { max-width: 720px; }
            .landing .lka-cta-demo { background: #5b4bae; color: #ffffff; }
            .landing .lka-cta-demo:hover { background: #4c3f95; color: #ffffff; }
            .landing .lka-cta-demo:focus-visible { outline: 2px solid #5b4bae; outline-offset: 3px; }
            .landing .lka-back { display: inline-block; margin-top: 22px; font-size: 14px; font-weight: 600; color: var(--accent-ink); }
            .landing .lka-back:hover { color: var(--ink); }
            .landing .lka-back:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 2px; }

            @media (prefers-reduced-motion: reduce) {
              .landing .lka-share a { transition: none; }
              .landing .lka-share a:hover { transform: none; }
            }
          `,
        }}
      />

      {/* Article header */}
      <section className="section" style={{ paddingTop: 'clamp(90px, 11vw, 120px)', paddingBottom: 34, background: '#ffffff' }}>
        <div className="container">
          <nav className="lka-crumbs" aria-label="Breadcrumb">
            <ol>
              <li><a href={locale === 'en' ? '/' : `/${locale}`}>{t.breadcrumb.home}</a></li>
              <li><a href={`${prefix}/case-studies`}>{t.breadcrumb.hub}</a></li>
              <li aria-current="page">{t.breadcrumb.current}</li>
            </ol>
          </nav>
          <div className="lka-hgrid">
            {/* Left: pill, headline, dek, byline */}
            <div>
              <span className="lka-pill">{heroEyebrow}</span>
              <h1
                style={{
                  fontFamily: 'var(--f-display)',
                  fontWeight: 400,
                  fontSize: 'clamp(32px, 4.2vw, 50px)',
                  lineHeight: 1.12,
                  letterSpacing: '-0.025em',
                  color: 'var(--ink)',
                  margin: '20px 0 0',
                }}
              >
                {doc ? (
                  doc.title
                ) : (
                  <>
                    {t.hero.h1Lead}{' '}
                    <span
                      style={{
                        backgroundImage:
                          'linear-gradient(transparent 62%, color-mix(in oklab, var(--accent-ink) 25%, transparent) 62%)',
                      }}
                    >
                      {t.hero.h1Highlight}
                    </span>
                  </>
                )}
              </h1>
              <p style={{ margin: '18px 0 0', fontSize: 17.5, lineHeight: 1.65, color: 'var(--ink-2)' }}>
                {heroDek}
              </p>

              <div className="lka-byline">
                <span className="lka-avatar" aria-hidden="true">
                  {heroAuthor?.image ? (
                    <img src={`${heroAuthor.image}?w=92&h=92&fit=crop&auto=format`} alt="" loading="lazy" style={{ objectFit: 'cover', padding: 0 }} />
                  ) : logoUrl ? (
                    <img src={`${logoUrl}?w=92&h=92&fit=max&auto=format`} alt="" loading="lazy" />
                  ) : (
                    initials
                  )}
                </span>
                <div>
                  {heroAuthor ? (
                    authorUrl ? (
                      <a className="lka-byline-name lka-byline-link" href={authorUrl}>{heroAuthor.name}</a>
                    ) : (
                      <div className="lka-byline-name">{heroAuthor.name}</div>
                    )
                  ) : (
                    <div className="lka-byline-name">{company}</div>
                  )}
                  <div className="lka-byline-sub">{bylineSub}</div>
                </div>
              </div>

              <div className="lka-share">
                <span className="lka-share-label">{t.article.shareLabel}</span>
                {share.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Right: visual panel on a soft blob */}
            <div className="lka-visual-wrap">
              <div className="lka-visual">
                <span className={`lka-visual-mark${logoUrl ? ' has-logo' : ''}`} aria-hidden="true">
                  {logoUrl ? (
                    <>
                      <img className="lka-mark-glow" src={`${logoUrl}?w=148&h=148&fit=max&auto=format`} alt="" loading="lazy" />
                      <img className="lka-mark-img" src={`${logoUrl}?w=148&h=148&fit=max&auto=format`} alt="" loading="lazy" />
                    </>
                  ) : (
                    initials
                  )}
                </span>
                <div className="lka-visual-facts">
                  {heroFacts.map((f) => (
                    <div key={f.label}>
                      <div className="lka-visual-v">{f.value}</div>
                      <div className="lka-visual-l">{f.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article body with sticky TOC */}
      <section className="section" style={{ paddingTop: 30, paddingBottom: 80, background: '#ffffff' }}>
        <div className="container">
          <div className="lka-layout">
            {doc ? (
              <article className="lka-prose">
                {Array.isArray(doc.keyTakeaways) && doc.keyTakeaways.length > 0 && (
                  <div className="lka-kt">
                    <div className="lka-kt-t">Key takeaways</div>
                    <CaseStudyBody body={doc.keyTakeaways as PtBlock[]} />
                  </div>
                )}
                <CaseStudyBody body={doc.body as PtBlock[]} />

                {/* Author profile — case-study-only card, independent from the
                    blog/comparison author sections. */}
                {doc.author?.name && (
                  <div className="lka-author">
                    {doc.author.image ? (
                      <img
                        className="lka-author-img"
                        src={`${doc.author.image}?w=192&h=192&fit=crop&auto=format`}
                        alt={doc.author.name}
                        loading="lazy"
                      />
                    ) : (
                      <span className="lka-author-mono" aria-hidden="true">{doc.author.name[0]}</span>
                    )}
                    <div>
                      <div className="lka-author-label">Written by</div>
                      {doc.author.slug ? (
                        <a className="lka-author-name" href={`${prefix}/blog/authors/${doc.author.slug}`}>
                          {doc.author.name}
                        </a>
                      ) : (
                        <span className="lka-author-name">{doc.author.name}</span>
                      )}
                      {doc.author.position && <div className="lka-author-role">{doc.author.position}</div>}
                      {doc.author.bio && <p className="lka-author-bio">{doc.author.bio}</p>}
                    </div>
                  </div>
                )}
              </article>
            ) : (
            <article className="lka-prose">
              <h2 id="story">{t.reality.h2}</h2>
              {t.reality.paras.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
              <p style={{ fontWeight: 600, color: 'var(--ink)' }}>{t.reality.chatIntro}</p>
              {t.reality.chats.map((c) => <div key={c.slice(0, 24)} className="lka-chat">{c}</div>)}
              <p>{t.reality.chatOutro}</p>

              <h2 id="problem">{t.problems.h2}</h2>
              <p>{t.problems.intro}</p>
              {t.problems.items.map((item) => (
                <div key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  {item.quotes && (
                    <ul>
                      {item.quotes.map((q) => <li key={q.slice(0, 24)}>{q}</li>)}
                    </ul>
                  )}
                </div>
              ))}

              <h2 id="solution">{t.solution.h2}</h2>
              <p>{t.solution.body}</p>
              <blockquote className="lka-pull">{t.solution.pullQuote}</blockquote>

              <div className="lka-inline-cta">
                <h3>{t.article.inlineTitle}</h3>
                <p>{t.article.inlineBody}</p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <a href={locale === 'en' ? '/pricing' : `/${locale}/pricing`} className="btn btn-primary">
                    {t.finalCta.primary}
                  </a>
                  <a href="https://eazybe.info/demono" className="btn lka-cta-demo">
                    {t.finalCta.secondary}
                  </a>
                </div>
              </div>

              <h2 id="how">{t.how.h2}</h2>
              {t.how.items.map((item, i) => (
                <div key={item.title}>
                  <h3>{i + 1}. {item.title}</h3>
                  <p>{item.body}</p>
                  {item.example && <div className="lka-example">{item.example}</div>}
                </div>
              ))}

              <h2 id="results">{t.beforeAfter.h2}</h2>
              <div className="lka-table-wrap">
                <table className="lka-table">
                  <thead>
                    <tr>
                      <th scope="col"><span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Aspect</span></th>
                      <th scope="col">{t.beforeAfter.beforeLabel}</th>
                      <th scope="col">{t.beforeAfter.afterLabel}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.beforeAfter.rows.map((r) => (
                      <tr key={r.aspect}>
                        <td>{r.aspect}</td>
                        <td className="lka-before"><span className="lka-x" aria-hidden="true">✕</span>{r.before}</td>
                        <td className="lka-after"><span className="lka-check" aria-hidden="true">✓</span>{r.after}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 id="shift">{t.shifts.h2}</h2>
              {t.shifts.items.map((s) => (
                <div key={s.to}>
                  <h3>
                    <span className="lka-shift-from">{s.from}</span>
                    {' → '}{s.to}
                  </h3>
                  <p>{s.body}</p>
                </div>
              ))}

              <blockquote className="lka-closing">“{t.closing.quote}”</blockquote>
            </article>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section" style={{ paddingTop: 70, paddingBottom: 90, background: '#F5F7FC' }}>
        <div className="container" style={{ maxWidth: 1100, textAlign: 'center' }}>
          <div className="sec-head centered lka-cta-head" style={{ marginBottom: 28 }}>
            <h2>{t.finalCta.h2}</h2>
            <p>{t.finalCta.body}</p>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={locale === 'en' ? '/pricing' : `/${locale}/pricing`} className="btn btn-primary btn-lg">
              {t.finalCta.primary}
            </a>
            <a href="https://eazybe.info/demono" className="btn btn-lg lka-cta-demo">
              {t.finalCta.secondary}
            </a>
          </div>
          <div>
            <a className="lka-back" href={`${prefix}/case-studies`}>← {t.finalCta.backToHub}</a>
          </div>
        </div>
      </section>
    </>
  )
}
