import { useState, useRef, useEffect } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'auto' | 'low'
  decoding?: 'sync' | 'async' | 'auto'
}

/**
 * Optimized image component for Core Web Vitals
 * - Prevents CLS by reserving space
 * - Lazy loads images by default
 * - Uses modern decoding
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
  decoding = 'async'
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true)
    }
  }, [])

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      fetchpriority={fetchPriority}
      decoding={decoding}
      className={`transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      onLoad={() => setIsLoaded(true)}
      style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
    />
  )
}

export default OptimizedImage
