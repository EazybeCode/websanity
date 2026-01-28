import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, AlertTriangle, Cloud } from 'lucide-react'
import { getFeatureIcon } from '../../lib/iconMap'
import LabelAnimation from '../animations/LabelAnimation'
import UnifiedDashboardAnimation from '../animations/UnifiedDashboardAnimation'
import RoutingAnimation from '../animations/RoutingAnimation'
import RepetitiveAnimation from '../animations/RepetitiveAnimation'
import PersonalizationAnimation from '../animations/PersonalizationAnimation'
import TeamAnimation from '../animations/TeamAnimation'
import FollowUpAnimation from '../animations/FollowUpAnimation'
import ScheduleAnimation from '../animations/ScheduleAnimation'
import PersistenceAnimation from '../animations/PersistenceAnimation'
import ActivityGrid from '../animations/ActivityGrid'
import DashboardConsole from '../animations/DashboardConsole'
import SkillGapAnalysis from '../animations/SkillGapAnalysis'
import { CopilotProblemAnimation, CopilotSolutionAnimation, CopilotSummaryAnimation } from '../animations/WhatsAppCopilotMockup'
import CloudBackupProblemAnimation from '../animations/CloudBackupProblemAnimation'
import CloudBackupSyncAnimation from '../animations/CloudBackupSyncAnimation'
import CloudBackupSearchAnimation from '../animations/CloudBackupSearchAnimation'
import WhatsAppCRMChaosAnimation from '../animations/WhatsAppCRMChaosAnimation'
import WhatsAppCRMLabelAnimation from '../animations/WhatsAppCRMLabelAnimation'
import WhatsAppCRMSyncAnimation from '../animations/WhatsAppCRMSyncAnimation'

// Animation mappings by slug
const animationsBySlug: Record<string, Record<number, React.FC>> = {
  'team-inbox': {
    0: LabelAnimation,
    1: UnifiedDashboardAnimation,
    2: RoutingAnimation
  },
  'quick-reply': {
    0: RepetitiveAnimation,
    1: PersonalizationAnimation,
    2: TeamAnimation
  },
  'scheduler': {
    0: FollowUpAnimation,
    1: ScheduleAnimation,
    2: PersistenceAnimation
  },
  'rep-radar': {
    0: ActivityGrid,
    1: DashboardConsole,
    2: SkillGapAnalysis
  },
  'whatsapp-copilot': {
    0: CopilotProblemAnimation,
    1: CopilotSolutionAnimation,
    2: CopilotSummaryAnimation
  },
  'cloud-backup': {
    0: CloudBackupProblemAnimation,
    1: CloudBackupSyncAnimation,
    2: CloudBackupSearchAnimation
  },
  'whatsapp-crm': {
    0: WhatsAppCRMChaosAnimation,
    1: WhatsAppCRMLabelAnimation,
    2: WhatsAppCRMSyncAnimation
  }
}

interface Feature {
  badge?: string
  headline?: string
  description?: string
  points?: string[]
  cta?: { label: string; url: string }
  visualType?: string
  alignRight?: boolean
}

interface ProductFeaturesData {
  features?: Feature[]
}

interface ProductFeaturesDynamicProps {
  data: ProductFeaturesData
  color?: string
  slug?: string
}

export const ProductFeaturesDynamic: React.FC<ProductFeaturesDynamicProps> = ({ data, slug = '' }) => {
  if (!data?.features || data.features.length === 0) return null

  // Get animation component based on slug and index
  const getAnimationComponent = (index: number): React.FC | null => {
    const slugAnimations = animationsBySlug[slug]
    if (slugAnimations) {
      return slugAnimations[index] || null
    }
    return null
  }

  return (
    <div id="features">
      {data.features.map((feature, idx) => {
        const isEven = idx % 2 === 0
        const alignRight = idx % 2 === 1 || feature.alignRight
        const AnimationComponent = getAnimationComponent(idx)

        return (
          <section
            key={idx}
            className={`py-24 border-b border-slate-800 ${isEven ? 'bg-brand-black' : 'bg-brand-surface'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`flex flex-col lg:flex-row gap-20 items-center ${alignRight ? 'lg:flex-row-reverse' : ''}`}>
                {/* Content */}
                <div className="flex-1 space-y-8">
                  <div>
                    {feature.badge && (
                      <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full border text-brand-cyan border-brand-cyan/20 bg-brand-cyan/10 mb-6 select-none">
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-brand-cyan"></span>
                        {feature.badge}
                      </span>
                    )}
                    {feature.headline && (
                      <h2 className="mt-6 text-4xl font-sans font-bold text-white leading-tight">
                        {feature.headline}
                      </h2>
                    )}
                    <p className="mt-6 text-lg text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {feature.points && feature.points.length > 0 && (
                    <ul className="space-y-4">
                      {feature.points.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-4">
                          {idx === 0 ? (
                            // First section (problem) - show warning triangle
                            <div className="w-6 h-6 rounded-full bg-brand-orange/20 flex items-center justify-center border border-brand-orange/30 flex-shrink-0 mt-0.5">
                              <AlertTriangle size={14} className="text-brand-orange" strokeWidth={2.5} />
                            </div>
                          ) : (
                            // Other sections (solutions) - show checkmark
                            <div className="w-6 h-6 rounded-full bg-brand-cyan/20 flex items-center justify-center border border-brand-cyan/30 flex-shrink-0 mt-0.5">
                              <Check size={14} className="text-brand-cyan" strokeWidth={3} />
                            </div>
                          )}
                          <span className="text-slate-200 font-medium">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {feature.cta && (
                    <div className="pt-4">
                      <Link to={feature.cta.url}>
                        <button className="inline-flex items-center justify-center font-bold text-sm px-6 py-3 rounded-lg transition-all duration-200 bg-transparent text-slate-300 border border-slate-700 hover:border-brand-cyan hover:text-brand-cyan">
                          {feature.cta.label}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Image or Animation */}
                <div className="flex-1 w-full relative">
                  {AnimationComponent ? (
                    <AnimationComponent />
                  ) : (
                    <div className="aspect-[4/3] bg-brand-card rounded-2xl border border-slate-700 shadow-card p-2 flex items-center justify-center relative overflow-hidden group hover:shadow-card-hover hover:border-slate-600 transition-all duration-500">
                      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
                      <div className="text-center text-slate-500 z-10">
                        {(() => {
                          const FeatureIcon = getFeatureIcon(slug, Cloud)
                          return (
                            <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center bg-brand-cyan/15 shadow-glow-cyan">
                              <FeatureIcon size={48} className="text-brand-cyan" />
                            </div>
                          )
                        })()}
                        <p className="text-sm font-mono">{feature.badge || 'Feature visualization'}</p>
                      </div>
                    </div>
                  )}
                  {/* Glow effect - using brand blue */}
                  <div className="absolute -top-6 -right-6 w-40 h-40 rounded-full blur-3xl -z-10 bg-brand-blue/15"></div>
                </div>
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}

export default ProductFeaturesDynamic
