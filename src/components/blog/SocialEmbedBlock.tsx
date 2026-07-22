'use client'

/**
 * Social / Post Embed Block
 * Renders a LinkedIn / X (Twitter) / Instagram / YouTube / TikTok / Vimeo /
 * Spotify post from an embed code pasted in Sanity.
 *
 * Security: we NEVER inject the pasted HTML. We extract the iframe `src` (or a
 * bare URL), verify its host against an allow-list, and render our own
 * <iframe src>. Unknown hosts fall back to a plain link, so authors can't
 * inject arbitrary markup or scripts.
 */
import React from 'react'

interface SocialEmbedData {
  embedCode?: string
  caption?: string
  align?: 'center' | 'left'
}

// Only these hosts are allowed to load in an iframe.
const ALLOWED_HOSTS = [
  'linkedin.com',
  'youtube.com',
  'youtube-nocookie.com',
  'youtu.be',
  'vimeo.com',
  'player.vimeo.com',
  'twitter.com',
  'x.com',
  'platform.twitter.com',
  'instagram.com',
  'tiktok.com',
  'spotify.com',
  'open.spotify.com',
  'facebook.com',
  'loom.com',
]

function isAllowed(src: string): boolean {
  try {
    const host = new URL(src).hostname.replace(/^www\./, '')
    return ALLOWED_HOSTS.some((h) => host === h || host.endsWith('.' + h))
  } catch {
    return false
  }
}

function parseEmbed(embedCode: string) {
  const code = (embedCode || '').trim()
  const srcMatch = code.match(/<iframe[^>]*\ssrc=["']([^"']+)["']/i)
  const urlMatch = code.match(/https?:\/\/[^\s"'<>]+/i)
  const src = srcMatch ? srcMatch[1] : urlMatch ? urlMatch[0] : ''
  const w = code.match(/\swidth=["']?(\d+)/i)
  const h = code.match(/\sheight=["']?(\d+)/i)
  return {
    src,
    width: w ? parseInt(w[1], 10) : undefined,
    height: h ? parseInt(h[1], 10) : undefined,
  }
}

export const SocialEmbedBlock: React.FC<{ data: SocialEmbedData }> = ({ data }) => {
  const { embedCode, caption, align = 'center' } = data || {}
  if (!embedCode) return null

  const { src, width, height } = parseEmbed(embedCode)

  if (!src || !isAllowed(src)) {
    return (
      <figure className="my-6 text-center">
        <p className="text-slate-400 text-sm">
          {src ? (
            <>
              This embed couldn&apos;t be displayed.{' '}
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue underline"
              >
                View the post
              </a>
              .
            </>
          ) : (
            'This embed couldn’t be displayed (no valid link found).'
          )}
        </p>
      </figure>
    )
  }

  const maxW = width && width > 0 ? width : 550
  const frameH = height && height > 0 ? height : 600

  return (
    <figure className={`my-6 ${align === 'left' ? '' : 'flex flex-col items-center'}`}>
      <div style={{ width: '100%', maxWidth: maxW }}>
        <iframe
          src={src}
          title={caption || 'Embedded post'}
          loading="lazy"
          style={{ width: '100%', height: frameH, border: 'none', borderRadius: 12 }}
          allow="encrypted-media; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      {caption && (
        <figcaption className="text-center text-slate-400 text-[12px] mt-3">{caption}</figcaption>
      )}
    </figure>
  )
}

export default SocialEmbedBlock
