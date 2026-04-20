'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import {
  Users,
  DollarSign,
  Award,
  Rocket,
  Shield,
  Zap,
  Globe,
  CheckCircle2,
  ArrowRight,
  Star,
  Mail,
  Phone,
  ChevronDown,
  Briefcase,
} from 'lucide-react'
import { LocalizedLink } from '@/components/LocalizedLink'

// Integration logos — brand names, no translation needed
const integrations = [
  { name: 'Zoho CRM', url: '/zoho-whatsapp-integration' },
  { name: 'HubSpot', url: '/hubspot-whatsapp-integration' },
  { name: 'Salesforce', url: '/salesforce-whatsapp-integration' },
  { name: 'Pipedrive', url: '/pipedrive-whatsapp-integration' },
  { name: 'Freshsales', url: '/freshsales-whatsapp-integration' },
  { name: 'Monday.com', url: '/monday-whatsapp-integration' }
]

// Testimonial avatars — keyed by index, same across locales
const testimonialAvatars = [
  'https://i.pravatar.cc/150?img=11',
  'https://i.pravatar.cc/150?img=5',
  'https://i.pravatar.cc/150?img=3',
]

// Benefit icons + colors — keyed by index, same across locales
const benefitMeta = [
  { icon: DollarSign, color: 'from-emerald-500 to-cyan-500' },
  { icon: Briefcase, color: 'from-blue-500 to-indigo-500' },
  { icon: Rocket, color: 'from-purple-500 to-pink-500' },
  { icon: Shield, color: 'from-amber-500 to-orange-500' },
  { icon: Award, color: 'from-cyan-500 to-blue-500' },
  { icon: Zap, color: 'from-violet-500 to-purple-500' },
]

const benefitKeys = ['revenueShare', 'expandedPortfolio', 'mutualGrowth', 'prioritySupport', 'certifiedBadge', 'earlyAccess'] as const

const partnerTypeKeys = ['affiliate', 'reseller', 'whitelabel'] as const

// ScrollReveal component
const ScrollReveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay * 100}ms` }}
    >
      {children}
    </div>
  )
}

export function PartnerPageClient() {
  const t = useTranslations('partner')

  const steps = t.raw('steps') as Array<{ step: string; title: string; desc: string }>
  const testimonials = t.raw('testimonials') as Array<{ quote: string; author: string; role: string; earnings: string }>
  const faqs = t.raw('faqs') as Array<{ question: string; answer: string }>

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Glowing Orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider bg-slate-900/80 backdrop-blur px-4 py-2 rounded-full border border-cyan-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {t('heroBadge')}
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t('heroHeadline')}{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
                {t('heroHighlight')}
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-3xl mx-auto">
              {t('heroSubheadline')}
            </p>

            {/* Features Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {[t('freeToJoin'), t('hourApproval'), t('dedicatedSupport'), t('unlimitedEarnings')].map((text) => (
                <span key={text} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {text}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#apply"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-full shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
              >
                {t('applyNow')}
                <ArrowRight size={20} />
              </a>
              <a
                href="https://calendly.com/d/cw67-pt3-y2m"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 text-white border border-slate-700 hover:bg-white/10 font-semibold rounded-full transition-all duration-300 hover:scale-105"
              >
                {t('scheduleCall')}
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="flex items-start justify-center gap-3 text-slate-400">
                <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Official WhatsApp Business Solution Provider</span>
              </div>
              <div className="flex items-start justify-center gap-3 text-slate-400">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">SOC 2 Type II Compliant</span>
              </div>
              <div className="flex items-start justify-center gap-3 text-slate-400">
                <Globe className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Available in 100+ Countries</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-10 md:py-20 lg:py-28 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal delay={0} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4">
              {t('benefitsSubtitle')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('whyPartnerTitle')}
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              {t('whyPartnerDesc')}
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefitKeys.map((key, index) => {
              const meta = benefitMeta[index]
              const Icon = meta.icon
              return (
                <ScrollReveal key={key} delay={index + 1} className="group">
                  <div className="relative p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${meta.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    <div className="relative">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${meta.color} mb-6`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="pl-[10%]">
                        <span className="inline-block text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                          {t(`benefits.${key}.subtitle`)}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-3">
                          {t(`benefits.${key}.title`)}
                        </h3>
                        <p className="text-slate-400 leading-relaxed">
                          {t(`benefits.${key}.description`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Partnership Models Section */}
      <section className="py-10 md:py-20 lg:py-28 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal delay={0} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4">
              {t('modelsDesc')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('modelsTitle')}
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              {t('modelsSubtitle')}
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {partnerTypeKeys.map((key, index) => {
              const whatYouGet = t.raw(`${key}.whatYouGet`) as string[]
              const idealFor = t.raw(`${key}.idealFor`) as string[]
              const partnerName = t(`${key}.name`)
              return (
                <ScrollReveal key={key} delay={index + 1} className="relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-bold text-sm shadow-lg">
                      <DollarSign className="w-4 h-4" />
                      {t(`${key}.commission`)}
                    </div>
                  </div>

                  <div className="relative pt-8 p-8 rounded-2xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {partnerName}
                      </h3>
                      <p className="text-cyan-400 font-medium mb-4">
                        {t(`${key}.title`)}
                      </p>
                      <p className="text-slate-400 text-sm">
                        {t(`${key}.description`)}
                      </p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <p className="text-sm font-semibold text-white">What You Get:</p>
                      <ul className="space-y-2">
                        {whatYouGet.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 border-t border-slate-700/50">
                      <p className="text-xs font-semibold text-slate-500 uppercase mb-3">Ideal for:</p>
                      <div className="flex flex-wrap gap-2">
                        {idealFor.map((item, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs font-medium text-cyan-400 bg-cyan-950/50 rounded-full border border-cyan-800/50"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <a
                      href="#apply"
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all duration-300"
                    >
                      {partnerName}
                    </a>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* How to Apply Section */}
      <section className="py-10 md:py-20 lg:py-28 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal delay={0} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4">
              {t('simpleProcess')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('howToApplyTitle')}
            </h2>
            <p className="text-lg text-slate-400">
              {t('howToApplyDesc')}
            </p>
          </ScrollReveal>

          <div className="space-y-6">
            {steps.map((item, index) => (
              <ScrollReveal key={index} delay={index}>
                <div className="flex items-start gap-6 p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                  <span className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-lg font-bold text-cyan-400 bg-cyan-950/50 rounded-xl border border-cyan-800/50">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-slate-400">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-10 md:py-20 lg:py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal delay={0} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4">
              {t('testimonialsSubtitle')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('testimonialsTitle')}
            </h2>
            <p className="text-lg text-slate-400">
              {t('testimonialsDesc')}
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={index} delay={index + 1}>
                <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>

                  <p className="text-slate-300 mb-6 leading-relaxed">
                    &quot;{testimonial.quote}&quot;
                  </p>

                  <div className="flex items-center gap-4">
                    <img
                      src={testimonialAvatars[index]}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full border-2 border-slate-700"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-white">{testimonial.author}</p>
                      <p className="text-sm text-slate-400">{testimonial.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Earned</p>
                      <p className="text-lg font-bold text-emerald-400">{testimonial.earnings}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Logos Section */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal delay={0} className="text-center mb-10">
            <p className="text-slate-400 mb-8">
              {t('integrationsTitle')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {integrations.map((integration, index) => (
                <LocalizedLink
                  key={index}
                  href={integration.url}
                  className="text-slate-500 hover:text-cyan-400 transition-colors font-semibold text-lg"
                >
                  {integration.name}
                </LocalizedLink>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="py-10 md:py-20 lg:pt-28 lg:pb-14 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal delay={0} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4">
              Apply Today
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('applyTitle')}
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              {t('applyDesc')}
            </p>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="text-center">
                <Zap className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-white font-semibold">{t('fastApproval')}</p>
                <p className="text-sm text-slate-400">{t('fastApprovalDesc')}</p>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-white font-semibold">{t('dedicatedSupportTitle')}</p>
                <p className="text-sm text-slate-400">{t('dedicatedSupportDesc')}</p>
              </div>
              <div className="text-center">
                <DollarSign className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-white font-semibold">{t('noUpfrontCosts')}</p>
                <p className="text-sm text-slate-400">{t('noUpfrontCostsDesc')}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal delay={1} className="text-center mb-8 p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <p className="text-slate-400 mb-4">{t('haveQuestions')}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="mailto:hey@eazybe.com"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Mail className="w-5 h-5" />
                hey@eazybe.com
              </a>
              <a
                href="https://calendly.com/d/cw67-pt3-y2m"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Phone className="w-5 h-5" />
                {t('scheduleCall')}
              </a>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 md:py-20 lg:pt-14 lg:pb-28 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal delay={0} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4">
              FAQs
            </span>
            <h2 className="text-[19px] md:text-3xl lg:text-4xl font-bold text-white mb-6">
              {t('faqTitle')}
            </h2>
            <p className="text-lg text-slate-400">
              {t('faqDesc')}
            </p>
          </ScrollReveal>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <ScrollReveal key={index} delay={index + 1}>
                <details className="group rounded-2xl bg-slate-800/30 border border-slate-700/50 overflow-hidden">
                  <summary className="w-full flex items-center justify-between p-6 text-left cursor-pointer hover:bg-slate-800/50 transition-colors list-none">
                    <span className="font-semibold text-white pr-8">
                      {faq.question}
                    </span>
                    <ChevronDown className="w-5 h-5 text-cyan-400 flex-shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={8} className="text-center mt-10 p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <p className="text-slate-400 mb-4">{t('faqStillHave')}</p>
            <a
              href="mailto:hey@eazybe.com"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium"
            >
              <Mail className="w-5 h-5" />
              {t('emailUs')}
            </a>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}
