import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getAlternates } from '@/lib/seo-helpers'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const SITE_URL = 'https://eazybe.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landingV3.feeds' })
  return {
    title: `${t('title')} | Eazybe`,
    description: t('subtitle'),
    alternates: getAlternates(locale, '/feeds'),
    robots: { index: true, follow: true },
  }
}

export default async function FeedsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('landingV3.feeds')

  const localePath = locale === 'en' ? '' : `/${locale}`

  const feeds = [
    { title: t('blogTitle'), href: `${localePath}/blog/feed.xml` },
    { title: t('comparisonTitle'), href: `${localePath}/comparison/feed.xml` },
  ]

  return (
    <section className="section" style={{ paddingTop: 120, paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 980 }}>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 32 }}>
          {t('title')}
        </h1>

        <div
          style={{
            background: '#ffffff',
            border: '1px solid var(--line)',
            borderRadius: 20,
            padding: 'clamp(24px, 4vw, 48px)',
            boxShadow: '0 1px 0 rgba(15,17,21,0.04), 0 14px 32px -16px rgba(15,17,21,0.12)',
          }}
        >
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              columnGap: 'clamp(24px, 5vw, 64px)',
            }}
          >
            {feeds.map((feed) => (
              <li
                key={feed.href}
                style={{
                  borderBottom: '1px solid var(--line)',
                  padding: '22px 0',
                }}
              >
                <Link
                  href={feed.href}
                  style={{
                    color: 'var(--ink)',
                    textDecoration: 'none',
                    fontSize: 'clamp(18px, 2vw, 22px)',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    display: 'block',
                    transition: 'color .15s',
                  }}
                  className="feeds-row-link"
                >
                  {feed.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p
          style={{
            marginTop: 24,
            color: 'var(--ink-3)',
            fontSize: 14,
            lineHeight: 1.55,
            maxWidth: 720,
          }}
        >
          {t('subtitle')}
        </p>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .feeds-row-link:hover { color: var(--accent-ink, #5B4BAE); }
          `,
        }}
      />
    </section>
  )
}
