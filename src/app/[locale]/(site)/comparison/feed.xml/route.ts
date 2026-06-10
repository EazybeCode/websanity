import { buildRssResponse } from '@/lib/blog-rss'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params
  return buildRssResponse('comparison', locale)
}
