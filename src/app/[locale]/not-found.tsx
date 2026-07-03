import NotFoundContent from '@/components/NotFoundContent'

/**
 * Locale-level 404 fallback (for routes outside the (site) group). Most 404s
 * render (site)/not-found.tsx instead, which includes the Nav + Footer.
 */
export default function NotFound() {
  return <NotFoundContent />
}
