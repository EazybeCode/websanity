import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question?: string
  answer?: string
}

interface FAQData {
  badge?: string
  headline?: string
  items?: FAQItem[]
}

interface FAQDynamicProps {
  data: FAQData
  color?: string
}

export const FAQDynamic: React.FC<FAQDynamicProps> = ({ data, color = '#25D366' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!data || !data.items || data.items.length === 0) return null

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {data.badge && (
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full border text-cyan-500 border-cyan-500/20 bg-cyan-500/10 mb-6 select-none">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-cyan-500"></span>
              {data.badge}
            </span>
          )}
          <h2 className="text-4xl font-sans font-bold text-white tracking-tight">
            {data.headline}
          </h2>
        </div>

        <div className="space-y-4">
          {data.items.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-800/80 transition-colors"
              >
                <span className="text-lg font-semibold text-white pr-4">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                  style={{ color }}
                />
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-5">
                  <p className="text-slate-400 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQDynamic
