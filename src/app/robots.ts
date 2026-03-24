import type { MetadataRoute } from 'next'

const SITE_URL = 'https://eazybe.com'

// AI and LLM crawlers
const aiBots = [
  'GPTBot',
  'ChatGPT-User',
  'Google-Extended',
  'GoogleOther',
  'anthropic-ai',
  'Claude-Web',
  'CCBot',
  'PerplexityBot',
  'Amazonbot',
  'FacebookBot',
  'Meta-ExternalAgent',
  'cohere-ai',
  'AI2Bot',
  'Diffbot',
]

// Search engine crawlers
const searchBots = [
  'Googlebot',
  'Googlebot-Image',
  'Googlebot-Mobile',
  'Googlebot-News',
  'Googlebot-Video',
  'Mediapartners-Google',
  'AdsBot-Google',
  'AdsBot-Google-Mobile',
  'Bingbot',
  'BingPreview',
  'msnbot',
  'msnbot-media',
  'Applebot',
  'Applebot-Extended',
  'DuckDuckBot',
  'Yandex',
  'YandexBot',
  'YandexImages',
  'Baiduspider',
  'Baiduspider-image',
  'Baiduspider-video',
  'Slurp',
  'Yeti',
  'Sogou',
  'EcosiaBot',
  'BraveSearchBot',
  'Qwantify',
]

// Social media crawlers
const socialBots = [
  'facebookexternalhit',
  'facebookcatalog',
  'Facebot',
  'Twitterbot',
  'LinkedInBot',
  'linkedin',
  'WhatsApp',
  'WhatsAppBot',
  'TelegramBot',
  'Slackbot',
  'Slackbot-LinkExpanding',
  'Pinterest',
  'Pinterestbot',
  'redditbot',
  'Discordbot',
  'Mastodon',
  'Snapchat',
  'Bytespider',
]

// SEO and diagnostic tools
const seoBots = [
  'AhrefsBot',
  'SemrushBot',
  'rogerbot',
  'dotbot',
  'MJ12bot',
  'Screaming Frog SEO Spider',
  'Google-PageSpeed-Insights',
  'Google-Site-Verification',
  'ia_archiver',
  'adidxbot',
  'ia_archiver-web.archive.org',
  'AppleNewsBot',
  'brave-ads-crawler',
]

// All bots to explicitly allow
const allowedBots = [...aiBots, ...searchBots, ...socialBots, ...seoBots]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // General rule - allow all with specific disallows
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dist/', '/.git/', '/admin/', '/_next/', '/*.json$', '/*?*utm_*', '/node_modules/'],
      },
      // Explicitly allow all AI, search, social, and SEO bots
      ...allowedBots.map((userAgent) => ({
        userAgent,
        allow: '/',
      })),
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/sitemap-en.xml`,
      `${SITE_URL}/sitemap-br.xml`,
      `${SITE_URL}/sitemap-es.xml`,
      `${SITE_URL}/sitemap-tr.xml`,
    ],
  }
}
