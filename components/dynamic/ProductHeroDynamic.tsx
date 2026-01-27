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

export const ProductHeroDynamic: React.FC<ProductHeroDynamicProps> = ({ data, color = '#25D366' }) => {
  if (!data) return null

  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] blur-[120px] rounded-full -z-10 animate-pulse" style={{ backgroundColor: `${color}15` }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {data.badge && (
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full border text-cyan-500 border-cyan-500/20 bg-cyan-500/10 mb-6 select-none">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-cyan-500"></span>
              {data.badge}
            </span>
          )}

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
                <button
                  className="inline-flex items-center justify-center font-bold text-sm px-8 py-4 rounded-lg transition-all duration-200 text-white shadow-lg h-14"
                  style={{ backgroundColor: color, borderColor: color }}
                >
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
