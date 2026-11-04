import { getRatedSoftwareJsonLd } from '@/data/global-schemas'

/**
 * SoftwareApplication with the 4.2 Chrome Web Store rating, in the page's language.
 * A page must not also carry another rating. Added to blog and comparison posts at the
 * user's request, knowing Search Console flagged "Review has multiple aggregate ratings"
 * on /blog, /comparison and author pages in October 2026: watch that report after deploys.
 */
export function SoftwareRatingSchema({ locale }: { locale: string }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getRatedSoftwareJsonLd(locale)) }}
    />
  )
}
