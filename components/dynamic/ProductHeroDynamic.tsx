import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface ProductHeroData {
  badge?: string
  headline?: string
  headlineHighlight?: string
  description?: string
  primaryCta?: { label: string; url: string }
  secondaryCta?: { label: string; url: string }
  stats?: Array<{ value: string; label: string }>
}

interface ProductHeroDynamicProps {
  data: ProductHeroData
  color?: string
}

export const ProductHeroDynamic: React.FC<ProductHeroDynamicProps> = ({ data }) => {
  if (!data) return null

  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-brand-black">
      <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
      {/* Neon Glows - using brand blue/purple like landing page */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/20 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[100px] -z-10 -translate-x-1/4 translate-y-1/4"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {data.badge && (
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full border text-brand-cyan border-brand-cyan/20 bg-brand-cyan/10 mb-6 select-none">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-brand-cyan"></span>
              {data.badge}
            </span>
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
                <button className="inline-flex items-center justify-center font-bold text-sm px-8 py-4 rounded-lg transition-all duration-200 text-white shadow-lg h-14 bg-brand-blue border border-brand-blue hover:bg-brand-blue/90">
                  {data.primaryCta.label}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </Link>
            )}
            {data.secondaryCta && (
              <Link to={data.secondaryCta.url}>
                <button className="inline-flex items-center justify-center font-bold text-sm px-8 py-4 rounded-lg transition-all duration-200 bg-transparent text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white h-14">
                  {data.secondaryCta.label}
                </button>
              </Link>
            )}
          </div>

          {data.stats && data.stats.length > 0 && (
            <div className="flex justify-center gap-12 pt-8 border-t border-slate-800/50">
              {data.stats.map((stat, idx) => (
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

export default ProductHeroDynamic
