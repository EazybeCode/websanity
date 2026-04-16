/**
 * In-memory cache of active Sanity redirect documents.
 * Fetched from the Sanity CDN and refreshed every 60s per server instance.
 * Safe to import from middleware (edge runtime).
 */

const PROJECT_ID = '5awzi0t4'
const DATASET = 'production'
const API_VERSION = '2024-01-01'
const TTL_MS = 60_000

export type SanityRedirect = {
  source: string
  destination: string
  type: '301' | '302'
}

type CacheEntry = {
  map: Map<string, SanityRedirect>
  expiresAt: number
}

let cache: CacheEntry | null = null

export function normalizeRedirectPath(path: string): string {
  let p = (path || '').trim()
  if (!p) return '/'
  if (!p.startsWith('/') && !p.startsWith('http')) p = '/' + p
  if (p.startsWith('http')) return p
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1)
  return p.toLowerCase()
}

export async function getSanityRedirects(): Promise<Map<string, SanityRedirect>> {
  const now = Date.now()
  if (cache && cache.expiresAt > now) return cache.map

  try {
    const query = encodeURIComponent(
      `*[_type == "redirect" && isActive == true]{ source, destination, type }`
    )
    const url = `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`
    const res = await fetch(url, { next: { revalidate: 60 } })
    if (!res.ok) throw new Error(`Sanity fetch ${res.status}`)
    const json = (await res.json()) as { result?: SanityRedirect[] }

    const map = new Map<string, SanityRedirect>()
    for (const r of json.result || []) {
      if (!r?.source || !r?.destination) continue
      const key = normalizeRedirectPath(r.source)
      if (!key) continue
      map.set(key, {
        source: r.source,
        destination: r.destination,
        type: r.type === '302' ? '302' : '301',
      })
    }
    cache = { map, expiresAt: now + TTL_MS }
    return map
  } catch {
    if (cache) return cache.map
    return new Map()
  }
}
