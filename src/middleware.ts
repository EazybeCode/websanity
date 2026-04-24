import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from '@/i18n/routing'
import { getSanityRedirects, normalizeRedirectPath } from '@/lib/sanity-redirects'

const intlMiddleware = createMiddleware(routing)

const PRODUCTION_URL = 'https://eazybe.com'

export default async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const pathname = url.pathname

  // Handle query parameter redirect for /comparison
  // Redirect /comparison?bf4a41f9_page=X&daf7a484_page=Y to /comparison
  if (pathname === '/comparison' || pathname.match(/^\/[a-z]{2}\/comparison$/)) {
    const hasBfParam = url.searchParams.has('bf4a41f9_page')
    const hasDafParam = url.searchParams.has('daf7a484_page')

    if (hasBfParam || hasDafParam) {
      // Remove all query params and redirect
      url.search = ''
      return NextResponse.redirect(url, 301)
    }
  }

  // Sanity-managed redirects (edited in Studio → Redirects)
  const redirects = await getSanityRedirects()
  if (redirects.size > 0) {
    const match = redirects.get(normalizeRedirectPath(pathname))
    if (match) {
      const status = match.type === '302' ? 302 : 301
      if (match.destination.startsWith('http')) {
        return NextResponse.redirect(match.destination, status)
      }
      const target = url.clone()
      target.pathname = match.destination.startsWith('/') ? match.destination : '/' + match.destination
      target.search = url.search
      return NextResponse.redirect(target, status)
    }
  }

  const response = intlMiddleware(request)

  // Set pathname header so root layout can read it for html lang
  response.headers.set('x-pathname', pathname)

  const host = request.headers.get('host') || ''

  // Block search engines from indexing non-production domains (Coolify staging URLs etc.)
  if (host !== 'eazybe.com' && host !== 'www.eazybe.com') {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

  // Post-process the `Link` header emitted by next-intl.
  //
  // Two problems to fix:
  //   1. next-intl naively swaps the locale prefix to build alternate URLs,
  //      assuming the same slug across locales. For blog and comparison
  //      posts the translated slug differs (e.g. `how-to-read-…` in English
  //      vs `como-leer-…` in Spanish), so the header advertises 404 URLs
  //      and Google invalidates the whole hreflang cluster. The page's
  //      generateMetadata() already emits correct per-slug <link rel="alternate">
  //      tags, so we strip the HTTP header entirely on those routes.
  //   2. The routing config uses `br` as the locale code for Brazilian
  //      Portuguese (so URLs stay /br/...), but `br` is the ISO code for
  //      Breton — Google ignores it. Remap to `pt-BR` in the header.
  // Also preserves the existing production-host normalization.
  const linkHeader = response.headers.get('link')
  if (linkHeader) {
    // Blog *posts* (not the `/blog/authors` index) and comparison posts —
    // these have per-locale slugs, so the auto-generated header is wrong.
    const isBlogPost =
      /^\/(?:(?:en|br|es|tr)\/)?blog\/[^/]+\/?$/.test(pathname) &&
      !/^\/(?:(?:en|br|es|tr)\/)?blog\/authors\/?$/.test(pathname)
    const isComparisonPost = /^\/(?:(?:en|br|es|tr)\/)?comparison\/[^/]+\/?$/.test(pathname)
    const isPerSlugRoute = isBlogPost || isComparisonPost
    // Split on "," that precedes a new link-value ("<"), so we don't split inside params.
    const items = linkHeader.split(/,\s*(?=<)/)
    const kept = items.filter((item) => {
      if (isPerSlugRoute && /rel=(?:"alternate"|alternate)/.test(item) && /hreflang=/.test(item)) {
        return false
      }
      return true
    })
    if (kept.length === 0) {
      response.headers.delete('link')
    } else {
      const fixed = kept
        .map((item) => item.replace(/https?:\/\/[^/]+/g, PRODUCTION_URL))
        .map((item) => item.replace(/hreflang="br"/g, 'hreflang="pt-BR"'))
        .join(', ')
      response.headers.set('link', fixed)
    }
  }

  return response
}

export const config = {
  matcher: ['/', '/(en|br|es|tr)/:path*', '/((?!api|_next|_vercel|integrate-|fb$|.*\\..*).+)'],
}
