import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: ['/', '/(en|br|es|tr)/:path*', '/((?!api|_next|_vercel|integrate-|fb$|.*\\..*).+)'],
}
