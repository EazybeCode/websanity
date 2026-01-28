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

export const FAQDynamic: React.FC<FAQDynamicProps> = ({ data }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!data || !data.items || data.items.length === 0) return null

  return (
    <section className="py-24 bg-brand-black border-b border-slate-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {data.badge && (
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full border text-brand-cyan border-brand-cyan/20 bg-brand-cyan/10 mb-6 select-none">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-brand-cyan"></span>
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
              className="bg-brand-card border border-slate-700 rounded-2xl overflow-hidden hover:border-slate-600 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between"
              >
                <span className="font-semibold text-white">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-5 text-slate-400 leading-relaxed border-t border-slate-700/50">
                  <div className="pt-4">{item.answer}</div>
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
