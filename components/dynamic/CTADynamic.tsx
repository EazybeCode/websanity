import React from 'react'
import { Button } from '../ui/Button'
import { ArrowRight, Zap } from 'lucide-react'
import { SectionBadge } from '../ui/SectionBadge'
import type { CTASection } from '../../hooks/useLandingPage'

interface Props {
  data: CTASection
}

export const CTADynamic: React.FC<Props> = ({ data }) => {
  return (
    <section className="py-32 bg-brand-black relative overflow-hidden text-white border-t border-slate-800">
      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>

      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="flex justify-center mb-8">
          <SectionBadge
            variant="orange"
            icon={<Zap size={12} fill="currentColor" className="text-brand-orange" />}
          >
            Ready for Lift off
          </SectionBadge>
        </div>

        <h2 className="text-4xl md:text-6xl font-sans font-extrabold tracking-tight mb-8 leading-tight text-white">
          {data.headline} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-green">
            {data.headlineHighlight}
          </span>
        </h2>

        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          {data.subheadline}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Button
            variant="primary"
            size="lg"
            className="px-10 shadow-glow-blue font-bold"
            icon={<ArrowRight size={18} />}
          >
            {data.primaryCta?.label}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-10 bg-transparent text-slate-300 border-slate-700 hover:text-white hover:border-slate-500"
          >
            {data.secondaryCta?.label}
          </Button>
        </div>

        {data.footnote && (
          <p className="text-xs font-mono text-slate-500 uppercase tracking-wide">
            {data.footnote}
          </p>
        )}
      </div>
    </section>
  )
}
