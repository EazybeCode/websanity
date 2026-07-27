import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"
import { redirectRules } from "./src/lib/redirects"

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

const nextConfig: NextConfig = {
  // Strip the `X-Powered-By: Next.js` response header. No SEO impact,
  // just security hygiene — no reason to advertise the framework version.
  poweredByHeader: false,
  experimental: {
    // Inline CSS into the HTML instead of <link> stylesheet chunks. The three
    // render-blocking CSS requests (~53KB) were costing ~1.2s of FCP/LCP on
    // Lighthouse's throttled mobile profile; inlined styles paint immediately.
    // Trade-off: larger HTML payloads and no cross-page CSS caching — a good
    // deal for a marketing site where most sessions are single-page.
    inlineCss: true,
  },
  turbopack: {
    // Next requires this to be an absolute path; the relative `.` triggers a
    // boot-time warning even though Next would otherwise resolve it the same way.
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      { hostname: "cdn.sanity.io" },
      { hostname: "cdn.simpleicons.org" },
    ],
  },
  async headers() {
    // Skip aggressive immutable caching in dev — Turbopack reuses chunk hashes
    // across edits, so a 1-year `immutable` header makes CSS/JS changes never
    // reach the browser.
    const isDev = process.env.NODE_ENV !== 'production'
    const immutableAssetCache = isDev
      ? 'no-store, must-revalidate'
      : 'public, immutable, max-age=31536000'
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://*.google.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://www.google.com https://*.google.com https://*.google.co.in https://googleads.g.doubleclick.net https://www.googleadservices.com https://stats.g.doubleclick.net https://ad.doubleclick.net https://analytics.google.com https://connect.facebook.net https://www.facebook.com https://*.clarity.ms https://sc.lfeeder.com https://cdn.leadinfo.net https://*.leadinfo.net https://api.leadinfo.com https://app.factors.ai https://api.factors.ai https://snap.licdn.com https://px.ads.linkedin.com https://js.hs-scripts.com https://api.hubspot.com https://api.hsforms.com https://api.hubapi.com https://forms.hscollectedforms.net https://static.hsappstatic.net https://*.sanity.io https://cdn.sanity.io https://api.eazybe.com https://eazybe.com https://cerberus.eazybe.com https://api.ipwho.org https://api.country.is https://calendly.com https://*.calendly.com; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com https://www.linkedin.com https://twitter.com https://platform.twitter.com https://x.com https://www.instagram.com https://instagram.com https://www.tiktok.com https://open.spotify.com https://www.facebook.com https://www.loom.com https://calendly.com https://*.calendly.com; script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://*.google.com https://googleads.g.doubleclick.net https://cdn.jsdelivr.net https://assets.calendly.com https://connect.facebook.net https://snap.licdn.com https://www.clarity.ms https://scripts.clarity.ms https://sc.lfeeder.com https://cdn.leadinfo.net https://app.factors.ai https://js.hs-scripts.com https://js.hs-analytics.net https://js.hsadspixel.net https://js.hscollectedforms.net https://js.hs-banner.com; object-src 'none'; base-uri 'self'; form-action 'self'" },
        ],
      },
      // Immutable cache for hashed static assets (fonts, JS, CSS)
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: immutableAssetCache },
        ],
      },
      // Images - long cache
      {
        source: "/(.*\\.(?:png|jpg|jpeg|gif|webp|avif|ico|svg))",
        headers: [
          { key: "Cache-Control", value: immutableAssetCache },
        ],
      },
      // Fonts - long cache
      {
        source: "/(.*\\.(?:woff|woff2|ttf|otf|eot))",
        headers: [
          { key: "Cache-Control", value: immutableAssetCache },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      { source: '/sitemap-:lang.xml', destination: '/api/sitemap/:lang' },
      // The production nginx routes the /api/* path prefix to a dead upstream
      // (502), so browser-facing endpoints go through a non-/api path and get
      // rewritten to the API route inside Next — same trick as the sitemap.
      { source: '/track/views', destination: '/api/views' },
      // SEO & Discovery generator, called from the Sanity Studio document action.
      { source: '/track/generate-seo', destination: '/api/generate-seo' },
    ]
  },
  async redirects() {
    return [
      // Old product URLs → new format
      { source: "/product/:slug", destination: "/:slug", permanent: true },
      { source: "/:locale/product/:slug", destination: "/:locale/:slug", permanent: true },
      // Old integration URLs → new format
      { source: "/integrations/hubspot", destination: "/hubspot-whatsapp-integration", permanent: true },
      { source: "/hubspot", destination: "/hubspot-whatsapp-integration", permanent: true },
      { source: "/integrations/zoho-crm", destination: "/zoho-whatsapp-integration", permanent: true },
      { source: "/zoho-crm", destination: "/zoho-whatsapp-integration", permanent: true },
      // Locale-prefixed old integration redirects
      { source: "/:locale/integrations/google-sheet", destination: "/:locale/google-sheets-whatsapp-integration", permanent: true },
      { source: "/:locale/integrations/fresh-desk", destination: "/:locale/freshdesk-whatsapp-integration", permanent: true },
      // OAuth/CRM integration callback pages are served at src/app/integrate-*-crm/
      // Old blog redesign routes → main blog
      { source: "/blog-new", destination: "/blog", permanent: true },
      { source: "/blog-new/:slug", destination: "/blog/:slug", permanent: true },
      // Old misc redirects
      { source: "/search", destination: "/", permanent: true },
      { source: "/lp/hubspot-demo", destination: "/", permanent: true },
      { source: "/all-crm-form", destination: "/", permanent: true },
      { source: "/categories-intregrations/account-management", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      // Old blog redirects
      { source: "/br/blog/integrate-hubspot-with-whatsapp-easiest-method", destination: "/br", permanent: true },
      { source: "/br/blog/discover-the-best-whatsapp-business-api-alternatives", destination: "/br/blog", permanent: true },
      { source: "/br/blog/apply-for-green-tick-on-whatsapp-business", destination: "/br/blog", permanent: true },
      { source: "/br/blog-pt/transforme-suas-conexoes-integracao-hubspot-com-whatsapp", destination: "/br/blog", permanent: true },
      { source: "/br/blog/whatsapp-otp-how-do-you-send-an-otp-on-whatsapp", destination: "/br/blog", permanent: true },
      { source: "/br/blog/how-whatapp-will-take-over-email-by-2030", destination: "/br/blog", permanent: true },
      { source: "/blog/como-leer-mensajes-eliminados-en-whatsapp", destination: "/es/blog/como-leer-mensajes-eliminados-en-whatsapp", permanent: true },
      { source: "/tr/blog-pt", destination: "/tr/blog", permanent: true },
      { source: "/tr/blog-es/como-ver-mensajes-eliminados-en-whatsapp-revelado", destination: "/tr/blog", permanent: true },
      { source: "/tr/blog/15-best-ai-drive-sales-tool-for-b2c-companies-using-whatsapp-business-2025", destination: "/tr/blog", permanent: true },
      { source: "/tr/blog/how-to-edit-andriod-contacts-on-whatsapp-without-leaving-the-app", destination: "/tr/blog", permanent: true },
      { source: "/tr/blog/get-organized-with-hubspot-free-crm-start-now", destination: "/tr/blog", permanent: true },
      { source: "/tr/blog/how-whatapp-will-take-over-email-by-2030", destination: "/tr/blog", permanent: true },
      { source: "/tr/blog/whatsapp-hacks-how-to-message-without-saving-contact", destination: "/tr/blog", permanent: true },
      { source: "/tr/blog/boost-your-sales-process-with-these-15-automation-tools", destination: "/tr/blog", permanent: true },
      { source: "/tr/blog/top-3-chrome-extensions-that-you-must-install-right-now", destination: "/tr/blog", permanent: true },
      { source: "/tr/blog/use-these-7-proven-strategies-to-grow-your-business", destination: "/tr/blog", permanent: true },
      { source: "/tr/blog/essential-glossary-of-artificial-intelligence-ai-terms", destination: "/tr/blog", permanent: true },
      { source: "/tr/blog/whatsapp-companion-mode-how-to-use-whatsapp-on-two-phones", destination: "/tr/blog", permanent: true },
      { source: "/tr/blog/how-to-appear-offline-on-whatsapp", destination: "/tr/blog/whatsappta-cevrimdisi-gorunme", permanent: true },
      // Migrated redirects from old React site
      ...redirectRules,
    ]
  },
}

export default withNextIntl(nextConfig)
