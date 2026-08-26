import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from '@/i18n/routing'
import { getSanityRedirects, normalizeRedirectPath } from '@/lib/sanity-redirects'

const intlMiddleware = createMiddleware(routing)

const PRODUCTION_URL = 'https://eazybe.com'
const LOCALE_PREFIXED_CRM_CALLBACK = /^\/(?:en|br|es|tr)\/(integrate-(?:hubspot|zoho|salesforce|bitrix)-crm)\/?$/

export default async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const pathname = url.pathname

  // Reject Server Action probes. The codebase has zero `'use server'`
  // directives, so any inbound `Next-Action` header is either a stale
  // tab from before we removed an action, or a bot scanning for one.
  // Letting these through floods the production log with
  // `Failed to find Server Action "x"` errors from the framework's own
  // dispatcher. Short-circuiting at the edge keeps logs clean and saves
  // the rendering cost. If a Server Action is ever introduced, remove
  // this guard.
  if (request.headers.get('next-action')) {
    return new NextResponse(null, { status: 404 })
  }

  // CRM OAuth callbacks live at root-level routes such as
  // `/integrate-hubspot-crm`. If a locale prefix is carried into the popup
  // flow (`/br/integrate-hubspot-crm`, `/es/integrate-zoho-crm`, etc.), Next
  // treats it as a localized marketing slug and renders the 404 page even
  // though the CRM connection itself may have completed. Canonicalize these
  // variants before next-intl routing while preserving the provider query
  // string (`code`, `state`, `accounts-server`, encrypted params, ...).
  const crmCallback = pathname.match(LOCALE_PREFIXED_CRM_CALLBACK)
  if (crmCallback) {
    url.pathname = `/${crmCallback[1]}`
    return NextResponse.redirect(url, 302)
  }

  // Strip Google Analytics cross-domain linker params (?_gl=..., _ga=...) and
  // common ad-tracking junk so internal URLs stay clean. Only redirects when
  // the params are present, so it costs nothing on normal traffic.
  const trackingParams = ['_gl', '_ga', 'gclid', 'fbclid', 'msclkid']
  const hasTracking = trackingParams.some((p) => url.searchParams.has(p))
  if (hasTracking) {
    trackingParams.forEach((p) => url.searchParams.delete(p))
    return NextResponse.redirect(url, 302)
  }

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

  // Strip ALL hreflang entries from the auto-emitted `Link:` response
  // header. Next.js's `metadata.alternates.languages` API emits the same
  // alternates as both HTML `<link rel="alternate" hreflang>` tags and an
  // HTTP `Link:` header — that double-emission triggers SEO audit warnings
  // ("URLs with multiple entries to a language or regional code") and adds
  // no value, since Google reads either signal fine.
  //
  // We keep HTML tags as the single source of truth (visible in view-source,
  // easier to debug, no header bloat) and drop the redundant Link entries
  // here. Non-hreflang Link entries (preload hints, etc.) are preserved.
  //
  // Also fixes a separate bug along the way: next-intl naively swaps the
  // locale prefix to build alternate URLs and uses `hreflang="br"` —
  // Breton's code, not Brazilian Portuguese. Pages that didn't override
  // alternates would have shipped a wrong-region header. Stripping
  // everything makes that bug moot.
  const linkHeader = response.headers.get('link')
  if (linkHeader) {
    const items = linkHeader.split(/,\s*(?=<)/)
    const kept = items.filter(
      (item) => !(/rel=(?:"alternate"|alternate)/.test(item) && /hreflang=/.test(item))
    )
    if (kept.length === 0) {
      response.headers.delete('link')
    } else {
      const fixed = kept
        .map((item) => item.replace(/https?:\/\/[^/]+/g, PRODUCTION_URL))
        .join(', ')
      response.headers.set('link', fixed)
    }
  }

  return response
}

export const config = {
  // `track` is excluded like `api`: /track/* paths are rewritten to API routes
  // in next.config.ts (the production nginx 502s the /api/* prefix, so
  // browser-facing endpoints use /track/* instead) and must bypass i18n.
  // `lp` is excluded like `fb`: paid-traffic landing pages (/lp/en/…) own
  // their own <html>/<body>, carry no site chrome and hold their locale in
  // the path, so they must not be rewritten into the i18n locale tree.
  // /br/lp/… needs no entry — a static segment already beats [locale].
  // `pv` is the ad-blocker-safe alias of /track/views (see next.config.ts)
  // and must bypass i18n the same way.
  matcher: ['/', '/(en|br|es|tr)/:path*', '/((?!api|track|pv$|lp|_next|_vercel|integrate-|fb$|.*\\..*).+)'],
}
