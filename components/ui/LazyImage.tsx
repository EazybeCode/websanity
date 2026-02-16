import React, { useState, useRef, useEffect } from 'react'

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  placeholder?: string
}

/**
 * LazyImage component for optimal loading performance
 * - Uses native lazy loading with fetchpriority="low" for below-fold images
 * - Reserves space to prevent CLS
 * - Optional blur placeholder during load
 */
export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!imgRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            // Image is in view, load it
            const img = entry.target as HTMLImageElement
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.onload = () => setIsLoaded(true)
            }
          }
        })
      },
      { rootMargin: '50px' }
    )

    observer.observe(imgRef.current)

    return () => observer.disconnect()
  }, [isLoaded])

  // Build style object for aspect ratio preservation
  const style: React.CSSProperties = {}
  if (width && height) {
    style.aspectRatio = `${width}/${height}`
  }

  return (
    <img
      ref={imgRef}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      {...(isLoaded
        ? { src }
        : {
            'data-src': src,
            src: placeholder
          }
      )}
      loading="lazy"
      decoding="async"
      fetchpriority="low"
      {...props}
    />
  )
}

/**
 * CriticalImage for above-fold content
 * - Uses fetchpriority="high" for LCP optimization
 * - Has explicit dimensions to prevent CLS
 * - Uses decoding="async" for non-blocking render
 */
export const CriticalImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  ...props
}) => {
  const style: React.CSSProperties = {}
  if (width && height) {
    style.aspectRatio = `${width}/${height}`
  }

  return (
    <img
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      src={src}
      decoding="async"
      fetchpriority="high"
      {...props}
    />
  )
}

export default LazyImage
