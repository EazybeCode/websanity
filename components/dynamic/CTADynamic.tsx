import React from 'react'
import { Button } from '../ui/Button'
import { ArrowRight } from 'lucide-react'
import type { CTASection } from '../../hooks/useLandingPage'

interface Props {
  data: CTASection
}

export const CTADynamic: React.FC<Props> = ({ data }) => {
  const bgClasses: Record<string, string> = {
    blue: 'bg-brand-blue text-white',
    dark: 'bg-brand-ink text-white',
    white: 'bg-white text-brand-ink',
    gray: 'bg-brand-muted text-brand-ink',
  }

  const bgClass = bgClasses[data.backgroundColor || 'blue'] || bgClasses.blue

  return (
    <section className={`py-24 ${bgClass}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {data.headline && (
          <h2 className="text-4xl md:text-5xl font-sans font-bold mb-6">{data.headline}</h2>
        )}
        {data.subheadline && (
          <p className="text-xl opacity-90 font-light mb-10 max-w-2xl mx-auto">{data.subheadline}</p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {data.primaryCta && (
            <Button
              variant={data.backgroundColor === 'blue' ? 'secondary' : 'primary'}
              size="lg"
              icon={data.primaryCta.showIcon ? <ArrowRight size={18} /> : undefined}
              className={data.backgroundColor === 'blue' ? 'bg-white text-brand-blue hover:bg-slate-100' : ''}
            >
              {data.primaryCta.label}
            </Button>
          )}
          {data.secondaryCta && (
            <Button
              variant="outline"
              size="lg"
              className={
                data.backgroundColor === 'blue' || data.backgroundColor === 'dark'
                  ? 'border-white/30 text-white hover:bg-white/10'
                  : ''
              }
            >
              {data.secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
