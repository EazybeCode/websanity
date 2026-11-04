import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getAlternates } from '@/lib/seo-helpers'
import { getSitemapTree, isBranch, type SitemapNode } from '@/data/site-navigation'

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
// Renderers
// ────────────────────────────────────────────────────────────────────────────

function TreeNode({ node }: { node: SitemapNode }) {
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
  const tree = await getSitemapTree(locale)

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
