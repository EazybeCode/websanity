import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Check,
  X,
  Minus,
  ChevronDown
} from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { FooterDynamic } from '../components/dynamic/FooterDynamic'
import { SecuritySection, CTASection } from '../components/shared'
import { useFooter } from '../hooks/useFooter'
import { useCategoryIndex } from '../hooks/useCategoryIndex'
import { useSharedSections } from '../hooks/useSharedSections'
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
              <Link to={data.primaryCta.url}>
                <Button variant="primary" className="h-14 px-8 text-base">
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

const FeaturedItemsSection: React.FC<{ items: any[]; category: string }> = ({ items, category }) => {
  if (!items || items.length === 0) return null

  const basePath = category === 'feature' ? '/features' : '/integrations'

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
              <h2 className="text-3xl font-bold text-white">Featured</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {featuredItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={`${basePath}/${item.slug}`}
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
                    Learn more <ArrowRight className="ml-2 w-4 h-4" />
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
              <h2 className="text-2xl font-bold text-white">More Options</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={`${basePath}/${item.slug}`}
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

// ================== Main CategoryIndexPage Component ==================

export const CategoryIndexPage: React.FC = () => {
  const location = useLocation()
  const { data: footerData } = useFooter()
  const { data: sharedData } = useSharedSections()

  // Determine slug based on current path
  const slug = location.pathname === '/features' ? 'features' : 'integrations'
  const { data, loading, error } = useCategoryIndex(slug)

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
    console.error('CategoryIndexPage error:', error, 'data:', data, 'slug:', slug)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Page not found</h1>
          {error && <p className="text-red-400 mb-4">{error.message}</p>}
          <p className="text-slate-500 mb-4">Slug: {slug}</p>
          <Link to="/" className="text-blue-500 hover:underline">
            Go home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-400 antialiased selection:bg-blue-600 selection:text-white overflow-x-hidden">
      <Navbar />

      <HeroSection data={data.hero} />
      <IntroSection data={data.intro} />
      <FeaturedItemsSection items={data.featuredItems} category={data.category} />
      {data.comparisonTable && <ComparisonSection data={data.comparisonTable} />}
      <BenefitsSection data={data.benefits} />
      <HowItWorksSection data={data.howItWorks} />
      <FAQSection data={data.faq} />

      {/* Shared sections for consistency with landing page */}
      <CTASection data={sharedData?.cta} />
      <SecuritySection data={sharedData?.security} />

      {footerData && <FooterDynamic data={footerData} />}
    </div>
  )
}

export default CategoryIndexPage
