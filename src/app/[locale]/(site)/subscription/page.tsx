import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { TrackedChromeStoreLink } from '@/components/TrackedChromeStoreLink'

export default async function SubscriptionPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ success?: string; currency?: string; amount?: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const sp = await searchParams
  const success = sp.success === 'true'
  const rawCurrency = sp.currency?.toUpperCase() || ''
  const rawAmount = sp.amount || ''

  const formatAmount = (amt: string, cur: string): string => {
    const num = parseFloat(amt)
    if (isNaN(num)) return amt
    const value = num > 999 ? num / 100 : num
    try {
      return new Intl.NumberFormat(
        locale === 'br' ? 'pt-BR' : locale === 'es' ? 'es' : locale === 'tr' ? 'tr-TR' : 'en-US',
        { style: 'currency', currency: cur || 'USD' },
      ).format(value)
    } catch {
      return `${value.toFixed(2)} ${cur}`
    }
  }

  const formattedAmount = rawAmount && rawCurrency ? formatAmount(rawAmount, rawCurrency) : ''

  if (!success) {
    return (
      <section className="page-hero" data-tone="dark">
        <div className="container">
          <div className="reveal" style={{ maxWidth: 540, margin: '0 auto' }}>
            <div
              style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'color-mix(in oklab, var(--err) 18%, var(--paper))',
                border: '1px solid color-mix(in oklab, var(--err) 35%, var(--line))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px', color: 'var(--err)',
              }}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1>Payment <em>Unsuccessful</em></h1>
            <p className="lede">
              Something went wrong with your payment. Please try again or contact support.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
              <Link href={`/${locale}/pricing`} className="btn btn-primary">Try Again</Link>
              <a href="mailto:support@eazybe.com" className="btn btn-outline">Contact Support</a>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="page-hero" data-tone="dark">
      <div className="container">
        <div className="reveal" style={{ maxWidth: 640, margin: '0 auto' }}>
          <div
            style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'color-mix(in oklab, var(--accent-a) 28%, var(--paper))',
              border: '1px solid color-mix(in oklab, var(--accent-a) 40%, var(--line))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px', color: 'var(--accent-ink)',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1>Payment <em>Successful!</em></h1>
          <p className="lede">Thank you for subscribing to Eazybe.</p>

          {formattedAmount && (
            <p style={{ marginTop: 12, color: 'var(--ink-3)' }}>
              Amount paid: <strong style={{ color: 'var(--ink)' }}>{formattedAmount}</strong>
            </p>
          )}

          <p style={{ marginTop: 12, color: 'var(--ink-3)' }}>
            Your subscription is now active. You can start using all premium features right away from the Chrome extension.
          </p>

          <div
            style={{
              marginTop: 32,
              padding: 24,
              background: 'var(--bg-2)',
              border: '1px solid var(--line)',
              borderRadius: 14,
              textAlign: 'left',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--f-mono)',
                fontSize: 11,
                color: 'var(--ink-4)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 14,
                fontWeight: 600,
              }}
            >
              Next Steps
            </h2>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Open the Eazybe Chrome extension on WhatsApp Web',
                'Your premium features are automatically activated',
                "Connect your CRM (HubSpot, Salesforce, or Zoho) if you haven't already",
              ].map((step, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', color: 'var(--ink-2)', fontSize: 15 }}>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 24, height: 24, borderRadius: '50%',
                      background: 'color-mix(in oklab, var(--accent-a) 18%, var(--paper))',
                      color: 'var(--accent-ink)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--f-mono)', fontSize: 11, fontWeight: 700,
                    }}
                  >
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
            <TrackedChromeStoreLink
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Open Chrome Extension
            </TrackedChromeStoreLink>
            <Link href={`/${locale}`} className="btn btn-outline">
              Back to Home
            </Link>
          </div>

          <p style={{ marginTop: 28, fontSize: 13, color: 'var(--ink-4)' }}>
            Need help? Reach out at{' '}
            <a href="mailto:support@eazybe.com" style={{ color: 'var(--accent-ink)', borderBottom: '1px solid color-mix(in oklab, var(--accent-ink) 40%, transparent)' }}>
              support@eazybe.com
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
