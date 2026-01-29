import React from 'react'
import { ExternalLink } from 'lucide-react'
import { LocalizedLink } from '../LocalizedLink'

export interface FooterLink {
  label: string
  href: string
  isExternal?: boolean
}

interface FooterColumnProps {
  title: string
  links: FooterLink[]
  isDark?: boolean
}

export const FooterColumn: React.FC<FooterColumnProps> = ({ title, links, isDark = false }) => {
  return (
    <div>
      <h4 className={`font-bold mb-5 text-sm tracking-wide ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link, index) => {
          const isExternal = link.isExternal || link.href.startsWith('http')

          if (isExternal) {
            return (
              <li key={index}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-1.5 text-sm hover:text-brand-blue transition-colors duration-150 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                >
                  <span>{link.label}</span>
                  <ExternalLink
                    size={11}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  />
                </a>
              </li>
            )
          }

          return (
            <li key={index}>
              <LocalizedLink
                to={link.href}
                className={`group flex items-center gap-1.5 text-sm hover:text-brand-blue transition-colors duration-150 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
              >
                <span>{link.label}</span>
              </LocalizedLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default FooterColumn
