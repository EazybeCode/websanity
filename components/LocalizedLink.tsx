import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'

interface LocalizedLinkProps extends Omit<LinkProps, 'to'> {
  to: string
  children: React.ReactNode
}

/**
 * A Link component that automatically adds the current language prefix to internal paths.
 * - For English (default), no prefix is added: /pricing
 * - For other languages, prefix is added: /pt/pricing, /es/pricing, /tr/pricing
 */
export const LocalizedLink: React.FC<LocalizedLinkProps> = ({ to, children, ...props }) => {
  const { getLocalizedPath } = useLanguage()

  // Only localize internal paths (starting with /)
  // Don't localize external links or hash links
  const isInternalPath = to.startsWith('/') && !to.startsWith('//')
  const localizedTo = isInternalPath ? getLocalizedPath(to) : to

  return (
    <Link to={localizedTo} {...props}>
      {children}
    </Link>
  )
}

export default LocalizedLink
