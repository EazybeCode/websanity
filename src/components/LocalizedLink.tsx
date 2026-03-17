'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'

interface LocalizedLinkProps extends Omit<React.ComponentProps<typeof Link>, 'href'> {
  href: string
  children: React.ReactNode
}

/**
 * A Link component that automatically adds the current language prefix to internal paths.
 * - For English (default), no prefix is added: /pricing
 * - For other languages, prefix is added: /pt/pricing, /es/pricing, /tr/pricing
 */
export const LocalizedLink: React.FC<LocalizedLinkProps> = ({ href, children, ...props }) => {
  const { getLocalizedPath } = useLanguage()

  // Only localize internal paths (starting with /)
  // Don't localize external links or hash links
  const isInternalPath = href.startsWith('/') && !href.startsWith('//')
  const localizedHref = isInternalPath ? getLocalizedPath(href) : href

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  )
}

export default LocalizedLink
