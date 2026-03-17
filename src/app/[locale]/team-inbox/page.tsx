import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { TeamInboxPageClient } from '@/components/pages/TeamInboxPageClient'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const titles: Record<string, string> = {
    en: 'Team Inbox - WhatsApp Team Management Dashboard | Eazybe',
    pt: 'Team Inbox - Painel de Gerenciamento de Equipe WhatsApp | Eazybe',
    es: 'Team Inbox - Panel de Gestion de Equipo WhatsApp | Eazybe',
    tr: 'Team Inbox - WhatsApp Ekip Yonetim Paneli | Eazybe',
  }

  const descriptions: Record<string, string> = {
    en: 'Manage all your team\'s WhatsApp conversations in one dashboard. Route leads, track responses, ensure coverage. Works with WhatsApp Business App - no API required.',
    pt: 'Gerencie todas as conversas do WhatsApp da sua equipe em um painel. Encaminhe leads, acompanhe respostas, garanta cobertura.',
    es: 'Gestione todas las conversaciones de WhatsApp de su equipo en un panel. Dirija leads, rastree respuestas, asegure cobertura.',
    tr: 'Ekibinizin tum WhatsApp konusmalarini tek bir panelde yonetin. Leadleri yonlendirin, yanitlari takip edin, kapsami saglayin.',
  }

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
    },
  }
}

export default async function TeamInboxPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return <TeamInboxPageClient />
}
