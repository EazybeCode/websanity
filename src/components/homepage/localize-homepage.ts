import { load } from 'cheerio'
import source from './approved-markup.json'
import translations from './translations.json'

export function getHomepageContent(locale: string) {
  const dictionary: Record<string, string> = translations[locale as keyof typeof translations] ?? {}
  if (locale === 'en') return { markup: source, dictionary }
  const $ = load(source, {}, false)
  const translate = (value: string) => {
    const key = value.trim()
    return dictionary[key] ? value.replace(key, dictionary[key]) : value
  }
  $('*').contents().each((_, node) => {
    if (node.type === 'text') node.data = translate(node.data)
  })
  $('*').each((_, element) => {
    for (const attribute of ['alt', 'aria-label', 'title', 'data-crm-view']) {
      const value = $(element).attr(attribute)
      if (value) $(element).attr(attribute, translate(value))
    }
  })
  // Sentence case is natural in these locales; avoid English title-case CSS.
  $('h1, h2, h3').each((_, element) => {
    $(element).attr('style', `${$(element).attr('style') ?? ''};text-transform:none!important`)
  })
  // Keep navigation anchors and assets stable; forms inherit next-intl's locale.
  return { markup: $.html(), dictionary }
}
