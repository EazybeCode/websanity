/**
 * Quick Answer renderer. The Studio field is now Portable Text (paragraphs,
 * bullet lists, bold/italic, links); older documents still hold a raw
 * HTML/plain string. Both arrive here and leave as an HTML string for the
 * existing `dangerouslySetInnerHTML` slot, whose Tailwind selectors style
 * `<p>`, `<ul>`, `<li>` directly.
 */

interface QaSpan {
  _type?: string
  text?: string
  marks?: string[]
}

interface QaMarkDef {
  _key: string
  _type?: string
  href?: string
  openInNewTab?: boolean
}

export interface QuickAnswerBlock {
  _type?: string
  style?: string
  listItem?: string
  children?: QaSpan[]
  markDefs?: QaMarkDef[]
}

export type QuickAnswerValue = string | QuickAnswerBlock[] | null | undefined

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function spanToHtml(span: QaSpan, defs: QaMarkDef[]): string {
  let html = escapeHtml(span.text ?? '')
  for (const mark of span.marks ?? []) {
    if (mark === 'strong') html = `<strong>${html}</strong>`
    else if (mark === 'em') html = `<em>${html}</em>`
    else {
      const def = defs.find((d) => d._key === mark)
      if (def?.href) {
        const target = def.openInNewTab ? ' target="_blank" rel="noopener noreferrer"' : ''
        html = `<a href="${escapeHtml(def.href)}"${target} class="text-brand-cyan hover:underline">${html}</a>`
      }
    }
  }
  return html
}

export function quickAnswerToHtml(value: QuickAnswerValue): string {
  if (!value) return ''
  if (typeof value === 'string') return value // legacy documents: stored HTML/plain text
  const out: string[] = []
  let listOpen = false
  for (const block of value) {
    if (block._type !== 'block' || !block.children?.length) continue
    const inner = block.children.map((c) => spanToHtml(c, block.markDefs ?? [])).join('')
    if (!inner.trim()) continue
    if (block.listItem === 'bullet') {
      if (!listOpen) {
        out.push('<ul>')
        listOpen = true
      }
      out.push(`<li>${inner}</li>`)
    } else {
      if (listOpen) {
        out.push('</ul>')
        listOpen = false
      }
      out.push(`<p>${inner}</p>`)
    }
  }
  if (listOpen) out.push('</ul>')
  return out.join('')
}
