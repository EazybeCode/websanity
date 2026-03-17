import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

const nextConfig: NextConfig = {
  turbopack: {
    root: '.',
  },
  images: {
    remotePatterns: [
      { hostname: "cdn.sanity.io" },
      { hostname: "cdn.simpleicons.org" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
      // Immutable cache for hashed static assets (fonts, JS, CSS)
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, immutable, max-age=31536000" },
        ],
      },
      // Images - long cache
      {
        source: "/(.*\\.(?:png|jpg|jpeg|gif|webp|avif|ico|svg))",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // Fonts - long cache
      {
        source: "/(.*\\.(?:woff|woff2|ttf|otf|eot))",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
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
      { source: "/tr/blog-pt", destination: "/tr/blog", permanent: true },
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
    ]
  },
}

export default withNextIntl(nextConfig)
