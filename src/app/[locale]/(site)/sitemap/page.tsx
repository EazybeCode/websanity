import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getAlternates } from '@/lib/seo-helpers'

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
  const t = await getTranslations({ locale, namespace: 'landingV3.sitemap' })
  return {
    title: `${t('title')} | Eazybe`,
    description: t('subtitle'),
    alternates: getAlternates(locale, '/sitemap'),
    robots: { index: true, follow: true },
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Tree types
// ────────────────────────────────────────────────────────────────────────────

type Leaf = { label: string; href: string }
type Branch = { label: string; href?: string; children: Array<Leaf | Branch> }
type Node = Leaf | Branch

const isBranch = (n: Node): n is Branch => Array.isArray((n as Branch).children)

const FEATURES: Array<{ key: string; slug: string }> = [
  { key: 'featureTeamInbox', slug: 'team-inbox' },
  { key: 'featureWhatsappCrm', slug: 'whatsapp-crm' },
  { key: 'featureCloudBackup', slug: 'cloud-backup' },
  { key: 'featureQuickReply', slug: 'quick-reply' },
  { key: 'featureScheduler', slug: 'scheduler' },
  { key: 'featureRevenueInbox', slug: 'revenue-inbox' },
  { key: 'featureRepRadar', slug: 'rep-radar' },
  { key: 'featureWhatsappCopilot', slug: 'whatsapp-copilot' },
]

const INTEGRATIONS: Array<{ name: string; slug: string }> = [
  { name: 'HubSpot', slug: 'hubspot' },
  { name: 'Salesforce', slug: 'salesforce' },
  { name: 'Zoho', slug: 'zoho' },
  { name: 'Bitrix24', slug: 'bitrix24' },
  { name: 'LeadSquared', slug: 'leadsquared' },
  { name: 'Freshdesk', slug: 'freshdesk' },
  { name: 'Pipedrive', slug: 'pipedrive' },
  { name: 'Monday', slug: 'monday' },
  { name: 'Google Sheets', slug: 'google-sheets' },
  { name: 'Google Calendar', slug: 'google-calendar' },
  { name: 'Webhooks', slug: 'webhooks' },
]

const LOCALE_NAMES: Record<string, string> = {
  en: 'English',
  br: 'Português (Brasil)',
  es: 'Español',
  tr: 'Türkçe',
}

// ────────────────────────────────────────────────────────────────────────────
// Renderers
// ────────────────────────────────────────────────────────────────────────────

function TreeNode({ node }: { node: Node }) {
  if (isBranch(node)) {
    return (
      <li className="sitemap-node sitemap-branch">
        <details>
          <summary>
            {node.href ? (
              <Link href={node.href} className="sitemap-link">
                {node.label}
              </Link>
            ) : (
              <span className="sitemap-label">{node.label}</span>
            )}
            <span className="sitemap-caret" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </summary>
          <ul className="sitemap-list">
            {node.children.map((child, i) => (
              <TreeNode key={`${child.label}-${i}`} node={child} />
            ))}
          </ul>
        </details>
      </li>
    )
  }
  return (
    <li className="sitemap-node sitemap-leaf">
      <Link href={node.href} className="sitemap-link">
        {node.label}
      </Link>
    </li>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Page
// ────────────────────────────────────────────────────────────────────────────

export default async function SitemapPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('landingV3.sitemap')

  const prefix = locale === 'en' ? '' : `/${locale}`
  const url = (path: string) => `${prefix}${path}`
  const integrationSuffix = t('integrationSuffix')

  const tree: Node[] = [
    { label: t('home'), href: url('/') || '/' },
    {
      label: t('product'),
      href: url('/features'),
      children: [
        {
          label: t('features'),
          href: url('/features'),
          children: [
            { label: t('allFeatures'), href: url('/features') },
            ...FEATURES.map((f) => ({
              label: t(f.key as any),
              href: url(`/features/${f.slug}`),
            })),
          ],
        },
        { label: t('pricing'), href: url('/pricing') },
        { label: t('comparison'), href: url('/comparison') },
        { label: t('aboutUs'), href: url('/about-us') },
      ],
    },
    {
      label: t('integrations'),
      href: url('/integrations'),
      children: INTEGRATIONS.map((i) => ({
        label: `${i.name} ${integrationSuffix}`,
        href: url(`/${i.slug}-whatsapp-integration`),
      })),
    },
    {
      label: t('whatsappApi'),
      href: url('/whatsapp-api'),
      children: [
        { label: t('coexistence'), href: url('/whatsapp-api/coexistence') },
        { label: t('templates'), href: url('/whatsapp-api/templates') },
        { label: t('broadcast'), href: url('/whatsapp-api/broadcast') },
      ],
    },
    {
      label: t('resources'),
      href: url('/blog'),
      children: [
        { label: t('blog'), href: url('/blog') },
        { label: t('authors'), href: url('/blog/authors') },
        { label: t('helpCenter'), href: 'https://help.eazybe.com/introduction' },
        { label: t('becomePartner'), href: url('/become-our-partner') },
      ],
    },
    {
      label: t('legal'),
      children: [
        { label: t('terms'), href: url('/terms') },
        { label: t('privacy'), href: url('/privacy') },
        { label: t('msa'), href: url('/msa') },
      ],
    },
    {
      label: t('languages'),
      children: routing.locales.map((l) => ({
        label: LOCALE_NAMES[l] || l,
        href: l === 'en' ? '/sitemap' : `/${l}/sitemap`,
      })),
    },
  ]

  return (
    <section className="section" style={{ paddingTop: 120, paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <div className="sec-head" style={{ marginBottom: 32 }}>
          <h1>{t('title')}</h1>
          <p style={{ marginTop: 8, color: 'var(--ink-3)' }}>{t('subtitle')}</p>
        </div>

        <ul className="sitemap-list sitemap-root">
          {tree.map((node, i) => (
            <TreeNode key={`${node.label}-${i}`} node={node} />
          ))}
        </ul>
      </div>

      {/* Scoped tree styling — native list markers (disc / circle / square) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* Level 1: filled disc */
            .sitemap-list {
              list-style-type: disc;
              padding-left: 24px;
              margin: 0;
            }
            .sitemap-list .sitemap-node::marker {
              color: #5B4BAE;
              font-size: 14px;
            }
            /* Level 2: hollow circle */
            .sitemap-list .sitemap-list {
              list-style-type: circle;
              margin-top: 4px;
              padding-left: 24px;
            }
            /* Level 3: square (for any deeper nesting) */
            .sitemap-list .sitemap-list .sitemap-list {
              list-style-type: square;
            }
            .sitemap-node { padding: 4px 0; }

            /* Native <details>/<summary> chevron, placed right after the label */
            details > summary {
              list-style: none;
              cursor: pointer;
              display: inline-flex;
              align-items: center;
              gap: 8px;
              user-select: none;
              padding: 4px 0;
            }
            details > summary::-webkit-details-marker { display: none; }
            .sitemap-caret {
              display: inline-flex;
              align-items: center;
              color: #0F1115;
              transition: transform .2s ease;
              flex-shrink: 0;
            }
            details:not([open]) > summary .sitemap-caret { transform: rotate(-90deg); }
            details > summary:hover .sitemap-caret { color: #5B4BAE; }

            /* Link styling */
            .sitemap-link {
              color: #0F1115;
              text-decoration: none;
            }
            .sitemap-link:hover { color: #5B4BAE; }
            .sitemap-label { color: #0F1115; font-weight: 500; }
          `,
        }}
      />
    </section>
  )
}
