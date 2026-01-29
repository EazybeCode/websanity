import React from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { Button } from '../ui/Button'
import { ArrowRight, MessageSquare, Database, AlertCircle } from 'lucide-react'
import type { HeroSection } from '../../hooks/useLandingPage'

interface Props {
  data: HeroSection
}

export const HeroDynamic: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation()

  // Use translations with Sanity data as fallback
  const badge = t('hero.badge', { defaultValue: data.badge || '' })
  const headline = t('hero.headline', { defaultValue: data.headline || '' })
  const headlineHighlight = t('hero.headlineHighlight', { defaultValue: data.headlineHighlight || '' })
  const subheadline = t('hero.subheadline', { defaultValue: data.subheadline || '' })
  const noCreditCard = t('hero.noCreditCard', { defaultValue: data.socialProof || '' })
  const primaryCtaLabel = t('cta.startFreeTrial', { defaultValue: data.primaryCta?.label || '' })
  const secondaryCtaLabel = t('cta.bookDemo', { defaultValue: data.secondaryCta?.label || '' })

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden bg-brand-black border-b border-slate-800">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>

      {/* Neon Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/20 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[100px] -z-10 -translate-x-1/4 translate-y-1/4"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div className="max-w-2xl relative z-10">
            {badge && (
              <div className="mb-8 animate-fade-in-up">
                <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-brand-cyan uppercase tracking-[0.1em] bg-slate-900/80 backdrop-blur px-4 py-2 rounded-full border border-slate-700 shadow-lg shadow-cyan-500/20 whitespace-normal leading-relaxed max-w-full">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
                  {badge}
                </span>
              </div>
            )}

            <h1 className="text-5xl lg:text-7xl font-sans font-extrabold tracking-tight text-white mb-8 leading-[1.05]">
              {headline}{' '}
              {headlineHighlight && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-green">
                  {headlineHighlight}
                </span>
              )}
            </h1>

            {subheadline && (
              <p className="text-xl font-sans text-slate-200 mb-10 max-w-lg leading-relaxed">
                {subheadline}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 items-start mb-12">
              <a href="https://chromewebstore.google.com/detail/eazybe-best-whatsapp-web/clgficggccelgifppbcaepjdkklfcefd" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight size={18} />}
                  className="shadow-glow-blue border-none font-bold"
                >
                  {primaryCtaLabel}
                </Button>
              </a>
              <a href="https://calendly.com/d/cw67-pt3-y2m" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/5 text-white backdrop-blur border-slate-700 hover:bg-white/10 hover:border-slate-500 font-semibold"
                >
                  {secondaryCtaLabel}
                </Button>
              </a>
            </div>

            {noCreditCard && (
              <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full border-2 border-slate-900 bg-slate-800 shadow-sm relative z-0 hover:z-10 transition-all"
                    >
                      <img
                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                        alt="User"
                        className="w-full h-full rounded-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
                      />
                    </div>
                  ))}
                </div>
                <span className="ml-3">
                  <span className="text-white font-bold">{noCreditCard}</span>
                </span>
              </div>
            )}
          </div>

          {/* Right: Engineered Visual (The Bridge) */}
          <div className="relative h-[600px] w-full hidden lg:flex items-center justify-center perspective-1000">
            {/* Glowing Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-black to-slate-900 rounded-3xl border border-white/10 shadow-2xl bg-grid-pattern"></div>

            {/* The Connection Visual */}
            <div className="relative w-full max-w-lg transform">
              {/* 1. WhatsApp Card (Bottom Left) */}
              <div
                className="absolute top-32 left-0 w-72 bg-slate-900 rounded-card shadow-2xl border border-slate-700 z-20 animate-float"
                style={{ animationDelay: '0s' }}
              >
                <div className="h-12 bg-[#00A884] rounded-t-card flex items-center px-4 justify-between shadow-[0_0_20px_rgba(0,168,132,0.3)]">
                  <div className="flex items-center gap-2 text-white">
                    <MessageSquare size={16} fill="currentColor" />
                    <span className="font-bold text-sm">{t('home.heroVisual.whatsapp')}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-white/30"></div>
                    <div className="w-2 h-2 rounded-full bg-white/30"></div>
                  </div>
                </div>
                <div className="p-4 space-y-4 bg-slate-800/50">
                  <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none text-xs text-slate-200 w-5/6 border border-slate-700">
                    {t('home.heroVisual.chatMessage1')}
                  </div>
                  <div className="bg-[#005c4b] p-3 rounded-2xl rounded-tr-none text-xs text-white ml-auto w-5/6 border border-[#007a63]">
                    {t('home.heroVisual.chatMessage2')}
                  </div>
                </div>
              </div>

              {/* 2. Connection Pipes */}
              <svg className="absolute top-[160px] left-[260px] w-[200px] h-[100px] z-10 overflow-visible pointer-events-none">
                <path
                  d="M 0 40 C 100 40, 100 -40, 200 -40"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                <circle cx="0" cy="0" r="2" fill="#00E5FF">
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    path="M 0 40 C 100 40, 100 -40, 200 -40"
                  />
                </circle>
              </svg>

              {/* 3. CRM Card (Top Right) */}
              <div
                className="absolute top-10 right-0 w-72 bg-slate-900 rounded-card shadow-2xl border border-slate-700 z-10 animate-float"
                style={{ animationDelay: '2s' }}
              >
                <div className="h-12 bg-gradient-to-r from-brand-blue to-brand-indigo rounded-t-card flex items-center px-4 justify-between shadow-glow-blue">
                  <div className="flex items-center gap-2 text-white">
                    <Database size={16} />
                    <span className="font-bold text-sm">{t('home.heroVisual.hubspotCrm')}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-800">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-900 to-slate-800 flex items-center justify-center text-brand-blue font-bold border border-slate-700">
                      JD
                    </div>
                    <div>
                      <div className="h-3 w-32 bg-slate-700 rounded mb-1.5"></div>
                      <div className="h-2 w-20 bg-slate-800 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs items-center">
                      <span className="text-slate-400 font-medium">{t('home.heroVisual.dealStage')}</span>
                      <span className="font-bold text-brand-blue bg-blue-900/30 px-2 py-0.5 rounded border border-blue-800/50">
                        {t('home.heroVisual.negotiation')}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-brand-blue rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
                    </div>
                    <div className="pt-2 flex justify-between items-center">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">{t('home.heroVisual.lastActivity')}</span>
                      <span className="text-[10px] font-bold text-brand-green flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></span> {t('home.heroVisual.justNow')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Action Card (Bottom Right floating) - RED for Alert */}
              <div
                className="absolute top-[340px] right-8 w-64 bg-slate-900 rounded-card shadow-[0_0_20px_rgba(239,68,68,0.3)] border border-red-500/30 z-30 animate-float"
                style={{ animationDelay: '1.5s' }}
              >
                <div className="p-3 border-b border-red-900/50 bg-red-900/20 flex items-center justify-between rounded-t-card">
                  <span className="text-xs font-bold text-red-500 uppercase tracking-wider flex items-center gap-2">
                    <AlertCircle size={14} fill="currentColor" /> {t('home.heroVisual.signalDetected')}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-slate-200 mb-3 leading-snug">
                    <Trans i18nKey="home.heroVisual.alertMessage" components={{ bold: <span className="text-red-400 font-bold" /> }} />
                  </p>
                  <button className="w-full py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold rounded-btn hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all transform hover:scale-[1.02]">
                    {t('home.heroVisual.createTask')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
