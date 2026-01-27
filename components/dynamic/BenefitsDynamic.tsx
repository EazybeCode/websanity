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

export const BenefitsDynamic: React.FC<BenefitsDynamicProps> = ({ data, color = '#25D366' }) => {
  if (!data || !data.items) return null

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {data.badge && (
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full border text-cyan-500 border-cyan-500/20 bg-cyan-500/10 mb-6 select-none">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-cyan-500"></span>
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

export default BenefitsDynamic
