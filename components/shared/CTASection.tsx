import React from 'react'
import { Rocket } from 'lucide-react'

export interface CTASectionData {
  badge?: string
  headline?: string
  headlineHighlight?: string
  description?: string
  primaryCta?: {
    label: string
    url: string
  }
  secondaryCta?: {
    label: string
    url: string
  }
  footnote?: string
}

interface Props {
  data?: CTASectionData
}

const defaultData: CTASectionData = {
  badge: 'READY FOR LIFT OFF',
  headline: 'Turn WhatsApp into your',
  headlineHighlight: 'Revenue Engine',
  description: 'Join 2,000+ teams who finally see what\'s happening in chat. Sync conversations, automate workflows, and close deals faster.',
  primaryCta: {
    label: 'Start 7-Day Free Trial',
    url: 'https://chromewebstore.google.com/detail/eazybe-best-whatsapp-web/clgficggccelgifppbcaepjdkklfcefd'
  },
  secondaryCta: {
    label: 'Book a Demo',
    url: 'https://calendly.com/d/cw67-pt3-y2m'
  },
  footnote: 'Free 7-day trial • No credit card required • GDPR Ready'
}

export const CTASection: React.FC<Props> = ({ data = defaultData }) => {
  const { badge, headline, headlineHighlight, description, primaryCta, secondaryCta, footnote } = { ...defaultData, ...data }

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-700">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 font-mono text-sm font-bold mb-8">
          <Rocket size={16} />
          {badge}
        </div>

        <h2 className="text-5xl md:text-6xl font-sans font-extrabold text-white tracking-tight leading-tight mb-6">
          {headline} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">{headlineHighlight}</span>
        </h2>

        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {primaryCta && (
            <a
              href={primaryCta.url}
              target={primaryCta.url.startsWith('http') ? '_blank' : undefined}
              rel={primaryCta.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center justify-center font-bold text-base px-10 py-4 rounded-lg bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-blue-600 hover:bg-blue-700 hover:scale-105 transform transition-all"
            >
              {primaryCta.label}
            </a>
          )}
          {secondaryCta && (
            <a
              href={secondaryCta.url}
              className="inline-flex items-center justify-center font-bold text-base px-10 py-4 rounded-lg bg-transparent text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white transition-all"
            >
              {secondaryCta.label}
            </a>
          )}
        </div>

        {footnote && (
          <p className="mt-6 text-sm text-slate-500">
            {footnote}
          </p>
        )}
      </div>
    </section>
  )
}

export default CTASection
