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

// Color themes for different menu types
const menuThemes = {
  platform: {
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
  },
  integrations: {
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
  },
  resources: {
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-400',
  },
  solutions: {
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
  },
  company: {
    iconBg: 'bg-rose-500/10',
    iconColor: 'text-rose-400',
  },
  default: {
    iconBg: 'bg-white/5',
    iconColor: 'text-blue-400',
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
                      <h3 className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-3 px-2">
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
                                className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
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
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg p-3 border border-white/5">
                      {featured.badge && (
                        <span className="inline-block px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 rounded mb-2">
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
                        className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
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
