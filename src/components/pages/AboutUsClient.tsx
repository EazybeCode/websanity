'use client'

import React from 'react'
import {
  Users,
  Target,
  Zap,
  Globe,
  TrendingUp,
  Shield,
  MessageSquare,
  Linkedin,
  ArrowRight,
  Star,
  Building2,
  Rocket,
  Heart,
} from 'lucide-react'
import { SectionBadge } from '@/components/ui/SectionBadge'
import { Button } from '@/components/ui/Button'
import { LocalizedLink } from '@/components/LocalizedLink'
import Image from 'next/image'
import { getAboutUsContent } from '@/data/about-us-content'

const cardStyles = [
  { color: 'text-brand-cyan', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', icon: MessageSquare },
  { color: 'text-brand-blue', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: Globe },
  { color: 'text-brand-violet', bg: 'bg-violet-500/10', border: 'border-violet-500/20', icon: Target },
]

export function AboutUsClient({ locale = 'en' }: { locale?: string }) {
  const t = getAboutUsContent(locale)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-28 pb-12 lg:pt-36 lg:pb-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-violet-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <LocalizedLink href="/" className="hover:text-brand-blue transition-colors">{t.breadcrumb.home}</LocalizedLink>
            <span>/</span>
            <span className="text-slate-300">{t.breadcrumb.aboutUs}</span>
          </nav>
          <div className="text-center">
            <SectionBadge variant="cyan" className="mb-6">{t.hero.badge}</SectionBadge>
            <h1 className="text-[2.75rem] font-bold text-white leading-[1.1] mb-6">
              {t.hero.headingStart}{' '}
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                {t.hero.headingHighlight}
              </span>
            </h1>
          </div>
          <p className="text-slate-300 leading-relaxed">
            {t.hero.paragraph}
          </p>
        </div>
      </section>


      {/* Our Story Section */}
      <section className="relative py-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <SectionBadge variant="orange" className="mb-6">{t.story.badge}</SectionBadge>
            <h2 className="text-4xl font-bold text-white">
              {t.story.headingStart}{' '}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                {t.story.headingHighlight}
              </span>
            </h2>
          </div>

          <div className="space-y-6">
            {t.story.paragraphs.map((p, i) => (
              <p key={i} className="text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="relative py-10 overflow-hidden border-t border-slate-800/50">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <SectionBadge variant="green" className="mb-6">{t.founder.badge}</SectionBadge>
            <h2 className="text-4xl font-bold text-white">
              {t.founder.headingStart}{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                {t.founder.headingHighlight}
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Founder Image */}
            <div className="lg:col-span-2">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/30 to-violet-500/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative overflow-hidden rounded-2xl border border-slate-700/50">
                  <Image
                    src="/sagar-dewan.webp"
                    alt={t.founder.imageAlt}
                    width={600}
                    height={1000}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent pt-16 pb-6 px-6">
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">{t.founder.founderName}</h3>
                    <p className="text-brand-blue font-semibold mt-1 drop-shadow-lg">{t.founder.founderTitle}</p>
                  </div>
                </div>
                {/* Social links */}
                <div className="relative z-10 flex items-center gap-3 mt-4 justify-center lg:justify-start">
                  <a
                    href="https://www.linkedin.com/in/sagar-dewan-b43b9931/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-brand-blue hover:border-blue-500/30 transition-all cursor-pointer"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Founder Bio */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-slate-900/50 border border-slate-700/30 rounded-xl p-6">
                <blockquote className="text-lg sm:text-xl font-medium text-white italic leading-relaxed">
                  {t.founder.quote}
                </blockquote>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" />
                  <span className="text-sm text-slate-400">{t.founder.quoteAttribution}</span>
                </div>
              </div>

              {t.founder.bio.map((p, i) => (
                <p key={i} className="text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: p }} />
              ))}

            </div>
          </div>
        </div>
      </section>

      {/* Why Choose, Mission & Vision Section */}
      <section className="relative pt-10 pb-20 overflow-hidden border-t border-slate-800/50">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <SectionBadge variant="orange" className="mb-6">{t.whyChoose.badge}</SectionBadge>
            <h2 className="text-4xl font-bold text-white mb-4">
              {t.whyChoose.headingStart}{' '}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                {t.whyChoose.headingHighlight}
              </span>
            </h2>
          </div>

          {/* Top row - 3 cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {t.whyChoose.cards.map((item, i) => {
              const style = cardStyles[i]
              return (
                <div
                  key={item.title}
                  className={`relative ${style.bg} backdrop-blur-sm border ${style.border} rounded-2xl p-8 hover:scale-[1.02] transition-transform duration-300`}
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${style.bg} border ${style.border} mb-6`}>
                    <style.icon className={`w-7 h-7 ${style.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>

          {/* Bottom row - Mission & Vision */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="relative group bg-slate-900/50 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-10 hover:border-blue-500/30 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.whyChoose.mission.title}</h3>
              <p className="text-slate-400 leading-relaxed">{t.whyChoose.mission.description}</p>
            </div>

            {/* Vision */}
            <div className="relative group bg-slate-900/50 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-10 hover:border-violet-500/30 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 mb-6">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.whyChoose.vision.title}</h3>
              <p className="text-slate-400 leading-relaxed">{t.whyChoose.vision.description}</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
