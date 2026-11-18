'use client'

/**
 * Video Embed Block Component
 * YouTube, Vimeo, Loom videos
 */
import React, { useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'

interface VideoData {
  platform: 'youtube' | 'vimeo' | 'loom' | 'wistia' | 'custom'
  videoId?: string
  url?: string
  title?: string
  autoplay?: boolean
  mute?: boolean
  controls?: boolean
  aspectRatio?: '16:9' | '4:3' | '1:1' | '9:16' | '21:9'
  coverImage?: string
}

export const VideoEmbedBlock: React.FC<{ data: VideoData }> = ({ data }) => {
  const {
    platform,
    videoId,
    url,
    title,
    autoplay = false,
    mute = false,
    controls = true,
    aspectRatio = '16:9',
    coverImage,
  } = data
  const [isPlaying, setIsPlaying] = useState(false)
  const [inView, setInView] = useState(false)
  const frameRef = useRef<HTMLDivElement>(null)
  // Editors often paste share-link IDs like "pFmcmiWAphY?si=…"; keep only the ID.
  const cleanId = videoId?.trim().split(/[?&#]/)[0]
  // YouTube without a custom cover: show its own thumbnail first. The player
  // (~600 KB of JS, fonts, trackers) only loads once the block scrolls into
  // view or the visitor clicks play. Loading on view (not only on click) keeps
  // the real embed in Googlebot's render — its tall viewport sees it — so the
  // video stays indexable.
  const poster = coverImage || (platform === 'youtube' && cleanId ? `https://i.ytimg.com/vi/${cleanId}/hqdefault.jpg` : undefined)

  useEffect(() => {
    const el = frameRef.current
    if (!el || !poster || coverImage) return
    if (!('IntersectionObserver' in window)) { setInView(true); return }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setInView(true); io.disconnect() }
    }, { rootMargin: '200px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [poster, coverImage])

  const showPlayer = isPlaying || inView || !poster

  // Aspect ratio padding
  const aspectRatios: Record<string, string> = {
    '16:9': 'pt-[56.25%]',
    '4:3': 'pt-[75%]',
    '1:1': 'pt-[100%]',
    '9:16': 'pt-[177.78%]',
    '21:9': 'pt-[42.86%]',
  }

  const getEmbedUrl = () => {
    switch (platform) {
      case 'youtube':
        // A click on the poster is the play request, so autoplay once the player loads.
        // Privacy-enhanced domain: no YSC / VISITOR_INFO1_LIVE third-party cookies.
        return `https://www.youtube-nocookie.com/embed/${cleanId}?autoplay=${autoplay || isPlaying ? 1 : 0}&mute=${mute ? 1 : 0}&controls=${controls ? 1 : 0}`
      case 'vimeo':
        return `https://player.vimeo.com/video/${cleanId}?autoplay=${autoplay ? 1 : 0}&muted=${mute ? 1 : 0}`
      case 'loom':
        return `https://www.loom.com/embed/${cleanId}?hideEmbedTopBar=true`
      case 'custom':
        return url
      default:
        return ''
    }
  }

  return (
    <figure className="my-4">
      <div
        ref={frameRef}
        className={`relative w-full rounded-xl overflow-hidden ${aspectRatios[aspectRatio]} bg-slate-900`}
      >
        {!showPlayer ? (
          <button
            type="button"
            aria-label={`Play video${title ? `: ${title}` : ''}`}
            className="absolute inset-0 w-full h-full bg-cover bg-center cursor-pointer group border-0 p-0"
            style={{ backgroundImage: `url(${poster})` }}
            onClick={() => setIsPlaying(true)}
          >
            <span className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
              <span className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play
                  className="w-8 h-8 md:w-10 md:h-10 text-white ml-1"
                  fill="white"
                />
              </span>
            </span>
          </button>
        ) : (
          <iframe
            src={getEmbedUrl()}
            title={title || 'Video'}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
      {title && (
        <figcaption className="text-center text-slate-400 text-[12px] mt-4">
          {title}
        </figcaption>
      )}
    </figure>
  )
}

export default VideoEmbedBlock
