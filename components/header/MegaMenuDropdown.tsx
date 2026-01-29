import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { ArrowRight, ExternalLink } from 'lucide-react'
import type { NavColumn } from '../../hooks/useNavigation'
import { LocalizedLink } from '../LocalizedLink'

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

// Unified brand-cyan theme across all mega menus for design consistency
const theme = {
  iconBg: 'bg-brand-cyan/10',
  iconColor: 'text-brand-cyan',
  linkColor: 'text-brand-cyan',
  headerColor: 'text-slate-400',
}

export const MegaMenuDropdown: React.FC<MegaMenuDropdownProps> = ({
  columns,
  isOpen,
  onClose,
  featured,
}) => {
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

                        if (isViewAll) {
                          return (
                            <div key={link._key} className="pt-2 mt-2 border-t border-white/5 px-2">
                              {isExternal ? (
                                <a
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={onClose}
                                  className={`inline-flex items-center gap-1 text-xs font-medium ${theme.linkColor} hover:text-white transition-colors`}
                                >
                                  <span>{link.label}</span>
                                  <ArrowRight size={12} />
                                </a>
                              ) : (
                                <LocalizedLink
                                  to={link.href}
                                  onClick={onClose}
                                  className={`inline-flex items-center gap-1 text-xs font-medium ${theme.linkColor} hover:text-white transition-colors`}
                                >
                                  <span>{link.label}</span>
                                  <ArrowRight size={12} />
                                </LocalizedLink>
                              )}
                            </div>
                          )
                        }

                        if (isExternal) {
                          return (
                            <a
                              key={link._key}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
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
                                  <ExternalLink size={10} className="text-slate-500" />
                                </div>
                                {link.description && (
                                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                    {link.description}
                                  </p>
                                )}
                              </div>
                            </a>
                          )
                        }

                        return (
                          <LocalizedLink
                            key={link._key}
                            to={link.href}
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
                              </div>
                              {link.description && (
                                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                  {link.description}
                                </p>
                              )}
                            </div>
                          </LocalizedLink>
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
                      <LocalizedLink
                        to={featured.href}
                        onClick={onClose}
                        className={`inline-flex items-center gap-1 text-xs font-medium ${theme.linkColor} hover:text-white transition-colors`}
                      >
                        Learn more
                        <ArrowRight size={11} />
                      </LocalizedLink>
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
