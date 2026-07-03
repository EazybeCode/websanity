import NotFoundContent from '@/components/NotFoundContent'

/**
 * 404 for unmatched routes inside the (site) group. Because it lives inside
 * (site), it renders within (site)/layout.tsx — so the Nav (header) and Footer
 * are always present, for every locale and any URL depth.
 */
export default function SiteNotFound() {
  return <NotFoundContent />
}
