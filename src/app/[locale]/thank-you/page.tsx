import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { getCanonicalOnly } from '@/lib/seo-helpers'
import { LandingShell } from '@/components/landing/LandingShell'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  return {
    title: 'Thank You | Eazybe',
    robots: { index: false, follow: false },
    alternates: getCanonicalOnly(locale, '/thank-you'),
  }
}

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()

  return (
    <LandingShell hideBea>
      <section className="page-hero" data-tone="dark">
        <div className="container">
          <div className="reveal" style={{ maxWidth: 640, margin: '0 auto' }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background:
                  'linear-gradient(135deg, color-mix(in oklab, var(--accent-a) 30%, var(--paper)), color-mix(in oklab, var(--accent-b) 18%, var(--paper)))',
                border: '1px solid color-mix(in oklab, var(--accent-a) 40%, var(--line))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                color: 'var(--accent-ink)',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1>{t('leadForm.thankYouTitle')}</h1>
            <p className="lede" style={{ marginBottom: 12 }}>{t('leadForm.thankYouMessage')}</p>
            <p style={{ color: 'var(--ink-4)', fontSize: 15, fontFamily: 'var(--f-mono)' }}>
              {t('leadForm.thankYouSubtext')}
            </p>
          </div>
        </div>
      </section>
    </LandingShell>
  )
}
