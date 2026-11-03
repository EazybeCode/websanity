import type { CallingCard, CallingPageContent, CallingTable } from './calling-content.ts'

/** A published callingPage document from Sanity. Any field may be missing. */
export interface CallingPageDoc {
  title?: string
  metaTitle?: string
  metaDescription?: string
  ogTitle?: string
  ogDescription?: string
  twitterTitle?: string
  twitterDescription?: string
  hero?: Partial<CallingPageContent['hero']>
  mock?: Partial<CallingPageContent['mock']>
  answer?: Partial<CallingPageContent['answer']>
  how?: Partial<CallingPageContent['how']>
  features?: Partial<CallingPageContent['features']>
  table?: {
    h2?: string
    subtitle?: string
    head?: string[]
    rows?: { col1?: string; col2?: string; col3?: string }[]
    verdict?: CallingCard[]
  }
  useCases?: Partial<CallingPageContent['useCases']>
  record?: Partial<CallingPageContent['record']>
  pricing?: Partial<CallingPageContent['pricing']>
  screenshot?: { h2?: string; alt?: string; caption?: string }
  faqIntro?: string
  faq?: { q: string; a: string }[]
}

const list = <T,>(value: T[] | null | undefined, fallback: T[]): T[] => (value?.length ? value : fallback)
const text = (value: string | null | undefined, fallback: string): string => value || fallback

function toTable(doc: CallingPageDoc['table'], base: CallingTable | undefined): CallingTable | undefined {
  if (!base) return undefined
  const head = doc?.head?.length === 3 ? (doc.head as CallingTable['head']) : base.head
  return {
    ...base,
    h2: text(doc?.h2, base.h2),
    subtitle: text(doc?.subtitle, base.subtitle),
    head,
    rows: doc?.rows?.length ? doc.rows.map((r) => [r.col1 ?? '', r.col2 ?? '', r.col3 ?? ''] as [string, string, string]) : base.rows,
    verdict: list(doc?.verdict, base.verdict ?? []).length ? list(doc?.verdict, base.verdict ?? []) : base.verdict,
  }
}

/** Copy from a published document over the code copy. Slugs, related links and image files always come from the code. */
export function docToCallingPage(doc: CallingPageDoc, base: CallingPageContent): CallingPageContent {
  return {
    ...base,
    navLabel: text(doc.title, base.navLabel),
    meta: {
      title: text(doc.metaTitle, base.meta.title),
      description: text(doc.metaDescription, base.meta.description),
      og: { title: text(doc.ogTitle, base.meta.og.title), description: text(doc.ogDescription, base.meta.og.description) },
      twitter: { title: text(doc.twitterTitle, base.meta.twitter.title), description: text(doc.twitterDescription, base.meta.twitter.description) },
    },
    hero: {
      tag: text(doc.hero?.tag, base.hero.tag),
      h1Lead: text(doc.hero?.h1Lead, base.hero.h1Lead),
      h1Em: text(doc.hero?.h1Em, base.hero.h1Em),
      subtitle: text(doc.hero?.subtitle, base.hero.subtitle),
      chips: list(doc.hero?.chips, base.hero.chips),
    },
    mock: { title: text(doc.mock?.title, base.mock.title), rows: list(doc.mock?.rows, base.mock.rows) },
    answer: { h2: text(doc.answer?.h2, base.answer.h2), paragraphs: list(doc.answer?.paragraphs, base.answer.paragraphs) },
    how: { h2: text(doc.how?.h2, base.how.h2), subtitle: text(doc.how?.subtitle, base.how.subtitle), steps: list(doc.how?.steps, base.how.steps) },
    features: {
      h2: text(doc.features?.h2, base.features.h2),
      h2Em: text(doc.features?.h2Em, base.features.h2Em),
      subtitle: text(doc.features?.subtitle, base.features.subtitle),
      cards: list(doc.features?.cards, base.features.cards),
    },
    table: toTable(doc.table, base.table),
    useCases: { h2: text(doc.useCases?.h2, base.useCases.h2), subtitle: text(doc.useCases?.subtitle, base.useCases.subtitle), cards: list(doc.useCases?.cards, base.useCases.cards) },
    record: { h2: text(doc.record?.h2, base.record.h2), body: text(doc.record?.body, base.record.body), points: list(doc.record?.points, base.record.points) },
    pricing: { h2: text(doc.pricing?.h2, base.pricing.h2), body: text(doc.pricing?.body, base.pricing.body) },
    screenshot: base.screenshot && {
      ...base.screenshot,
      h2: text(doc.screenshot?.h2, base.screenshot.h2),
      alt: text(doc.screenshot?.alt, base.screenshot.alt),
      caption: text(doc.screenshot?.caption, base.screenshot.caption),
    },
    faqIntro: text(doc.faqIntro, base.faqIntro),
    faq: list(doc.faq, base.faq),
  }
}
