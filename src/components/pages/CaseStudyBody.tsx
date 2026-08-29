import type { ReactNode } from 'react'
import { Fragment } from 'react'
import { urlFor } from '@/lib/sanity'

/**
 * Minimal server-side renderer for caseStudy portable text bodies, styled with
 * the lka-* article classes. Handles: block (normal/h2/h3/blockquote, bullet +
 * number lists, strong/em/link marks), table, callout, quote and image blocks.
 */

type Span = { _key: string; text?: string; marks?: string[] }
type MarkDef = { _key: string; href?: string; openInNewTab?: boolean }
export interface PtBlock {
  _key: string
  _type: string
  style?: string
  listItem?: string
  children?: Span[]
  markDefs?: MarkDef[]
  // table
  headers?: string[]
  rows?: { _key: string; cells?: string[] }[]
  // callout / quote
  content?: PtBlock[]
  text?: string
  // image
  asset?: { _ref?: string }
  alt?: string
  caption?: string
}

export function slugifyHeading(text: string): string {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').slice(0, 64)
}

/** The h2 headings of a body, for the "in this article" navigation. */
export function caseStudyToc(body: PtBlock[]): { id: string; label: string }[] {
  return (body ?? [])
    .filter((b) => b._type === 'block' && b.style === 'h2')
    .map((b) => {
      const label = (b.children ?? []).map((s) => s.text ?? '').join('')
      return { id: slugifyHeading(label), label }
    })
}

function renderSpans(block: PtBlock): ReactNode {
  const defs = new Map((block.markDefs ?? []).map((d) => [d._key, d]))
  return (block.children ?? []).map((s) => {
    let node: ReactNode = s.text ?? ''
    for (const mark of s.marks ?? []) {
      if (mark === 'strong') node = <strong>{node}</strong>
      else if (mark === 'em') node = <em>{node}</em>
      else {
        const def = defs.get(mark)
        if (def?.href) {
          node = (
            <a
              href={def.href}
              target={def.openInNewTab ? '_blank' : undefined}
              rel={def.openInNewTab ? 'noopener noreferrer' : undefined}
            >
              {node}
            </a>
          )
        }
      }
    }
    return <Fragment key={s._key}>{node}</Fragment>
  })
}

function renderBlocks(body: PtBlock[]): ReactNode[] {
  const out: ReactNode[] = []
  let list: { type: string; items: PtBlock[] } | null = null

  const flushList = () => {
    if (!list) return
    const Tag = list.type === 'number' ? 'ol' : 'ul'
    out.push(
      <Tag key={`list-${list.items[0]._key}`}>
        {list.items.map((b) => <li key={b._key}>{renderSpans(b)}</li>)}
      </Tag>,
    )
    list = null
  }

  for (const b of body ?? []) {
    if (b._type === 'block' && b.listItem) {
      if (!list || list.type !== b.listItem) {
        flushList()
        list = { type: b.listItem, items: [] }
      }
      list.items.push(b)
      continue
    }
    flushList()

    if (b._type === 'block') {
      const style = b.style ?? 'normal'
      if (style === 'h2') {
        const label = (b.children ?? []).map((s) => s.text ?? '').join('')
        out.push(<h2 key={b._key} id={slugifyHeading(label)}>{renderSpans(b)}</h2>)
      } else if (style === 'h3') {
        out.push(<h3 key={b._key}>{renderSpans(b)}</h3>)
      } else if (style === 'blockquote') {
        out.push(<blockquote key={b._key} className="lka-cms-quote">{renderSpans(b)}</blockquote>)
      } else {
        out.push(<p key={b._key}>{renderSpans(b)}</p>)
      }
    } else if (b._type === 'table') {
      out.push(
        <div key={b._key} className="lka-table-wrap">
          <table className="lka-table">
            {b.headers?.length ? (
              <thead>
                <tr>{b.headers.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr>
              </thead>
            ) : null}
            <tbody>
              {(b.rows ?? []).map((r) => (
                <tr key={r._key}>
                  {(r.cells ?? []).map((c, i) => <td key={i}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      )
    } else if (b._type === 'callout' || b._type === 'quote') {
      out.push(
        <div key={b._key} className="lka-cms-callout">
          {b.content ? renderBlocks(b.content) : b.text ?? null}
        </div>,
      )
    } else if (b._type === 'image' && b.asset) {
      out.push(
        <figure key={b._key} className="lka-cms-figure">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={urlFor(b).width(1440).url()} alt={b.alt ?? ''} loading="lazy" />
          {b.caption && <figcaption>{b.caption}</figcaption>}
        </figure>,
      )
    }
  }
  flushList()
  return out
}

export function CaseStudyBody({ body }: { body: PtBlock[] }) {
  return <>{renderBlocks(body)}</>
}

/** Rough read time from the body's span text, 220 wpm like the blog. */
export function caseStudyReadMinutes(body: PtBlock[]): number {
  let words = 0
  const walk = (blocks: PtBlock[]) => {
    for (const b of blocks ?? []) {
      for (const s of b.children ?? []) words += (s.text ?? '').split(/\s+/).filter(Boolean).length
      if (b.content) walk(b.content)
      for (const r of b.rows ?? []) for (const c of r.cells ?? []) words += c.split(/\s+/).filter(Boolean).length
    }
  }
  walk(body)
  return Math.max(1, Math.round(words / 220))
}
