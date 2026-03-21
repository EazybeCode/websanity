import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from '@/i18n/routing'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request)

  // Block search engines from indexing non-production domains (Coolify staging URLs etc.)
  const host = request.headers.get('host') || ''
  if (host !== 'eazybe.com' && host !== 'www.eazybe.com') {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

  return response
}

export const config = {
  matcher: ['/', '/(en|br|es|tr)/:path*', '/((?!api|_next|_vercel|integrate-|fb$|.*\\..*).+)'],
}
