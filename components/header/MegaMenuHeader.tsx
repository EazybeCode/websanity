import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/Button'
import { MegaMenuDropdown } from './MegaMenuDropdown'
import { MobileMenu } from './MobileMenu'
import { useNavigation, type NavItem } from '../../hooks/useNavigation'

// Featured content for Platform menu only
const platformFeatured = {
  badge: 'New',
  title: 'Revenue Inbox',
  description: 'AI-powered deal insights that surface revenue opportunities hidden in your WhatsApp conversations.',
  href: '/features/revenue-inbox',
}

// Fallback navigation data when CMS is not configured
const fallbackNavigation = {
  items: [
    {
      _key: 'platform',
      label: 'Platform',
      isMegaMenu: true,
      menuType: 'platform' as const,
      columns: [
        {
          _key: 'productivity',
          title: 'Productivity Tools',
          links: [
            { _key: 'cb', label: 'Cloud Backup', href: '/features/cloud-backup', icon: 'CloudUpload', description: 'Never lose a conversation again' },
            { _key: 'ti', label: 'Team Inbox', href: '/features/team-inbox', icon: 'Inbox', description: 'Collaborate on customer chats' },
            { _key: 'qr', label: 'Quick Reply', href: '/features/quick-reply', icon: 'Zap', description: 'Templates for faster responses' },
            { _key: 'ms', label: 'Message Scheduler', href: '/features/scheduler', icon: 'Clock', description: 'Send messages at the right time' },
          ],
        },
        {
          _key: 'intelligence',
          title: 'Sales Intelligence',
          links: [
            { _key: 'ri', label: 'Revenue Inbox', href: '/features/revenue-inbox', icon: 'TrendingUp', description: 'AI-powered deal insights' },
            { _key: 'rr', label: 'Rep Radar', href: '/features/rep-radar', icon: 'Activity', description: 'Monitor team performance' },
            { _key: 'wc', label: 'WhatsApp Copilot', href: '/features/whatsapp-copilot', icon: 'Sparkles', description: 'AI assistant for sales reps' },
            { _key: 'crm', label: 'WhatsApp CRM', href: '/features/whatsapp-crm', icon: 'LayoutGrid', description: 'Labels, funnels & pipelines' },
          ],
        },
        {
          _key: 'api',
          title: 'WhatsApp API',
          links: [
            { _key: 'co', label: 'Coexistence', href: '/coexistence', icon: 'GitMerge', description: 'Personal + Business WhatsApp' },
            { _key: 'tp', label: 'Message Templates', href: '/whatsapp-api/templates', icon: 'FileText', description: 'Pre-approved message formats' },
            { _key: 'bc', label: 'Broadcast Messages', href: '/whatsapp-api/broadcast', icon: 'Send', description: 'Reach thousands instantly' },
            { _key: 'all', label: 'View all features', href: '/features' },
          ],
        },
      ],
    },
    {
      _key: 'integrations',
      label: 'Integrations',
      isMegaMenu: true,
      menuType: 'integrations' as const,
      columns: [
        {
          _key: 'popular',
          title: 'Popular CRMs',
          links: [
            { _key: 'hs', label: 'HubSpot', href: '/integrations/hubspot', icon: 'CircleDot', description: 'Bi-directional sync' },
            { _key: 'sf', label: 'Salesforce', href: '/integrations/salesforce', icon: 'Cloud', description: 'Enterprise-grade integration' },
            { _key: 'zo', label: 'Zoho CRM', href: '/integrations/zoho', icon: 'Database', description: 'Full contact sync' },
            { _key: 'pd', label: 'Pipedrive', href: '/integrations/pipedrive', icon: 'Target', description: 'Pipeline automation' },
          ],
        },
        {
          _key: 'more-crms',
          title: 'More CRMs',
          links: [
            { _key: 'bi', label: 'Bitrix24', href: '/integrations/bitrix24', icon: 'Layers', description: 'All-in-one workspace' },
            { _key: 'ls', label: 'LeadSquared', href: '/integrations/leadsquared', icon: 'BarChart2', description: 'Sales execution CRM' },
            { _key: 'fd', label: 'Freshdesk', href: '/integrations/freshdesk', icon: 'Headphones', description: 'Support ticket sync' },
          ],
        },
        {
          _key: 'productivity',
          title: 'Productivity',
          links: [
            { _key: 'gs', label: 'Google Sheets', href: '/integrations/google-sheets', icon: 'Table', description: 'Export & analyze data' },
            { _key: 'gc', label: 'Google Calendar', href: '/integrations/google-calendar', icon: 'Calendar', description: 'Schedule follow-ups' },
            { _key: 'wh', label: 'Webhooks', href: '/integrations/webhooks', icon: 'Webhook', description: 'Custom automations' },
            { _key: 'all', label: 'View all integrations', href: '/integrations' },
          ],
        },
      ],
    },
    {
      _key: 'solutions',
      label: 'Solutions',
      isMegaMenu: true,
      menuType: 'solutions' as const,
      columns: [
        {
          _key: 'by-team',
          title: 'By Team',
          links: [
            { _key: 'sales', label: 'Sales Teams', href: '/solutions/sales', icon: 'TrendingUp', description: 'Close deals faster on WhatsApp' },
            { _key: 'support', label: 'Customer Support', href: '/solutions/support', icon: 'HeartHandshake', description: 'Resolve issues in real-time' },
            { _key: 'marketing', label: 'Marketing', href: '/solutions/marketing', icon: 'Megaphone', description: 'Campaigns that convert' },
          ],
        },
        {
          _key: 'by-size',
          title: 'By Company Size',
          links: [
            { _key: 'startup', label: 'Startups', href: '/solutions/startups', icon: 'Rocket', description: 'Scale your outreach' },
            { _key: 'smb', label: 'Small Business', href: '/solutions/small-business', icon: 'Building', description: 'Professional WhatsApp tools' },
            { _key: 'enterprise', label: 'Enterprise', href: '/solutions/enterprise', icon: 'Building2', description: 'Security & compliance ready' },
          ],
        },
      ],
    },
    {
      _key: 'resources',
      label: 'Resources',
      isMegaMenu: true,
      menuType: 'resources' as const,
      columns: [
        {
          _key: 'learn',
          title: 'Learn',
          links: [
            { _key: 'blog', label: 'Blog', href: '/blog', icon: 'FileText', description: 'Tips, guides & updates' },
            { _key: 'cs', label: 'Case Studies', href: '/blog?category=case-studies', icon: 'Award', description: 'Customer success stories' },
            { _key: 'webinars', label: 'Webinars', href: 'https://eazybe.com/webinars', icon: 'Video', description: 'Live demos & training', isExternal: true },
          ],
        },
        {
          _key: 'support',
          title: 'Support',
          links: [
            { _key: 'help', label: 'Help Center', href: 'https://help.eazybe.com', icon: 'HelpCircle', description: 'Guides & tutorials', isExternal: true },
            { _key: 'docs', label: 'Documentation', href: 'https://docs.eazybe.com', icon: 'BookOpen', description: 'Technical reference', isExternal: true },
            { _key: 'api', label: 'API Reference', href: 'https://api.eazybe.com', icon: 'Code', description: 'For developers', isExternal: true },
          ],
        },
      ],
    },
    {
      _key: 'pricing',
      label: 'Pricing',
      href: '/pricing',
      isMegaMenu: false,
    },
  ],
  ctaButton: { label: 'Start Free Trial', href: 'https://app.eazybe.com/signup', variant: 'primary' as const },
  signInButton: { label: 'Sign In', href: 'https://app.eazybe.com/login' },
}

interface NavItemWithDropdownProps {
  item: NavItem & { menuType?: string }
  isActive: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
}

const NavItemWithDropdown: React.FC<NavItemWithDropdownProps> = ({
  item,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const isMegaMenu = item.isMegaMenu && item.columns?.length

  if (!isMegaMenu && item.href) {
    const isExternal = item.isExternal || item.href.startsWith('http')
    const LinkComponent = isExternal ? 'a' : Link
    const linkProps = isExternal
      ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
      : { to: item.href }

    return (
      <LinkComponent
        {...(linkProps as any)}
        className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group px-4 py-2"
      >
        {item.label}
        <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-blue scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
      </LinkComponent>
    )
  }

  const menuType = (item as any).menuType as 'platform' | 'integrations' | 'resources' | 'solutions' | undefined

  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        onClick={onClick}
        className={`flex items-center gap-1.5 text-sm font-medium transition-colors relative group px-4 py-2 ${
          isActive ? 'text-white' : 'text-slate-300 hover:text-white'
        }`}
      >
        {item.label}
        {isMegaMenu && (
          <motion.span
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={14} className={isActive ? 'text-brand-blue' : 'text-slate-400'} />
          </motion.span>
        )}
        <span
          className={`absolute bottom-0 left-4 right-4 h-0.5 bg-brand-blue transition-transform origin-left ${
            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`}
        />
      </button>

      {isMegaMenu && item.columns && (
        <MegaMenuDropdown
          columns={item.columns}
          isOpen={isActive}
          onClose={() => {}}
          menuType={menuType || 'default'}
          featured={menuType === 'platform' ? platformFeatured : undefined}
        />
      )}
    </div>
  )
}

export const MegaMenuHeader: React.FC = () => {
  const { data: cmsNavigation } = useNavigation('main-nav')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const headerRef = useRef<HTMLElement>(null)

  // Use CMS data with fallback
  const navigation = cmsNavigation || fallbackNavigation

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null)
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleMouseEnter = useCallback((key: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setActiveDropdown(key)
  }, [])

  const handleMouseLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 100)
  }, [])

  const handleClick = useCallback((key: string) => {
    setActiveDropdown((prev) => (prev === key ? null : key))
  }, [])

  return (
    <nav
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-black/95 backdrop-blur-xl border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 bg-brand-surface rounded-lg flex items-center justify-center border border-white/10 group-hover:border-brand-blue/30 transition-colors duration-300 p-1.5">
              <img
                src="/logo.png"
                alt="Eazybe Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-sans font-bold text-xl tracking-tight text-white group-hover:text-brand-blue transition-colors">
              Eazybe
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center">
            {navigation.items.map((item) => (
              <NavItemWithDropdown
                key={item._key}
                item={item}
                isActive={activeDropdown === item._key}
                onMouseEnter={() => handleMouseEnter(item._key)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(item._key)}
              />
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2">
            {navigation.signInButton && (
              <a
                href={navigation.signInButton.href || '#'}
                className="font-medium text-sm text-slate-300 hover:text-white px-4 py-2 transition-colors"
              >
                {navigation.signInButton.label || 'Sign In'}
              </a>
            )}
            {navigation.ctaButton && (
              <Button
                variant="primary"
                size="md"
                className="font-semibold px-5 py-2 text-sm"
                onClick={() => {
                  if (navigation.ctaButton?.href) {
                    window.location.href = navigation.ctaButton.href
                  }
                }}
              >
                {navigation.ctaButton.label || 'Get Started'}
              </Button>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-brand-blue focus:outline-none p-2 -mr-2"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={26} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={26} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        items={navigation.items}
        ctaButton={navigation.ctaButton}
        signInButton={navigation.signInButton}
      />
    </nav>
  )
}

export default MegaMenuHeader
