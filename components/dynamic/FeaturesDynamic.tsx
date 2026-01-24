import React from 'react'
import { Button } from '../ui/Button'
import { Check, ArrowRight } from 'lucide-react'
import type { FeatureSection } from '../../hooks/useLandingPage'

interface Props {
  data: FeatureSection
}

export const FeaturesDynamic: React.FC<Props> = ({ data }) => {
  return (
    <div id="features">
      {data.features?.map((feature, index) => {
        const isEven = index % 2 === 0

        return (
          <section
            key={feature.id || index}
            className={`py-24 border-b border-slate-200 ${isEven ? 'bg-white' : 'bg-brand-muted'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div
                className={`flex flex-col lg:flex-row gap-20 items-center ${
                  feature.alignRight ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 space-y-8">
                  <div>
                    {feature.badge && (
                      <span className="inline-block font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-btn border text-brand-blue bg-blue-50 border-blue-100">
                        {feature.badge}
                      </span>
                    )}
                    {feature.headline && (
                      <h2 className="mt-6 text-4xl font-sans font-bold text-brand-ink leading-tight">
                        {feature.headline}
                      </h2>
                    )}
                    {feature.description && (
                      <p className="mt-6 text-lg text-slate-600 leading-relaxed font-light">
                        {feature.description}
                      </p>
                    )}
                  </div>

                  {feature.points && feature.points.length > 0 && (
                    <ul className="space-y-4">
                      {feature.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <Check size={20} className="flex-shrink-0 mt-0.5 text-brand-blue" strokeWidth={2.5} />
                          <span className="text-slate-800 font-medium">{point.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {feature.ctaLabel && (
                    <div className="pt-4">
                      <Button
                        variant="outline"
                        className="text-brand-ink border-slate-300 hover:border-brand-blue hover:text-brand-blue"
                      >
                        {feature.ctaLabel} <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex-1 w-full">
                  <div className="aspect-[4/3] bg-white rounded-card border border-slate-200 shadow-engineering p-2 flex items-center justify-center relative overflow-hidden group hover:shadow-overlay transition-shadow duration-500">
                    <div className="absolute inset-0 bg-slate-50 grid-bg opacity-50"></div>
                    <div className="text-slate-300 font-mono text-xs z-10">Feature Visual: {feature.badge}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
