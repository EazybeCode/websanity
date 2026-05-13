'use client'

/**
 * Browser extensions like Bitdefender / BIS inject attributes
 * (bis_skin_checked, bis_register, __processed_*) onto DOM nodes after
 * the server HTML is delivered but before React hydrates. React then
 * warns about the resulting attribute mismatch on hundreds of innocent
 * <div>s.
 *
 * suppressHydrationWarning only affects ONE element (not children), so
 * sprinkling it everywhere is impractical. Instead, override console.error
 * synchronously at module-import time — well before hydration runs — and
 * filter out only this specific class of warning. Real hydration bugs
 * (variable input, locale dates, invalid HTML nesting) still surface.
 *
 * No-op in production — real users without the extension never see this.
 */

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const EXTENSION_ATTRS = ['bis_skin_checked', 'bis_register', '__processed_']
  const HYDRATION_HINTS = [
    'hydrated but some attributes',
    'extra attributes from the server',
    'did not match',
    "Hydration failed because the server rendered HTML didn't match",
  ]

  const original = console.error
  const w = window as Window & { __eb_console_filtered__?: boolean }
  if (!w.__eb_console_filtered__) {
    w.__eb_console_filtered__ = true
    console.error = (...args: unknown[]) => {
      // Concatenate all arg strings to check the full message body
      const blob = args
        .map((a) => (typeof a === 'string' ? a : ''))
        .join(' ')
      if (
        EXTENSION_ATTRS.some((attr) => blob.includes(attr)) ||
        (HYDRATION_HINTS.some((h) => blob.includes(h)) &&
          EXTENSION_ATTRS.some((attr) => blob.includes(attr)))
      ) {
        return
      }
      original(...args)
    }
  }
}

export function SuppressExtensionHydrationWarning() {
  return null
}
