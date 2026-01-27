import React from 'react'
import { CheckCircle2, TrendingUp, HeadphonesIcon, Megaphone } from 'lucide-react'

interface UseCase {
  icon?: string
  title?: string
  description?: string
  benefits?: string[]
}

interface UseCasesData {
  badge?: string
  headline?: string
  items?: UseCase[]
}

interface UseCasesDynamicProps {
  data: UseCasesData
  color?: string
}

const getUseCaseIcon = (iconName?: string) => {
  const icons: Record<string, React.FC<{ size?: number; className?: string }>> = {
    sales: TrendingUp,
    support: HeadphonesIcon,
    marketing: Megaphone,
  }
  return icons[iconName || ''] || TrendingUp
}

export const UseCasesDynamic: React.FC<UseCasesDynamicProps> = ({ data, color = '#25D366' }) => {
  if (!data || !data.items || data.items.length === 0) return null

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
          <h2 className="text-4xl font-sans font-bold text-white tracking-tight">
            {data.headline}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {data.items.map((item, idx) => {
            const Icon = getUseCaseIcon(item.icon)
            return (
              <div
                key={idx}
                className="bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-colors rounded-xl p-8 group"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${color}15`, color }}
                >
                  <Icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-6">{item.description}</p>

                {item.benefits && item.benefits.length > 0 && (
                  <ul className="space-y-3">
                    {item.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color }} />
                        <span className="text-slate-300 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default UseCasesDynamic
