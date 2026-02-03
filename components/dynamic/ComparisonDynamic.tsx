import React from 'react'
import { useTranslation } from 'react-i18next'
import { Check, X, Cloud } from 'lucide-react'
import { SectionBadge } from '../ui/SectionBadge'
import type { ComparisonSection } from '../../hooks/useLandingPage'

interface Props {
  data: ComparisonSection
}

export const ComparisonDynamic: React.FC<Props> = ({ data }) => {
  const { t, i18n } = useTranslation()
  const isNonEnglish = i18n.language !== 'en'

  // For non-English languages, prioritize translations
  const badge = isNonEnglish ? t('integrations.comparison.badge', data.badge || '') : (data.badge || t('integrations.comparison.badge', ''))
  const headline = isNonEnglish ? t('integrations.comparison.headline', data.headline || '') : (data.headline || '')
  const description = isNonEnglish ? t('integrations.comparison.description', data.description || '') : (data.description || t('integrations.comparison.description', ''))

  return (
    <section className="py-24 bg-brand-surface border-y border-slate-800 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            {badge && (
              <div className="mb-6">
                <SectionBadge variant="cyan">{badge}</SectionBadge>
              </div>
            )}
            {headline && (
              <h2 className="text-4xl font-sans font-bold text-white mb-6">
                {headline}
              </h2>
            )}
            {description && (
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                {description}
              </p>
            )}
          </div>

          <div className="lg:col-span-8">
            {/* Visual Header for the Three Types */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-brand-card p-4 rounded-card border border-slate-700 shadow-sm flex flex-col items-center text-center">
                <img
                  src="https://cdn.simpleicons.org/whatsapp/25D366"
                  alt={t('home.comparison.personalWhatsApp')}
                  className="w-10 h-10 mb-3"
                  referrerPolicy="no-referrer"
                />
                <span className="text-xs font-bold text-slate-300">{t('home.comparison.personalWhatsApp')}</span>
              </div>
              <div className="bg-brand-card p-4 rounded-card border border-slate-700 shadow-sm flex flex-col items-center text-center">
                <div className="relative w-10 h-10 mb-3 flex items-center justify-center">
                  <img
                    src="https://cdn.simpleicons.org/whatsapp/25D366"
                    alt={t('home.comparison.businessApp')}
                    className="w-10 h-10"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-slate-800 rounded-full px-1 border border-slate-600 shadow-sm">
                    <span className="text-[8px] font-bold text-slate-200">B</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-300">{t('home.comparison.businessApp')}</span>
              </div>
              <div className="bg-brand-card p-4 rounded-card border border-slate-700 shadow-sm flex flex-col items-center text-center">
                <div className="relative w-10 h-10 mb-3 flex items-center justify-center">
                  <img
                    src="https://cdn.simpleicons.org/whatsapp/25D366"
                    alt={t('home.comparison.businessApi')}
                    className="w-10 h-10 opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -top-1 -right-1 bg-brand-cyan rounded-full p-1 border-2 border-slate-900 shadow-sm">
                    <Cloud size={10} className="text-white" />
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-300">{t('home.comparison.businessApi')}</span>
              </div>
            </div>

            <div className="bg-brand-card rounded-card shadow-xl border border-slate-700 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-800/50 border-b border-slate-700">
                    <th className="p-6 font-sans font-semibold text-white text-sm">{t('home.comparison.capability')}</th>
                    <th className="p-6 font-sans font-medium text-slate-400 text-sm text-center">{t('home.comparison.otherTools')}</th>
                    <th className="p-6 font-sans font-bold text-brand-cyan text-sm text-center bg-cyan-950/10">Eazybe</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {data.comparisonRows?.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 pl-6 text-sm font-medium text-slate-300">{item.capability}</td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center">
                          {item.otherTools ? (
                            <Check className="text-brand-green w-5 h-5" strokeWidth={2.5} />
                          ) : (
                            <X className="text-slate-600 w-5 h-5" strokeWidth={2.5} />
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-center bg-cyan-950/5 border-l border-slate-700/50">
                        <div className="flex justify-center">
                          {item.eazybe ? (
                            <div className="w-6 h-6 rounded-full bg-brand-cyan/20 flex items-center justify-center border border-brand-cyan/30">
                              <Check className="text-brand-cyan w-3.5 h-3.5" strokeWidth={3} />
                            </div>
                          ) : (
                            <X className="text-red-300 w-5 h-5" strokeWidth={2.5} />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
