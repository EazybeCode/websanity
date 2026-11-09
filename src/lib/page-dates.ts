import type { Metadata } from 'next'
import { sanityClient } from '@/lib/sanity'
// Git dates of code-built pages. Kept current by the pre-commit hook
// (.githooks/pre-commit runs: node scripts/sitemap-lastmod.mjs --staged).
import CODE_DATES from '@/data/page-dates.json'

export interface PageDateInfo {
  /** ISO 8601 */
  published: string
  /** ISO 8601, never earlier than published */
  modified: string
}

export interface DocDates {
  publishedAt?: string | null
  createdAt?: string | null
  updatedAt?: string | null
}

const iso = (d?: string | null) => (d && !Number.isNaN(Date.parse(d)) ? new Date(d).toISOString() : undefined)
const pick = (dates: Array<string | undefined>, newest: boolean) => {
  const valid = (dates.filter(Boolean) as string[]).sort((a, b) => Date.parse(a) - Date.parse(b))
  return newest ? valid.at(-1) : valid[0]
}

/**
 * Published and last-modified dates of a page, from real sources only:
 * - `page`: a code-built page key in page-dates.json. Gives both dates (first
 *   git commit of the route, last commit of the route and its imports).
 * - `template`: a shared template key (e.g. '/integration-page'). Counts only
 *   towards modified, since one template renders pages published at other times.
 * - `doc`: the Sanity document behind the page (publishedAt / _createdAt / _updatedAt),
 *   so edits made in Sanity move the modified date without a deploy.
 * Published is the earliest date, modified the newest.
 */
export function pageDates({ page, template, doc }: { page?: string; template?: string; doc?: DocDates | null }): PageDateInfo | null {
  const code = CODE_DATES as Record<string, { published: string; modified: string }>
  const docPublished = iso(doc?.publishedAt) ?? iso(doc?.createdAt)
  const published = pick([page ? code[page]?.published : undefined, docPublished], false)
  const modified = pick(
    [page ? code[page]?.modified : undefined, template ? code[template]?.modified : undefined, iso(doc?.updatedAt), docPublished],
    true
  )
  if (!published || !modified) return null
  return { published, modified: Date.parse(modified) < Date.parse(published) ? published : modified }
}

/** The same date meta tags blog posts carry: article:published_time / article:modified_time. */
export function withPageDates(metadata: Metadata, dates: PageDateInfo | null): Metadata {
  if (!dates) return metadata
  return {
    ...metadata,
    other: {
      ...((metadata.other ?? {}) as Record<string, string | number | (string | number)[]>),
      'article:published_time': dates.published,
      'article:modified_time': dates.modified,
    },
  }
}

const SANITY_LANG: Record<string, string> = { en: 'en', es: 'es', br: 'pt-BR', tr: 'tr' }

/**
 * _createdAt / _updatedAt of the published Sanity document behind a page, for
 * this locale (falling back to the English document), like the sitemap does.
 */
export async function getSanityDocDates(type: string, locale: string, slug?: string): Promise<DocDates | null> {
  try {
    const docs: Array<{ language?: string; createdAt: string; updatedAt: string }> =
      (await sanityClient.fetch(
        `*[_type == $type && !(_id in path("drafts.**")) ${slug ? '&& slug.current == $slug' : ''}]{ language, "createdAt": _createdAt, "updatedAt": _updatedAt }`,
        { type, slug: slug ?? null }
      )) ?? []
    const lang = SANITY_LANG[locale] ?? locale
    return docs.find((d) => d.language === lang) ?? docs.find((d) => d.language === 'en') ?? docs[0] ?? null
  } catch {
    return null
  }
}
