// Writes two files for the code-built pages, from git:
//  - src/data/sitemap-lastmod.json: the day each page's source last changed (the
//    route file plus the @/components and @/data modules it imports directly).
//    The sitemap uses this, or the Sanity _updatedAt when newer, as <lastmod>.
//  - src/data/page-dates.json: { published, modified } ISO timestamps (first commit
//    of the route, last commit of its sources). Pages emit them as the
//    article:published_time / article:modified_time meta tags (src/lib/page-dates.ts).
//
// Runs on every commit via .githooks/pre-commit with --staged: pages whose sources
// are in the commit get the commit time as modified (new pages also as published),
// and the hook stages both files. Manual run: node scripts/sitemap-lastmod.mjs
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const APP = 'src/app/[locale]'
// sitemap path -> route file
const ROUTES = {
  '/': `${APP}/page.tsx`,
  '/pricing': `${APP}/(site)/pricing/page.tsx`,
  '/features': `${APP}/(site)/features/page.tsx`,
  '/whatsapp-ai-agent': `${APP}/(site)/whatsapp-ai-agent/page.tsx`,
  '/mcp': `${APP}/(site)/mcp/page.tsx`,
  '/calling': `${APP}/(site)/calling/page.tsx`,
  '/calling/auto-dialer': `${APP}/(site)/calling/[slug]/page.tsx`,
  '/calling/virtual-phone-number': `${APP}/(site)/calling/[slug]/page.tsx`,
  '/calling/call-tracking': `${APP}/(site)/calling/[slug]/page.tsx`,
  '/calling/sim-based-calling': `${APP}/(site)/calling/[slug]/page.tsx`,
  '/calling/call-recording': `${APP}/(site)/calling/[slug]/page.tsx`,
  '/calling/sim-vs-cloud-calling': `${APP}/(site)/calling/[slug]/page.tsx`,
  '/whatsapp-api': `${APP}/(site)/whatsapp-api/page.tsx`,
  '/whatsapp-api/coexistence': `${APP}/(site)/whatsapp-api/coexistence/page.tsx`,
  '/integrations': `${APP}/(site)/integrations/page.tsx`,
  '/blog': `${APP}/(site)/blog/page.tsx`,
  '/blog/authors': `${APP}/(site)/blog/authors/page.tsx`,
  '/blog/authors/[slug]': `${APP}/(site)/blog/authors/[slug]/page.tsx`,
  '/features/team-inbox': `${APP}/features/[slug]/page.tsx`,
  '/comparison': `${APP}/(site)/comparison/page.tsx`,
  '/about-us': `${APP}/(site)/about-us/page.tsx`,
  '/whatsapp-qr-code-generator': `${APP}/(site)/whatsapp-qr-code-generator/page.tsx`,
  '/whatsapp-chat-link-generator': `${APP}/(site)/whatsapp-chat-link-generator/page.tsx`,
  '/whatsapp-chat-widget': `${APP}/(site)/whatsapp-chat-widget/page.tsx`,
  '/marketing-roi-calculator': `${APP}/(site)/marketing-roi-calculator/page.tsx`,
  '/tools': `${APP}/(site)/tools/page.tsx`,
  '/case-studies': `${APP}/(site)/case-studies/page.tsx`,
  '/case-studies/lokmaxltda': `${APP}/(site)/case-studies/lokmaxltda/page.tsx`,
  '/become-our-partner': `${APP}/(site)/become-our-partner/page.tsx`,
  '/whatsapp-pricing-calculator': `${APP}/(site)/whatsapp-pricing-calculator/page.tsx`,
  '/integration-page': `${APP}/(site)/[slug]/page.tsx`,
  '/product-page': `${APP}/features/[slug]/page.tsx`,
  // Not in the sitemap, but their dates are shown on the page (PageDates).
  '/whatsapp-api/[slug]': `${APP}/(site)/whatsapp-api/[slug]/page.tsx`,
  '/blog/[slug]': `${APP}/(site)/blog/[slug]/page.tsx`,
  '/comparison/[slug]': `${APP}/(site)/comparison/[slug]/page.tsx`,
  '/feeds': `${APP}/(site)/feeds/page.tsx`,
  '/sitemap': `${APP}/(site)/sitemap/page.tsx`,
  '/msa': `${APP}/(site)/msa/page.tsx`,
  '/privacy': `${APP}/(site)/privacy/page.tsx`,
  '/terms': `${APP}/(site)/terms/page.tsx`,
  '/security': `${APP}/(site)/security/page.tsx`,
  '/integrate-hubspot-crm': 'src/app/integrate-hubspot-crm/page.tsx',
  '/integrate-salesforce-crm': 'src/app/integrate-salesforce-crm/page.tsx',
  '/integrate-zoho-crm': 'src/app/integrate-zoho-crm/page.tsx',
  '/integrate-bitrix-crm': 'src/app/integrate-bitrix-crm/page.tsx',
}

const STAGED = process.argv.includes('--staged')
const toUtc = (d) => new Date(d).toISOString().replace(/\.\d{3}Z$/, 'Z')
const NOW_ISO = toUtc(new Date())
const TODAY = NOW_ISO.slice(0, 10)
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim()
const lines = (text) => text.split(/\r?\n/).filter(Boolean)
const stagedFiles = STAGED ? lines(git('diff', '--cached', '--name-only', '--diff-filter=ACMR')) : []
const isStaged = (source) => stagedFiles.some((f) => f === source || f.startsWith(source.replace(/\/?$/, '/')))

// First git commit of a route, following it across folder moves (e.g. into the
// (site) route group): the earliest commit that added a page.tsx at the same
// path below src/app, ignoring [locale] and (group) folders.
function firstDate(route) {
  const rest = route.replace(/^src\/app\//, '').split('/').filter((s) => s !== '[locale]' && !/^\(.*\)$/.test(s)).join('/')
  const glob = rest.replace(/[[\]*?]/g, '\\$&')
  const specs = rest.includes('/') ? [route, `:(glob)src/app/**/${glob}`] : [route, 'src/app/page.tsx']
  const dates = lines(git('log', '--diff-filter=A', '--format=%cI', '--', ...specs))
  return dates.sort((a, b) => Date.parse(a) - Date.parse(b))[0]
}

function resolveImport(spec) {
  const base = spec.replace(/^@\//, 'src/')
  for (const candidate of [base, `${base}.tsx`, `${base}.ts`, `${base}/index.tsx`, `${base}/index.ts`]) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate
  }
  // A directory import (e.g. a component folder): use the whole folder.
  return fs.existsSync(base) ? base : null
}

function sourcesFor(route) {
  const files = [route]
  const code = fs.readFileSync(route, 'utf8')
  for (const [, spec] of code.matchAll(/from\s+['"](@\/(?:components|data)\/[^'"]+)['"]/g)) {
    const file = resolveImport(spec)
    if (file) files.push(file)
  }
  return files
}

const lastmod = {}
const dates = {}
for (const [page, route] of Object.entries(ROUTES)) {
  const sources = sourcesFor(route)
  const changedNow = STAGED && sources.some(isStaged)
  const modified = changedNow ? NOW_ISO : git('log', '-1', '--format=%cI', '--', ...sources)
  const published = firstDate(route) ?? (STAGED ? NOW_ISO : undefined)
  if (!modified || !published) throw new Error(`No git date for ${page} (${route})`)
  dates[page] = { published: toUtc(published), modified: toUtc(modified) }
  lastmod[page] = changedNow ? TODAY : git('log', '-1', '--format=%cs', '--', ...sources)
}
const write = (file, data) => fs.writeFileSync(path.join('src', 'data', file), JSON.stringify(data, null, 2) + '\n')
write('sitemap-lastmod.json', lastmod)
write('page-dates.json', dates)
console.log(`wrote src/data/sitemap-lastmod.json and src/data/page-dates.json${STAGED ? ` (${stagedFiles.length} staged files)` : ''}`)
