import { load } from 'cheerio'
import source from './markup.json'
import translations from './translations.json'

type Dictionary = Record<string, string>

/** Strings the page script writes at runtime (not present in the markup). */
export type V16Labels = {
  more: string
  syncPaused: string
  privateLocked: string
}

const LABELS: Record<string, V16Labels> = {
  en: {
    more: 'More',
    syncPaused: 'Paused: nothing syncs until you turn it back on',
    privateLocked: 'Always off. Eazybe never syncs personal chats.',
  },
  br: {
    more: 'Mais',
    syncPaused: 'Pausado: nada sincroniza até você ativar de novo',
    privateLocked: 'Sempre desligado. A Eazybe nunca sincroniza conversas pessoais.',
  },
  es: {
    more: 'Más',
    syncPaused: 'En pausa: nada se sincroniza hasta que lo vuelvas a activar',
    privateLocked: 'Siempre desactivado. Eazybe nunca sincroniza chats personales.',
  },
  tr: {
    more: 'Daha fazla',
    syncPaused: 'Duraklatıldı: tekrar açana kadar hiçbir şey senkronize edilmez',
    privateLocked: 'Her zaman kapalı. Eazybe kişisel sohbetleri asla senkronize etmez.',
  },
}

// Attributes that carry visible or accessible copy (data-role / data-desc feed the
// security panel's access-level menu).
const ATTRIBUTES = ['alt', 'aria-label', 'title', 'placeholder', 'data-role', 'data-desc']

/**
 * The v16 homepage markup for a locale. English is the design source; other locales
 * swap every text node / copy attribute through translations.json (keys are the
 * trimmed English strings, so surrounding whitespace is preserved).
 */
export function getV16Content(locale: string): { markup: string; labels: V16Labels } {
  const labels = LABELS[locale] ?? LABELS.en
  const dictionary: Dictionary = (translations as Record<string, Dictionary>)[locale] ?? {}
  if (locale === 'en' || !Object.keys(dictionary).length) return { markup: source, labels }

  const $ = load(source, {}, false)
  const translate = (value: string) => {
    const key = value.trim()
    const hit = dictionary[key]
    return hit ? value.replace(key, hit) : value
  }
  $('*')
    .contents()
    .each((_, node) => {
      if (node.type === 'text') node.data = translate(node.data)
    })
  $('*').each((_, element) => {
    for (const attribute of ATTRIBUTES) {
      const value = $(element).attr(attribute)
      if (value) $(element).attr(attribute, translate(value))
    }
  })
  // Internal page links (e.g. "Explore outreach" -> /whatsapp-api/broadcast) go to
  // the same locale's page; in-page anchors and external URLs are left alone.
  $('a[href^="/"]').each((_, element) => {
    const href = $(element).attr('href')!
    if (!href.startsWith('//') && !href.startsWith(`/${locale}/`)) $(element).attr('href', `/${locale}${href}`)
  })
  return { markup: $.html(), labels }
}

/**
 * The FAQ exactly as the locale's page renders it (#faq-list), so the FAQPage
 * JSON-LD can never drift from the visible questions and answers.
 */
export function getV16Faq(locale: string): { question: string; answer: string }[] {
  const $ = load(getV16Content(locale).markup, {}, false)
  return $('#faq-list details')
    .toArray()
    .map((item) => ({
      question: $(item).find('.fq-q').text().trim(),
      answer: $(item)
        .children('p')
        .toArray()
        .map((p) => $(p).text().trim())
        .join(' '),
    }))
    .filter((entry) => entry.question && entry.answer)
}
