import React from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { ArrowRight, ExternalLink } from 'lucide-react'
import type { NavColumn } from '../../hooks/useNavigation'

interface MegaMenuDropdownProps {
  columns: NavColumn[]
  isOpen: boolean
  onClose: () => void
  menuType?: 'platform' | 'integrations' | 'resources' | 'solutions' | 'company' | 'default'
  featured?: {
    title: string
    description: string
    href: string
    badge?: string
  }
}

function getIcon(iconName: string): React.ReactNode {
  const IconComponent = (LucideIcons as Record<string, React.FC<{ className?: string; size?: number }>>)[iconName]
  if (IconComponent) {
    return <IconComponent size={16} />
  }
  return null
}

// Color themes aligned to brand design system (see index.html Tailwind config)
const menuThemes = {
  platform: {
    iconBg: 'bg-brand-cyan/10',
    iconColor: 'text-brand-cyan',
    linkColor: 'text-brand-cyan',
    headerColor: 'text-brand-cyan/50',
  },
  integrations: {
    iconBg: 'bg-brand-green/10',
    iconColor: 'text-brand-green',
    linkColor: 'text-brand-green',
    headerColor: 'text-brand-green/50',
  },
  resources: {
    iconBg: 'bg-brand-purple/10',
    iconColor: 'text-brand-purple',
    linkColor: 'text-brand-purple',
    headerColor: 'text-brand-purple/50',
  },
  solutions: {
    iconBg: 'bg-brand-orange/10',
    iconColor: 'text-brand-orange',
    linkColor: 'text-brand-orange',
    headerColor: 'text-brand-orange/50',
  },
  company: {
    iconBg: 'bg-brand-indigo/10',
    iconColor: 'text-brand-indigo',
    linkColor: 'text-brand-indigo',
    headerColor: 'text-brand-indigo/50',
  },
  default: {
    iconBg: 'bg-white/5',
    iconColor: 'text-brand-blue',
    linkColor: 'text-brand-blue',
    headerColor: 'text-slate-500',
  },
}

export const MegaMenuDropdown: React.FC<MegaMenuDropdownProps> = ({
  columns,
  isOpen,
  onClose,
  menuType = 'default',
  featured,
}) => {
  const theme = menuThemes[menuType] || menuThemes.default

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute top-full left-0 pt-2 z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15 }}
        >
          <div className="bg-[#12121f] rounded-lg border border-white/10 shadow-2xl shadow-black/60">
            <div className="p-4">
              <div className="flex gap-6">
                {/* Navigation Columns */}
                {columns.map((column) => (
                  <div key={column._key} className="w-[200px]">
                    {column.title && (
                      <h3 className={`text-[10px] font-semibold uppercase tracking-wider ${theme.headerColor} mb-3 px-2`}>
                        {column.title}
                      </h3>
                    )}
                    <div className="space-y-0.5">
                      {column.links.map((link) => {
                        const isExternal = link.isExternal || link.href.startsWith('http')
                        const isViewAll = link.label.toLowerCase().includes('view all')
                        const LinkComponent = isExternal ? 'a' : Link
                        const linkProps = isExternal
                          ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
                          : { to: link.href }

                        if (isViewAll) {
                          return (
                            <div key={link._key} className="pt-2 mt-2 border-t border-white/5 px-2">
                              <LinkComponent
                                {...(linkProps as any)}
                                onClick={onClose}
                                className={`inline-flex items-center gap-1 text-xs font-medium ${theme.linkColor} hover:text-white transition-colors`}
                              >
                                <span>{link.label}</span>
                                <ArrowRight size={12} />
                              </LinkComponent>
                            </div>
                          )
                        }

                        return (
                          <LinkComponent
                            key={link._key}
                            {...(linkProps as any)}
                            onClick={onClose}
                            className="flex items-start gap-2.5 px-2 py-2 rounded-md hover:bg-white/5 transition-colors group"
                          >
                            {link.icon && (
                              <span className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-md ${theme.iconBg} ${theme.iconColor}`}>
                                {getIcon(link.icon)}
                              </span>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1">
                                <span className="text-sm font-medium text-slate-200 group-hover:text-white">
                                  {link.label}
                                </span>
                                {isExternal && (
                                  <ExternalLink size={10} className="text-slate-500" />
                                )}
                              </div>
                              {link.description && (
                                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                  {link.description}
                                </p>
                              )}
                            </div>
                          </LinkComponent>
                        )
                      })}
                    </div>
                  </div>
                ))}

                {/* Featured Card */}
                {featured && (
                  <div className="w-[180px] pl-4 border-l border-white/10">
                    <div className={`bg-gradient-to-br ${theme.iconBg} rounded-lg p-3 border border-white/5`}>
                      {featured.badge && (
                        <span className={`inline-block px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${theme.iconColor} ${theme.iconBg} rounded mb-2`}>
                          {featured.badge}
                        </span>
                      )}
                      <h4 className="text-sm font-semibold text-white mb-1.5">
                        {featured.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                        {featured.description}
                      </p>
                      <Link
                        to={featured.href}
                        onClick={onClose}
                        className={`inline-flex items-center gap-1 text-xs font-medium ${theme.linkColor} hover:text-white transition-colors`}
                      >
                        Learn more
                        <ArrowRight size={11} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MegaMenuDropdown
