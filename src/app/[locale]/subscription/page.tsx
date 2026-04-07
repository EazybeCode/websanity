import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'

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

  // Format amount: Stripe sends cents, so convert to proper decimal
  const formatAmount = (amt: string, cur: string): string => {
    const num = parseFloat(amt)
    if (isNaN(num)) return amt
    // If amount looks like cents (> 999 for most currencies), divide by 100
    const value = num > 999 ? num / 100 : num
    try {
      return new Intl.NumberFormat(locale === 'br' ? 'pt-BR' : locale === 'es' ? 'es' : locale === 'tr' ? 'tr-TR' : 'en-US', {
        style: 'currency',
        currency: cur || 'USD',
      }).format(value)
    } catch {
      return `${value.toFixed(2)} ${cur}`
    }
  }

  const formattedAmount = rawAmount && rawCurrency ? formatAmount(rawAmount, rawCurrency) : ''

  if (!success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Payment Unsuccessful</h1>
          <p className="text-lg text-white/70 mb-8">
            Something went wrong with your payment. Please try again or contact support.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={`/${locale}/pricing`} className="inline-flex items-center justify-center h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
              Try Again
            </Link>
            <a href="mailto:support@eazybe.com" className="inline-flex items-center justify-center h-11 px-6 bg-white/10 hover:bg-white/15 text-white/80 font-medium rounded-lg transition-colors">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">
          Payment Successful!
        </h1>

        <p className="text-lg text-white/70 mb-2">
          Thank you for subscribing to Eazybe.
        </p>

        {formattedAmount && (
          <p className="text-white/50 mb-6">
            Amount paid: <span className="font-semibold text-white">{formattedAmount}</span>
          </p>
        )}

        <p className="text-white/50 mb-8">
          Your subscription is now active. You can start using all premium features right away from the Chrome extension.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 text-left">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Next Steps</h2>
          <ol className="space-y-3 text-white/70 text-[15px]">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
              Open the Eazybe Chrome extension on WhatsApp Web
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
              Your premium features are automatically activated
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
              Connect your CRM (HubSpot, Salesforce, or Zoho) if you haven&apos;t already
            </li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://chromewebstore.google.com/detail/eazybe/iflackhliiapmhhgjlokjjagkfcbmooa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Open Chrome Extension
          </a>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center h-11 px-6 bg-white/10 hover:bg-white/15 text-white/80 font-medium rounded-lg transition-colors"
          >
            Back to Home
          </Link>
        </div>

        <p className="text-sm text-white/40 mt-8">
          Need help? Reach out at{' '}
          <a href="mailto:support@eazybe.com" className="text-blue-400 hover:underline">support@eazybe.com</a>
        </p>
      </div>
    </div>
  )
}
