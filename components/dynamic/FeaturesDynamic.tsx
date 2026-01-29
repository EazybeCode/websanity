import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import { SectionBadge } from '../ui/SectionBadge'
import { Check, ArrowRight } from 'lucide-react'
import type { FeatureSection } from '../../hooks/useLandingPage'
import HomeSyncAnimation from '../animations/HomeSyncAnimation'
import HomeMiniCRMAnimation from '../animations/HomeMiniCRMAnimation'
import HomeWorkflowAnimation from '../animations/HomeWorkflowAnimation'
import HomeRevenueInboxAnimation from '../animations/HomeRevenueInboxAnimation'
import HomeAnalyticsAnimation from '../animations/HomeAnalyticsAnimation'
import HomeAiAgentAnimation from '../animations/HomeAiAgentAnimation'

// Map badge names to animation components
const homeAnimationsByBadge: Record<string, React.FC> = {
  'Conversation Capture': HomeSyncAnimation,
  'Sync Engine': HomeSyncAnimation,
  'Mini CRM View': HomeMiniCRMAnimation,
  'Embedded Intelligence': HomeMiniCRMAnimation,
  'Workflow Automations': HomeWorkflowAnimation,
  'Trigger & Flow': HomeWorkflowAnimation,
  'Revenue Inbox': HomeRevenueInboxAnimation,
  'Conversation Intelligence': HomeRevenueInboxAnimation,
  'Rep Radar': HomeAnalyticsAnimation,
  'Team Performance': HomeAnalyticsAnimation,
  'WhatsApp Copilot': HomeAiAgentAnimation,
  'Next-Gen Agents': HomeAiAgentAnimation,
}

// Map Sanity badge names to translation keys
const featureKeyMap: Record<string, string> = {
  'Conversation Capture': 'syncEngine',
  'Sync Engine': 'syncEngine',
  'Mini CRM View': 'miniCrm',
  'Embedded Intelligence': 'miniCrm',
  'Workflow Automations': 'workflows',
  'Trigger & Flow': 'workflows',
  'Revenue Inbox': 'revenueInbox',
  'Conversation Intelligence': 'revenueInbox',
  'Rep Radar': 'repRadar',
  'Team Performance': 'repRadar',
  'WhatsApp Copilot': 'aiAgent',
  'Next-Gen Agents': 'aiAgent',
}

// Map feature keys to their destination pages
const featureUrlMap: Record<string, string> = {
  'syncEngine': '/integrations',
  'miniCrm': '/integrations',
  'workflows': '/integrations',
  'revenueInbox': '/features/revenue-inbox',
  'repRadar': '/features/rep-radar',
  'aiAgent': '/features/whatsapp-copilot',
}

interface Props {
  data: FeatureSection
}

interface TranslatedFeature {
  badge: string
  headline: string
  description: string
  points: string[]
}

export const FeaturesDynamic: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation()

  // Translated CTA label
  const ctaLabel = t('cta.learnMore')

  // Helper to get translated feature or fall back to Sanity data
  const getFeatureContent = (feature: NonNullable<FeatureSection['features']>[number], index: number) => {
    const translationKey = feature.badge ? featureKeyMap[feature.badge] : null

    if (translationKey) {
      const translatedFeature = t(`home.features.${translationKey}`, { returnObjects: true }) as TranslatedFeature | string

      if (typeof translatedFeature === 'object' && translatedFeature.badge) {
        return {
          badge: translatedFeature.badge,
          headline: translatedFeature.headline,
          description: translatedFeature.description,
          points: translatedFeature.points?.map(text => ({ text })) || [],
          ctaLabel: ctaLabel,
          ctaUrl: featureUrlMap[translationKey] || feature.ctaUrl,
          alignRight: feature.alignRight,
          id: feature.id,
          originalBadge: feature.badge // Keep original for animation lookup
        }
      }
    }

    // Fall back to Sanity data with translated CTA
    const fallbackKey = feature.badge ? featureKeyMap[feature.badge] : null
    return {
      ...feature,
      ctaLabel: feature.ctaLabel ? ctaLabel : undefined,
      ctaUrl: fallbackKey ? featureUrlMap[fallbackKey] : feature.ctaUrl,
      originalBadge: feature.badge
    }
  }

  return (
    <div id="features">
      {data.features?.map((feature, index) => {
        const content = getFeatureContent(feature, index)
        const isEven = index % 2 === 0
        const AnimationComponent = content.originalBadge ? homeAnimationsByBadge[content.originalBadge] : null

        return (
          <section
            key={content.id || index}
            className={`py-24 border-b border-slate-800 ${isEven ? 'bg-brand-black' : 'bg-brand-surface'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div
                className={`flex flex-col lg:flex-row gap-20 items-center ${
                  content.alignRight ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 space-y-8">
                  <div>
                    {content.badge && (
                      <SectionBadge variant="cyan">{content.badge}</SectionBadge>
                    )}
                    {content.headline && (
                      <h2 className="mt-6 text-4xl font-sans font-bold text-white leading-tight">
                        {content.headline}
                      </h2>
                    )}
                    {content.description && (
                      <p className="mt-6 text-lg text-slate-400 leading-relaxed">
                        {content.description}
                      </p>
                    )}
                  </div>

                  {content.points && content.points.length > 0 && (
                    <ul className="space-y-4">
                      {content.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded-full bg-brand-cyan/20 flex items-center justify-center border border-brand-cyan/30 flex-shrink-0 mt-0.5">
                            <Check size={14} className="text-brand-cyan" strokeWidth={3} />
                          </div>
                          <span className="text-slate-200 font-medium">{point.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {content.ctaLabel && content.ctaUrl && (
                    <div className="pt-4">
                      <Link to={content.ctaUrl}>
                        <Button
                          variant="outline"
                          className="text-slate-300 border-slate-700 hover:border-brand-cyan hover:text-brand-cyan"
                        >
                          {content.ctaLabel} <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>

                <div className="flex-1 w-full">
                  {AnimationComponent ? (
                    <AnimationComponent />
                  ) : (
                    <div className="aspect-[4/3] bg-brand-card rounded-2xl border border-slate-700 shadow-card p-2 flex items-center justify-center relative overflow-hidden group hover:shadow-card-hover hover:border-slate-600 transition-all duration-500">
                      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
                      <div className="text-slate-500 font-mono text-xs z-10">Feature Visual: {content.badge}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
