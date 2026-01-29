import React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Check,
  ChevronDown,
  AlertTriangle,
  Cloud,
  X
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Navbar } from '../components/Navbar'
import { ChunkyFooter } from '../components/footer/ChunkyFooter'
import { useCoexistence } from '../hooks/useCoexistence'
import { getIcon as getIconFromMap } from '../lib/iconMap'
import { SectionBadge } from '../components/ui/SectionBadge'
import CoexistenceDualChannelAnimation from '../components/animations/CoexistenceDualChannelAnimation'
import CoexistenceBulkSafeAnimation from '../components/animations/CoexistenceBulkSafeAnimation'
import CoexistenceCRMSyncAnimation from '../components/animations/CoexistenceCRMSyncAnimation'

// Map badge names to animation components
const animationsByBadge: Record<string, React.FC> = {
  'Dual-Channel Access': CoexistenceDualChannelAnimation,
  'Ban-Free Broadcasting': CoexistenceBulkSafeAnimation,
  'CRM-Connected': CoexistenceCRMSyncAnimation,
}

const BADGE_VARIANT: 'cyan' | 'orange' | 'green' | 'default' = 'cyan'

const getIcon = (iconName: string | undefined) => {
  return getIconFromMap(iconName, Cloud)
}

// ================== Button ==================

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
      <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
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

const FeaturesSection: React.FC<{ features: any[] }> = ({ features }) => {
  if (!features || features.length === 0) return null

  return (
    <div id="features">
      {features.map((feature, idx) => {
        const alignRight = feature.alignRight || idx % 2 === 1
        const AnimationComponent = feature.badge ? animationsByBadge[feature.badge] : null

        return (
          <section
            key={idx}
            className={`py-24 border-b border-slate-800 ${idx % 2 === 0 ? 'bg-brand-black' : 'bg-brand-surface'}`}
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
                        {feature.headline}{' '}
                        {feature.headlineHighlight && (
                          <span className="text-brand-cyan">{feature.headlineHighlight}</span>
                        )}
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

                {/* Visual - Animation or placeholder */}
                <div className="flex-1 w-full relative">
                  {AnimationComponent ? (
                    <AnimationComponent />
                  ) : (
                    <div className="aspect-[4/3] bg-brand-card rounded-2xl border border-slate-700 shadow-card p-2 flex items-center justify-center relative overflow-hidden group hover:shadow-card-hover hover:border-slate-600 transition-all duration-500">
                      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
                      <div className="text-center text-slate-500 z-10">
                        <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center bg-brand-cyan/15 shadow-glow-cyan">
                          <Cloud size={48} className="text-brand-cyan" />
                        </div>
                        <p className="text-sm font-mono">{feature.badge || 'Feature visualization'}</p>
                      </div>
                    </div>
                  )}
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

// ================== Comparison Table ==================

const defaultComparisonData = [
  { feature: 'Bulk Broadcasting', regular: 'risk', api: 'yes', coexistence: 'Yes' },
  { feature: 'App Access', regular: 'yes', api: 'no', coexistence: 'Yes' },
  { feature: 'CRM Integration', regular: 'no', api: 'yes', coexistence: 'Yes' },
  { feature: 'See Messages on Phone', regular: 'yes', api: 'no', coexistence: 'Yes' },
  { feature: 'Number Ban Protection', regular: 'no', api: 'yes', coexistence: 'Protected' },
  { feature: 'WhatsApp Web Access', regular: 'yes', api: 'no', coexistence: 'Yes' },
  { feature: 'Setup Time', regular: 'instant', api: 'weeks', coexistence: 'Minutes' },
]

const defaultColumnHeaders = {
  feature: 'Feature',
  regular: 'Regular WhatsApp',
  api: 'Standard API',
  coexistence: 'Coexistence'
}

const renderStatus = (status: string) => {
  if (status === 'yes') return <Check className="mx-auto text-emerald-400" size={18} />
  if (status === 'no') return <X className="mx-auto text-slate-600" size={18} />
  if (status === 'risk') return (
    <span className="inline-flex items-center gap-1 text-amber-400 text-xs font-bold uppercase">
      <AlertTriangle size={14} /> Risky
    </span>
  )
  return <span className="text-sm text-slate-400">{status === 'instant' ? 'Instant' : status === 'weeks' ? 'Days/Weeks' : status}</span>
}

const ComparisonSection: React.FC<{ data?: any }> = ({ data }) => {
  const comparisonData = data?.rows || defaultComparisonData
  const columnHeaders = data?.columnHeaders || defaultColumnHeaders
  const badge = data?.badge || 'Comparison'
  const headline = data?.headline || 'See the Difference'
  const description = data?.description || 'How Coexistence stacks up against traditional WhatsApp models.'

  return (
    <section className="py-24 bg-brand-surface border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-6">
            <SectionBadge variant="orange">{badge}</SectionBadge>
          </div>
          <h2 className="text-4xl font-sans font-bold text-white tracking-tight mb-4">
            {headline}
          </h2>
          <p className="text-lg text-slate-400">
            {description}
          </p>
        </div>

        <div className="bg-brand-card rounded-2xl border border-slate-700 overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">{columnHeaders.feature}</th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-center border-x border-slate-700/50">{columnHeaders.regular}</th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-center border-r border-slate-700/50">{columnHeaders.api}</th>
                  <th className="px-6 py-5 text-xs font-bold text-brand-cyan uppercase tracking-wider text-center bg-brand-cyan/5">{columnHeaders.coexistence}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row: any, idx: number) => (
                  <tr key={idx} className="border-b border-slate-700/50 last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 text-sm text-white font-medium">{row.feature}</td>
                    <td className="px-6 py-4 text-center border-x border-slate-700/50">{renderStatus(row.regular)}</td>
                    <td className="px-6 py-4 text-center border-r border-slate-700/50">{renderStatus(row.api)}</td>
                    <td className="px-6 py-4 text-center bg-brand-cyan/5">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-brand-cyan/20 flex items-center justify-center">
                          <Check size={12} className="text-brand-cyan" strokeWidth={3} />
                        </div>
                        <span className="text-sm font-semibold text-white">{row.coexistence}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
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
          <div className="w-12 h-12 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan font-bold border border-brand-cyan/30">
            {data.author?.[0]}
          </div>
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

// ================== Translation Helper ==================

const getTranslatedCoexistenceData = (t: (key: string, options?: any) => any) => {
  const hero = t('coexistencePage.hero', { returnObjects: true })
  const benefits = t('coexistencePage.benefits', { returnObjects: true })
  const features = t('coexistencePage.features', { returnObjects: true })
  const comparison = t('coexistencePage.comparison', { returnObjects: true })
  const faq = t('coexistencePage.faq', { returnObjects: true })

  // Check if translations exist (not just the key returned as string)
  if (typeof hero === 'string' || typeof benefits === 'string') {
    return null
  }

  return {
    hero: {
      badge: hero.badge,
      headline: hero.headline,
      headlineHighlight: hero.headlineHighlight,
      description: hero.description,
      primaryCta: hero.primaryCta ? { label: hero.primaryCta, url: 'https://chromewebstore.google.com/detail/eazybe-best-whatsapp-web/clgficggccelgifppbcaepjdkklfcefd' } : undefined,
      secondaryCta: hero.secondaryCta ? { label: hero.secondaryCta, url: 'https://calendly.com/d/cw67-pt3-y2m' } : undefined
    },
    benefits: {
      badge: benefits.badge,
      headline: benefits.headline,
      items: benefits.items
    },
    features: Array.isArray(features) ? features.map((f: any) => ({
      badge: f.badge,
      headline: f.headline,
      headlineHighlight: f.headlineHighlight,
      description: f.description,
      points: f.points
    })) : [],
    comparison: typeof comparison === 'object' ? {
      badge: comparison.badge,
      headline: comparison.headline,
      description: comparison.description,
      columnHeaders: comparison.columnHeaders,
      rows: comparison.rows
    } : null,
    faq: {
      badge: faq.badge,
      headline: faq.headline,
      items: faq.items
    }
  }
}

// ================== Main Page ==================

const CoexistencePage: React.FC = () => {
  const { t } = useTranslation()
  const { data, loading, error } = useCoexistence()

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
          <h1 className="text-2xl font-bold text-white mb-4">Page not found</h1>
          <Link to="/" className="text-brand-blue hover:underline">
            Go home
          </Link>
        </div>
      </div>
    )
  }

  // Get translated data and merge with Sanity data
  const translatedData = getTranslatedCoexistenceData(t)

  const mergedData = translatedData ? {
    hero: { ...data.hero, ...translatedData.hero },
    benefits: { ...data.benefits, ...translatedData.benefits },
    features: translatedData.features.length > 0 ? translatedData.features : data.features,
    comparison: translatedData.comparison,
    howItWorks: data.howItWorks, // Keep Sanity data for how it works
    useCases: data.useCases, // Keep Sanity data for use cases
    testimonial: data.testimonial, // Keep Sanity data for testimonial
    faq: { ...data.faq, ...translatedData.faq }
  } : data

  return (
    <div className="min-h-screen bg-brand-black font-sans text-slate-400 antialiased selection:bg-brand-blue selection:text-white overflow-x-hidden">
      <Navbar />

      <HeroSection data={mergedData.hero} />
      <BenefitsSection data={mergedData.benefits} />
      <FeaturesSection features={mergedData.features} />
      <ComparisonSection data={mergedData.comparison} />
      <HowItWorksSection data={mergedData.howItWorks} />
      <UseCasesSection data={mergedData.useCases} />
      {mergedData.testimonial && <TestimonialSection data={mergedData.testimonial} />}
      <FAQSection data={mergedData.faq} />

      <ChunkyFooter />
    </div>
  )
}

export default CoexistencePage
