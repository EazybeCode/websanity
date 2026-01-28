import React from 'react'
import { getIcon } from '../../lib/iconMap'
import { CheckCircle2 } from 'lucide-react'

interface BenefitsData {
  badge?: string
  headline?: string
  items?: Array<{
    icon?: string
    title: string
    description: string
  }>
}

interface BenefitsDynamicProps {
  data: BenefitsData
  color?: string
}

export const BenefitsDynamic: React.FC<BenefitsDynamicProps> = ({ data }) => {
  if (!data || !data.items) return null

  return (
    <section className="py-24 bg-brand-surface border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {data.badge && (
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full border text-brand-cyan border-brand-cyan/20 bg-brand-cyan/10 mb-6 select-none">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-brand-cyan"></span>
              {data.badge}
            </span>
          )}
          <h2 className="text-4xl font-sans font-bold text-white tracking-tight mb-4">
            {data.headline}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item, idx) => {
            const Icon = getIcon(item.icon, CheckCircle2)
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

export default BenefitsDynamic
