import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '../../../globals.css'

/**
 * Portuguese (BR) cut of the paid LP shell — same standalone pattern as the
 * EN version at /lp/whastapp-sales-growth (own <html>/<body>, GTM + Ads
 * tags, no nav/footer). Lives under the literal /br segment, which beats
 * [locale] (same as /br/lp/whatsapp-crm).
 */
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const SITE = 'https://eazybe.com'
const PATH = '/br/lp/whastapp-sales-growth'

export const metadata: Metadata = {
  title: 'Faça Suas Vendas no WhatsApp Crescerem | Eazybe',
  description: 'Veja como a Eazybe conecta o WhatsApp ao seu CRM. Deixe seus dados e nosso time entra em contato.',
  alternates: { canonical: `${SITE}${PATH}` },
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    url: `${SITE}${PATH}`,
    siteName: 'Eazybe',
    title: 'Faça Suas Vendas no WhatsApp Crescerem | Eazybe',
    description: 'Veja como a Eazybe conecta o WhatsApp ao seu CRM.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0F1115',
}

export default function SalesGrowthLpLayoutBr({ children }: { children: React.ReactNode }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-K4C7HNNN'

  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}
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
