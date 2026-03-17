const SITE_URL = 'https://eazybe.com'
const LOCALES = ['en', 'br', 'es', 'tr']

export async function GET() {
  const today = new Date().toISOString().split('T')[0]

  const sitemaps = LOCALES.map(
    (lang) => `
  <sitemap>
    <loc>${SITE_URL}/sitemap-${lang}.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`
  ).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemaps}
</sitemapindex>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
