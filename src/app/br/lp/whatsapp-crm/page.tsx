import LandingPage from '@/components/whatsapp-crm/LandingPage'
import { content } from '@/data/whatsapp-crm-content.br'

/** Brazilian Portuguese cut of the paid landing page. */
export default function Page({ searchParams }: { searchParams: Promise<{ crm?: string }> }) {
  return <LandingPage searchParams={searchParams} content={content} />
}
