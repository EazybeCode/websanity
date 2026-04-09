import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from '@/i18n/routing'

const intlMiddleware = createMiddleware(routing)

const PRODUCTION_URL = 'https://eazybe.com'

export default function middleware(request: NextRequest) {
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

  const response = intlMiddleware(request)

  // Set pathname header so root layout can read it for html lang
  response.headers.set('x-pathname', pathname)

  const host = request.headers.get('host') || ''

  // Block search engines from indexing non-production domains (Coolify staging URLs etc.)
  if (host !== 'eazybe.com' && host !== 'www.eazybe.com') {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

  // Fix hreflang Link headers: always use production domain instead of internal proxy host
  const linkHeader = response.headers.get('link')
  if (linkHeader) {
    const fixed = linkHeader.replace(/https?:\/\/[^/]+/g, PRODUCTION_URL)
    response.headers.set('link', fixed)
  }

  return response
}

export const config = {
  matcher: ['/', '/(en|br|es|tr)/:path*', '/((?!api|_next|_vercel|integrate-|fb$|.*\\..*).+)'],
}
