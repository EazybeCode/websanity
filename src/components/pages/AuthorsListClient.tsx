'use client'

import React from 'react'
import { Users, ArrowRight } from 'lucide-react'
import { SectionBadge } from '@/components/ui/SectionBadge'
import { LocalizedLink } from '@/components/LocalizedLink'

interface Author {
  _id: string
  name: string
  slug: string
  position: string
  email: string
  location: string
  bio: string
  imageUrl: string
  postCount: number
}

const t: Record<string, Record<string, string>> = {
  en: {
    home: 'Home',
    breadcrumb: 'Authors',
    badge: 'Our Team',
    headingStart: 'Meet Our',
    headingHighlight: 'Authors',
    description: 'The experts behind the Eazybe blog, sharing insights on WhatsApp CRM, sales automation, AI agents, and productivity.',
    noAuthors: 'No authors found.',
    articles: 'articles',
    article: 'article',
    viewProfile: 'View Profile',
  },
  br: {
    home: 'In\u00edcio',
    breadcrumb: 'Autores',
    badge: 'Nossa Equipe',
    headingStart: 'Conhe\u00e7a Nossos',
    headingHighlight: 'Autores',
    description: 'Os especialistas por tr\u00e1s do blog da Eazybe, compartilhando insights sobre CRM para WhatsApp, automa\u00e7\u00e3o de vendas, agentes de IA e produtividade.',
    noAuthors: 'Nenhum autor encontrado.',
    articles: 'artigos',
    article: 'artigo',
    viewProfile: 'Ver Perfil',
  },
  es: {
    home: 'Inicio',
    breadcrumb: 'Autores',
    badge: 'Nuestro Equipo',
    headingStart: 'Conoce a Nuestros',
    headingHighlight: 'Autores',
    description: 'Los expertos detr\u00e1s del blog de Eazybe, compartiendo conocimientos sobre CRM para WhatsApp, automatizaci\u00f3n de ventas, agentes de IA y productividad.',
    noAuthors: 'No se encontraron autores.',
    articles: 'art\u00edculos',
    article: 'art\u00edculo',
    viewProfile: 'Ver Perfil',
  },
  tr: {
    home: 'Ana Sayfa',
    breadcrumb: 'Yazarlar',
    badge: 'Ekibimiz',
    headingStart: 'Yazarlar\u0131m\u0131z\u0131',
    headingHighlight: 'Tan\u0131y\u0131n',
    description: 'Eazybe blogundaki uzmanlar, WhatsApp CRM, sat\u0131\u015f otomasyonu, yapay zeka ajanlar\u0131 ve verimlilik hakk\u0131nda bilgiler payla\u015f\u0131yor.',
    noAuthors: 'Yazar bulunamad\u0131.',
    articles: 'makale',
    article: 'makale',
    viewProfile: 'Profili G\u00f6r',
  },
}

export function AuthorsListClient({ authors, locale }: { authors: Author[]; locale: string }) {
  const l = t[locale] || t.en

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 pb-12 lg:pt-36 lg:pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <LocalizedLink href="/" className="hover:text-brand-blue transition-colors">{l.home}</LocalizedLink>
            <span>/</span>
            <span className="text-slate-300">{l.breadcrumb}</span>
          </nav>
          <div className="text-center">
            <SectionBadge variant="cyan" className="mb-6">{l.badge}</SectionBadge>
            <h1 className="text-[2.75rem] font-bold text-white leading-[1.1] mb-4">
              {l.headingStart}{' '}
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                {l.headingHighlight}
              </span>
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {l.description}
            </p>
          </div>
        </div>
      </section>

      {/* Authors Grid */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {authors.length === 0 ? (
            <div className="text-center py-20">
              <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">{l.noAuthors}</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {authors.map((author) => (
                <LocalizedLink
                  key={author._id}
                  href={`/blog/authors/${author.slug}`}
                  className="group bg-slate-900/50 border border-slate-700/30 rounded-2xl p-6 hover:border-brand-blue/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    {author.imageUrl ? (
                      <img
                        src={author.imageUrl}
                        alt={author.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-slate-700 group-hover:border-brand-cyan transition-colors"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center text-white font-bold text-xl">
                        {author.name?.[0]}
                      </div>
                    )}
                    <div>
                      <h2 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors">
                        {author.name}
                      </h2>
                      {author.position && (
                        <p className="text-xs text-brand-cyan">{author.position}</p>
                      )}
                      {author.postCount > 0 && (
                        <span className="text-xs text-slate-500">
                          {author.postCount} {author.postCount !== 1 ? l.articles : l.article}
                        </span>
                      )}
                    </div>
                  </div>
                  {author.bio && (
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 mb-4">{author.bio}</p>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs text-brand-cyan font-medium group-hover:gap-2 transition-all">
                    {l.viewProfile} <ArrowRight size={12} />
                  </span>
                </LocalizedLink>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
