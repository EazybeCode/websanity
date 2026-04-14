'use client'

import React, { useState, useEffect, useRef, useCallback, lazy, Suspense, useTransition } from 'react'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { MobileMenu } from './MobileMenu'

// Lazy load MegaMenuDropdown - only loads when user opens dropdown (contains lots of icons)
const MegaMenuDropdown = lazy(() => import('./MegaMenuDropdown').then(m => ({ default: m.MegaMenuDropdown })))
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from './ThemeToggle'
import { useNavigation, type NavItem } from '@/hooks/useNavigation'
import { useTheme } from '@/hooks/useTheme'
import { LocalizedLink } from '@/components/LocalizedLink'
import { useTrialModal } from '@/providers/TrialModalProvider'

// Debounce utility for better INP
function useDebounce<T extends (...args: unknown[]) => void>(callback: T, delay: number): T {
  const timeoutRef = useRef<NodeJS.Timeout>(null)
  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => callback(...args), delay)
  }, [callback, delay]) as T
}

// Featured content for Platform menu only
const platformFeatured = {
  badge: 'New',
  title: 'Revenue Inbox',
  description: 'AI-powered deal insights that surface revenue opportunities hidden in your WhatsApp conversations.',
  href: '/features/revenue-inbox',
}

// Fallback navigation data when CMS is not configured
const getFallbackNavigation = (t: (key: string) => string) => ({
  items: [
    {
      _key: 'platform',
      label: t('nav.platform'),
      isMegaMenu: true,
      menuType: 'platform' as const,
      columns: [
        {
          _key: 'productivity',
          title: t('nav.menu.productivityTools'),
          links: [
            { _key: 'cb', label: t('nav.menu.cloudBackup'), href: '/features/cloud-backup', icon: 'CloudUpload', description: t('nav.menu.cloudBackupDesc') },
            { _key: 'ti', label: t('nav.menu.teamInbox'), href: '/features/team-inbox', icon: 'Inbox', description: t('nav.menu.teamInboxDesc') },
            { _key: 'qr', label: t('nav.menu.quickReply'), href: '/features/quick-reply', icon: 'Zap', description: t('nav.menu.quickReplyDesc') },
            { _key: 'ms', label: t('nav.menu.messageScheduler'), href: '/features/scheduler', icon: 'Clock', description: t('nav.menu.messageSchedulerDesc') },
          ],
        },
        {
          _key: 'intelligence',
          title: t('nav.menu.salesIntelligence'),
          links: [
            { _key: 'ri', label: t('nav.menu.revenueInbox'), href: '/features/revenue-inbox', icon: 'TrendingUp', description: t('nav.menu.revenueInboxDesc') },
            { _key: 'rr', label: t('nav.menu.repRadar'), href: '/features/rep-radar', icon: 'Activity', description: t('nav.menu.repRadarDesc') },
            { _key: 'wc', label: t('nav.menu.whatsappCopilot'), href: '/features/whatsapp-copilot', icon: 'Sparkles', description: t('nav.menu.whatsappCopilotDesc') },
            { _key: 'crm', label: t('nav.menu.whatsappCrm'), href: '/features/whatsapp-crm', icon: 'LayoutGrid', description: t('nav.menu.whatsappCrmDesc') },
          ],
        },
        {
          _key: 'api',
          title: t('nav.menu.whatsappApi'),
          links: [
            { _key: 'co', label: t('nav.menu.coexistence'), href: '/whatsapp-api/coexistence', icon: 'GitMerge', description: t('nav.menu.coexistenceDesc') },
            { _key: 'tp', label: t('nav.menu.messageTemplates'), href: '/whatsapp-api/templates', icon: 'FileText', description: t('nav.menu.messageTemplatesDesc') },
            { _key: 'bc', label: t('nav.menu.broadcastMessages'), href: '/whatsapp-api/broadcast', icon: 'Send', description: t('nav.menu.broadcastMessagesDesc') },
            { _key: 'all', label: t('nav.menu.viewAllFeatures'), href: '/features' },
          ],
        },
      ],
    },
    {
      _key: 'integrations',
      label: t('nav.integrations'),
      isMegaMenu: true,
      menuType: 'integrations' as const,
      columns: [
        {
          _key: 'popular',
          title: t('nav.menu.popularCrms'),
          links: [
            { _key: 'hs', label: 'HubSpot', href: '/hubspot-whatsapp-integration', icon: 'CircleDot', description: t('nav.menu.hubspotDesc') },
            { _key: 'sf', label: 'Salesforce', href: '/salesforce-whatsapp-integration', icon: 'Cloud', description: t('nav.menu.salesforceDesc') },
            { _key: 'zo', label: 'Zoho CRM', href: '/zoho-whatsapp-integration', icon: 'Database', description: t('nav.menu.zohoDesc') },
          ],
        },
        {
          _key: 'more-crms',
          title: t('nav.menu.moreCrms'),
          links: [
            { _key: 'bi', label: 'Bitrix24', href: '/bitrix24-whatsapp-integration', icon: 'Layers', description: t('nav.menu.bitrix24Desc') },
            { _key: 'ls', label: 'LeadSquared', href: '/leadsquared-whatsapp-integration', icon: 'BarChart2', description: t('nav.menu.leadsquaredDesc') },
            { _key: 'fd', label: 'Freshdesk', href: '/freshdesk-whatsapp-integration', icon: 'Headphones', description: t('nav.menu.freshdeskDesc') },
          ],
        },
        {
          _key: 'productivity',
          title: t('nav.menu.productivity'),
          links: [
            { _key: 'gs', label: 'Google Sheets', href: '/google-sheets-whatsapp-integration', icon: 'Table', description: t('nav.menu.googleSheetsDesc') },
            { _key: 'wh', label: 'Webhooks', href: '/webhooks-whatsapp-integration', icon: 'Webhook', description: t('nav.menu.webhooksDesc') },
            { _key: 'all', label: t('nav.menu.viewAllIntegrations'), href: '/integrations' },
          ],
        },
      ],
    },
    {
      _key: 'resources',
      label: t('nav.resources'),
      isMegaMenu: true,
      menuType: 'resources' as const,
      columns: [
        {
          _key: 'learn',
          title: t('nav.menu.learn'),
          links: [
            { _key: 'blog', label: t('nav.blog'), href: '/blog', icon: 'FileText', description: t('nav.menu.blogDesc') },
            { _key: 'cs', label: t('nav.menu.caseStudies'), href: '/blog?category=case-studies', icon: 'Award', description: t('nav.menu.caseStudiesDesc') },
            { _key: 'webinars', label: t('nav.menu.webinars'), href: 'https://eazybe.com/webinars', icon: 'Video', description: t('nav.menu.webinarsDesc'), isExternal: true },
          ],
        },
        {
          _key: 'support',
          title: t('nav.support'),
          links: [
            { _key: 'help', label: t('nav.menu.helpCenter'), href: 'https://help.eazybe.com', icon: 'HelpCircle', description: t('nav.menu.helpCenterDesc'), isExternal: true },
            { _key: 'contact', label: t('nav.menu.contact'), href: 'https://api.whatsapp.com/send/?phone=916364346419&text=I%20want%20to%20know%20more%20about%20Eazybe&type=phone_number&app_absent=0', icon: 'MessageCircle', description: t('nav.menu.contactDesc'), isExternal: true },
            { _key: 'email', label: t('nav.menu.email'), href: 'mailto:hey@eazybe.com', icon: 'Mail', description: t('nav.menu.emailDesc'), isExternal: true },
          ],
        },
      ],
    },
    {
      _key: 'pricing',
      label: t('nav.pricing'),
      href: '/pricing',
      isMegaMenu: false,
    },
  ],
  ctaButton: { label: t('nav.startFreeTrial'), href: 'https://chromewebstore.google.com/detail/eazybe-best-whatsapp-web/clgficggccelgifppbcaepjdkklfcefd', variant: 'primary' as const },
  signInButton: { label: t('nav.signIn'), href: 'https://app.eazybe.com/login' },
})

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

    if (isExternal) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-violet dark:hover:text-white transition-colors relative group px-4 py-2"
        >
          {item.label}
          <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-brand-blue to-brand-violet scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
        </a>
      )
    }

    return (
      <LocalizedLink
        href={item.href}
        className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-violet dark:hover:text-white transition-colors relative group px-4 py-2"
      >
        {item.label}
        <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-brand-blue to-brand-violet scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
      </LocalizedLink>
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
          isActive ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300 hover:text-brand-violet dark:hover:text-white'
        }`}
      >
        {item.label}
        {isMegaMenu && (
          <motion.span
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={14} className={isActive ? 'text-brand-violet' : 'text-slate-400 dark:text-slate-500'} />
          </motion.span>
        )}
        <span
          className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-brand-blue to-brand-violet transition-transform origin-left ${
            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`}
        />
      </button>

      {isMegaMenu && item.columns && (
        <Suspense fallback={null}>
          <MegaMenuDropdown
            columns={item.columns}
            isOpen={isActive}
            onClose={() => {}}
            menuType={menuType || 'default'}
            featured={menuType === 'platform' ? platformFeatured : undefined}
          />
        </Suspense>
      )}
    </div>
  )
}

export const MegaMenuHeader: React.FC = () => {
  const t = useTranslations()
  const { data: cmsNavigation } = useNavigation('main-nav')
  const { isDark } = useTheme()
  const { openModal } = useTrialModal()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const headerRef = useRef<HTMLElement>(null)
  const [isPending, startTransition] = useTransition()

  // Use CMS data with fallback
  const navigation = cmsNavigation || getFallbackNavigation(t)

  // Optimized scroll handler with passive listener
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
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
    startTransition(() => {
      setActiveDropdown(key)
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      startTransition(() => {
        setActiveDropdown(null)
      })
    }, 100)
  }, [])

  const handleClick = useCallback((key: string) => {
    startTransition(() => {
      setActiveDropdown((prev) => (prev === key ? null : key))
    })
  }, [])

  return (
    <nav
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-brand-black/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5 py-3 shadow-sm'
          : 'bg-gradient-to-r from-white/90 via-indigo-50/80 to-purple-50/80 dark:from-transparent dark:via-transparent dark:to-transparent backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          {/* Logo (left) */}
          <LocalizedLink
            href="/"
            className="flex-shrink-0 flex items-center cursor-pointer group"
          >
            <Image
              src="/logo.png"
              alt="Eazybe Logo"
              width={137}
              height={32}
              priority
              sizes="137px"
              className="h-8 w-auto object-contain"
              style={{ width: 'auto', height: '32px' }}
            />
          </LocalizedLink>

          {/* Desktop Links (center) */}
          <div className="hidden lg:flex items-center flex-1 justify-end mr-[200px]">
            {navigation.items.map((item, idx) => (
              <NavItemWithDropdown
                key={`${item._key}-${idx}`}
                item={item}
                isActive={activeDropdown === item._key}
                onMouseEnter={() => handleMouseEnter(item._key)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(item._key)}
              />
            ))}
          </div>

          {/* Desktop CTA (right) */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => openModal('demo')}
              className="font-medium text-sm text-slate-700 dark:text-slate-300 hover:text-brand-violet dark:hover:text-white px-4 py-2 transition-colors cursor-pointer"
            >
              {t('cta.bookDemo')}
            </button>
            {navigation.ctaButton && (
              <Button
                variant="primary"
                size="md"
                className="font-semibold px-5 py-2 text-sm"
                onClick={() => openModal('trial')}
              >
                {t('nav.startFreeTrial')}
              </Button>
            )}
            <LanguageSwitcher variant="desktop" />
            <ThemeToggle variant="desktop" />
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-900 dark:text-white hover:text-brand-violet dark:hover:text-brand-blue focus:outline-none p-2 -mr-2"
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
