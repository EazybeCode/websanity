import React from 'react'
import { Linkedin, Twitter, Youtube } from 'lucide-react'

interface FooterLink {
  _key: string
  label: string
  url: string
}

interface FooterColumn {
  _key: string
  title: string
  links: FooterLink[]
}

interface SocialLink {
  _key: string
  platform: string
  url: string
}

export interface FooterData {
  companyName: string
  tagline: string
  socialLinks: SocialLink[]
  badges: string[]
  columns: FooterColumn[]
  copyright: string
  legalLinks: FooterLink[]
}

interface Props {
  data: FooterData
}

const socialIcons: Record<string, React.FC<{ size?: number }>> = {
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
}

export const FooterDynamic: React.FC<Props> = ({ data }) => {
  return (
    <footer className="bg-brand-surface pt-20 pb-10 text-sm border-t border-slate-800 text-slate-400 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1">
            <div className="font-display font-bold text-xl tracking-tight text-white mb-6 flex items-center gap-2 group cursor-default">
              <div className="w-8 h-8 bg-brand-surface rounded-lg flex items-center justify-center shadow-lg border border-white/10 group-hover:scale-105 transition-transform duration-300 relative overflow-hidden p-1.5">
                <img src="/logo.png" alt="Eazybe Logo" className="w-full h-full object-contain" />
              </div>
              {data.companyName}
            </div>
            <p className="text-slate-500 mb-6 leading-relaxed text-xs">
              {data.tagline}
            </p>
            <div className="flex space-x-4 mb-6">
              {data.socialLinks?.map((social) => {
                const Icon = socialIcons[social.platform] || Linkedin
                return (
                  <a
                    key={social._key}
                    href={social.url}
                    className="text-slate-500 hover:text-white transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <img src="https://cdn.simpleicons.org/meta/2563EB" alt="Meta" className="w-4 h-4" />
                <span className="text-xs font-bold text-slate-400">Meta Business Partner</span>
              </div>
              <div className="flex gap-2">
                {data.badges?.map((badge, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-brand-card border border-slate-700 rounded text-[10px] font-bold text-slate-500"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Columns */}
          {data.columns?.map((column) => (
            <div key={column._key}>
              <h4 className="font-bold text-white mb-6">{column.title}</h4>
              <ul className="space-y-3">
                {column.links?.map((link) => (
                  <li key={link._key}>
                    <a href={link.url} className="hover:text-brand-blue transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs">
          <div className="mb-4 md:mb-0">{data.copyright}</div>
          <div className="flex space-x-6">
            {data.legalLinks?.map((link) => (
              <a key={link._key} href={link.url} className="hover:text-slate-300 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
