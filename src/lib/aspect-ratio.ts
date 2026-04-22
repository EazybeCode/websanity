/**
 * Aspect-ratio helpers for Sanity-managed images.
 *
 * The schema (see sanity.config.js) exposes `desktopRatio` and `mobileRatio`
 * with the values below. We map those to Tailwind class strings that are
 * enumerated literally so Tailwind's JIT picks them up at build time —
 * dynamically-concatenated class names wouldn't be detected.
 */

export type AspectRatio = '1:1' | '3:5' | '4:5' | '9:16' | '16:9' | 'auto'

const MOBILE_ASPECT: Record<AspectRatio, string> = {
  '1:1': 'aspect-[1/1]',
  '3:5': 'aspect-[3/5]',
  '4:5': 'aspect-[4/5]',
  '9:16': 'aspect-[9/16]',
  '16:9': 'aspect-[16/9]',
  auto: 'aspect-auto',
}

const DESKTOP_ASPECT: Record<AspectRatio, string> = {
  '1:1': 'md:aspect-[1/1]',
  '3:5': 'md:aspect-[3/5]',
  '4:5': 'md:aspect-[4/5]',
  '9:16': 'md:aspect-[9/16]',
  '16:9': 'md:aspect-[16/9]',
  auto: 'md:aspect-auto',
}

export function mobileAspectClass(ratio?: string | null, fallback: string = 'aspect-[16/9]'): string {
  if (!ratio) return fallback
  return MOBILE_ASPECT[ratio as AspectRatio] ?? fallback
}

export function desktopAspectClass(ratio?: string | null, fallback: string = 'md:aspect-[2/1]'): string {
  if (!ratio) return fallback
  return DESKTOP_ASPECT[ratio as AspectRatio] ?? fallback
}
