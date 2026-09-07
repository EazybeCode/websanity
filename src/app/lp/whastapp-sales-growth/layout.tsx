import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '../../globals.css'

/**
 * Standalone shell for the paid landing page (same pattern as
 * /lp/en/whatsapp-crm): lives OUTSIDE `[locale]/` so it inherits no Nav,
 * mega-menu or Footer — on a paid LP every outbound link is a leak — and
 * therefore must render its own <html>/<body> plus its own GTM / Google Ads
 * tags (the site's Analytics component lives in the locale layout).
 */
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const SITE = 'https://eazybe.com'
const PATH = '/lp/whastapp-sales-growth'

export const metadata: Metadata = {
  title: 'Grow Your WhatsApp Sales | Eazybe',
  description: 'See how Eazybe connects WhatsApp to your CRM. Leave your details and our team will reach out.',
  alternates: { canonical: `${SITE}${PATH}` },
  // Paid traffic only — never index.
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    url: `${SITE}${PATH}`,
    siteName: 'Eazybe',
    title: 'Grow Your WhatsApp Sales | Eazybe',
    description: 'See how Eazybe connects WhatsApp to your CRM.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0F1115',
}

export default function SalesGrowthLpLayout({ children }: { children: React.ReactNode }) {
  // Same container the rest of the site loads (Analytics.tsx hard-codes it);
  // env var wins if present, for staging.
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-K4C7HNNN'

  return (
    <html lang="en" className={inter.variable}>
      <head>
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}
        {/* Google Ads tag — fired from the form's submit handler. */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-11159326120" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-11159326120');`,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  )
}
