'use client'

import React from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ArrowRight, MessageSquare, Database, AlertCircle, Zap, TrendingUp } from 'lucide-react'
import type { HeroSection } from '@/types/sanity'
import { useTrialModal } from '@/providers/TrialModalProvider'

interface Props {
  data: HeroSection
}

export const HeroDynamic: React.FC<Props> = ({ data }) => {
  const t = useTranslations()
  const locale = useLocale()
  const { openModal } = useTrialModal()
  const currentLang = locale

  // For non-English languages, prioritize translations; for English, use Sanity data
  const isNonEnglish = currentLang !== 'en'

  const badge = isNonEnglish ? t('hero.badge', { defaultValue: data.badge || '' }) : (data.badge || t('hero.badge', { defaultValue: '' }))
  const headline = isNonEnglish ? t('hero.headline', { defaultValue: data.headline || '' }) : (data.headline || t('hero.headline', { defaultValue: '' }))
  const headlineHighlight = isNonEnglish ? t('hero.headlineHighlight', { defaultValue: data.headlineHighlight || '' }) : (data.headlineHighlight || t('hero.headlineHighlight', { defaultValue: '' }))
  const subheadline = isNonEnglish ? t('hero.subheadline', { defaultValue: data.subheadline || '' }) : (data.subheadline || t('hero.subheadline', { defaultValue: '' }))
  const noCreditCard = isNonEnglish ? t('hero.noCreditCard', { defaultValue: data.socialProof || '' }) : (data.socialProof || t('hero.noCreditCard', { defaultValue: '' }))
  const primaryCtaLabel = isNonEnglish ? t('cta.startFreeTrial', { defaultValue: data.primaryCta?.label || '' }) : (data.primaryCta?.label || t('cta.startFreeTrial', { defaultValue: '' }))
  const secondaryCtaLabel = isNonEnglish ? t('cta.bookDemo', { defaultValue: data.secondaryCta?.label || '' }) : (data.secondaryCta?.label || t('cta.bookDemo', { defaultValue: '' }))

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden bg-slate-950 border-b border-slate-800">
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Neon Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/15 rounded-full blur-[150px] -z-10 translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] -z-10 -translate-x-1/4 translate-y-1/4"></div>
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] -z-10 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div className="max-w-2xl relative z-10">
            {badge && (
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-cyan-400 uppercase tracking-[0.1em] bg-slate-900/80 backdrop-blur px-4 py-2 rounded-full border border-cyan-500/30 shadow-lg shadow-cyan-500/10 whitespace-normal leading-relaxed max-w-full">
                  <motion.span
                    className="w-2 h-2 rounded-full bg-emerald-400"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  {badge}
                </span>
              </motion.div>
            )}

            <motion.h1
              className="text-5xl lg:text-7xl font-sans font-extrabold tracking-tight text-white mb-8 leading-[1.05]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {headline}{' '}
              {headlineHighlight && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400">
                  {headlineHighlight}
                </span>
              )}
            </motion.h1>

            {subheadline && (
              <motion.p
                className="text-xl font-sans text-slate-300 mb-10 max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {subheadline}
              </motion.p>
            )}

            <motion.div
              className="flex flex-col sm:flex-row gap-4 items-start mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                onClick={() => openModal('trial')}
                variant="primary"
                size="lg"
                icon={<ArrowRight size={18} />}
                className="shadow-lg shadow-blue-500/25 border-none font-bold hover:shadow-blue-500/40 transition-shadow cursor-pointer"
              >
                {primaryCtaLabel}
              </Button>
              <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/5 text-white backdrop-blur border-slate-700 hover:bg-white/10 hover:border-slate-500 font-semibold"
                  onClick={() => openModal('demo')}
                >
                  {secondaryCtaLabel}
                </Button>
            </motion.div>

            <motion.div
                className="text-sm text-slate-400 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className="text-white font-bold">{isNonEnglish ? t('hero.trustedBy', { defaultValue: 'Trusted by 2000+ Sales Teams Using' }) : 'Trusted by 2000+ Sales Teams Using'}</span>
                <div className="flex items-center gap-3 mt-3 flex-wrap">
                  {[
                    { name: 'HubSpot', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.hubspot.com&size=256' },
                    { name: 'Salesforce', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.salesforce.com&size=256' },
                    { name: 'Zoho', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.zoho.com&size=256' },
                    { name: 'Bitrix24', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.bitrix24.com&size=256' },
                    { name: 'LeadSquared', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.leadsquared.com&size=256' },
                    { name: 'Freshworks', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.freshworks.com&size=256' },
                    { name: 'Google Sheets', logo: 'https://cdn.simpleicons.org/googlesheets/34A853' },
                  ].map((crm, i) => (
                    <motion.div
                      key={crm.name}
                      className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700/50 p-1.5 hover:border-slate-500 transition-colors"
                      title={crm.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                    >
                      <img src={crm.logo} alt={crm.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
          </div>

          {/* Right: Engineered Visual */}
          <div className="relative h-[500px] w-full hidden lg:flex items-center justify-center">
            {/* Glowing Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800/80 to-slate-900 rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 opacity-40" style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
              }} />
            </div>

            {/* Central Visual */}
            <div className="relative flex flex-col items-center justify-center gap-6 p-8">

              {/* Top Row - WhatsApp Messages */}
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {[t('home.heroVisual.msg1', { defaultValue: 'Deal closed! \ud83c\udf89' }), t('home.heroVisual.msg2', { defaultValue: 'Send pricing?' }), t('home.heroVisual.msg3', { defaultValue: 'Meeting Friday' })].map((msg, i) => (
                  <motion.div
                    key={i}
                    className="bg-[#25D366]/20 border border-[#25D366]/40 px-3 py-2 rounded-xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                  >
                    <div className="flex items-center gap-2">
                      <svg viewBox="0 0 24 24" className="w-3 h-3 text-[#25D366] fill-current">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      <span className="text-[11px] text-white font-medium">{msg}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Animated Sync Lines */}
              <div className="relative h-12 w-full flex items-center justify-center">
                <svg className="absolute w-full h-full overflow-visible">
                  {[0, 1, 2].map((i) => (
                    <motion.circle
                      key={i}
                      r="4"
                      fill="#22d3ee"
                      initial={{ cy: 0, cx: 80 + i * 120 }}
                      animate={{ cy: [0, 48, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                    />
                  ))}
                </svg>
                <motion.div
                  className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full z-10"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap size={14} className="text-cyan-400" />
                  <span className="text-xs font-bold text-cyan-400">{t('home.heroVisual.syncingToCrm', { defaultValue: 'SYNCING TO CRM' })}</span>
                </motion.div>
              </div>

              {/* CRM Dashboard Preview */}
              <motion.div
                className="w-full max-w-md bg-slate-800/80 rounded-2xl border border-slate-700/50 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {/* CRM Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900/50 border-b border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <Database size={14} className="text-blue-400" />
                    <span className="text-xs font-bold text-slate-300">{t('home.heroVisual.revenueDashboard', { defaultValue: 'Revenue Dashboard' })}</span>
                  </div>
                  <motion.div
                    className="flex items-center gap-1.5"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[10px] text-emerald-400">{t('home.heroVisual.live', { defaultValue: 'Live' })}</span>
                  </motion.div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 p-4">
                  {[
                    { label: t('home.heroVisual.responseRate', { defaultValue: 'Response Rate' }), value: '+47%', color: 'emerald' },
                    { label: t('home.heroVisual.dealsClosed', { defaultValue: 'Deals Closed' }), value: '156', color: 'blue' },
                    { label: t('home.heroVisual.revenue', { defaultValue: 'Revenue' }), value: 'R$2.4M', color: 'cyan' }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      className="text-center p-3 bg-slate-900/50 rounded-xl border border-slate-700/30"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                    >
                      <motion.div
                        className={`text-xl font-bold ${stat.color === 'emerald' ? 'text-emerald-400' : stat.color === 'blue' ? 'text-blue-400' : 'text-cyan-400'}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 + i * 0.1 }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-[9px] text-slate-500 mt-1 uppercase tracking-wide">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Activity Feed */}
                <div className="px-4 pb-4">
                  <div className="space-y-2">
                    {[
                      { name: 'Sarah K.', action: t('home.heroVisual.dealMoved', { defaultValue: 'Deal moved to Negotiation' }), time: t('home.heroVisual.justNow', { defaultValue: 'Just now' }) },
                      { name: 'Mike T.', action: t('home.heroVisual.newMessageSynced', { defaultValue: 'New message synced' }), time: t('home.heroVisual.twoMinAgo', { defaultValue: '2m ago' }) }
                    ].map((activity, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center justify-between p-2 bg-slate-900/30 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + i * 0.15 }}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-[10px] text-white font-bold">
                            {activity.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="text-[10px] text-white font-medium">{activity.name}</div>
                            <div className="text-[9px] text-slate-500">{activity.action}</div>
                          </div>
                        </div>
                        <span className="text-[9px] text-emerald-400">{activity.time}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
