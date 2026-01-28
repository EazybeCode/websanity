import React from 'react'

interface Step {
  number?: string
  title?: string
  description?: string
}

interface HowItWorksData {
  badge?: string
  headline?: string
  description?: string
  steps?: Step[]
}

interface HowItWorksDynamicProps {
  data: HowItWorksData
  color?: string
}

export const HowItWorksDynamic: React.FC<HowItWorksDynamicProps> = ({ data }) => {
  if (!data || !data.steps || data.steps.length === 0) return null

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
          {data.description && (
            <p className="text-lg text-slate-400 leading-relaxed">
              {data.description}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {data.steps.map((step, idx) => (
            <div key={idx} className="relative bg-brand-card rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300">
              <div className="text-5xl font-black mb-4 text-brand-cyan/40" style={{ textShadow: '0 0 30px rgba(6, 182, 212, 0.2)' }}>
                {step.number || idx + 1}
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

export default HowItWorksDynamic
