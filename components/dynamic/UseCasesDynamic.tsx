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

export const UseCasesDynamic: React.FC<UseCasesDynamicProps> = ({ data }) => {
  if (!data || !data.items || data.items.length === 0) return null

  return (
    <section className="py-24 bg-brand-black border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item, idx) => {
            const Icon = getUseCaseIcon(item.icon)
            return (
              <div
                key={idx}
                className="bg-brand-card border border-slate-700 rounded-2xl p-6 hover:border-slate-600 hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-brand-cyan/10 text-brand-cyan shadow-glow-cyan">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 mb-4">{item.description}</p>

                {item.benefits && item.benefits.length > 0 && (
                  <ul className="space-y-2">
                    {item.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-brand-cyan" />
                        {benefit}
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
