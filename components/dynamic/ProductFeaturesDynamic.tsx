import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Cloud } from 'lucide-react'
import { getFeatureIcon } from '../../lib/iconMap'

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

export const ProductFeaturesDynamic: React.FC<ProductFeaturesDynamicProps> = ({ data, color = '#25D366', slug = '' }) => {
  if (!data?.features || data.features.length === 0) return null

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {data.features.map((feature, idx) => (
          <div key={idx} className={`grid lg:grid-cols-2 gap-16 items-center ${idx > 0 ? 'mt-32' : ''}`}>
            <div className={idx % 2 === 1 || feature.alignRight ? 'lg:order-2' : ''}>
              {feature.badge && (
                <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full border text-cyan-500 border-cyan-500/20 bg-cyan-500/10 mb-6 select-none">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-cyan-500"></span>
                  {feature.badge}
                </span>
              )}
              <h2 className="text-4xl font-sans font-bold text-white tracking-tight mb-6">
                {feature.headline}
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                {feature.description}
              </p>

              {feature.points && feature.points.length > 0 && (
                <div className="space-y-4 mb-8">
                  {feature.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color }} />
                      <span className="text-slate-300">{point}</span>
                    </div>
                  ))}
                </div>
              )}

              {feature.cta && (
                <Link to={feature.cta.url}>
                  <button className="inline-flex items-center justify-center font-bold text-sm px-6 py-3 rounded-lg transition-all duration-200 bg-transparent text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white">
                    {feature.cta.label}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </Link>
              )}
            </div>

            <div className={`relative ${idx % 2 === 1 || feature.alignRight ? 'lg:order-1' : ''}`}>
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

export default ProductFeaturesDynamic
