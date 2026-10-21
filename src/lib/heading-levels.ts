type HeadingCandidate = { _type?: string; _key?: string; style?: string }

/**
 * Map each heading block's _key to the HTML level it should render as, so the
 * document outline never skips a level (an editor's h4 straight after an h2
 * becomes an <h3>). The page title is the <h1>, so body headings start at h2.
 * Only the tag changes — callers keep the editor's styling for the original style.
 */
export function computeHeadingLevels(content: readonly HeadingCandidate[] | undefined): Map<string, number> {
  const levels = new Map<string, number>()
  let previous = 1
  for (const block of Array.isArray(content) ? content : []) {
    const match = block?._type === 'block' && typeof block.style === 'string' ? /^h([1-6])$/.exec(block.style) : null
    if (!match || !block._key) continue
    const level = Math.min(Number(match[1]), previous + 1)
    levels.set(block._key, level)
    previous = level
  }
  return levels
}
