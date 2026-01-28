import React from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  ChevronDown,
  Check
} from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { ChunkyFooter } from '../components/footer/ChunkyFooter'
import { ProductSectionRenderer } from '../components/dynamic/ProductSectionRenderer'
import { useFeature } from '../hooks/useFeature'
import { getIcon as getIconFromMap, getFeatureIcon } from '../lib/iconMap'
import { urlFor } from '../lib/sanity'
import { SectionBadge } from '../components/ui/SectionBadge'
import LabelAnimation from '../components/animations/LabelAnimation'
import UnifiedDashboardAnimation from '../components/animations/UnifiedDashboardAnimation'
import RoutingAnimation from '../components/animations/RoutingAnimation'
import RepetitiveAnimation from '../components/animations/RepetitiveAnimation'
import PersonalizationAnimation from '../components/animations/PersonalizationAnimation'
import TeamAnimation from '../components/animations/TeamAnimation'

// Helper to get icon with fallback to Cloud
const getIcon = (iconName: string | undefined) => {
  return getIconFromMap(iconName, Cloud)
}

// Feature color mapping based on slug
const featureColors: Record<string, { primary: string; gradient: string }> = {
  'cloud-backup': { primary: '#3B82F6', gradient: 'from-blue-500 to-blue-600' },
  'team-inbox': { primary: '#10B981', gradient: 'from-emerald-500 to-emerald-600' },
  'whatsapp-crm': { primary: '#8B5CF6', gradient: 'from-violet-500 to-violet-600' },
  'quick-reply': { primary: '#F59E0B', gradient: 'from-amber-500 to-amber-600' },
  'scheduler': { primary: '#EC4899', gradient: 'from-pink-500 to-pink-600' },
  'revenue-inbox': { primary: '#14B8A6', gradient: 'from-teal-500 to-teal-600' },
  'rep-radar': { primary: '#6366F1', gradient: 'from-indigo-500 to-indigo-600' },
  'whatsapp-copilot': { primary: '#0EA5E9', gradient: 'from-sky-500 to-sky-600' },
  'whatsapp-api': { primary: '#25D366', gradient: 'from-green-500 to-green-600' },
  'coexistence': { primary: '#25D366', gradient: 'from-green-500 to-green-600' },
  'templates': { primary: '#25D366', gradient: 'from-green-500 to-green-600' },
  'broadcast': { primary: '#25D366', gradient: 'from-green-500 to-green-600' }
}

// ================== UI Components ==================

// Use cyan badges consistently like the landing page
// Feature-specific colors are only used for background glows
const BADGE_VARIANT: 'cyan' | 'orange' | 'green' | 'default' = 'cyan'

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
    <section className="relative pt-32 pb-24 overflow-hidden bg-brand-black border-b border-slate-800">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
      {/* Neon Glows - using brand blue/purple like landing page */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/20 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[100px] -z-10 -translate-x-1/4 translate-y-1/4"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {data.badge && (
            <div className="mb-8 animate-fade-in-up">
              <SectionBadge variant={BADGE_VARIANT}>{data.badge}</SectionBadge>
            </div>
          )}

          <h1 className="text-5xl lg:text-7xl font-sans font-extrabold tracking-tight text-white leading-[1.05] mb-6">
            {data.headline}{' '}
            <span className="text-brand-cyan">{data.headlineHighlight}</span>
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-2xl mx-auto">
            {data.description}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {data.primaryCta && (
              <Link to={data.primaryCta.url}>
                <Button variant="primary" className="h-14 px-8 text-base bg-brand-blue border-brand-blue hover:bg-brand-blue/90">
                  {data.primaryCta.label}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            )}
            {data.secondaryCta && (
              <Link to={data.secondaryCta.url}>
                <Button variant="outline" className="h-14 px-8 text-base">
                  {data.secondaryCta.label}
                </Button>
              </Link>
            )}
          </div>

          {data.stats && data.stats.length > 0 && (
            <div className="flex justify-center gap-12 pt-8 border-t border-slate-800/50">
              {data.stats.map((stat: any, idx: number) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ================== Benefits Section ==================

const BenefitsSection: React.FC<{ data: any }> = ({ data }) => {
  if (!data || !data.items) return null

  return (
    <section className="py-24 bg-brand-surface border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {data.badge && (
            <div className="mb-6">
              <SectionBadge variant={BADGE_VARIANT}>{data.badge}</SectionBadge>
            </div>
          )}
          <h2 className="text-4xl font-sans font-bold text-white tracking-tight mb-4">
            {data.headline}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item: any, idx: number) => {
            const Icon = getIcon(item.icon)
            return (
              <div key={idx} className="bg-brand-card border border-slate-700 hover:border-slate-600 hover:shadow-card-hover transition-all duration-300 rounded-2xl p-6 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-brand-cyan/10 text-brand-cyan shadow-glow-cyan">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ================== Features Section ==================

// Team Inbox specific animations mapping
const teamInboxAnimations: Record<number, React.FC> = {
  0: LabelAnimation,
  1: UnifiedDashboardAnimation,
  2: RoutingAnimation
}

// Quick Reply specific animations mapping
const quickReplyAnimations: Record<number, React.FC> = {
  0: RepetitiveAnimation,
  1: PersonalizationAnimation,
  2: TeamAnimation
}

const FeaturesSection: React.FC<{ features: any[]; slug: string }> = ({ features, slug }) => {
  if (!features || features.length === 0) return null

  const isTeamInbox = slug === 'team-inbox'
  const isQuickReply = slug === 'quick-reply'

  // Get animation component based on slug
  const getAnimationComponent = (index: number): React.FC | null => {
    if (isTeamInbox) return teamInboxAnimations[index] || null
    if (isQuickReply) return quickReplyAnimations[index] || null
    return null
  }

  return (
    <div id="features">
      {features.map((feature, idx) => {
        const isEven = idx % 2 === 0
        const alignRight = idx % 2 === 1
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
                      <SectionBadge variant={BADGE_VARIANT}>{feature.badge}</SectionBadge>
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
                      {feature.points.map((point: string, pIdx: number) => (
                        <li key={pIdx} className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded-full bg-brand-cyan/20 flex items-center justify-center border border-brand-cyan/30 flex-shrink-0 mt-0.5">
                            <Check size={14} className="text-brand-cyan" strokeWidth={3} />
                          </div>
                          <span className="text-slate-200 font-medium">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {feature.cta && (
                    <div className="pt-4">
                      <Link to={feature.cta.url}>
                        <Button variant="outline" className="text-slate-300 border-slate-700 hover:border-brand-cyan hover:text-brand-cyan">
                          {feature.cta.label}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
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
                      {feature.image ? (
                        <img
                          src={urlFor(feature.image).width(800).height(600).url()}
                          alt={feature.headline || feature.badge || 'Feature illustration'}
                          className="w-full h-full object-cover rounded-xl z-10"
                        />
                      ) : (
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
                      )}
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

// ================== How It Works Section ==================

const HowItWorksSection: React.FC<{ data: any }> = ({ data }) => {
  if (!data || !data.steps) return null

  return (
    <section className="py-24 bg-brand-surface border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {data.badge && (
            <div className="mb-6">
              <SectionBadge variant={BADGE_VARIANT}>{data.badge}</SectionBadge>
            </div>
          )}
          <h2 className="text-4xl font-sans font-bold text-white tracking-tight mb-4">
            {data.headline}
          </h2>
          {data.description && (
            <p className="text-lg text-slate-400">{data.description}</p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {data.steps.map((step: any, idx: number) => (
            <div key={idx} className="relative bg-brand-card rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300">
              <div className="text-5xl font-black mb-4 text-brand-cyan/40" style={{ textShadow: '0 0 30px rgba(6, 182, 212, 0.2)' }}>
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-slate-400">{step.description}</p>

              {idx < data.steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-slate-600 to-transparent"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ================== Use Cases Section ==================

const UseCasesSection: React.FC<{ data: any }> = ({ data }) => {
  if (!data || !data.items) return null

  return (
    <section className="py-24 bg-brand-black border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {data.badge && (
            <div className="mb-6">
              <SectionBadge variant={BADGE_VARIANT}>{data.badge}</SectionBadge>
            </div>
          )}
          <h2 className="text-4xl font-sans font-bold text-white tracking-tight">
            {data.headline}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item: any, idx: number) => {
            const Icon = getIcon(item.icon)
            return (
              <div key={idx} className="bg-brand-card border border-slate-700 rounded-2xl p-6 hover:border-slate-600 hover:shadow-card-hover transition-all duration-300">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-brand-cyan/10 text-brand-cyan shadow-glow-cyan">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 mb-4">{item.description}</p>

                {item.benefits && item.benefits.length > 0 && (
                  <ul className="space-y-2">
                    {item.benefits.map((benefit: string, bIdx: number) => (
                      <li key={bIdx} className="flex items-center gap-2 text-sm text-slate-300">
                        <Check size={14} className="text-brand-cyan" strokeWidth={3} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ================== Testimonial Section ==================

const TestimonialSection: React.FC<{ data: any }> = ({ data }) => {
  if (!data) return null

  return (
    <section className="py-24 bg-brand-surface border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-6xl mb-8 font-serif text-brand-cyan" style={{ textShadow: '0 0 40px rgba(6, 182, 212, 0.3)' }}>"</div>
        <blockquote className="text-2xl font-medium text-white mb-8 leading-relaxed">
          {data.quote}
        </blockquote>
        <div className="flex items-center justify-center gap-4">
          {data.avatar && (
            <img src={data.avatar} alt={data.author} className="w-12 h-12 rounded-full border-2 border-slate-700" />
          )}
          <div className="text-left">
            <div className="font-bold text-white">{data.author}</div>
            <div className="text-sm text-slate-400">{data.title}, {data.company}</div>
          </div>
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
    <section className="py-24 bg-brand-black border-b border-slate-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {data.badge && (
            <div className="mb-6">
              <SectionBadge variant={BADGE_VARIANT}>{data.badge}</SectionBadge>
            </div>
          )}
          <h2 className="text-4xl font-sans font-bold text-white tracking-tight">
            {data.headline}
          </h2>
        </div>

        <div className="space-y-4">
          {data.items.map((item: any, idx: number) => (
            <div key={idx} className="bg-brand-card border border-slate-700 rounded-2xl overflow-hidden hover:border-slate-600 transition-colors">
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="font-semibold text-white">{item.question}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${openIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-5 text-slate-400 leading-relaxed border-t border-slate-700/50">
                  <div className="pt-4">{item.answer}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ================== Main FeaturePage Component ==================

export const FeaturePage: React.FC = () => {
  const { slug: urlSlug } = useParams<{ slug: string }>()
  const location = useLocation()

  // Determine slug based on URL - handle /whatsapp-api route specially
  const slug = urlSlug || (location.pathname === '/whatsapp-api' ? 'whatsapp-api' : 'cloud-backup')

  const { data, loading, error } = useFeature(slug)

  const featureColor = featureColors[slug] || featureColors['cloud-backup']
  const color = featureColor.primary

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Feature not found</h1>
          <Link to="/features" className="text-brand-blue hover:underline">
            View all features
          </Link>
        </div>
      </div>
    )
  }

  // Check if using new modular sections or legacy fields
  const useSections = data.sections && data.sections.length > 0

  const currentSlug = slug || 'cloud-backup'

  return (
    <div className="min-h-screen bg-brand-black font-sans text-slate-400 antialiased selection:bg-brand-blue selection:text-white overflow-x-hidden">
      <Navbar />

      {useSections ? (
        // New modular section-based rendering
        <>
          {data.sections!.map((section, idx) => (
            <ProductSectionRenderer
              key={section._key || idx}
              section={section}
              color={color}
              slug={currentSlug}
            />
          ))}
        </>
      ) : (
        // Legacy field-based rendering
        <>
          <HeroSection data={data.hero} />
          <BenefitsSection data={data.benefits} />
          <FeaturesSection features={data.features} slug={currentSlug} />
          <HowItWorksSection data={data.howItWorks} />
          <UseCasesSection data={data.useCases} />
          {data.testimonial && <TestimonialSection data={data.testimonial} />}
          <FAQSection data={data.faq} />
        </>
      )}

      {/* Footer with CTA and Security sections */}
      <ChunkyFooter />
    </div>
  )
}

export default FeaturePage
