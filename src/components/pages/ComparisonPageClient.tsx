'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  Check,
  X,
  Zap,
  Shield,
  Users,
  Star,
  ArrowRight,
  MessageSquare,
  Puzzle,
  Clock,
  Calendar,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  TrendingUp
} from 'lucide-react'
import { SectionBadge } from '@/components/ui/SectionBadge'
import { Button } from '@/components/ui/Button'
import { useTrialModal } from '@/providers/TrialModalProvider'

interface Competitor {
  id: string
  name: string
  logo: string
  highlight: boolean
  hasCta?: boolean
}

interface FeatureComparison {
  category: string
  features: {
    name: string
    values: Record<string, boolean | string>
    highlight?: string
  }[]
}

const competitors: Competitor[] = [
  {
    id: 'eazybe',
    name: 'Eazybe',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://eazybe.com&size=128',
    highlight: true,
    hasCta: true,
  },
  {
    id: 'wati',
    name: 'Wati',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.wati.io&size=128',
    highlight: false
  },
  {
    id: 'interakt',
    name: 'Interakt',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://interakt.shop&size=128',
    highlight: false
  },
  {
    id: 'quickreply',
    name: 'QuickReply',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.quickreply.ai&size=128',
    highlight: false
  },
  {
    id: 'cooby',
    name: 'Cooby',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.cooby.co&size=128',
    highlight: false
  },
  {
    id: 'timelines',
    name: 'Timelines',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://timelines.ai&size=128',
    highlight: false
  },
  {
    id: 'rasayel',
    name: 'Rasayel',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.rasayel.io&size=128',
    highlight: false
  }
]

const RenderValue: React.FC<{ value: boolean | string; highlight?: boolean }> = ({ value, highlight }) => {
  if (typeof value === 'boolean') {
    return value ? (
      <div className={`w-7 h-7 rounded-full ${highlight ? 'bg-brand-green/30 ring-2 ring-brand-green/50' : 'bg-brand-green/20'} flex items-center justify-center mx-auto`}>
        <Check size={16} className="text-brand-green" strokeWidth={3} />
      </div>
    ) : (
      <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center mx-auto">
        <X size={16} className="text-slate-600" strokeWidth={3} />
      </div>
    )
  }

  if (highlight) {
    return (
      <span className="inline-block px-3 py-1 bg-brand-green/20 text-brand-green text-sm font-bold rounded-full">
        {value}
      </span>
    )
  }

  return <span className="text-sm text-slate-300 font-medium">{value}</span>
}

interface SanityComparisonPost {
  _id: string
  title: string
  slug: string
  excerpt?: string
  category?: string
  language?: string
  featuredImage?: string
  featuredImageAlt?: string
  publishedAt?: string
  readTime?: number
  author?: { name?: string; image?: string }
  verdict?: string
  competitors?: string[]
}

interface ComparisonPageClientProps {
  comparisonPosts?: SanityComparisonPost[]
  locale?: string
}

export function ComparisonPageClient({ comparisonPosts = [], locale = 'en' }: ComparisonPageClientProps = {}) {
  const { openModal } = useTrialModal()
  const t = useTranslations('comparisonHub')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const localePrefix = locale === 'en' ? '' : `/${locale}`

  const tLimited = t('table.limited')
  const tSevenDays = t('table.sevenDays')

  const featureComparisons: FeatureComparison[] = [
    {
      category: t('table.categories.core'),
      features: [
        {
          name: t('table.features.whatsappWebIntegration'),
          values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
        },
        {
          name: t('table.features.teamInbox'),
          values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
        },
        {
          name: t('table.features.whatsappChatBackup'),
          values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
          highlight: 'eazybe'
        },
        {
          name: t('table.features.unlimitedQuickReplies'),
          values: { eazybe: true, wati: tLimited, interakt: tLimited, quickreply: tLimited, cooby: true, timelines: tLimited, rasayel: tLimited },
          highlight: 'eazybe'
        },
        {
          name: t('table.features.scheduledMessages'),
          values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
        },
        {
          name: t('table.features.bulkMessaging'),
          values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
        }
      ]
    },
    {
      category: t('table.categories.crm'),
      features: [
        {
          name: t('table.features.hubspotIntegration'),
          values: { eazybe: true, wati: true, interakt: false, quickreply: false, cooby: true, timelines: true, rasayel: true }
        },
        {
          name: t('table.features.salesforceIntegration'),
          values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
          highlight: 'eazybe'
        },
        {
          name: t('table.features.zohoCrmIntegration'),
          values: { eazybe: true, wati: true, interakt: true, quickreply: false, cooby: false, timelines: false, rasayel: true }
        },
        {
          name: t('table.features.bitrix24Integration'),
          values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
          highlight: 'eazybe'
        },
        {
          name: t('table.features.webhookIntegrations'),
          values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
        },
        {
          name: t('table.features.customObjectsSupport'),
          values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
          highlight: 'eazybe'
        }
      ]
    },
    {
      category: t('table.categories.ai'),
      features: [
        {
          name: t('table.features.aiUnrepliedChatsAgent'),
          values: { eazybe: true, wati: false, interakt: false, quickreply: true, cooby: false, timelines: false, rasayel: false },
          highlight: 'eazybe'
        },
        {
          name: t('table.features.whatsappWebCopilot'),
          values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
          highlight: 'eazybe'
        },
        {
          name: t('table.features.revenueInbox'),
          values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
          highlight: 'eazybe'
        },
        {
          name: t('table.features.revopsAgent'),
          values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
          highlight: 'eazybe'
        },
        {
          name: t('table.features.smartLabeling'),
          values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
        },
        {
          name: t('table.features.messageAnalytics'),
          values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
        }
      ]
    },
    {
      category: t('table.categories.pricing'),
      features: [
        {
          name: t('table.features.startingPriceMonthly'),
          values: { eazybe: '$29', wati: '$49', interakt: '$39', quickreply: '$29', cooby: '$19', timelines: '$25', rasayel: '$35' },
          highlight: 'eazybe'
        },
        {
          name: t('table.features.freeTrial'),
          values: { eazybe: tSevenDays, wati: tSevenDays, interakt: tSevenDays, quickreply: tSevenDays, cooby: tSevenDays, timelines: tSevenDays, rasayel: tSevenDays }
        },
        {
          name: t('table.features.freePlanAvailable'),
          values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
          highlight: 'eazybe'
        },
        {
          name: t('table.features.annualDiscount'),
          values: { eazybe: '20%', wati: '15%', interakt: '15%', quickreply: '10%', cooby: '15%', timelines: '15%', rasayel: '10%' },
          highlight: 'eazybe'
        },
        {
          name: t('table.features.perUserPricing'),
          values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
        }
      ]
    },
    {
      category: t('table.categories.support'),
      features: [
        {
          name: t('table.features.gdprCompliant'),
          values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
        },
        {
          name: t('table.features.metaBusinessPartner'),
          values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
        },
        {
          name: t('table.features.prioritySupport'),
          values: { eazybe: true, wati: true, interakt: false, quickreply: true, cooby: false, timelines: true, rasayel: false }
        },
        {
          name: t('table.features.dedicatedAccountManager'),
          values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
          highlight: 'eazybe'
        },
        {
          name: t('table.features.support247'),
          values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
          highlight: 'eazybe'
        },
        {
          name: t('table.features.implementationSupport'),
          values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: true, rasayel: false }
        }
      ]
    }
  ]

  const valueProps = [
    { icon: <DollarSign className="w-7 h-7" />, title: t('whyEazybe.bestPriceTitle'), description: t('whyEazybe.bestPriceDesc') },
    { icon: <Puzzle className="w-7 h-7" />, title: t('whyEazybe.integrationsTitle'), description: t('whyEazybe.integrationsDesc') },
    { icon: <Zap className="w-7 h-7" />, title: t('whyEazybe.aiTitle'), description: t('whyEazybe.aiDesc') },
    { icon: <Shield className="w-7 h-7" />, title: t('whyEazybe.securityTitle'), description: t('whyEazybe.securityDesc') },
    { icon: <Clock className="w-7 h-7" />, title: t('whyEazybe.setupTitle'), description: t('whyEazybe.setupDesc') },
    { icon: <Users className="w-7 h-7" />, title: t('whyEazybe.userBaseTitle'), description: t('whyEazybe.userBaseDesc') },
  ]

  const faqItems = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') },
    { question: t('faq.q6'), answer: t('faq.a6') },
    { question: t('faq.q7'), answer: t('faq.a7') },
  ]

  return (
    <div className="min-h-screen bg-brand-black font-sans text-slate-400 antialiased selection:bg-brand-blue selection:text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-brand-black">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-blue/10 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <SectionBadge variant="cyan" className="mb-6">
              <Star className="w-4 h-4" />
              {t('hero.badge')}
            </SectionBadge>

            <h1 className="text-4xl lg:text-6xl font-sans font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              {t('hero.titlePrefix')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-green">
                {t('hero.titleHighlight')}
              </span>{' '}
              {t('hero.titleSuffix')}
            </h1>

            <p className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={() => openModal('trial')}
              >
                {t('hero.ctaPrimary')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('comparison-table')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('hero.ctaSecondary')}
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mt-16 flex justify-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 max-w-3xl">
                {[
                  { value: '50K+', label: t('hero.stats.activeUsers') },
                  { value: '4.8/5', label: t('hero.stats.chromeRating') },
                  { value: '70%', label: t('hero.stats.costSavings') },
                  { value: '20+', label: t('hero.stats.platformsCompared') }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section id="comparison-table" className="py-16 lg:py-24 bg-brand-surface border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionBadge variant="orange" className="mb-6">
              {t('table.badge')}
            </SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-sans font-bold text-white mb-4">
              {t('table.title')}
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              {t('table.subtitle')}
            </p>
            <p className="text-sm text-slate-500 mt-2 md:hidden">
              {t('table.swipeHint')}
            </p>
          </div>

          <div className="relative rounded-2xl border border-slate-700 bg-brand-card overflow-hidden">
            <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
              <div className="min-w-[1200px]">
                <div className="grid grid-cols-8 border-b border-slate-700 bg-brand-surface">
                  <div className="p-4 lg:p-6">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500">
                      {t('table.featuresHeader')}
                    </span>
                  </div>
                  {competitors.map((competitor, index) => (
                    <div
                      key={competitor.id}
                      className={`p-4 lg:p-6 text-center ${index > 0 ? 'border-l border-slate-700' : ''} ${competitor.highlight ? 'bg-brand-blue/10' : ''}`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg overflow-hidden">
                          <img
                            src={competitor.logo}
                            alt={competitor.name}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <span className={`text-base lg:text-lg font-bold ${competitor.highlight ? 'text-brand-blue' : 'text-white'}`}>
                          {competitor.name}
                        </span>
                        {competitor.highlight && (
                          <span className="inline-block px-3 py-1 bg-brand-green/20 text-brand-green text-xs font-bold rounded-full">
                            {t('table.recommended')}
                          </span>
                        )}
                        {competitor.hasCta && (
                          <Button
                            variant={competitor.highlight ? 'primary' : 'outline'}
                            size="sm"
                            className="mt-2 text-xs"
                            onClick={() => openModal('trial')}
                          >
                            {t('table.installFree')}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {featureComparisons.map((category) => (
                  <div key={category.category}>
                    <div className="grid grid-cols-8 border-b border-slate-800 bg-slate-900/50">
                      <div className="p-3 lg:p-4 col-span-5">
                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-cyan">
                          {category.category}
                        </span>
                      </div>
                    </div>

                    {category.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="grid grid-cols-8 border-b border-slate-800 last:border-b-0 hover:bg-slate-800/30 transition-colors"
                      >
                        <div className="p-3 lg:p-4 flex items-center gap-2">
                          <span className="text-xs lg:text-sm text-slate-300 flex-1">{feature.name}</span>
                          {feature.highlight === 'eazybe' && (
                            <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0" />
                          )}
                        </div>
                        {competitors.map((competitor) => (
                          <div
                            key={`${competitor.id}-${featureIndex}`}
                            className={`p-3 lg:p-4 flex items-center justify-center border-l border-slate-800 ${competitor.highlight ? 'bg-brand-blue/5' : ''}`}
                          >
                            <RenderValue
                              value={feature.values[competitor.id]}
                              highlight={feature.highlight === competitor.id}
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Eazybe Section */}
      <section className="py-16 lg:py-24 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionBadge variant="green" className="mb-6">
              <CheckCircle2 className="w-4 h-4" />
              {t('whyEazybe.badge')}
            </SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-sans font-bold text-white mb-4">
              {t('whyEazybe.title')}
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              {t('whyEazybe.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valueProps.map((prop, index) => (
              <div
                key={index}
                className="group relative bg-brand-card border border-slate-700 rounded-2xl p-8 hover:border-brand-blue/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-brand-cyan/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue/20 to-brand-cyan/20 flex items-center justify-center text-brand-blue mb-6">
                    {prop.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {prop.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-blue/10 via-brand-cyan/10 to-brand-green/10 border-y border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-sans font-bold text-white mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={() => openModal('trial')}
            >
              {t('cta.primary')}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => openModal('demo')}
            >
              {t('cta.secondary')}
            </Button>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            {t('cta.footnote')}
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-brand-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionBadge variant="cyan" className="mb-6">
              <MessageSquare className="w-4 h-4" />
              {t('faq.badge')}
            </SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-sans font-bold text-white mb-4">
              {t('faq.title')}
            </h2>
            <p className="text-lg text-slate-400">
              {t('faq.subtitle')}
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div
                key={index}
                className="bg-brand-card border border-slate-700 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                >
                  <span className="font-semibold text-white pr-4">{faq.question}</span>
                  {expandedFaq === index ? (
                    <AlertCircle className="w-5 h-5 text-brand-blue flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-slate-500 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-5 pt-2">
                    <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Articles — Sanity-driven */}
      {comparisonPosts.length > 0 && (
        <section className="py-16 lg:py-24 bg-brand-surface border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <SectionBadge variant="green" className="mb-6">
                <Star className="w-4 h-4" />
                {t('articles.badge')}
              </SectionBadge>
              <h2 className="text-3xl lg:text-4xl font-sans font-bold text-white mb-4">
                {t('articles.title')}
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                {t('articles.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {comparisonPosts.map((post) => (
                <a
                  key={post._id}
                  href={`${localePrefix}/comparison/${post.slug}`}
                  className="group bg-brand-card border border-slate-700 rounded-2xl overflow-hidden hover:border-brand-blue/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-brand-blue/10 h-full flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-800">
                    {post.featuredImage && (
                      <img
                        src={post.featuredImage}
                        alt={post.featuredImageAlt || post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                    {post.category && (
                      <div className="absolute top-3 left-3">
                        <span className="font-mono text-[10px] uppercase font-bold bg-brand-blue px-2 py-1 rounded text-white">
                          {post.category}
                        </span>
                      </div>
                    )}
                    {post.verdict && (
                      <div className="absolute bottom-3 right-3">
                        <span className="font-mono text-[10px] uppercase font-bold bg-brand-green/90 px-2 py-1 rounded text-white">
                          {post.verdict}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    {post.competitors && post.competitors.length > 0 && (
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-brand-cyan" />
                        <span className="font-mono text-xs text-brand-cyan uppercase">
                          {post.competitors.join(' vs ')}
                        </span>
                      </div>
                    )}

                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-snug group-hover:text-brand-cyan transition-colors">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="text-slate-400 mb-4 line-clamp-2 leading-relaxed text-sm flex-1">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                      <div className="flex items-center gap-3 font-mono text-[10px] uppercase text-slate-500 font-bold">
                        {post.readTime && (
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> {post.readTime} min
                          </span>
                        )}
                        {post.publishedAt && (
                          <span className="flex items-center gap-1">
                            <Calendar size={12} /> {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 text-brand-blue group-hover:text-brand-cyan transition-colors" />
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                variant="outline"
                onClick={() => openModal('trial')}
              >
                {t('articles.installFree')}
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
