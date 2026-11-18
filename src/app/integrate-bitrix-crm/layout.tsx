import type { Metadata } from 'next'
import { pageDates, withPageDates } from '@/lib/page-dates'

// The page is a client component, so its published / last-modified meta tags
// (article:published_time / article:modified_time) are set here.
export function generateMetadata(): Metadata {
  return withPageDates({}, pageDates({ page: '/integrate-bitrix-crm' }))
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
