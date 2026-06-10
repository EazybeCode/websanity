// Root-level EN comparison feed. Same reason as the blog feed:
// next-intl middleware excludes dotted paths, so /comparison/feed.xml needs
// its own route handler.
import { buildRssResponse } from '@/lib/blog-rss'

export async function GET() {
  return buildRssResponse('comparison', 'en')
}
