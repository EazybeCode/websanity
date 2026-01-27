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

export const HowItWorksDynamic: React.FC<HowItWorksDynamicProps> = ({ data, color = '#25D366' }) => {
  if (!data || !data.steps || data.steps.length === 0) return null

  return (
    <section className="py-24 bg-slate-950">
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
          {data.description && (
            <p className="text-lg text-slate-400 leading-relaxed">
              {data.description}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

          {data.steps.map((step, idx) => (
            <div key={idx} className="relative text-center">
              <div
                className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-white relative z-10"
                style={{ backgroundColor: `${color}20`, border: `2px solid ${color}` }}
              >
                {step.number || idx + 1}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksDynamic
