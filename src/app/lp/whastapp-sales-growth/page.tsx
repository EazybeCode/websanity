import { SalesGrowthLpClient } from '@/components/lp/SalesGrowthLpClient'

/**
 * Paid landing page: only the lead form is legible — a blurred capture of
 * /hubspot-whatsapp-integration sits behind it as a content teaser.
 * Metadata (noindex,nofollow) lives in this segment's layout.tsx, which
 * also provides the standalone <html>/<body> shell.
 */
export default function Page() {
  return <SalesGrowthLpClient />
}
