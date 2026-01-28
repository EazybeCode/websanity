import React from 'react'
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

interface Props {
  data: FeatureSection
}

export const FeaturesDynamic: React.FC<Props> = ({ data }) => {
  return (
    <div id="features">
      {data.features?.map((feature, index) => {
        const isEven = index % 2 === 0
        const AnimationComponent = feature.badge ? homeAnimationsByBadge[feature.badge] : null

        return (
          <section
            key={feature.id || index}
            className={`py-24 border-b border-slate-800 ${isEven ? 'bg-brand-black' : 'bg-brand-surface'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div
                className={`flex flex-col lg:flex-row gap-20 items-center ${
                  feature.alignRight ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 space-y-8">
                  <div>
                    {feature.badge && (
                      <SectionBadge variant="cyan">{feature.badge}</SectionBadge>
                    )}
                    {feature.headline && (
                      <h2 className="mt-6 text-4xl font-sans font-bold text-white leading-tight">
                        {feature.headline}
                      </h2>
                    )}
                    {feature.description && (
                      <p className="mt-6 text-lg text-slate-400 leading-relaxed">
                        {feature.description}
                      </p>
                    )}
                  </div>

                  {feature.points && feature.points.length > 0 && (
                    <ul className="space-y-4">
                      {feature.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded-full bg-brand-cyan/20 flex items-center justify-center border border-brand-cyan/30 flex-shrink-0 mt-0.5">
                            <Check size={14} className="text-brand-cyan" strokeWidth={3} />
                          </div>
                          <span className="text-slate-200 font-medium">{point.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {feature.ctaLabel && (
                    <div className="pt-4">
                      <Button
                        variant="outline"
                        className="text-slate-300 border-slate-700 hover:border-brand-cyan hover:text-brand-cyan"
                      >
                        {feature.ctaLabel} <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex-1 w-full">
                  {AnimationComponent ? (
                    <AnimationComponent />
                  ) : (
                    <div className="aspect-[4/3] bg-brand-card rounded-2xl border border-slate-700 shadow-card p-2 flex items-center justify-center relative overflow-hidden group hover:shadow-card-hover hover:border-slate-600 transition-all duration-500">
                      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
                      <div className="text-slate-500 font-mono text-xs z-10">Feature Visual: {feature.badge}</div>
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
