import React from 'react'
import { ShieldCheck, Lock, Infinity } from 'lucide-react'

export interface SecuritySectionData {
  badge?: string
  cards?: Array<{
    _key?: string
    icon: 'meta' | 'gdpr' | 'security'
    title: string
    subtitle: string
    showCompliantBadge?: boolean
  }>
  footnote?: string
}

interface Props {
  data?: SecuritySectionData
}

const defaultData: SecuritySectionData = {
  badge: 'Enterprise-Ready Security',
  cards: [
    {
      icon: 'meta',
      title: 'Meta Business Partner',
      subtitle: 'Verified Integration'
    },
    {
      icon: 'gdpr',
      title: 'GDPR Ready',
      subtitle: 'Fully Compliant Data Processing',
      showCompliantBadge: true
    },
    {
      icon: 'security',
      title: 'Bank-Grade Security',
      subtitle: 'SSL & 256-bit Encryption'
    }
  ],
  footnote: 'Trusted by regulated industries: financial services, healthcare, insurance'
}

export const SecuritySection: React.FC<Props> = ({ data = defaultData }) => {
  const { badge, cards, footnote } = { ...defaultData, ...data }

  return (
    <section className="py-24 bg-slate-950 relative border-t border-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-slate-900/50 text-cyan-500 font-mono text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
            {badge}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {cards?.map((card, idx) => {
            if (card.icon === 'meta') {
              return (
                <div key={card._key || idx} className="bg-slate-800 border border-slate-700 rounded-2xl p-8 flex flex-col items-center text-center hover:border-blue-600/50 transition-colors group">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <img
                      src="https://cdn.simpleicons.org/meta/0064e0"
                      alt="Meta"
                      className="w-10 h-10"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-slate-400 text-sm">{card.subtitle}</p>
                </div>
              )
            }

            if (card.icon === 'gdpr') {
              return (
                <div key={card._key || idx} className="bg-slate-800 border border-slate-700 rounded-2xl p-8 flex flex-col items-center text-center relative overflow-hidden hover:border-emerald-500/50 transition-colors group">
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                  <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mb-6 text-emerald-500 relative group-hover:scale-110 transition-transform duration-300">
                    <ShieldCheck size={32} />
                    <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-full border-dashed animate-[spin_10s_linear_infinite]"></div>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-slate-400 text-sm mb-6">{card.subtitle}</p>
                  {card.showCompliantBadge && (
                    <div className="px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full border border-current flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                      </div>
                      Compliant
                    </div>
                  )}
                </div>
              )
            }

            // Security card
            return (
              <div key={card._key || idx} className="bg-slate-800 border border-slate-700 rounded-2xl p-8 flex flex-col items-center text-center hover:border-cyan-500/50 transition-colors group">
                <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mb-6 text-cyan-500 group-hover:scale-110 transition-transform duration-300">
                  <Lock size={32} />
                </div>
                <h3 className="text-white text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-slate-400 text-sm">{card.subtitle}</p>
              </div>
            )
          })}

        </div>

        {footnote && (
          <div className="mt-16 text-center">
            <p className="text-slate-500 text-sm">{footnote}</p>
          </div>
        )}

      </div>
    </section>
  )
}

export default SecuritySection
