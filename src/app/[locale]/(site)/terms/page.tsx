import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { ScrollText } from 'lucide-react'
import { getCanonicalOnly } from '@/lib/seo-helpers'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'terms' })

  return {
    title: t('title') || 'Terms of Service | Eazybe',
    robots: { index: false, follow: false },
    alternates: getCanonicalOnly(locale, '/terms'),
  }
}

const SECTIONS = [
  { num: 1, titleKey: 'acceptanceTitle', bodyKeys: ['acceptance'] },
  { num: 2, titleKey: 'accountsTitle', bodyKeys: ['accounts'] },
  { num: 3, titleKey: 'linksTitle', bodyKeys: ['links'] },
  { num: 4, titleKey: 'terminationTitle', bodyKeys: ['termination', 'terminationAccount'] },
  { num: 5, titleKey: 'governingLawTitle', bodyKeys: ['governingLaw'] },
  { num: 6, titleKey: 'entireAgreementTitle', bodyKeys: ['entireAgreement'] },
] as const

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'terms' })

  return (
    <>
      <section className="page-hero" data-tone="dark" style={{ paddingBottom: 40 }}>
        <div className="container">
          <div className="reveal" style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background:
                  'linear-gradient(135deg, color-mix(in oklab, var(--accent-a) 28%, var(--paper)), color-mix(in oklab, var(--accent-b) 18%, var(--paper)))',
                border: '1px solid color-mix(in oklab, var(--accent-a) 35%, var(--line))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-ink)',
              }}
            >
              <ScrollText className="w-6 h-6" />
            </div>
          </div>
          <h1 className="reveal">{t('title')}</h1>
          <p className="lede reveal">{t('intro')}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <div className="prose reveal">
            {SECTIONS.map((s) => (
              <div key={s.num} style={{ marginBottom: 36 }}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: 'color-mix(in oklab, var(--accent-a) 18%, var(--paper))',
                      border: '1px solid color-mix(in oklab, var(--accent-a) 35%, var(--line))',
                      color: 'var(--accent-ink)',
                      fontFamily: 'var(--f-mono)',
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    {s.num}
                  </span>
                  {t(s.titleKey)}
                </h2>
                {s.bodyKeys.map((k) => (
                  <p key={k}>{t(k)}</p>
                ))}
              </div>
            ))}
            <div
              className="reveal"
              style={{
                marginTop: 32,
                padding: 24,
                background:
                  'linear-gradient(135deg, color-mix(in oklab, var(--accent-a) 12%, var(--paper)), color-mix(in oklab, var(--accent-b) 8%, var(--paper)))',
                border: '1px solid color-mix(in oklab, var(--accent-a) 30%, var(--line))',
                borderRadius: 14,
              }}
            >
              <h2 style={{ marginTop: 0 }}>{t('changesTitle')}</h2>
              <p style={{ marginBottom: 0 }}>{t('changes')}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
