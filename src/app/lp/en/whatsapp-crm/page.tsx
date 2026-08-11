import LandingPage from '@/components/whatsapp-crm/LandingPage'
import { content } from '@/data/whatsapp-crm-content'

/** English cut of the paid landing page. Copy lives in the content module. */
export default function Page({ searchParams }: { searchParams: Promise<{ crm?: string }> }) {
  return <LandingPage searchParams={searchParams} content={content} />
}
