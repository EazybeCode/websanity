import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { PartnerPageClient } from '@/components/pages/PartnerPageClient'
import { getAlternates } from '@/lib/seo-helpers'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const titles: Record<string, string> = {
    en: 'Become Our Partner - Earn Up to 50% Revenue Share | Eazybe',
    pt: 'Torne-se Nosso Parceiro - Ganhe Ate 50% de Receita | Eazybe',
    es: 'Sea Nuestro Socio - Gane Hasta 50% de Ingresos | Eazybe',
    tr: 'Ortaqimiz Olun - %50\'ye Kadar Gelir Payi Kazanin | Eazybe',
  }

  const descriptions: Record<string, string> = {
    en: 'Partner with the #1 WhatsApp CRM. Earn up to 50% revenue share as an affiliate, reseller, or white label partner. Free to join, 24-hour approval.',
    pt: 'Seja parceiro do CRM WhatsApp #1. Ganhe ate 50% de participacao na receita como afiliado, revendedor ou parceiro white label.',
    es: 'Asociese con el CRM de WhatsApp #1. Gane hasta el 50% de participacion en ingresos como afiliado, revendedor o socio white label.',
    tr: '#1 WhatsApp CRM ile ortak olun. Bagli kurulusu, bayisi veya beyaz etiket ortagi olarak %50\'ye kadar gelir payi kazanin.',
  }

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
    },
    alternates: getAlternates(locale, '/become-our-partner'),
  }
}

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return <PartnerPageClient />
}
