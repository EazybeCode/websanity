import React from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  ChevronDown
} from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { FooterDynamic } from '../components/dynamic/FooterDynamic'
import { ProductSectionRenderer } from '../components/dynamic/ProductSectionRenderer'
import { SecuritySection, CTASection } from '../components/shared'
import { useFooter } from '../hooks/useFooter'
import { useFeature } from '../hooks/useFeature'
import { useSharedSections } from '../hooks/useSharedSections'
import { getIcon as getIconFromMap, getFeatureIcon } from '../lib/iconMap'

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

const HeroSection: React.FC<{ data: any; color: string }> = ({ data, color }) => {
  if (!data) return null

  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] blur-[120px] rounded-full -z-10 animate-pulse" style={{ backgroundColor: `${color}15` }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {data.badge && <SectionKicker label={data.badge} className="mx-auto" />}

          <h1 className="text-5xl lg:text-7xl font-sans font-extrabold tracking-tight text-white leading-[1.05] mb-6">
            {data.headline}{' '}
            <span style={{ color }}>{data.headlineHighlight}</span>
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-2xl mx-auto">
            {data.description}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {data.primaryCta && (
              <Link to={data.primaryCta.url}>
                <Button variant="primary" className="h-14 px-8 text-base" style={{ backgroundColor: color, borderColor: color }}>
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

const BenefitsSection: React.FC<{ data: any; color: string }> = ({ data, color }) => {
  if (!data || !data.items) return null

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {data.badge && <SectionKicker label={data.badge} className="mx-auto" />}
          <h2 className="text-4xl font-sans font-bold text-white tracking-tight mb-4">
            {data.headline}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item: any, idx: number) => {
            const Icon = getIcon(item.icon)
            return (
              <div key={idx} className="bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-colors rounded-xl p-6 group">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${color}15`, color }}>
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

const FeaturesSection: React.FC<{ features: any[]; color: string; slug: string }> = ({ features, color, slug }) => {
  if (!features || features.length === 0) return null

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {features.map((feature, idx) => (
          <div key={idx} className={`grid lg:grid-cols-2 gap-16 items-center ${idx > 0 ? 'mt-32' : ''}`}>
            <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
              {feature.badge && <SectionKicker label={feature.badge} />}
              <h2 className="text-4xl font-sans font-bold text-white tracking-tight mb-6">
                {feature.headline}
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                {feature.description}
              </p>

              {feature.points && feature.points.length > 0 && (
                <div className="space-y-4 mb-8">
                  {feature.points.map((point: string, pIdx: number) => (
                    <div key={pIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color }} />
                      <span className="text-slate-300">{point}</span>
                    </div>
                  ))}
                </div>
              )}

              {feature.cta && (
                <Link to={feature.cta.url}>
                  <Button variant="outline">
                    {feature.cta.label}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              )}
            </div>

            <div className={`relative ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 min-h-[400px] flex items-center justify-center">
                <div className="text-center text-slate-500">
                  {(() => {
                    const FeatureIcon = getFeatureIcon(slug, Cloud)
                    return (
                      <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                        <FeatureIcon size={48} style={{ color }} />
                      </div>
                    )
                  })()}
                  <p className="text-sm">{feature.badge || 'Feature visualization'}</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full blur-3xl" style={{ backgroundColor: `${color}20` }}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ================== How It Works Section ==================

const HowItWorksSection: React.FC<{ data: any; color: string }> = ({ data, color }) => {
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
            <div key={idx} className="relative">
              <div className="text-6xl font-black mb-4" style={{ color: `${color}30` }}>
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-slate-400">{step.description}</p>

              {idx < data.steps.length - 1 && (
                <div className="hidden md:block absolute top-8 right-0 w-1/2 h-0.5 bg-gradient-to-r from-slate-700 to-transparent"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ================== Use Cases Section ==================

const UseCasesSection: React.FC<{ data: any; color: string }> = ({ data, color }) => {
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
            const Icon = getIcon(item.icon)
            return (
              <div key={idx} className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${color}15`, color }}>
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 mb-4">{item.description}</p>

                {item.benefits && item.benefits.length > 0 && (
                  <ul className="space-y-2">
                    {item.benefits.map((benefit: string, bIdx: number) => (
                      <li key={bIdx} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle2 size={14} style={{ color }} />
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

const TestimonialSection: React.FC<{ data: any; color: string }> = ({ data, color }) => {
  if (!data) return null

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-5xl mb-8" style={{ color }}>"</div>
        <blockquote className="text-2xl font-medium text-white mb-8 leading-relaxed">
          {data.quote}
        </blockquote>
        <div className="flex items-center justify-center gap-4">
          {data.avatar && (
            <img src={data.avatar} alt={data.author} className="w-12 h-12 rounded-full" />
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

// ================== Main FeaturePage Component ==================

export const FeaturePage: React.FC = () => {
  const { slug: urlSlug } = useParams<{ slug: string }>()
  const location = useLocation()

  // Determine slug based on URL - handle /whatsapp-api route specially
  const slug = urlSlug || (location.pathname === '/whatsapp-api' ? 'whatsapp-api' : 'cloud-backup')

  const { data: footerData } = useFooter()
  const { data: sharedData } = useSharedSections()
  const { data, loading, error } = useFeature(slug)

  const featureColor = featureColors[slug] || featureColors['cloud-backup']
  const color = featureColor.primary

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Feature not found</h1>
          <Link to="/features" className="text-blue-500 hover:underline">
            View all features
          </Link>
        </div>
      </div>
    )
  }

  // Check if using new modular sections or legacy fields
  const useSections = data.sections && data.sections.length > 0

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-400 antialiased selection:bg-blue-600 selection:text-white overflow-x-hidden">
      <Navbar />

      {useSections ? (
        // New modular section-based rendering
        <>
          {data.sections!.map((section, idx) => (
            <ProductSectionRenderer
              key={section._key || idx}
              section={section}
              color={color}
              slug={slug || 'cloud-backup'}
            />
          ))}
          {/* Add shared sections if not already in the sections array */}
          {!data.sections!.some(s => s._type === 'ctaSection') && sharedData?.cta && (
            <CTASection data={sharedData.cta} />
          )}
          {!data.sections!.some(s => s._type === 'securitySection') && sharedData?.security && (
            <SecuritySection data={sharedData.security} />
          )}
        </>
      ) : (
        // Legacy field-based rendering
        <>
          <HeroSection data={data.hero} color={color} />
          <BenefitsSection data={data.benefits} color={color} />
          <FeaturesSection features={data.features} color={color} slug={slug || 'cloud-backup'} />
          <HowItWorksSection data={data.howItWorks} color={color} />
          <UseCasesSection data={data.useCases} color={color} />
          {data.testimonial && <TestimonialSection data={data.testimonial} color={color} />}
          <FAQSection data={data.faq} />

          {/* Shared sections for consistency with landing page */}
          <CTASection data={sharedData?.cta} />
          <SecuritySection data={sharedData?.security} />
        </>
      )}

      {footerData && <FooterDynamic data={footerData} />}
    </div>
  )
}

export default FeaturePage
