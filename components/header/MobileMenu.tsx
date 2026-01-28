import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ExternalLink } from 'lucide-react'
import { Button } from '../ui/Button'
import type { NavItem, NavigationData } from '../../hooks/useNavigation'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  items: NavItem[]
  ctaButton?: NavigationData['ctaButton']
  signInButton?: NavigationData['signInButton']
}

const menuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1],
    },
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.3,
      ease: [0, 0, 0.2, 1],
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  closed: { opacity: 0, x: -20 },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2 },
  },
}

const subMenuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.15 },
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.2 },
  },
}

interface AccordionItemProps {
  item: NavItem
  onClose: () => void
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!item.isMegaMenu || !item.columns?.length) {
    const isExternal = item.isExternal || item.href?.startsWith('http')
    const LinkComponent = isExternal ? 'a' : Link
    const linkProps = isExternal
      ? { href: item.href || '#', target: '_blank', rel: 'noopener noreferrer' }
      : { to: item.href || '#' }

    return (
      <motion.div variants={itemVariants}>
        <LinkComponent
          {...(linkProps as any)}
          onClick={onClose}
          className="flex items-center justify-between px-4 py-4 text-lg font-medium text-white hover:bg-white/5 hover:text-brand-blue rounded-lg transition-colors"
        >
          {item.label}
          {isExternal && <ExternalLink size={16} className="text-slate-500" />}
        </LinkComponent>
      </motion.div>
    )
  }

  return (
    <motion.div variants={itemVariants}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-4 text-lg font-medium text-white hover:bg-white/5 rounded-lg transition-colors"
      >
        {item.label}
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={20} className="text-slate-400" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            variants={subMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="overflow-hidden"
          >
            <div className="pl-4 pb-4 space-y-4">
              {item.columns?.map((column) => (
                <div key={column._key} className="space-y-2">
                  {column.title && (
                    <h4 className="px-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                      {column.title}
                    </h4>
                  )}
                  <ul className="space-y-1">
                    {column.links.map((link) => {
                      const isExternal = link.isExternal || link.href.startsWith('http')
                      const LinkComponent = isExternal ? 'a' : Link
                      const linkProps = isExternal
                        ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
                        : { to: link.href }

                      return (
                        <li key={link._key}>
                          <LinkComponent
                            {...(linkProps as any)}
                            onClick={onClose}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-brand-blue hover:bg-white/5 rounded-lg transition-colors"
                          >
                            {link.label}
                            {isExternal && (
                              <ExternalLink size={12} className="text-slate-500" />
                            )}
                          </LinkComponent>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  items,
  ctaButton,
  signInButton,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="md:hidden absolute top-full left-0 right-0 bg-brand-black border-b border-slate-800 shadow-2xl z-50 overflow-hidden"
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          <div className="px-4 pt-2 pb-8 space-y-1">
            {items.map((item) => (
              <AccordionItem key={item._key} item={item} onClose={onClose} />
            ))}

            <motion.div
              variants={itemVariants}
              className="mt-6 pt-6 border-t border-slate-800 flex flex-col space-y-4 px-2"
            >
              {signInButton && (
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full justify-center text-base bg-transparent border-slate-700 text-white"
                  onClick={() => {
                    if (signInButton.href) {
                      window.location.href = signInButton.href
                    }
                    onClose()
                  }}
                >
                  {signInButton.label || 'Sign In'}
                </Button>
              )}
              {ctaButton && (
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full justify-center text-base"
                  onClick={() => {
                    if (ctaButton.href) {
                      window.location.href = ctaButton.href
                    }
                    onClose()
                  }}
                >
                  {ctaButton.label || 'Get Started'}
                </Button>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
