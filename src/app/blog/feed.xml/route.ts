// Root-level EN feed. The localized variants (/br, /es, /tr) live under
// src/app/[locale]/(site)/blog/feed.xml/route.ts. The next-intl middleware
// matcher excludes paths containing a dot (file extension), so /blog/feed.xml
// is NOT rewritten to /en/blog/feed.xml — we serve it from this static route
// directly.
import { buildBlogRssResponse } from '@/lib/blog-rss'

export async function GET() {
  return buildBlogRssResponse('en')
}
