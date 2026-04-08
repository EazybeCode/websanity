'use client'

import React from 'react'
import { Twitter, Linkedin, Github, Globe, Calendar, Clock, ArrowRight, MapPin, Mail, Briefcase } from 'lucide-react'
import { SectionBadge } from '@/components/ui/SectionBadge'
import { LocalizedLink } from '@/components/LocalizedLink'

interface Post {
  _id: string
  title: string
  slug: string
  excerpt: string
  category: string
  language: string
  featuredImage: string
  publishedAt: string
  readTime: number
}

interface Author {
  _id: string
  name: string
  slug: string
  position?: string
  email?: string
  location?: string
  bio: string
  detailedBio?: string
  imageUrl: string
  imageAlt: string
  socialLinks?: {
    twitter?: string
    linkedin?: string
    github?: string
    website?: string
  }
  posts: Post[]
}

const langToLocalePrefix: Record<string, string> = {
  en: '',
  es: '/es',
  'pt-BR': '/br',
  br: '/br',
  tr: '/tr',
}

const t: Record<string, Record<string, string>> = {
  en: { home: 'Home', authors: 'Authors', badge: 'Author', about: 'About', articlesBy: 'Articles by', noArticles: 'No articles published yet.' },
  br: { home: 'In\u00edcio', authors: 'Autores', badge: 'Autor', about: 'Sobre', articlesBy: 'Artigos de', noArticles: 'Nenhum artigo publicado ainda.' },
  es: { home: 'Inicio', authors: 'Autores', badge: 'Autor', about: 'Sobre', articlesBy: 'Art\u00edculos de', noArticles: 'A\u00fan no hay art\u00edculos publicados.' },
  tr: { home: 'Ana Sayfa', authors: 'Yazarlar', badge: 'Yazar', about: 'Hakk\u0131nda', articlesBy: 'Yaz\u0131lar\u0131:', noArticles: 'Hen\u00fcz makale yay\u0131nlanmad\u0131.' },
}

export function AuthorProfileClient({ author, locale }: { author: Author; locale: string }) {
  const l = t[locale] || t.en
  const socials = author.socialLinks || {}
  const hasSocials = socials.twitter || socials.linkedin || socials.github || socials.website

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 pb-10 lg:pt-36 lg:pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <LocalizedLink href="/" className="hover:text-brand-blue transition-colors">{l.home}</LocalizedLink>
            <span>/</span>
            <LocalizedLink href="/blog/authors" className="hover:text-brand-blue transition-colors">{l.authors}</LocalizedLink>
            <span>/</span>
            <span className="text-slate-300">{author.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Author Image */}
            <div className="shrink-0">
              {author.imageUrl ? (
                <img
                  src={author.imageUrl}
                  alt={author.imageAlt || author.name}
                  className="w-28 h-28 md:w-40 md:h-40 rounded-full object-cover border-4 border-brand-cyan/30"
                  loading="lazy"
                />
              ) : (
                <div className="w-28 h-28 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center text-white font-bold text-4xl md:text-5xl">
                  {author.name?.[0]}
                </div>
              )}
            </div>

            {/* Author Info */}
            <div className="flex-1">
              <SectionBadge variant="green" className="mb-3">{l.badge}</SectionBadge>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{author.name}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400 mb-3">
                {author.position && (
                  <span className="flex items-center gap-1.5">
                    <Briefcase size={14} className="text-brand-cyan" />
                    {author.position}
                  </span>
                )}
                {author.email && (
                  <a href={`mailto:${author.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <Mail size={14} className="text-brand-blue" />
                    {author.email}
                  </a>
                )}
                {author.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-brand-orange" />
                    {author.location}
                  </span>
                )}
              </div>
              {author.bio && (
                <p className="text-slate-300 leading-relaxed max-w-2xl mb-4">{author.bio}</p>
              )}

              {/* Social Links */}
              {hasSocials && (
                <div className="flex items-center gap-3">
                  {socials.twitter && (
                    <a href={socials.twitter} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-brand-cyan hover:border-cyan-500/30 transition-all">
                      <Twitter size={16} />
                    </a>
                  )}
                  {socials.linkedin && (
                    <a href={socials.linkedin} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-brand-blue hover:border-blue-500/30 transition-all">
                      <Linkedin size={16} />
                    </a>
                  )}
                  {socials.github && (
                    <a href={socials.github} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-all">
                      <Github size={16} />
                    </a>
                  )}
                  {socials.website && (
                    <a href={socials.website} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-brand-green hover:border-green-500/30 transition-all">
                      <Globe size={16} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Detailed Bio */}
          {author.detailedBio && (
            <div className="mt-10 max-w-4xl">
              <h2 className="text-xl font-bold text-white mb-4">{l.about} {author.name}</h2>
              <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                {author.detailedBio}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Posts by Author */}
      <section className="py-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8">
            {l.articlesBy} {author.name}
            <span className="text-slate-500 text-lg font-normal ml-2">({author.posts?.length || 0})</span>
          </h2>

          {!author.posts || author.posts.length === 0 ? (
            <p className="text-slate-400">{l.noArticles}</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {author.posts.map((post) => {
                const prefix = langToLocalePrefix[post.language] || ''
                const postUrl = `${prefix}/blog/${post.slug}`

                return (
                  <a
                    key={post._id}
                    href={postUrl}
                    className="group bg-slate-900/50 border border-slate-700/30 rounded-2xl overflow-hidden hover:border-slate-600/50 transition-all duration-300"
                  >
                    {post.featuredImage && (
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        {post.category && (
                          <span className="absolute top-3 left-3 font-mono text-[10px] uppercase font-bold bg-brand-blue px-2 py-1 rounded text-white">
                            {post.category}
                          </span>
                        )}
                        {post.language !== 'en' && (
                          <span className="absolute top-3 right-3 font-mono text-[10px] uppercase font-bold bg-slate-800/80 px-2 py-1 rounded text-slate-300">
                            {post.language}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="text-base font-bold text-white mb-2 line-clamp-2 group-hover:text-brand-cyan transition-colors">
                        <span>{post.title}</span>
                      </h3>
                      {post.excerpt && (
                        <p className="text-sm text-slate-400 line-clamp-2 mb-3">{post.excerpt}</p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        {post.publishedAt && (
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                              month: 'short', day: 'numeric', year: 'numeric',
                            })}
                          </span>
                        )}
                        {post.readTime && (
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {post.readTime} min
                          </span>
                        )}
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
