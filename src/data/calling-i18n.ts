import { CALLING_PAGES, type CallingPageContent } from '@/data/calling-content'
import { CALLING_UI, type CallingUi } from '@/data/calling-ui'
import es from '@/data/calling-translations/es.json'
import br from '@/data/calling-translations/br.json'
import tr from '@/data/calling-translations/tr.json'

type Translation = { ui: CallingUi; pages: Record<string, Partial<CallingPageContent>> }

const TRANSLATIONS: Record<string, Translation> = {
  es: es as unknown as Translation,
  br: br as unknown as Translation,
  tr: tr as unknown as Translation,
}

export const CALLING_LOCALES = ['en', 'es', 'br', 'tr']

export function getCallingUi(locale: string): CallingUi {
  return TRANSLATIONS[locale]?.ui ?? CALLING_UI
}

/** A page's copy in this locale. Slugs, related links and image files always come from the English source. */
export function getCallingPage(slug: string, locale = 'en'): CallingPageContent | undefined {
  const base = CALLING_PAGES.find((p) => p.slug === slug)
  if (!base) return undefined
  const copy = TRANSLATIONS[locale]?.pages?.[slug]
  if (!copy) return base
  return {
    ...base,
    ...copy,
    slug: base.slug,
    related: base.related,
    screenshot: base.screenshot && copy.screenshot ? { ...base.screenshot, ...copy.screenshot, src: base.screenshot.src, width: base.screenshot.width, height: base.screenshot.height } : base.screenshot,
  }
}

export const localePrefix = (locale: string) => (locale === 'en' ? '' : `/${locale}`)
