import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Check,
  X,
  Minus,
  ChevronDown,
  MessageCircle
} from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { ChunkyFooter } from '../components/footer/ChunkyFooter'
import { useCategoryIndex } from '../hooks/useCategoryIndex'
import { getIcon, getFeatureIcon } from '../lib/iconMap'

// ================== UI Components ==================

interface SectionKickerProps {
  label: string
  className?: string
}

const SectionKicker: React.FC<SectionKickerProps> = ({ label, className = '' }) => {
  return (
    <span className={`inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full border text-cyan-500 border-cyan-500/20 bg-cyan-500/10 mb-6 select-none ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-cyan-500"></span>
      {label}
    </span>
  )
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center font-bold text-sm px-6 py-3 rounded-lg transition-all duration-200"

  const variants = {
    primary: "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-blue-600 hover:bg-blue-700",
    outline: "bg-transparent text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white"
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

// ================== Hero Section ==================

const HeroSection: React.FC<{ data: any }> = ({ data }) => {
  if (!data) return null

  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] blur-[120px] rounded-full -z-10 animate-pulse bg-blue-500/10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {data.badge && <SectionKicker label={data.badge} className="mx-auto" />}

          <h1 className="text-5xl lg:text-7xl font-sans font-extrabold tracking-tight text-white leading-[1.05] mb-6">
            {data.headline}{' '}
            <span className="text-cyan-500">{data.headlineHighlight}</span>
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-2xl mx-auto">
            {data.description}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {data.primaryCta && (
              data.primaryCta.url.startsWith('http') ? (
                <a href={data.primaryCta.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" className="h-14 px-8 text-base">
                    {data.primaryCta.label}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
              ) : (
                <Link to={data.primaryCta.url}>
                  <Button variant="primary" className="h-14 px-8 text-base">
                    {data.primaryCta.label}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              )
            )}
            {data.secondaryCta && (
              <Link to={data.secondaryCta.url}>
                <Button variant="outline" className="h-14 px-8 text-base">
                  {data.secondaryCta.label}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ================== Intro Section ==================

const IntroSection: React.FC<{ data: any }> = ({ data }) => {
  if (!data) return null

  return (
    <section className="py-16 bg-slate-900 border-t border-slate-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">{data.headline}</h2>
        <p className="text-lg text-slate-400 leading-relaxed whitespace-pre-line">
          {data.description}
        </p>
      </div>
    </section>
  )
}

// ================== Featured Items Grid ==================

const FeaturedItemsSection: React.FC<{ items: any[]; category: string; t: (key: string) => string; language: string }> = ({ items, category, t, language }) => {
  if (!items || items.length === 0) return null

  // Get language prefix for URLs
  const getLanguagePrefix = () => {
    if (language === 'br') return '/br'
    if (language === 'es') return '/es'
    if (language === 'tr') return '/tr'
    return ''
  }

  const langPrefix = getLanguagePrefix()

  // Generate the correct URL for each item based on category
  const getItemUrl = (item: any) => {
    if (category === 'feature') return `${langPrefix}/features/${item.slug}`
    if (category === 'whatsapp-api') return `${langPrefix}/whatsapp-api/${item.slug}`
    // For integrations, use the URL format: /{lang}/{slug}-whatsapp-integration
    // Check if slug already has the suffix to avoid duplication
    if (category === 'integration') {
      if (item.slug.endsWith('-whatsapp-integration')) {
        return `${langPrefix}/${item.slug}`
      }
      return `${langPrefix}/${item.slug}-whatsapp-integration`
    }
    return `${langPrefix}/${item.slug}`
  }

  // Separate featured and non-featured items
  const featuredItems = items.filter(item => item.isFeatured)
  const otherItems = items.filter(item => !item.isFeatured)

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Items */}
        {featuredItems.length > 0 && (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white">{t('categoryIndex.featuredTitle')}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {featuredItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={getItemUrl(item)}
                  className="group bg-slate-900 border border-slate-700 hover:border-slate-500 transition-all rounded-xl p-6 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: item.color }}></div>

                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: item.color }}>
                      {(() => {
                        const IconComponent = item.icon ? getIcon(item.icon) : getFeatureIcon(item.slug)
                        return <IconComponent size={24} strokeWidth={2} />
                      })()}
                    </div>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex gap-2">
                        {item.tags.slice(0, 2).map((tag: string, tIdx: number) => (
                          <span key={tIdx} className="text-xs font-medium px-2 py-1 rounded bg-slate-800 text-slate-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-slate-400 mb-4">{item.description}</p>

                  <div className="flex items-center text-cyan-500 font-medium text-sm group-hover:translate-x-1 transition-transform">
                    {t('categoryIndex.learnMore')} <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Other Items */}
        {otherItems.length > 0 && (
          <>
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-white">{t('categoryIndex.moreOptions')}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={getItemUrl(item)}
                  className="group bg-slate-800/50 border border-slate-700 hover:border-slate-500 transition-all rounded-lg p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: item.color }}>
                      {(() => {
                        const IconComponent = item.icon ? getIcon(item.icon) : getFeatureIcon(item.slug)
                        return <IconComponent size={20} strokeWidth={2} />
                      })()}
                    </div>
                    <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-400 line-clamp-2">{item.description}</p>
                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-3 flex gap-2">
                      {item.tags.slice(0, 1).map((tag: string, tIdx: number) => (
                        <span key={tIdx} className="text-xs px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

// ================== Comparison Table ==================

const ComparisonSection: React.FC<{ data: any }> = ({ data }) => {
  if (!data || !data.rows) return null

  const renderValue = (value: { type: string; text?: string }) => {
    switch (value.type) {
      case 'check':
        return <Check className="w-5 h-5 text-emerald-500 mx-auto" />
      case 'cross':
        return <X className="w-5 h-5 text-slate-600 mx-auto" />
      case 'partial':
        return <Minus className="w-5 h-5 text-amber-500 mx-auto" />
      case 'text':
        return <span className="text-sm text-slate-300">{value.text}</span>
      default:
        return null
    }
  }

  return (
    <section id="comparison" className="py-24 bg-slate-900 border-t border-slate-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">{data.headline}</h2>
          {data.description && (
            <p className="text-slate-400">{data.description}</p>
          )}
        </div>

        <div className="bg-slate-950 border border-slate-700 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="grid gap-4 p-6 bg-slate-800 border-b border-slate-700" style={{ gridTemplateColumns: `2fr repeat(${data.columns.length - 1}, 1fr)` }}>
            {data.columns.map((col: string, idx: number) => (
              <div key={idx} className={`font-mono text-sm font-bold uppercase tracking-wider ${idx === 0 ? 'text-slate-400 text-left' : 'text-cyan-500 text-center'}`}>
                {col}
              </div>
            ))}
          </div>

          {/* Rows */}
          {data.rows.map((row: any, idx: number) => (
            <div
              key={idx}
              className="grid gap-4 p-6 border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors"
              style={{ gridTemplateColumns: `2fr repeat(${data.columns.length - 1}, 1fr)` }}
            >
              <div className="font-medium text-slate-200">{row.feature}</div>
              {row.values.map((value: any, vIdx: number) => (
                <div key={vIdx} className="text-center">
                  {renderValue(value)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ================== Capabilities Section ==================

const CapabilitiesSection: React.FC<{ data: any }> = ({ data }) => {
  if (!data || !data.items) return null

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {data.badge && <SectionKicker label={data.badge} className="mx-auto" />}
          <h2 className="text-4xl font-sans font-bold text-white tracking-tight mb-2">
            {data.headline}{' '}
            <span className="text-cyan-500">{data.headlineHighlight}</span>
          </h2>
          {data.description && (
            <p className="text-lg text-slate-400 mt-4">
              {data.description}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item: any, idx: number) => {
            const IconComponent = item.icon ? getIcon(item.icon, MessageCircle) : MessageCircle
            return (
              <div key={idx} className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500 mb-4">
                  <IconComponent size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ================== Benefits Section ==================

const BenefitsSection: React.FC<{ data: any }> = ({ data }) => {
  if (!data || !data.items) return null

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {data.badge && <SectionKicker label={data.badge} className="mx-auto" />}
          <h2 className="text-4xl font-sans font-bold text-white tracking-tight">
            {data.headline}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item: any, idx: number) => {
            const IconComponent = item.icon ? getIcon(item.icon, CheckCircle2) : CheckCircle2
            return (
              <div key={idx} className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500 mb-4">
                  <IconComponent size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ================== How It Works Section ==================

const HowItWorksSection: React.FC<{ data: any }> = ({ data }) => {
  if (!data || !data.steps) return null

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {data.badge && <SectionKicker label={data.badge} className="mx-auto" />}
          <h2 className="text-4xl font-sans font-bold text-white tracking-tight mb-4">
            {data.headline}
          </h2>
          {data.description && (
            <p className="text-lg text-slate-400">{data.description}</p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {data.steps.map((step: any, idx: number) => (
            <div key={idx} className="relative text-center">
              <div className="text-7xl font-black text-cyan-500/20 mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-slate-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ================== FAQ Section ==================

const FAQSection: React.FC<{ data: any }> = ({ data }) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  if (!data || !data.items) return null

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {data.badge && <SectionKicker label={data.badge} className="mx-auto" />}
          <h2 className="text-4xl font-sans font-bold text-white tracking-tight">
            {data.headline}
          </h2>
        </div>

        <div className="space-y-4">
          {data.items.map((item: any, idx: number) => (
            <div key={idx} className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="font-semibold text-white">{item.question}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-4 text-slate-400">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ================== Integrations Grid Section ==================

const IntegrationsGridSection: React.FC<{ data: any[]; t: (key: string) => string }> = ({ data, t }) => {
  if (!data || data.length === 0) return null

  // Group integrations by category
  const categories = {
    crmIntegrations: t('categoryIndex.integrations.categories.crmIntegrations'),
    accountManagement: t('categoryIndex.integrations.categories.accountManagement'),
    productivity: t('categoryIndex.integrations.categories.productivity')
  }

  const groupedData: Record<string, any[]> = {
    crmIntegrations: [],
    accountManagement: [],
    productivity: []
  }

  data.forEach(item => {
    if (groupedData[item.category]) {
      groupedData[item.category].push(item)
    }
  })

  return (
    <section className="py-16 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {Object.entries(categories).map(([key, label]) => {
          const items = groupedData[key]
          if (!items || items.length === 0) return null

          return (
            <div key={key} className="mb-16 last:mb-0">
              <h3 className="text-xl font-bold text-white mb-6">{label}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800 border border-slate-700 hover:border-slate-500 transition-all rounded-lg p-5 group"
                  >
                    <h4 className="font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-sm text-slate-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ================== Pricing Preview Section ==================

const PricingPreviewSection: React.FC<{ data: any; language: string }> = ({ data, language }) => {
  if (!data) return null

  const getPricingPath = () => {
    if (language === 'br') return '/br/pricing'
    if (language === 'es') return '/es/pricing'
    if (language === 'tr') return '/tr/pricing'
    return '/pricing'
  }

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {data.badge && <SectionKicker label={data.badge} className="mx-auto" />}
        <h2 className="text-4xl font-bold text-white mb-4">
          {data.headline}{' '}
          <span className="text-cyan-500">{data.headlineHighlight}</span>
        </h2>
        <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
          {data.description}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {data.primaryCta && (
            <Link
              to={getPricingPath()}
              className="inline-flex items-center justify-center font-bold text-sm px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              {data.primaryCta}
            </Link>
          )}
          {data.secondaryCta && (
            <Link
              to="https://chromewebstore.google.com/detail/eazybe-best-whatsapp-web/clgficggccelgifppbcaepjdkklfcefd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-bold text-sm px-6 py-3 rounded-lg border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white transition-colors"
            >
              {data.secondaryCta}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

// ================== Integrations CTA Section ==================

const IntegrationsCtaSection: React.FC<{ data: any }> = ({ data }) => {
  if (!data) return null

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">{data.headline}</h2>
        <p className="text-lg text-slate-400 mb-8">{data.description}</p>
        <div className="flex flex-wrap justify-center gap-4">
          {data.primaryCta && (
            <a
              href={data.primaryCta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-bold text-sm px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              {data.primaryCta.label}
            </a>
          )}
          {data.secondaryCta && (
            <a
              href={data.secondaryCta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-bold text-sm px-6 py-3 rounded-lg border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white transition-colors"
            >
              {data.secondaryCta.label}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

// ================== Translation Helper ==================

const getTranslatedCategoryData = (slug: string, t: (key: string, options?: any) => any) => {
  const categoryKeyMap: Record<string, string> = {
    'features': 'features',
    'integrations': 'integrations',
    'whatsapp-api': 'whatsappApi'
  }

  const categoryKey = categoryKeyMap[slug]
  if (!categoryKey) return null

  // Check if translations exist
  const heroData = t(`categoryIndex.${categoryKey}.hero`, { returnObjects: true })
  if (typeof heroData === 'string') return null

  // Helper to safely get translation or return null
  const getIntro = () => {
    const headline = t(`categoryIndex.${categoryKey}.intro.headline`)
    return typeof headline === 'string' ? {
      badge: t(`categoryIndex.${categoryKey}.intro.badge`),
      headline: headline,
      description: t(`categoryIndex.${categoryKey}.intro.description`)
    } : null
  }

  const getIntegrationsList = () => {
    const list = t(`categoryIndex.${categoryKey}.integrationsList`, { returnObjects: true })
    return Array.isArray(list) ? list : []
  }

  const getIntegrationsCta = () => {
    const headline = t(`categoryIndex.${categoryKey}.cta.headline`)
    return typeof headline === 'string' ? {
      headline: headline,
      description: t(`categoryIndex.${categoryKey}.cta.description`),
      primaryCta: { label: t(`categoryIndex.${categoryKey}.cta.primaryCta`), url: 'https://chromewebstore.google.com/detail/eazybe-best-whatsapp-web/clgficggccelgifppbcaepjdkklfcefd' },
      secondaryCta: { label: t(`categoryIndex.${categoryKey}.cta.secondaryCta`), url: 'https://calendly.com/eazybe/demo' }
    } : null
  }

  const getFeaturedItems = () => {
    const items = t(`categoryIndex.${categoryKey}.featuredItems`, { returnObjects: true })
    return Array.isArray(items) ? items : null
  }

  const getCapabilities = () => {
    const headline = t(`categoryIndex.${categoryKey}.capabilities.headline`)
    return typeof headline === 'string' ? {
      badge: t(`categoryIndex.${categoryKey}.capabilities.badge`),
      headline: headline,
      headlineHighlight: t(`categoryIndex.${categoryKey}.capabilities.headlineHighlight`),
      description: t(`categoryIndex.${categoryKey}.capabilities.description`),
      items: t(`categoryIndex.${categoryKey}.capabilities.items`, { returnObjects: true }) || []
    } : null
  }

  const getPricing = () => {
    const headline = t(`categoryIndex.${categoryKey}.pricing.headline`)
    return typeof headline === 'string' ? {
      badge: t(`categoryIndex.${categoryKey}.pricing.badge`),
      headline: headline,
      headlineHighlight: t(`categoryIndex.${categoryKey}.pricing.headlineHighlight`),
      description: t(`categoryIndex.${categoryKey}.pricing.description`),
      primaryCta: t(`categoryIndex.${categoryKey}.pricing.primaryCta`),
      secondaryCta: t(`categoryIndex.${categoryKey}.pricing.secondaryCta`)
    } : null
  }

  return {
    hero: {
      badge: t(`categoryIndex.${categoryKey}.hero.badge`),
      headline: t(`categoryIndex.${categoryKey}.hero.headline`),
      headlineHighlight: t(`categoryIndex.${categoryKey}.hero.headlineHighlight`),
      description: t(`categoryIndex.${categoryKey}.hero.description`),
      primaryCta: { label: t(`categoryIndex.${categoryKey}.hero.primaryCta`), url: 'https://chromewebstore.google.com/detail/eazybe-best-whatsapp-web/clgficggccelgifppbcaepjdkklfcefd' },
      secondaryCta: { label: t(`categoryIndex.${categoryKey}.hero.secondaryCta`), url: '#features' }
    },
    intro: getIntro(),
    featuredItems: getFeaturedItems(),
    integrationsList: getIntegrationsList(),
    integrationsCta: getIntegrationsCta(),
    capabilities: categoryKey === 'features' ? getCapabilities() : null,
    pricing: categoryKey === 'features' ? getPricing() : null,
    benefits: categoryKey === 'features' ? {
      badge: t(`categoryIndex.${categoryKey}.benefits.badge`),
      headline: t(`categoryIndex.${categoryKey}.benefits.headline`),
      items: t(`categoryIndex.${categoryKey}.benefits.items`, { returnObjects: true }) || []
    } : null,
    howItWorks: categoryKey === 'features' ? {
      badge: t(`categoryIndex.${categoryKey}.howItWorks.badge`),
      headline: t(`categoryIndex.${categoryKey}.howItWorks.headline`),
      steps: t(`categoryIndex.${categoryKey}.howItWorks.steps`, { returnObjects: true }) || []
    } : null,
    faq: categoryKey === 'features' ? {
      badge: t(`categoryIndex.${categoryKey}.faq.badge`),
      headline: t(`categoryIndex.${categoryKey}.faq.headline`),
      items: t(`categoryIndex.${categoryKey}.faq.items`, { returnObjects: true }) || []
    } : null,
    // Set category based on slug for FeaturedItemsSection
    category: slug === 'integrations' ? 'integration' : slug === 'whatsapp-api' ? 'whatsapp-api' : 'feature'
  }
}

// ================== Main CategoryIndexPage Component ==================

export const CategoryIndexPage: React.FC = () => {
  const { t, i18n } = useTranslation()
  const location = useLocation()

  // Determine language based on current path
  const getLanguageFromPath = () => {
    const match = location.pathname.match(/^\/(br|es|tr)(\/|$)/)
    return match ? match[1] : 'en'
  }

  // Determine slug based on current path (strip language prefix first)
  const getSlugFromPath = () => {
    // Remove language prefix (/br, /es, /tr) from pathname
    const cleanPath = location.pathname.replace(/^\/(br|es|tr)\//, '/').replace(/^\/(br|es|tr)$/, '/')

    if (cleanPath === '/features' || cleanPath.startsWith('/features')) return 'features'
    if (cleanPath === '/integrations' || cleanPath.startsWith('/integrations')) return 'integrations'
    if (cleanPath === '/whatsapp-api' || cleanPath.startsWith('/whatsapp-api')) return 'whatsapp-api'
    return 'features'
  }

  const language = getLanguageFromPath()
  const slug = getSlugFromPath()
  const { data: sanityData, loading, error } = useCategoryIndex(slug, language)

  // Add meta tags for /integrations page - MUST be before any early returns to follow React's Rules of Hooks
  useEffect(() => {
    const schemaIds = [
      'integrations-faq-schema',
      'integrations-org-schema',
      'integrations-itemlist-schema',
      'integrations-breadcrumb-schema',
      'integrations-webpage-schema',
      'integrations-website-schema',
      'integrations-softwareapp-schema',
      'integrations-softwareapp-br-schema',
      'integrations-softwareapp-es-schema',
      'integrations-softwareapp-tr-schema'
    ];

    // Check if current path is an integrations page (any locale)
    const isIntegrationsPage = location.pathname === '/integrations' ||
                               location.pathname === '/integrations/' ||
                               location.pathname.startsWith('/integrations/') ||
                               location.pathname === '/br/integrations' ||
                               location.pathname === '/br/integrations/' ||
                               location.pathname.startsWith('/br/integrations/') ||
                               location.pathname === '/es/integrations' ||
                               location.pathname === '/es/integrations/' ||
                               location.pathname.startsWith('/es/integrations/') ||
                               location.pathname === '/tr/integrations' ||
                               location.pathname === '/tr/integrations/' ||
                               location.pathname.startsWith('/tr/integrations/');

    if (isIntegrationsPage) {
      // Helper function to set or update meta tag
      const setMetaTag = (name: string, content: string, isProperty = false) => {
        let element: HTMLMetaElement | null = document.querySelector(
          isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
        );
        if (!element) {
          element = document.createElement('meta');
          if (isProperty) {
            (element as any).setAttribute('property', name);
          } else {
            element.name = name;
          }
          document.head.appendChild(element);
        }
        element.setAttribute('content', content);
      };

      // Get localized URL and language code
      const getLocalizedData = () => {
        const langMap: Record<string, { url: string; locale: string; title: string; description: string; keywords: string }> = {
          'en': {
            url: 'https://eazybe.com/integrations',
            locale: 'en_US',
            title: 'WhatsApp CRM Integrations | Connect CRM With Business Tools',
            description: 'Connect WhatsApp with HubSpot, Zoho, Salesforce, Google Sheets and more using Eazybe. Sync chats, automate workflows, and manage customer conversations across all your CRM integrations.',
            keywords: 'WhatsApp CRM integrations, WhatsApp HubSpot integration, WhatsApp Salesforce integration, WhatsApp Zoho integration, CRM WhatsApp integration, WhatsApp business integrations, Eazybe integrations'
          },
          'br': {
            url: 'https://eazybe.com/br/integrations',
            locale: 'pt_BR',
            title: 'Integrações de CRM WhatsApp | Conecte CRM com Ferramentas de Negócios',
            description: 'Conecte WhatsApp com HubSpot, Zoho, Salesforce, Google Sheets e mais usando Eazybe. Sincronize conversas, automatize fluxos de trabalho e gerencie conversas de clientes em todas as integrações de CRM.',
            keywords: 'integrações CRM WhatsApp, integração WhatsApp HubSpot, integração WhatsApp Salesforce, integração WhatsApp Zoho, integração CRM WhatsApp, integrações WhatsApp negócios, integrações Eazybe'
          },
          'es': {
            url: 'https://eazybe.com/es/integrations',
            locale: 'es_ES',
            title: 'Integraciones de CRM WhatsApp | Conecta CRM con Herramientas de Negocio',
            description: 'Conecta WhatsApp con HubSpot, Zoho, Salesforce, Google Sheets y más usando Eazybe. Sincroniza conversaciones, automatiza flujos de trabajo y gestiona la comunicación de clientes en todas las integraciones de CRM.',
            keywords: 'integraciones CRM WhatsApp, integración WhatsApp HubSpot, integración WhatsApp Salesforce, integración WhatsApp Zoho, integración CRM WhatsApp, integraciones WhatsApp negocios, integraciones Eazybe'
          },
          'tr': {
            url: 'https://eazybe.com/tr/integrations',
            locale: 'tr_TR',
            title: 'WhatsApp CRM Entegrasyonları | CRM\'i İş Araçlarıyla Bağlayın',
            description: 'Eazybe kullanarak WhatsApp\'ı HubSpot, Zoho, Salesforce, Google Sheets ve daha fazlasıyla bağlayın. Sohbetleri senkronize edin, iş akışlarını otomatikleştirin ve tüm CRM entegrasyonlarında müşteri iletişimini yönetin.',
            keywords: 'WhatsApp CRM entegrasyonları, WhatsApp HubSpot entegrasyonu, WhatsApp Salesforce entegrasyonu, WhatsApp Zoho entegrasyonu, CRM WhatsApp entegrasyonu, WhatsApp iş entegrasyonları, Eazybe entegrasyonları'
          }
        };
        return langMap[language] || langMap['en'];
      };

      const localizedData = getLocalizedData();

      // Set page title
      document.title = localizedData.title;

      // Basic meta tags
      setMetaTag('description', localizedData.description);
      setMetaTag('keywords', localizedData.keywords);
      setMetaTag('author', 'Eazybe');
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
      setMetaTag('bingbot', 'index, follow');
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png');

      // Article meta tags
      setMetaTag('article:section', 'Integrations', true);
      setMetaTag('article:tag', 'WhatsApp CRM Integrations', true);

      // Open Graph meta tags
      setMetaTag('og:type', 'website', true);
      setMetaTag('og:url', localizedData.url, true);
      setMetaTag('og:title', localizedData.title, true);
      setMetaTag('og:description', localizedData.description, true);
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true);
      setMetaTag('og:image:width', '1200', true);
      setMetaTag('og:image:height', '630', true);
      setMetaTag('og:image:alt', 'Eazybe WhatsApp CRM Integrations Platform', true);
      setMetaTag('og:locale', localizedData.locale, true);
      setMetaTag('og:site_name', 'Eazybe', true);

      // Twitter Card meta tags
      setMetaTag('twitter:card', 'summary_large_image');
      setMetaTag('twitter:site', '@eazybe');
      setMetaTag('twitter:creator', '@eazybe');
      setMetaTag('twitter:title', localizedData.title);
      setMetaTag('twitter:description', localizedData.description);
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png');
      setMetaTag('twitter:image:alt', 'WhatsApp CRM Integrations by Eazybe');

      // Twitter Card labels
      setMetaTag('twitter:label1', 'Category');
      setMetaTag('twitter:data1', 'CRM Integrations');
      setMetaTag('twitter:label2', 'Platform');
      setMetaTag('twitter:data2', 'WhatsApp Automation');

      // Mobile web app tags
      setMetaTag('mobile-web-app-capable', 'yes');
      setMetaTag('apple-mobile-web-app-capable', 'yes');
      setMetaTag('apple-mobile-web-app-status-bar-style', 'default');
      setMetaTag('apple-mobile-web-app-title', 'Eazybe');

      // AI and SEO specific meta tags
      setMetaTag('answer-type', 'product-information, integrations, feature-list');
      setMetaTag('target-audience', 'sales teams, CRM users, business owners, support teams, SaaS companies');
      setMetaTag('content-intent', 'commercial-investigation, transactional');
      setMetaTag('conversational-query', 'WhatsApp CRM integrations, connect WhatsApp to CRM, WhatsApp integrations for sales teams');
      setMetaTag('ai-readability', 'professional, solution-oriented');
      setMetaTag('context-window', 'WhatsApp automation, CRM sync, customer communication, sales workflow automation');
      setMetaTag('user-problem', 'WhatsApp conversations not connected to CRM systems');
      setMetaTag('solution-summary', 'centralized WhatsApp integrations with CRM and business tools');
      setMetaTag('primary-benefit', 'manage WhatsApp conversations inside your CRM');
      setMetaTag('use-case', 'businesses connecting WhatsApp with CRM platforms and productivity tools');
      setMetaTag('implementation-difficulty', 'easy integration setup');
      setMetaTag('time-to-value', 'instant synchronization after connection');
      setMetaTag('referrer', 'origin-when-cross-origin');

      // Helper function to add JSON-LD schema
      const addJsonLdSchema = (schemaId: string, schemaData: any) => {
        // Remove existing schema with same ID if present
        const existing = document.getElementById(schemaId);
        if (existing) {
          existing.remove();
        }

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = schemaId;
        script.text = JSON.stringify(schemaData);
        document.head.appendChild(script);
      };

      // Add FAQPage Schema
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "inLanguage": localizedData.locale,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What integrations does Eazybe support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe integrates WhatsApp with leading CRM and business tools including HubSpot, Zoho CRM, Salesforce, Bitrix24, LeadSquared, Google Sheets, webhooks, and other sales automation platforms."
            }
          },
          {
            "@type": "Question",
            "name": "How does WhatsApp CRM integration work with Eazybe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe connects WhatsApp conversations directly with your CRM, automatically syncing contacts, messages, notes, and deal activity so sales teams can manage customer communication without manual updates."
            }
          },
          {
            "@type": "Question",
            "name": "Can I sync WhatsApp chats automatically with my CRM?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Eazybe automatically syncs WhatsApp chats, customer details, and conversation history with supported CRM platforms in real time."
            }
          },
          {
            "@type": "Question",
            "name": "Does Eazybe support custom integrations using webhooks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Eazybe provides webhook integrations that allow businesses to connect WhatsApp with custom systems, internal tools, or third-party applications."
            }
          },
          {
            "@type": "Question",
            "name": "Can teams collaborate using integrated WhatsApp inboxes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe offers a shared WhatsApp team inbox where multiple agents can manage conversations, assign chats, and collaborate while keeping CRM data synchronized."
            }
          },
          {
            "@type": "Question",
            "name": "Do integrations require coding or technical setup?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No coding is required. Most integrations can be activated with a one-click setup and guided authentication process inside the Eazybe dashboard."
            }
          },
          {
            "@type": "Question",
            "name": "Can AI agents work across integrated CRM platforms?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Eazybe AI agents can automate replies, qualify leads, and assist customer conversations across integrated CRM systems while maintaining conversation context."
            }
          },
          {
            "@type": "Question",
            "name": "Is WhatsApp data secure when integrated with CRM tools?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe uses secure authentication, encrypted data transfer, and permission-based access controls to ensure WhatsApp and CRM data remain protected."
            }
          }
        ]
      };
      addJsonLdSchema('integrations-faq-schema', faqSchema);

      // Add Organization Schema
      const orgSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Eazybe",
        "url": "https://eazybe.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://eazybe.com/logo.png",
          "width": 600,
          "height": 60
        },
        "image": "https://eazybe.com/logo.png",
        "description": "Eazybe helps sales teams connect WhatsApp with CRM platforms to sync conversations, automate follow-ups, and improve customer engagement.",
        "foundingDate": "2021",
        "sameAs": [
          "https://twitter.com/eazybe",
          "https://linkedin.com/company/eazybe",
          "https://youtube.com/@eazybe"
        ],
        "publishingPrinciples": "https://eazybe.com/blog",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8, The Green STE B",
          "addressLocality": "Dover",
          "addressRegion": "Delaware",
          "postalCode": "19901",
          "addressCountry": "US"
        },
        "knowsAbout": [
          "WhatsApp CRM",
          "CRM integration",
          "Sales automation",
          "Shared inbox",
          "WhatsApp productivity"
        ]
      };
      addJsonLdSchema('integrations-org-schema', orgSchema);

      // Add ItemList Schema for all integrations
      const getIntegrationUrl = (slug: string) => {
        const langPrefix = language === 'en' ? '' : `/${language}`;
        return `https://eazybe.com${langPrefix}/${slug}`;
      };

      const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Eazybe Integrations",
        "description": "WhatsApp integrations supported by Eazybe.",
        "itemListOrder": "https://schema.org/ItemListUnordered",
        "numberOfItems": 11,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "SoftwareApplication",
              "name": "HubSpot WhatsApp Integration",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Extension",
              "url": getIntegrationUrl('hubspot-whatsapp-integration')
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Salesforce WhatsApp Integration",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Extension",
              "url": getIntegrationUrl('salesforce-whatsapp-integration')
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Zoho WhatsApp Integration",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Extension",
              "url": getIntegrationUrl('zoho-whatsapp-integration')
            }
          },
          {
            "@type": "ListItem",
            "position": 4,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Bitrix24 WhatsApp Integration",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Extension",
              "url": getIntegrationUrl('bitrix24-whatsapp-integration')
            }
          },
          {
            "@type": "ListItem",
            "position": 5,
            "item": {
              "@type": "SoftwareApplication",
              "name": "LeadSquared WhatsApp Integration",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Extension",
              "url": getIntegrationUrl('leadsquared-whatsapp-integration')
            }
          },
          {
            "@type": "ListItem",
            "position": 6,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Freshdesk WhatsApp Integration",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Extension",
              "url": getIntegrationUrl('freshdesk-whatsapp-integration')
            }
          },
          {
            "@type": "ListItem",
            "position": 7,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Google Sheets WhatsApp Integration",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Extension",
              "url": getIntegrationUrl('google-sheets-whatsapp-integration')
            }
          },
          {
            "@type": "ListItem",
            "position": 8,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Webhooks & Custom Integrations",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Extension",
              "url": getIntegrationUrl('webhooks-whatsapp-integration')
            }
          },
          {
            "@type": "ListItem",
            "position": 9,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Pipedrive WhatsApp Integration",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Extension",
              "url": getIntegrationUrl('pipedrive-whatsapp-integration')
            }
          },
          {
            "@type": "ListItem",
            "position": 10,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Monday WhatsApp Integrations",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Extension",
              "url": getIntegrationUrl('monday-whatsapp-integration')
            }
          },
          {
            "@type": "ListItem",
            "position": 11,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Google WhatsApp Integrations",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Extension",
              "url": getIntegrationUrl('google-calendar-whatsapp-integration')
            }
          }
        ]
      };
      addJsonLdSchema('integrations-itemlist-schema', itemListSchema);

      // Add BreadcrumbList Schema
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Eazybe",
            "item": language === 'en' ? 'https://eazybe.com/' : `https://eazybe.com/${language}`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Integrations",
            "item": localizedData.url
          }
        ]
      };
      addJsonLdSchema('integrations-breadcrumb-schema', breadcrumbSchema);

      // Add WebPage/CollectionPage Schema
      const webPageSchema = {
        "@context": "https://schema.org",
        "@type": ["WebPage", "CollectionPage"],
        "url": localizedData.url,
        "name": localizedData.title,
        "description": localizedData.description,
        "inLanguage": localizedData.locale,
        "isPartOf": {
          "@type": "WebSite",
          "url": "https://eazybe.com/",
          "name": "Eazybe"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Eazybe",
          "url": "https://eazybe.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://eazybe.com/logo.png",
            "width": 600,
            "height": 60
          }
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://eazybe.com/logo.png",
          "width": 1200,
          "height": 630
        },
        "about": [
          { "@type": "Thing", "name": "WhatsApp CRM Integrations" },
          { "@type": "Thing", "name": "Sales Automation" },
          { "@type": "Thing", "name": "Customer Communication" }
        ]
      };
      addJsonLdSchema('integrations-webpage-schema', webPageSchema);

      // Add WebSite Schema
      const webSiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://eazybe.com/",
        "name": "Eazybe",
        "description": "Eazybe helps teams integrate WhatsApp with CRM and business tools to sync chats, automate workflows, and improve sales productivity.",
        "inLanguage": "en-US",
        "publisher": {
          "@type": "Organization",
          "name": "Eazybe",
          "url": "https://eazybe.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://eazybe.com/logo.png",
            "width": 600,
            "height": 60
          }
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://eazybe.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      };
      addJsonLdSchema('integrations-website-schema', webSiteSchema);

      // Add SoftwareApplication Schema (only for English /integrations page)
      if (language === 'en') {
        const softwareAppSchema = {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "WhatsApp CRM Integration - Eazybe",
          "applicationCategory": "BusinessApplication",
          "applicationSubCategory": "CRM Integration, WhatsApp Automation, AI Agents for WhatsApp",
          "operatingSystem": "Web, Chrome Extension",
          "offers": {
            "@type": "AggregateOffer",
            "url": "https://eazybe.com/pricing",
            "priceCurrency": "USD",
            "lowPrice": 29,
            "highPrice": 49,
            "offerCount": 5,
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.7",
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": 53766
          },
          "featureList": [
            "Automatic WhatsApp to CRM sync",
            "AI-powered reply suggestions",
            "Shared inbox for team collaboration",
            "Deal tracking from WhatsApp",
            "Contact synchronization",
            "Message scheduling",
            "AI Agents for CRM"
          ]
        };
        addJsonLdSchema('integrations-softwareapp-schema', softwareAppSchema);
      }

      // Add SoftwareApplication Schema for Brazilian Portuguese /br/integrations page
      if (language === 'br') {
        const brSoftwareAppSchema = {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Integrações WhatsApp CRM - Eazybe",
          "url": "https://eazybe.com/br/integrations",
          "applicationCategory": "BusinessApplication",
          "applicationSubCategory": "Integração CRM, Automação WhatsApp, Plataforma de Integrações",
          "operatingSystem": "Web, Extensão Chrome",
          "description": "Eazybe permite integrar o WhatsApp com CRMs e ferramentas de vendas como HubSpot, Zoho, Salesforce, Bitrix24, LeadSquared e Google Sheets para sincronizar conversas, automatizar follow-ups e melhorar a produtividade das equipes.",
          "image": "https://eazybe.com/logo.png",
          "offers": {
            "@type": "AggregateOffer",
            "url": "https://eazybe.com/br/pricing",
            "priceCurrency": "BRL",
            "lowPrice": 96,
            "highPrice": 162,
            "offerCount": 5,
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.7",
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": 53766
          },
          "featureList": [
            "Integração do WhatsApp com múltiplos CRMs",
            "Sincronização automática de conversas",
            "Caixa de entrada compartilhada para equipes",
            "Automação de mensagens e follow-ups",
            "Sincronização de contatos e negócios",
            "Integrações via Webhooks",
            "Agentes de IA para vendas e suporte",
            "Gestão de leads diretamente no WhatsApp"
          ],
          "inLanguage": "pt-BR"
        };
        addJsonLdSchema('integrations-softwareapp-br-schema', brSoftwareAppSchema);
      }

      // Add SoftwareApplication Schema for Spanish /es/integrations page
      if (language === 'es') {
        const esSoftwareAppSchema = {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Integraciones de WhatsApp con CRM - Eazybe",
          "url": "https://eazybe.com/es/integrations",
          "applicationCategory": "BusinessApplication",
          "applicationSubCategory": "Integración CRM, Automatización de WhatsApp, Plataforma de Integraciones",
          "operatingSystem": "Web, Extensión de Chrome",
          "description": "Eazybe te permite integrar WhatsApp con CRMs y herramientas de ventas como HubSpot, Zoho, Salesforce, Bitrix24, LeadSquared y Google Sheets para sincronizar conversaciones, automatizar seguimientos y mejorar la productividad del equipo.",
          "image": "https://eazybe.com/logo.png",
          "offers": {
            "@type": "AggregateOffer",
            "url": "https://eazybe.com/es/pricing",
            "priceCurrency": "EUR",
            "lowPrice": 25,
            "highPrice": 42,
            "offerCount": 5,
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.7",
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": 53766
          },
          "featureList": [
            "Integraciones de WhatsApp con múltiples CRMs",
            "Sincronización automática de conversaciones",
            "Bandeja de entrada compartida para equipos",
            "Automatización de mensajes y seguimientos",
            "Sincronización de contactos y oportunidades",
            "Integraciones personalizadas mediante webhooks",
            "Agentes de IA para ventas y soporte",
            "Gestión de leads directamente en WhatsApp"
          ],
          "inLanguage": "es-ES"
        };
        addJsonLdSchema('integrations-softwareapp-es-schema', esSoftwareAppSchema);
      }

      // Add SoftwareApplication Schema for Turkish /tr/integrations page
      if (language === 'tr') {
        const trSoftwareAppSchema = {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "WhatsApp CRM Entegrasyonları - Eazybe",
          "url": "https://eazybe.com/tr/integrations",
          "applicationCategory": "BusinessApplication",
          "applicationSubCategory": "CRM Entegrasyonu, WhatsApp Otomasyonu, Entegrasyon Platformu",
          "operatingSystem": "Web, Chrome Uzantısı",
          "description": "Eazybe, WhatsApp'ı HubSpot, Zoho, Salesforce, Bitrix24, LeadSquared ve Google Sheets gibi CRM ve satış araçlarıyla entegre ederek konuşmaları senkronize etmenizi, takipleri otomatikleştirmenizi ve ekip verimliliğini artırmanızı sağlar.",
          "image": "https://eazybe.com/logo.png",
          "offers": {
            "@type": "AggregateOffer",
            "url": "https://eazybe.com/tr/pricing",
            "priceCurrency": "TRY",
            "lowPrice": 1272,
            "highPrice": 2149,
            "offerCount": 5,
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.7",
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": 53766
          },
          "featureList": [
            "WhatsApp ile çoklu CRM entegrasyonu",
            "Otomatik WhatsApp konuşma senkronizasyonu",
            "Ekipler için paylaşılan gelen kutusu",
            "Mesaj ve takip otomasyonu",
            "Kişi ve fırsat senkronizasyonu",
            "Webhook ile özel entegrasyonlar",
            "Satış ve destek için yapay zekâ ajanları",
            "WhatsApp üzerinden lead yönetimi"
          ],
          "inLanguage": "tr-TR"
        };
        addJsonLdSchema('integrations-softwareapp-tr-schema', trSoftwareAppSchema);
      }
    }

    // Cleanup: Remove schemas when navigating away from /integrations
    return () => {
      schemaIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          element.remove();
        }
      });
    };
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">{t('common.loading')}</p>
        </div>
      </div>
    )
  }

  // Get translated data and merge with Sanity data
  const translatedData = getTranslatedCategoryData(slug, t)

  // Use Sanity data as primary, translations as fallback
  const data = sanityData ? {
    ...sanityData,
    hero: sanityData.hero || translatedData?.hero,
    intro: sanityData.intro || translatedData?.intro,
    featuredItems: sanityData.featuredItems || translatedData?.featuredItems,
    integrationsList: sanityData.integrationsList || translatedData?.integrationsList,
    integrationsCta: sanityData.integrationsCta || translatedData?.integrationsCta,
    capabilities: sanityData.capabilities || translatedData?.capabilities,
    pricing: sanityData.pricing || translatedData?.pricing,
    benefits: sanityData.benefits || translatedData?.benefits,
    howItWorks: sanityData.howItWorks || translatedData?.howItWorks,
    faq: sanityData.faq || translatedData?.faq
  } : translatedData

  if (error || !data) {
    console.error('CategoryIndexPage error:', error, 'data:', data, 'slug:', slug)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">{t('common.notFound')}</h1>
          {error && <p className="text-red-400 mb-4">{error.message}</p>}
          <Link to="/" className="text-blue-500 hover:underline">
            {t('common.goHome')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-400 antialiased selection:bg-blue-600 selection:text-white overflow-x-hidden">
      <Navbar />

      <HeroSection data={data.hero} />
      <FeaturedItemsSection items={data.featuredItems} category={data.category} t={t} language={language} />
      {data.comparisonTable && <ComparisonSection data={data.comparisonTable} />}
      <IntegrationsGridSection data={data.integrationsList} t={t} />
      <CapabilitiesSection data={data.capabilities} />
      <BenefitsSection data={data.benefits} />
      <HowItWorksSection data={data.howItWorks} />
      <FAQSection data={data.faq} />
      <PricingPreviewSection data={data.pricing} language={language} />

      {/* Footer with CTA and Security sections */}
      <ChunkyFooter />
    </div>
  )
}

export default CategoryIndexPage
