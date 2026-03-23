import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from '@/i18n/routing'

const intlMiddleware = createMiddleware(routing)

const PRODUCTION_URL = 'https://eazybe.com'

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request)

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
