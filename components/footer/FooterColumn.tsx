import React from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'

export interface FooterLink {
  label: string
  href: string
  isExternal?: boolean
}

interface FooterColumnProps {
  title: string
  links: FooterLink[]
}

export const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => {
  return (
    <div>
      <h4 className="font-bold text-white mb-5 text-sm tracking-wide">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link, index) => {
          const isExternal = link.isExternal || link.href.startsWith('http')
          const LinkComponent = isExternal ? 'a' : Link
          const linkProps = isExternal
            ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
            : { to: link.href }

          return (
            <li key={index}>
              <LinkComponent
                {...(linkProps as any)}
                className="group flex items-center gap-1.5 text-sm text-slate-400 hover:text-brand-blue transition-colors duration-150"
              >
                <span>{link.label}</span>
                {isExternal && (
                  <ExternalLink
                    size={11}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  />
                )}
              </LinkComponent>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default FooterColumn
