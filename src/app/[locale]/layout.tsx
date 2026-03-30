import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Providers } from '@/providers/Providers'
import { Analytics } from '@/components/Analytics'
import MegaMenuHeader from '@/components/header/MegaMenuHeader'
import ChunkyFooter from '@/components/footer/ChunkyFooter'
import { LeadSidebar } from '@/components/lead/LeadSidebar'
import { LeadMobileButton } from '@/components/lead/LeadMobileButton'
import { TrialModalWrapper } from '@/components/modals/TrialModalWrapper'

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
    <NextIntlClientProvider messages={messages}>
      <Providers>
        <div className="min-h-screen bg-brand-black font-sans text-slate-400 antialiased selection:bg-brand-blue selection:text-white overflow-x-clip">
          <MegaMenuHeader />
          <main>{children}</main>
          <ChunkyFooter />
          <TrialModalWrapper />
          <LeadSidebar />
          <LeadMobileButton />
        </div>
      </Providers>
      <Analytics />
    </NextIntlClientProvider>
  )
}
