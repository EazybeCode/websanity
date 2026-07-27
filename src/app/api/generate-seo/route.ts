import { NextRequest, NextResponse } from 'next/server'

// Server-side SEO & Discovery generator. The Sanity Studio document action POSTs
// { title, slug, locale, altText, bodyExcerpt, section } here; we call Claude
// (with web search for locale SERP research) and return the SEO JSON. The key
// lives on the server (ANTHROPIC_API_KEY) so it never reaches the browser.
//
// Reached from the Studio (a different origin) via the /track/generate-seo
// rewrite — the production nginx sends /api/* to a dead upstream, same reason
// /track/views exists. CORS below allows the Studio origins.

export const runtime = 'nodejs'
export const maxDuration = 300 // web search + generation can take a while

const MODEL = 'claude-sonnet-4-6'

const ALLOWED_ORIGINS = new Set([
  'http://localhost:3333',
  'https://eazybe.sanity.studio',
])

function corsHeaders(origin: string | null): Record<string, string> {
  const allow = origin && ALLOWED_ORIGINS.has(origin) ? origin : 'https://eazybe.sanity.studio'
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  }
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req.headers.get('origin')) })
}

// Fold every field value to plain ASCII (no accents / special letters), in all
// locales. NFD strips combining marks (á→a, ü→u, ç→c, ş→s, ğ→g); the pre-map
// handles base letters NFD does not decompose (Turkish dotless ı, İ, etc.).
const ASCII_MAP: Record<string, string> = {
  ı: 'i', İ: 'I', ł: 'l', Ł: 'L', ø: 'o', Ø: 'O', đ: 'd', Đ: 'D',
  æ: 'ae', Æ: 'AE', œ: 'oe', Œ: 'OE', ß: 'ss',
}
function toAscii(s: string): string {
  const mapped = s
    .replace(/[ıİłŁøØđĐæÆœŒß]/g, (ch) => ASCII_MAP[ch] || ch)
    .normalize('NFD')
    .replace(/\p{Mn}/gu, '')
    .normalize('NFC')
  // Fold common typographic punctuation; drop any other non-ASCII.
  const PUNCT: Record<number, string> = {
    0x2012: '-', 0x2013: '-', 0x2014: '-', 0x2015: '-',
    0x2018: "'", 0x2019: "'", 0x201a: "'", 0x201b: "'",
    0x201c: '"', 0x201d: '"', 0x201e: '"', 0x00ab: '"', 0x00bb: '"',
    0x2026: '...', 0x00a0: ' ', 0x2022: ' ', 0x00b7: ' ',
    0x20ac: 'EUR', 0x00a1: '', 0x00bf: '',
  }
  let out = ''
  for (const ch of mapped) {
    const c = ch.codePointAt(0) as number
    if (c <= 0x7f) out += ch
    else if (PUNCT[c] !== undefined) out += PUNCT[c]
  }
  return out
}
function asciiDeep(v: any): any {
  if (typeof v === 'string') return toAscii(v)
  if (Array.isArray(v)) return v.map(asciiDeep)
  if (v && typeof v === 'object') {
    const out: any = {}
    for (const k of Object.keys(v)) out[k] = asciiDeep(v[k])
    return out
  }
  return v
}

// Trim to a max length at a word boundary — the model does not reliably respect
// the character limits, so we enforce them here.
function capAtWord(str: unknown, max: number): string {
  if (!str) return ''
  const s = String(str).trim()
  if (s.length <= max) return s
  const cut = s.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trim()
}

const SEO_PROMPT = `You are an SEO specialist generating the "🔍 SEO & Discovery" field group for Eazybe (eazybe.com), a no-code WhatsApp AI Agent + CRM product for sales and support teams (integrates HubSpot, Zoho, Salesforce, Pipedrive, Bitrix24).

You receive JSON: { title, slug, locale, altText, bodyExcerpt, section }.
Return ONE JSON object. No markdown fences, no preamble, no commentary.

=== STEP 1: SERP RESEARCH (do this first) ===
Use web_search to check, in the target locale's language:
- How the topic is actually phrased in search (native word order, not translated English)
- 2-3 competing page titles currently ranking
- Whether a plural/singular or "best/top" variant dominates
Use these findings to choose the keyword phrasing. Do not report the research — apply it silently.

=== STEP 2: WRITE THE FIELDS ===

HARD CHARACTER LIMITS — count before returning, truncate/rewrite if over:
- metaTitle, ogTitle, twitterTitle: MAX 60 characters
- metaDescription, ogDescription, twitterDescription: MAX 160 characters

metaTitle: primary keyword in the first 3 words. Add [2026] only if it fits under 60.
metaDescription: pain-point or curiosity hook -> concrete benefit (use a real stat from bodyExcerpt if present) -> native CTA. End as a complete sentence.
twitterDescription: different angle from metaDescription, not a copy.

LOCALE MAP (use the "locale" input):
en -> languageCode en, countryCode us, ogLocale en_US, pageType "Learn - Blog - {Guide|Comparison}"
es -> languageCode es, countryCode es, ogLocale es_ES, pageType "Aprender - Blog - {Guía|Comparación}"
br -> languageCode pt, countryCode br, ogLocale pt_BR, pageType "Aprender - Blog - {Guia|Comparação}"
tr -> languageCode tr, countryCode tr, ogLocale tr_TR, pageType "Öğren - Blog - {Rehber|Karşılaştırma}"
If section is "comparison", use instead:
es "Comparar - Comparación - Alternativa" · br "Comparar - Comparação - Alternativa" · tr "Karşılaştır - Karşılaştırma - Alternatif"

FIXED / DERIVED:
- siteSection = the "section" input verbatim ("blog" or "comparison")
- primaryTaxonomyEn = ALWAYS English, identical across all locales of the same article (e.g. "WhatsApp Sales", "DoubleTick Alternative", "AI Agents", "WhatsApp Coexistence")
- ogImageAlt and twitterImageAlt = derived from the altText input; describe the image, never restate the title
- twitterData1 = content type in the target language (Guide/Guía/Guia/Rehber)
- twitterData2 = the topic in the target language

LANGUAGE RULES:
- Write ALL field values in ASCII only — no accents or special characters. Use "Precos" not "Preços", "Guia" not "Guía", "Fiyatlari" not "Fiyatları", and plain i s g u o c for Turkish ı ş ğ ü ö ç.
- Never translate: Eazybe, WhatsApp, Meta, HubSpot, Zoho, Salesforce, Pipedrive, Bitrix24, DoubleTick, QuickReply, Coexistence, Cloud API, CRM.
- "AI" -> "IA" in es and br; "yapay zeka" in tr (generic concept only; keep "AI" inside branded product names).
- Translate for meaning in native grammar, never word-for-word. Spanish/Portuguese cannot stack nouns (write "Costo de X", not "X costo"). Turkish is head-final (the head noun goes last).
- Native CTAs only: ¡Descubre! ¡Compara hoy! ¡Míralo ya! · Confira já! Saiba mais! Venda mais já! · Hemen keşfedin! İnceleyin! Şimdi görün!
- conversationalQuery: 5-6 real questions as typed in that language (¿Cuánto cuesta...?, Quanto custa...?, ...ne kadar?, ...nedir?). Comma-separated string.

CONTENT RULES:
- Every field must describe THIS page. Never invent content or carry over anything generic.
- Weave real numbers and differentiators from bodyExcerpt into descriptions for specificity.
- keywords: 8 items, array of strings, in the target language, ordered by search value.
- userProblem / solutionSummary / primaryBenefit / useCase: written from the reader's situation, not product marketing.

=== OUTPUT SHAPE ===
{
  "metaTitle": "", "metaDescription": "", "keywords": [],
  "languageCode": "", "countryCode": "", "searchTitle": "", "focusArea": "",
  "primaryTaxonomyEn": "", "siteSection": "", "primaryTopic": "", "pageType": "",
  "ogTitle": "", "ogDescription": "", "ogImageAlt": "", "ogLocale": "",
  "twitterTitle": "", "twitterDescription": "", "twitterImageAlt": "",
  "twitterData1": "", "twitterData2": "",
  "answerType": "", "targetAudience": "", "contentIntent": "",
  "conversationalQuery": "", "aiReadability": "", "contextWindow": "",
  "userProblem": "", "solutionSummary": "", "primaryBenefit": "",
  "useCase": "", "implementationDifficulty": "", "timeToValue": ""
}

Return only this JSON object.`

async function callClaude(apiKey: string, input: unknown): Promise<any> {
  const body = {
    model: MODEL,
    max_tokens: 8000,
    tools: [{ type: 'web_search_20260209', name: 'web_search', max_uses: 4 }],
    system: SEO_PROMPT,
    messages: [{ role: 'user', content: JSON.stringify(input) }],
  }
  // Retry a few times on transient overload (529).
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    if (data?.error?.type === 'overloaded_error' && attempt < 3) {
      await new Promise((r) => setTimeout(r, 6000 * (attempt + 1)))
      continue
    }
    return data
  }
}

export async function POST(req: NextRequest) {
  const cors = corsHeaders(req.headers.get('origin'))
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY is not set on the server.' }, { status: 500, headers: cors })
  }

  let input: any
  try {
    input = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400, headers: cors })
  }
  if (!input?.title || !input?.locale) {
    return NextResponse.json({ error: 'title and locale are required.' }, { status: 400, headers: cors })
  }

  try {
    const data = await callClaude(apiKey, {
      title: input.title,
      slug: input.slug || '',
      locale: input.locale,
      altText: input.altText || '',
      bodyExcerpt: (input.bodyExcerpt || '').slice(0, 2000),
      section: input.section || 'blog',
    })

    if (data?.error) {
      return NextResponse.json(
        { error: 'Anthropic: ' + (data.error.message || JSON.stringify(data.error)) },
        { status: 502, headers: cors }
      )
    }

    const text = (data.content || [])
      .filter((b: any) => b.type === 'text')
      .map((b: any) => b.text)
      .join('')
      .trim()
    const start = text.indexOf('{')
    const end = text.lastIndexOf('}')
    let seo: any
    try {
      seo = JSON.parse(start >= 0 && end > start ? text.slice(start, end + 1) : text)
    } catch {
      return NextResponse.json(
        { error: 'Model did not return valid JSON.', raw: text.slice(0, 400) },
        { status: 502, headers: cors }
      )
    }

    // Fold all field values to plain ASCII (no accents) in every locale.
    seo = asciiDeep(seo)

    // Enforce the character limits the model does not reliably respect.
    seo.metaTitle = capAtWord(seo.metaTitle, 60)
    seo.ogTitle = capAtWord(seo.ogTitle, 60)
    seo.twitterTitle = capAtWord(seo.twitterTitle, 60)
    seo.metaDescription = capAtWord(seo.metaDescription, 160)
    seo.ogDescription = capAtWord(seo.ogDescription, 160)
    seo.twitterDescription = capAtWord(seo.twitterDescription, 160)

    return NextResponse.json(seo, { headers: cors })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Request failed.' }, { status: 500, headers: cors })
  }
}
