'use client'

/**
 * Button / CTA Block Component
 * Call-to-action buttons
 */
import React from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ButtonData {
  text: string
  url: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  openInNewTab?: boolean
  alignment?: 'left' | 'center' | 'right'
}

export const ButtonCTABlock: React.FC<{ data: ButtonData }> = ({ data }) => {
  const {
    text,
    url,
    variant = 'primary',
    size = 'md',
    openInNewTab = false,
    alignment = 'left',
  } = data

  const sizeStyles: Record<string, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  }

  const variantStyles: Record<string, string> = {
    primary:
      'bg-gradient-to-r from-brand-blue to-brand-cyan text-white hover:shadow-lg hover:shadow-brand-blue/25',
    secondary: 'bg-brand-cyan text-black hover:bg-brand-cyan/90',
    outline:
      'border-2 border-brand-cyan text-brand-cyan hover:bg-brand-cyan hover:text-black',
    ghost: 'bg-slate-800 text-white hover:bg-slate-700',
    link: 'text-brand-cyan hover:underline p-0',
  }

  const alignmentStyles: Record<string, string> = {
    left: 'flex justify-start',
    center: 'flex justify-center',
    right: 'flex justify-end',
  }

  const isExternal = openInNewTab || url?.startsWith('http')
  const className = `inline-flex items-center gap-2 rounded-xl font-semibold transition-all duration-200 ${variantStyles[variant]} ${sizeStyles[size]} ${variant !== 'link' ? 'hover:-translate-y-0.5' : ''}`

  const content = (
    <>
      {text}
      {(variant === 'primary' ||
        variant === 'secondary' ||
        variant === 'link') && <ArrowRight size={18} />}
    </>
  )

  return (
    <div className={`my-6 md:my-8 ${alignmentStyles[alignment]}`}>
      {isExternal ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {content}
        </a>
      ) : (
        <Link href={url} className={className}>
          {content}
        </Link>
      )}
    </div>
  )
}

export default ButtonCTABlock
