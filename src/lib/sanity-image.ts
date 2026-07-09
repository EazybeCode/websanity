/**
 * Responsive delivery helpers for Sanity CDN images.
 *
 * Sanity's image CDN resizes on the fly via query params (?w=…) and
 * `auto=format` upgrades the encoding (AVIF/WebP) per browser support.
 * Serving a file sized for the actual layout slot instead of the full
 * intrinsic asset cuts LCP/FCP bytes (Lighthouse "Improve image delivery").
 */

export const SANITY_SRCSET_WIDTHS = [480, 768, 1080, 1400]

/** Build a srcset string for a Sanity CDN URL, capped at the intrinsic width. */
export function sanitySrcSet(url: string, intrinsicW?: number): string | undefined {
  if (!url?.includes('cdn.sanity.io')) return undefined
  const widths = SANITY_SRCSET_WIDTHS.filter((w) => !intrinsicW || w < intrinsicW)
  const entries = widths.map((w) => `${url}?w=${w}&auto=format ${w}w`)
  entries.push(intrinsicW ? `${url}?auto=format ${intrinsicW}w` : `${url}?auto=format`)
  return entries.join(', ')
}

/** Parse the intrinsic "…-1672x941.webp" dimensions Sanity embeds in asset URLs. */
export function sanityIntrinsicSize(url: string): { width: number; height: number } | undefined {
  const m = /-(\d+)x(\d+)\.\w+$/.exec(url || '')
  return m ? { width: Number(m[1]), height: Number(m[2]) } : undefined
}

/** Article body column tops out around ~892px; below lg it spans the viewport. */
export const SANITY_BODY_SIZES = '(min-width: 1024px) 892px, 100vw'

/** Featured image sits in a max-w-7xl container (~1232px content width). */
export const SANITY_FEATURED_SIZES = '(min-width: 1280px) 1232px, 100vw'
