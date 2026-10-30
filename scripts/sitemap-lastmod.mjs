// Writes src/data/sitemap-lastmod.json: for each code-built page in the sitemap, the
// date its source last changed in git (the route file plus the @/components and
// @/data modules it imports directly). The sitemap uses this, or the Sanity
// _updatedAt when that is newer, as <lastmod> instead of the build date.
//
// Run after shipping page changes:  node scripts/sitemap-lastmod.mjs
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const APP = 'src/app/[locale]'
// sitemap path -> route file
const ROUTES = {
  '/': `${APP}/page.tsx`,
  '/pricing': `${APP}/(site)/pricing/page.tsx`,
  '/features': `${APP}/(site)/features/page.tsx`,
  '/whatsapp-api': `${APP}/(site)/whatsapp-api/page.tsx`,
  '/whatsapp-api/coexistence': `${APP}/(site)/whatsapp-api/coexistence/page.tsx`,
  '/integrations': `${APP}/(site)/integrations/page.tsx`,
  '/blog': `${APP}/(site)/blog/page.tsx`,
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

const out = {}
for (const [page, route] of Object.entries(ROUTES)) {
  const date = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...sourcesFor(route)], { encoding: 'utf8' }).trim()
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`No git date for ${page} (${route})`)
  out[page] = date
}
const target = path.join('src', 'data', 'sitemap-lastmod.json')
fs.writeFileSync(target, JSON.stringify(out, null, 2) + '\n')
console.log(`wrote ${target}`, out)
