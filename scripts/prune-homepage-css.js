// Remove selectors referencing class/id tokens that exist nowhere in the homepage
// markup/scripts. Comma lists are pruned per-selector; rules and @media blocks that
// end up empty are dropped. Writes approved-home.css in place.
const fs = require('fs')
const base = 'C:/Users/VIKASH/websanity'
const haystack = [
  '/src/components/homepage/approved-markup.json',
  '/src/components/homepage/approved-interactions.js',
  '/src/components/homepage/initialize-homepage.ts',
  '/src/components/homepage/site-integration.css',
].map((p) => fs.readFileSync(base + p, 'utf8')).join('\n')

const SRC = base + '/public/homepage/approved-home.css'
const css = fs.readFileSync(SRC, 'utf8')

const cache = new Map()
const exists = (t) => { if (!cache.has(t)) cache.set(t, haystack.includes(t)); return cache.get(t) }

// split a selector list on top-level commas
function splitSelectors(list) {
  const out = []; let depth = 0, cur = ''
  for (const ch of list) {
    if (ch === '(' || ch === '[') depth++
    else if (ch === ')' || ch === ']') depth--
    if (ch === ',' && depth === 0) { out.push(cur); cur = '' } else cur += ch
  }
  if (cur.trim()) out.push(cur)
  return out
}
function selectorAlive(sel) {
  // Evaluate :is()/:where()/:not() groups separately: a group is satisfied if
  // ANY comma-separated arm has all its tokens present (:not() always passes —
  // absence of a token inside :not just means the negation always holds).
  let rest = ''
  let i = 0
  while (i < sel.length) {
    const m = sel.slice(i).match(/^:(is|where|not)\(/)
    if (m) {
      let depth = 1, j = i + m[0].length, start = j
      while (j < sel.length && depth) { if (sel[j] === '(') depth++; else if (sel[j] === ')') depth--; j++ }
      const body = sel.slice(start, j - 1)
      if (m[1] !== 'not') {
        const arms = splitSelectors(body)
        const anyAlive = arms.some((a) => [...new Set([...a.matchAll(/[.#]([A-Za-z_][A-Za-z0-9_-]*)/g)].map((x) => x[1]))].every((t) => exists(t)))
        if (!anyAlive) return false
      }
      i = j
      continue
    }
    rest += sel[i]
    i++
  }
  const toks = [...new Set([...rest.matchAll(/[.#]([A-Za-z_][A-Za-z0-9_-]*)/g)].map((x) => x[1]))]
  return toks.every((t) => exists(t))
}
function pruneRules(block) {
  let out = '', i = 0
  while (i < block.length) {
    const ws = block.slice(i).match(/^\s+/); if (ws) { i += ws[0].length; continue }
    if (block.startsWith('/*', i)) { const e = block.indexOf('*/', i); i = e === -1 ? block.length : e + 2; continue }
    const b = block.indexOf('{', i); if (b === -1) break
    const header = block.slice(i, b).trim()
    if (header.startsWith('@media') || header.startsWith('@supports')) {
      let depth = 0, j = b
      while (j < block.length) { if (block[j] === '{') depth++; else if (block[j] === '}') { depth--; if (!depth) { j++; break } } j++ }
      const inner = pruneRules(block.slice(b + 1, j - 1))
      if (inner.trim()) out += header + '{' + inner + '}\n'
      i = j; continue
    }
    if (header.startsWith('@')) { // keyframes/font-face/etc: keep atomically
      if (header.startsWith('@import') || header.startsWith('@charset')) { const e = block.indexOf(';', i) + 1; out += block.slice(i, e) + '\n'; i = e; continue }
      let depth = 0, j = b
      while (j < block.length) { if (block[j] === '{') depth++; else if (block[j] === '}') { depth--; if (!depth) { j++; break } } j++ }
      out += block.slice(i, j) + '\n'; i = j; continue
    }
    const e = block.indexOf('}', b) + 1
    const decls = block.slice(b + 1, e - 1)
    // keyframe steps inside @keyframes never reach here (handled atomically above)
    const kept = splitSelectors(header).filter((s) => selectorAlive(s))
    if (kept.length) out += kept.join(',') + '{' + decls + '}\n'
    i = e
  }
  return out
}

const pruned = pruneRules(css)
fs.writeFileSync(SRC, pruned)
console.log('before:', (css.length / 1024).toFixed(0), 'KiB | after:', (pruned.length / 1024).toFixed(0), 'KiB | removed:', ((css.length - pruned.length) / 1024).toFixed(0), 'KiB')
