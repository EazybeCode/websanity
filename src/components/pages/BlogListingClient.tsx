'use client'

import React, { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Search, Calendar, Clock, Zap } from 'lucide-react'

// ─── Types ─────────────────────────────────────────────────────────────────

interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  category: string
  featuredImage?: string
  publishedAt: string
  readTime?: number
  author?: { name: string }
}

interface BlogCategory { name: string; value: string }

interface BlogIndex {
  hero?: {
    badge?: string
    headline?: string
    headlineHighlight?: string
    description?: string
    searchPlaceholder?: string
  }
  categories?: BlogCategory[]
  featuredSection?: {
    title?: string
    badgeText?: string
    featuredPosts?: BlogPost[]
  }
  allArticlesSection?: {
    badge?: string
    title?: string
    emptyStateTitle?: string
    emptyStateButton?: string
  }
  detailLabels?: { minReadSuffix?: string }
}

interface BlogListingClientProps {
  allPosts: BlogPost[]
  blogIndex: BlogIndex | null
  locale: string
}

// ─── Cards ─────────────────────────────────────────────────────────────────

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const BlogCard: React.FC<{ post: BlogPost; locale: string; minReadSuffix: string; delay: number }> = ({
  post,
  locale,
  minReadSuffix,
  delay,
}) => {
  const blogPath = locale === 'en' ? `/blog/${post.slug}` : `/${locale}/blog/${post.slug}`

  return (
    <a
      href={blogPath}
      className="card reveal"
      style={{
        transitionDelay: `${delay}s`,
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.featuredImage || '/logo.png'}
          alt={post.title}
          width={800}
          height={450}
          loading="eager"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s' }}
        />
        <span
          style={{
            position: 'absolute',
            top: 14,
            left: 14,
            padding: '4px 9px',
            background: 'var(--ink)',
            color: 'var(--paper)',
            fontFamily: 'var(--f-mono)',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            borderRadius: 6,
          }}
        >
          {post.category}
        </span>
      </div>
      <div style={{ padding: 22, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3
          style={{
            fontFamily: 'var(--f-display)',
            fontSize: 20,
            fontWeight: 400,
            letterSpacing: '-0.01em',
            color: 'var(--ink)',
            marginBottom: 10,
            lineHeight: 1.25,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.title}
        </h3>
        <p
          style={{
            fontSize: 14,
            color: 'var(--ink-3)',
            lineHeight: 1.55,
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: 16,
          }}
        >
          {post.excerpt}
        </p>
        <div
          style={{
            display: 'flex',
            gap: 14,
            paddingTop: 14,
            borderTop: '1px solid var(--line)',
            fontFamily: 'var(--f-mono)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--ink-4)',
            flexWrap: 'wrap',
          }}
        >
          {post.author?.name && <span style={{ color: 'var(--ink-3)' }}>{post.author.name}</span>}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Clock size={11} /> {post.readTime || 5} {minReadSuffix}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Calendar size={11} /> {formatDate(post.publishedAt)}
          </span>
        </div>
      </div>
    </a>
  )
}

const FeaturedBlogCard: React.FC<{
  post: BlogPost
  locale: string
  badgeText: string
  minReadSuffix: string
}> = ({ post, locale, badgeText, minReadSuffix }) => {
  const blogPath = locale === 'en' ? `/blog/${post.slug}` : `/${locale}/blog/${post.slug}`
  return (
    <a
      href={blogPath}
      className="card reveal"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        padding: 0,
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', minHeight: 280, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.featuredImage || '/logo.png'}
          alt={post.title}
          width={800}
          height={600}
          loading="eager"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <span
          style={{
            position: 'absolute',
            top: 18,
            left: 18,
            padding: '5px 11px',
            background: 'var(--accent-ink)',
            color: '#fff',
            fontFamily: 'var(--f-mono)',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            borderRadius: 6,
          }}
        >
          {badgeText}
        </span>
      </div>
      <div style={{ padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span
          style={{
            fontFamily: 'var(--f-mono)',
            fontSize: 10,
            color: 'var(--accent-ink)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          {post.category}
        </span>
        <h3
          style={{
            fontFamily: 'var(--f-display)',
            fontSize: 32,
            fontWeight: 400,
            letterSpacing: '-0.015em',
            color: 'var(--ink)',
            marginBottom: 14,
            lineHeight: 1.2,
          }}
        >
          {post.title}
        </h3>
        <p
          style={{
            fontSize: 15,
            color: 'var(--ink-3)',
            lineHeight: 1.6,
            marginBottom: 20,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.excerpt}
        </p>
        <div
          style={{
            display: 'flex',
            gap: 16,
            fontFamily: 'var(--f-mono)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--ink-4)',
            flexWrap: 'wrap',
          }}
        >
          {post.author?.name && <span style={{ color: 'var(--ink-3)' }}>By {post.author.name}</span>}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Clock size={11} /> {post.readTime || 5} {minReadSuffix}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Calendar size={11} /> {formatDate(post.publishedAt)}
          </span>
        </div>
      </div>
    </a>
  )
}

// ─── Main ──────────────────────────────────────────────────────────────────

export const BlogListingClient: React.FC<BlogListingClientProps> = ({ allPosts, blogIndex, locale }) => {
  const t = useTranslations()
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')

  const hero = blogIndex?.hero || {}
  const allArticlesSection = blogIndex?.allArticlesSection || {}
  const featuredSection = blogIndex?.featuredSection || {}
  const minReadSuffix = blogIndex?.detailLabels?.minReadSuffix || 'min read'

  const categories: BlogCategory[] = [
    { name: 'All', value: 'All' },
    ...(blogIndex?.categories || [
      { name: 'Sales', value: 'Sales' },
      { name: 'Product', value: 'Product' },
      { name: 'Automation', value: 'Automation' },
      { name: 'Best Practices', value: 'Best Practices' },
      { name: 'Case Studies', value: 'Case Studies' },
      { name: 'Security', value: 'Security' },
    ]),
  ]

  const filteredPosts = useMemo(() => {
    let filtered = allPosts
    if (activeCategory !== 'All') filtered = filtered.filter((p) => p.category === activeCategory)
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) => p.title.toLowerCase().includes(q) || p.excerpt?.toLowerCase().includes(q),
      )
    }
    return filtered
  }, [allPosts, activeCategory, searchQuery])

  const featuredPost = useMemo(() => {
    if (blogIndex?.featuredSection?.featuredPosts && blogIndex.featuredSection.featuredPosts.length > 0) {
      return (
        allPosts.find((p) => p._id === blogIndex.featuredSection!.featuredPosts![0]._id) ||
        blogIndex.featuredSection.featuredPosts[0]
      )
    }
    return allPosts[0] || null
  }, [allPosts, blogIndex?.featuredSection?.featuredPosts])

  const regularPosts = useMemo(() => {
    if (activeCategory === 'All' && !searchQuery && filteredPosts.length > 0 && featuredPost) {
      return filteredPosts.filter((p) => p._id !== featuredPost._id)
    }
    return filteredPosts
  }, [filteredPosts, activeCategory, searchQuery, featuredPost])

  return (
    <>
      {/* Hero */}
      <section className="page-hero" data-tone="dark">
        <div className="container">
          <span className="hero-tag reveal">
            <span className="pulse" /> {String(hero.badge || t('blog.hero.badge')).toUpperCase()}
          </span>
          <h1 className="reveal">
            {t('blog.hero.headline')} <em>{t('blog.hero.headlineHighlight')}</em>
          </h1>
          <p className="lede reveal">{hero.description || t('blog.hero.description')}</p>

          {/* Search */}
          <div className="reveal" style={{ position: 'relative', maxWidth: 540, margin: '32px auto 0' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: 18,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--ink-4)',
              }}
            />
            <input
              type="text"
              placeholder={hero.searchPlaceholder || t('blog.hero.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px 14px 48px',
                background: 'var(--paper)',
                border: '1px solid var(--line-2)',
                borderRadius: 100,
                fontSize: 15,
                color: 'var(--ink)',
                outline: 'none',
                fontFamily: 'var(--f-sans)',
                boxShadow: '0 8px 24px -16px rgba(15,17,21,0.12)',
              }}
            />
          </div>

          <div className="reveal" style={{ marginTop: 24 }}>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => window.dispatchEvent(new Event('eazybe:open-bea-form'))}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
              </svg>
              Talk to our Agent
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section style={{ paddingTop: 30, paddingBottom: 16 }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className="btn"
                style={{
                  padding: '7px 16px',
                  background: activeCategory === cat.value ? 'var(--ink)' : 'var(--paper)',
                  color: activeCategory === cat.value ? 'var(--paper)' : 'var(--ink-3)',
                  border: '1px solid ' + (activeCategory === cat.value ? 'var(--ink)' : 'var(--line)'),
                  borderRadius: 100,
                  fontFamily: 'var(--f-mono)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      {featuredPost && activeCategory === 'All' && !searchQuery && (
        <section className="section" style={{ paddingTop: 20, paddingBottom: 30 }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <Zap size={18} style={{ color: 'var(--accent-ink)' }} />
              <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 24, fontWeight: 400, letterSpacing: '-0.01em', color: 'var(--ink)' }}>
                {featuredSection.title || t('blog.featured.title')}
              </h2>
            </div>
            <FeaturedBlogCard
              post={featuredPost}
              locale={locale}
              badgeText={featuredSection.badgeText || t('blog.featured.badge')}
              minReadSuffix={minReadSuffix}
            />
          </div>
        </section>
      )}

      {/* All articles */}
      <section className="section" data-tone="dark" style={{ paddingTop: 60 }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 32,
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <span className="sec-tag">{allArticlesSection.badge || t('blog.allArticles.badge')}</span>
              <h2
                style={{
                  fontFamily: 'var(--f-display)',
                  fontSize: 'clamp(28px, 3vw, 36px)',
                  fontWeight: 400,
                  letterSpacing: '-0.015em',
                  color: 'var(--ink)',
                  marginTop: 8,
                }}
              >
                {allArticlesSection.title || t('blog.allArticles.title')}
              </h2>
            </div>
            <p
              style={{
                fontFamily: 'var(--f-mono)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--ink-4)',
              }}
            >
              {filteredPosts.length}{' '}
              {filteredPosts.length === 1 ? t('blog.allArticles.articleSingular') : t('blog.allArticles.articlePlural')}
            </p>
          </div>

          {filteredPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontSize: 16, color: 'var(--ink-3)', marginBottom: 14 }}>
                {allArticlesSection.emptyStateTitle || t('blog.allArticles.emptyTitle')}
              </p>
              <button
                onClick={() => {
                  setActiveCategory('All')
                  setSearchQuery('')
                }}
                className="btn btn-outline"
              >
                {allArticlesSection.emptyStateButton || t('blog.allArticles.clearFilters')}
              </button>
            </div>
          ) : (
            <div className="card-grid cols-3">
              {regularPosts.map((post, idx) => (
                <BlogCard
                  key={post._id}
                  post={post}
                  locale={locale}
                  minReadSuffix={minReadSuffix}
                  delay={idx * 0.04}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
