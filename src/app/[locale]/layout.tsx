import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { routing } from '@/i18n/routing'
import { Providers } from '@/providers/Providers'
import { Analytics } from '@/components/Analytics'
import { GlobalStructuredData } from '@/components/seo/GlobalStructuredData'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

// Map next-intl URL locale codes to canonical HTML `lang` values.
// `en` is mapped to `en-US` so search engines and AI systems know the
// English content is US English (matches the JSON-LD inLanguage value).
// `br` in our URL structure is Brazilian Portuguese, which in BCP-47 is `pt-BR`.
const htmlLangMap: Record<string, string> = {
  en: 'en-US',
  br: 'pt-BR',
  es: 'es',
  tr: 'tr',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={htmlLangMap[locale] || 'en'} className="dark" suppressHydrationWarning>
      <head>
        {/* Pre-handshake the Google Fonts CDN so font CSS + WOFF2 fetches
            kick off in parallel with HTML parsing, cutting ~200-300ms off
            LCP for the H1 (which uses Inter). */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Critical CSS: keep nav dropdowns + mobile drawer hidden at first
            paint so Googlebot's screenshot (taken before the main stylesheet
            applies) doesn't render every dropdown's content flat-stacked.
            Mirrors the equivalent rules in landing-v3.css. */}
        <style
          dangerouslySetInnerHTML={{
            __html: `.landing .nav-dropdown{position:absolute;opacity:0;visibility:hidden;pointer-events:none}.landing .nav-drawer{position:fixed;inset:0;opacity:0;pointer-events:none}.landing .nav-drawer-section>ul{max-height:0;overflow:hidden}.landing .nav-burger{display:none}@media(max-width:880px){.landing .nav-links,.landing .nav-ctas{display:none}.landing .nav-burger{display:inline-flex}.landing .nav-dropdown{display:none}}.landing .hero-inner{text-align:center}.landing .hero h1{font-weight:400;font-size:clamp(32px,4.2vw,60px);line-height:1.08;letter-spacing:-0.025em;max-width:22ch;margin:0 auto 28px}.landing .hero-sub{font-size:19px;max-width:780px;margin:0 auto 40px;line-height:1.5}`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <GlobalStructuredData locale={locale} />
            {children}
          </Providers>
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
