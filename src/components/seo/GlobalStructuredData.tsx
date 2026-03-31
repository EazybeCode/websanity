/**
 * Global JSON-LD Structured Data Component
 * Renders SoftwareApplication and Organization schemas for all pages
 * Localized for each locale (en, br, es, tr)
 *
 * This component is added to the locale layout so these schemas appear on every page
 * without interfering with page-specific schemas.
 */

import { getGlobalSchemas } from '@/data/global-schemas'

interface GlobalStructuredDataProps {
  locale: string
}

export function GlobalStructuredData({ locale }: GlobalStructuredDataProps) {
  const { softwareApplication, organization } = getGlobalSchemas(locale)

  return (
    <>
      <script
        type="application/ld+json"
        id="global-software-application-schema"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplication) }}
      />
      <script
        type="application/ld+json"
        id="global-organization-schema"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
    </>
  )
}
