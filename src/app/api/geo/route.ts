import { NextRequest, NextResponse } from 'next/server'
import { COUNTRY_CURRENCY } from '@/lib/countryCurrency'

// Server-side geolocation for pricing currency detection.
//
// The browser calls this same-origin route (no CORS, and unblockable by the
// ad/DNS filters that break direct ipapi.co calls). We read the visitor's IP
// from x-forwarded-for and look it up via ipwho.is *server-side*, then derive
// currency from the country code so we don't depend on any provider's shape.
//
// `seen_ip` is echoed back only so we can verify, once, that the proxy chain
// forwards the real client IP to this route.
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

interface GeoResponse {
  ip: string | null
  country_code: string | null
  country_name: string | null
  currency: string | null
  /** IANA timezone id (e.g. "America/Sao_Paulo") derived from the IP.
   *  Correctly follows VPNs — the browser's Intl.DateTimeFormat only
   *  ever returns the OS timezone, which VPNs don't touch. */
  timezone: string | null
  seen_ip: string | null
}

export async function GET(request: NextRequest): Promise<NextResponse<GeoResponse>> {
  const forwardedFor = request.headers.get('x-forwarded-for') || ''
  const clientIp = forwardedFor.split(',')[0].trim().replace(/^::ffff:/, '')

  const empty: GeoResponse = {
    ip: null,
    country_code: null,
    country_name: null,
    currency: null,
    timezone: null,
    seen_ip: clientIp || null,
  }

  try {
    // ipwho.is accepts an explicit IP in the path; fall back to the caller's
    // own IP if the proxy didn't forward one (dev / misconfigured proxy).
    const url = clientIp ? `https://ipwho.is/${clientIp}` : 'https://ipwho.is/'
    const res = await fetch(url, { cache: 'no-store' })
    const data = await res.json()

    if (!data?.success) {
      return NextResponse.json(empty)
    }

    const countryCode: string | null = data.country_code ?? null
    return NextResponse.json({
      ip: data.ip ?? clientIp ?? null,
      country_code: countryCode,
      country_name: data.country ?? null,
      currency: countryCode ? COUNTRY_CURRENCY[countryCode] ?? null : null,
      timezone: data.timezone?.id ?? null,
      seen_ip: clientIp || null,
    })
  } catch {
    return NextResponse.json(empty)
  }
}
