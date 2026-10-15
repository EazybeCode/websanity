// Split approved-home.css into a render-blocking critical part (hero/nav/global)
// and an async rest (below-fold sections). Preserves internal order of each part;
// @media/@supports wrappers are re-emitted per part.
const fs = require('fs')
const SRC = 'C:/Users/VIKASH/websanity/public/homepage/approved-home.css'
const css = fs.readFileSync(SRC, 'utf8')

// Markers for below-fold sections (classes/ids used only there)
const BELOW = /#phones|#insights|#agents|#integrations|#automation|#security|#faq\b|\.u19[4-6]-|u195-|u196-|\.s199|\.s198|\.oz-|\.a20\d|\.m22\d|\.ill-|\.sla-|\.meta-(?!theme)|restored-extra|outreach|scene-eyebrow|\.chapter|sales-story|sales-heading|crm-picker|c209-|agent-|handoff|sync-row|u194|conversation-story|section-reveal|trust-stat|\.faq|\.together\b|crm-section|logo-cloud|ref-agent|b220-|corner-|motion-piece|\.problem|mp-|problem-product/
// Markers that force critical regardless (hero/nav/global/base)
const ABOVE = /#home\b|hero|#section-tabs|section-nav|\bnav\b|compat-|#companies|logo-lane|logo-track|company-logo|page-frame|page-section|:root|\bhtml\b|\bbody\b|#eazybe-system337\s*$|#eazybe-system337\s*\{|\.wrap\b|co-hero|channel/

function classify(selector) {
  if (ABOVE.test(selector)) return 'crit'
  if (BELOW.test(selector)) return 'rest'
  return 'crit'
}

// tokenize top-level blocks
let i = 0
const out = { crit: [], rest: [] }
function readBlock(start) {
  // returns [endIndexAfterCloseBrace]
  let depth = 0, j = start
  while (j < css.length) {
    const ch = css[j]
    if (ch === '{') depth++
    else if (ch === '}') { depth--; if (depth === 0) return j + 1 }
    j++
  }
  return css.length
}
while (i < css.length) {
  // skip whitespace/comments
  const ws = css.slice(i).match(/^\s+/)
  if (ws) { i += ws[0].length; continue }
  if (css.startsWith('/*', i)) { const e = css.indexOf('*/', i); i = e === -1 ? css.length : e + 2; continue }
  const braceIdx = css.indexOf('{', i)
  if (braceIdx === -1) break
  const header = css.slice(i, braceIdx).trim()
  if (header.startsWith('@media') || header.startsWith('@supports')) {
    const end = readBlock(braceIdx)
    const inner = css.slice(braceIdx + 1, end - 1)
    // split inner rules
    const parts = { crit: [], rest: [] }
    let k = 0
    while (k < inner.length) {
      const w = inner.slice(k).match(/^\s+/)
      if (w) { k += w[0].length; continue }
      if (inner.startsWith('/*', k)) { const e = inner.indexOf('*/', k); k = e === -1 ? inner.length : e + 2; continue }
      const b = inner.indexOf('{', k)
      if (b === -1) break
      const sel = inner.slice(k, b).trim()
      // nested at-rule inside media (keyframes etc) — atomic
      let endInner
      if (sel.startsWith('@')) {
        let depth = 0, j2 = b
        while (j2 < inner.length) { if (inner[j2] === '{') depth++; else if (inner[j2] === '}') { depth--; if (!depth) { j2++; break } } j2++ }
        endInner = j2
        parts.crit.push(inner.slice(k, endInner))
      } else {
        endInner = inner.indexOf('}', b) + 1
        parts[classify(sel)].push(inner.slice(k, endInner))
      }
      k = endInner
    }
    for (const key of ['crit', 'rest']) if (parts[key].length) out[key].push(header + '{' + parts[key].join('') + '}')
    i = end
    continue
  }
  if (header.startsWith('@')) { // keyframes, font-face, import, etc -> critical, atomic
    const end = header.startsWith('@import') || header.startsWith('@charset') ? css.indexOf(';', i) + 1 : readBlock(braceIdx)
    out.crit.push(css.slice(i, end))
    i = end
    continue
  }
  const end = css.indexOf('}', braceIdx) + 1
  out[classify(header)].push(css.slice(i, end))
  i = end
}

const crit = out.crit.join('\n')
const rest = out.rest.join('\n')
fs.writeFileSync('C:/Users/VIKASH/websanity/public/homepage/approved-home-critical.css', crit)
fs.writeFileSync('C:/Users/VIKASH/websanity/public/homepage/approved-home-rest.css', rest)
console.log('critical:', (crit.length / 1024).toFixed(0), 'KiB | rest:', (rest.length / 1024).toFixed(0), 'KiB | total in:', (css.length / 1024).toFixed(0), 'KiB')
