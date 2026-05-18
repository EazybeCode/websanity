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
// `br` in our URL structure is Brazilian Portuguese, which in BCP-47 is `pt-BR`.
const htmlLangMap: Record<string, string> = {
  en: 'en',
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
