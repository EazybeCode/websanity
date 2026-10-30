/**
 * Global JSON-LD Structured Data Component
 * Renders the Organization schema for all pages
 * Localized for each locale (en, br, es, tr)
 *
 * This component is added to the locale layout so the schema appears on every page
 * without interfering with page-specific schemas.
 *
 * The SoftwareApplication schema (with the 4.9★ aggregateRating) is NOT global: Google
 * requires a rating to describe the page's main item, and repeating it on blog /
 * comparison / author pages raised "Review has multiple aggregate ratings" in Search
 * Console. It is emitted on the homepage only (getHomepageJsonLd).
 */

import { getGlobalSchemas } from '@/data/global-schemas'

interface GlobalStructuredDataProps {
  locale: string
}

export function GlobalStructuredData({ locale }: GlobalStructuredDataProps) {
  const { organization } = getGlobalSchemas(locale)

  return (
    <script
      type="application/ld+json"
      id="global-organization-schema"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
    />
  )
}
