'use client'

/**
 * Video Embed Block Component
 * YouTube, Vimeo, Loom videos
 */
import React, { useState } from 'react'
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
        return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&mute=${mute ? 1 : 0}&controls=${controls ? 1 : 0}`
      case 'vimeo':
        return `https://player.vimeo.com/video/${videoId}?autoplay=${autoplay ? 1 : 0}&muted=${mute ? 1 : 0}`
      case 'loom':
        return `https://www.loom.com/embed/${videoId}?hideEmbedTopBar=true`
      case 'custom':
        return url
      default:
        return ''
    }
  }

  return (
    <figure className="my-8 md:my-12">
      <div
        className={`relative w-full rounded-xl overflow-hidden ${aspectRatios[aspectRatio]} bg-slate-900`}
      >
        {!isPlaying && coverImage ? (
          <div
            className="absolute inset-0 bg-cover bg-center cursor-pointer group"
            style={{ backgroundImage: `url(${coverImage})` }}
            onClick={() => setIsPlaying(true)}
          >
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play
                  className="w-8 h-8 md:w-10 md:h-10 text-white ml-1"
                  fill="white"
                />
              </div>
            </div>
          </div>
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
        <figcaption className="text-center text-slate-500 text-sm mt-4">
          {title}
        </figcaption>
      )}
    </figure>
  )
}

export default VideoEmbedBlock
