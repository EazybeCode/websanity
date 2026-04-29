'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { mobileAspectClass, desktopAspectClass, cssAspectRatio } from '@/lib/aspect-ratio'
import { SummarizeWithLLM } from '@/components/blog/SummarizeWithLLM'
import {
  Calendar,
  Clock,
  Twitter,
  Linkedin,
  Mail,
  Link as LinkIcon,
  Zap,
  Plus,
  ChevronRight,
  ChevronDown,
  User,
  BookOpen,
  Rocket,
  Eye,
} from 'lucide-react'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import Link from 'next/link'
import { SectionBadge } from '@/components/ui/SectionBadge'
import { AccordionBlock } from '@/components/blog/AccordionBlock'
import { ButtonCTABlock } from '@/components/blog/ButtonCTABlock'
import { CalloutBlock } from '@/components/blog/CalloutBlock'
import { QuoteBlock } from '@/components/blog/QuoteBlock'
import { TableBlock } from '@/components/blog/TableBlock'
import { VideoEmbedBlock } from '@/components/blog/VideoEmbedBlock'
import { BlogTranslationsProvider, type BlogTranslation } from '@/contexts/BlogTranslationsContext'

// ─── Types ─────────────────────────────────────────────────────────────────

interface PortableTextBlock {
  _key: string
  _type: string
  style?: string
  children?: Array<{ _type: string; text?: string }>
}

interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: PortableTextBlock[]
  category: string
  categories?: Array<{ title: string; slug: string; link?: string }>
  featuredImage?: string
  featuredImageAlt?: string
  featuredImageMobileRatio?: string
  featuredImageDesktopRatio?: string
  featuredImageCaption?: string
  publishedAt: string
  readTime?: number
  author?: {
    name: string
    slug?: string
    bio?: string
    image?: string
    url?: string
  }
  tldr?: any[]
  quickAnswer?: string
  tableOfContents?: Array<{ label: string; id: string }>
  faqTitle?: string
  faqs?: Array<{ question: string; answer: any; plainAnswer?: string; answerText?: string }>
}

interface BlogIndex {
  sidebarCta?: {
    badge?: string
    headline?: string
    description?: string
    buttonText?: string
    buttonUrl?: string
    footnote?: string
  }
  newsletterCta?: {
    headline?: string
    description?: string
    placeholder?: string
    buttonText?: string
  }
  relatedPostsSection?: {
    badge?: string
    title?: string
    viewAllText?: string
  }
  detailLabels?: {
    backToBlog?: string
    tocTitle?: string
    summaryTitle?: string
    summarySubtitle?: string
    faqTitle?: string
    authorLabel?: string
    minReadSuffix?: string
  }
}

interface RelatedPost {
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

interface BlogPostClientProps {
  post: BlogPost
  relatedPosts: RelatedPost[]
  blogIndex: BlogIndex | null
  slug: string
  locale: string
  translations?: BlogTranslation[]
  initialViewCount?: number
}

// ─── Utility Functions ─────────────────────────────────────────────────────

const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

const extractTextFromBlock = (block: PortableTextBlock): string => {
  if (!block.children) return ''
  return block.children
    .filter((child) => child._type === 'span')
    .map((child) => child.text || '')
    .join('')
}

const extractHeadingsFromContent = (
  content: PortableTextBlock[]
): Array<{ label: string; id: string }> => {
  if (!Array.isArray(content)) return []

  return content
    .filter((block) => block._type === 'block' && block.style === 'h2')
    .map((block) => {
      const text = extractTextFromBlock(block)
      return { label: text, id: generateSlug(text) }
    })
    .filter((item) => item.label.length > 0)
}

const createPortableTextComponents = (
  content: PortableTextBlock[]
): PortableTextComponents => {
  const headingIds = new Map<string, string>()
  if (Array.isArray(content)) {
    content
      .filter(
        (block) =>
          block._type === 'block' &&
          ['h1', 'h2', 'h3', 'h4'].includes(block.style || '')
      )
      .forEach((block) => {
        const text = extractTextFromBlock(block)
        headingIds.set(block._key, generateSlug(text))
      })
  }

  return {
    block: {
      h1: ({ children, value }: any) => {
        const id = headingIds.get(value._key) || generateSlug(String(children))
        return (
          <h1
            id={id}
            className="text-4xl font-extrabold text-white mt-16 mb-6 first:mt-0 scroll-mt-28"
          >
            {children}
          </h1>
        )
      },
      h2: ({ children, value }: any) => {
        const id = headingIds.get(value._key) || generateSlug(String(children))
        return (
          <h2
            id={id}
            className="text-[19px] md:text-3xl font-bold text-white mt-3 mb-4 pt-3 border-t border-slate-800/50 first:border-t-0 first:pt-0 first:mt-0 scroll-mt-28"
          >
            {children}
          </h2>
        )
      },
      h3: ({ children, value }: any) => {
        const id = headingIds.get(value._key) || generateSlug(String(children))
        return (
          <h3
            id={id}
            className="text-[16px] md:text-2xl font-semibold text-slate-100 mt-3 mb-3 scroll-mt-28"
          >
            {children}
          </h3>
        )
      },
      h4: ({ children, value }: any) => {
        const id = headingIds.get(value._key) || generateSlug(String(children))
        return (
          <h4
            id={id}
            className="text-xl font-semibold text-slate-200 mt-8 mb-3 scroll-mt-28"
          >
            {children}
          </h4>
        )
      },
      normal: ({ children }: any) => (
        <p className="text-[14px] md:text-lg text-slate-300 leading-relaxed mb-3">
          {children}
        </p>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-brand-cyan pl-6 my-8 italic text-slate-400 text-base md:text-xl">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => <ul className="my-6 space-y-3">{children}</ul>,
      number: ({ children }: any) => (
        <ol className="my-6 space-y-3 list-decimal list-inside">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => (
        <li className="text-[14px] md:text-lg text-slate-300 leading-relaxed pl-6 mb-1.5 relative before:content-[''] before:absolute before:left-0 before:top-3 before:w-2 before:h-2 before:rounded-full before:bg-gradient-to-r before:from-brand-cyan before:to-brand-blue">
          {children}
        </li>
      ),
      number: ({ children }: any) => (
        <li className="text-[14px] md:text-lg text-slate-300 leading-relaxed mb-1.5">
          {children}
        </li>
      ),
    },
    marks: {
      strong: ({ children }: any) => (
        <strong className="font-bold text-white">{children}</strong>
      ),
      em: ({ children }: any) => <em className="italic">{children}</em>,
      code: ({ children }: any) => (
        <code className="bg-slate-800 text-brand-cyan px-2 py-1 rounded text-sm font-mono">
          {children}
        </code>
      ),
      link: ({ children, value }: any) => (
        <a
          href={value?.href}
          className="text-brand-cyan hover:text-brand-blue transition-colors"
          target={value?.href?.startsWith('http') ? '_blank' : undefined}
          rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      ),
    },
    types: {
      image: ({ value }: any) => {
        if (!value?.url) return null
        // CSS `aspect-ratio` requires "16/9" (slash), but Sanity stores "16:9" (colon).
        // Convert here; return undefined for unset / "auto" so we fall back to intrinsic.
        const desktopRatio = cssAspectRatio(value.desktopRatio)
        const mobileRatio = cssAspectRatio(value.mobileRatio)
        const hasRatio = desktopRatio || mobileRatio

        return (
          <figure className="my-5">
            {hasRatio ? (
              <>
                {/* Mobile */}
                <img
                  src={value.url}
                  alt={value.alt || ''}
                  className="md:hidden w-full"
                  style={mobileRatio ? { aspectRatio: mobileRatio, objectFit: 'contain' } : undefined}
                  loading="lazy"
                />
                {/* Desktop */}
                <img
                  src={value.url}
                  alt={value.alt || ''}
                  className="hidden md:block w-full"
                  style={desktopRatio ? { aspectRatio: desktopRatio, objectFit: 'contain' } : undefined}
                  loading="lazy"
                />
              </>
            ) : (
              <img
                src={value.url}
                alt={value.alt || ''}
                className="w-full rounded-2xl shadow-2xl border border-slate-800/50"
                loading="lazy"
              />
            )}
            {value.caption && (
              <figcaption className="text-center text-slate-500 text-[12px] mt-4">
                {value.caption}
              </figcaption>
            )}
          </figure>
        )
      },
      codeBlock: ({ value }: any) => {
        if (!value) return null
        return (
          <figure className="my-8">
            {value.filename && (
              <div className="text-xs text-slate-500 mb-2 font-mono">{value.filename}</div>
            )}
            <pre
              className={`bg-slate-900 rounded-xl p-4 md:p-6 overflow-x-auto border border-slate-700 ${
                value.theme === 'light' ? 'light' : ''
              }`}
            >
              <code
                className={`text-sm md:text-base ${
                  value.language ? `language-${value.language}` : ''
                }`}
              >
                {value.code}
              </code>
            </pre>
          </figure>
        )
      },
      imageGallery: ({ value }: any) => {
        if (!value || !value.images?.length) return null
        const gridCols =
          value.layout === 'grid-2'
            ? 'grid-cols-2'
            : value.layout === 'grid-3'
              ? 'grid-cols-3'
              : value.layout === 'grid-4'
                ? 'grid-cols-4'
                : 'grid-cols-2 md:grid-cols-3'
        return (
          <figure className="my-8 md:my-12">
            {value.caption && (
              <figcaption className="text-center text-slate-400 mb-4">
                {value.caption}
              </figcaption>
            )}
            <div className={`grid ${gridCols} gap-4`}>
              {value.images.map((img: any, i: number) => (
                <div key={i} className="aspect-square overflow-hidden rounded-xl">
                  <img
                    src={img.url}
                    alt={img.alt || ''}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </figure>
        )
      },
      fileDownload: ({ value }: any) => {
        if (!value) return null
        return (
          <a
            href={value.file?.asset?.url}
            download
            className={`my-6 inline-flex items-center gap-4 p-4 md:p-6 rounded-xl border border-slate-700 hover:border-brand-cyan transition-colors ${
              value.variant === 'button'
                ? 'bg-brand-cyan text-black hover:bg-brand-cyan/90'
                : 'bg-slate-800 text-slate-300'
            }`}
          >
            <div className="w-12 h-12 rounded-lg bg-brand-cyan/20 flex items-center justify-center">
              <span className="text-2xl">&#128196;</span>
            </div>
            <div>
              <p className="font-semibold">{value.title}</p>
              {value.description && (
                <p className="text-sm opacity-70">{value.description}</p>
              )}
            </div>
          </a>
        )
      },
      comparisonTable: ({ value }: any) => {
        if (!value || !value.columns?.length) return null
        return (
          <div className="my-6">
            {value.title && (
              <h3 className="text-xl font-bold text-white mb-6">{value.title}</h3>
            )}
            <div className="overflow-x-auto rounded-xl border border-slate-700">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-800">
                    <th className="p-4 text-left text-slate-400">Feature</th>
                    {value.columns.map((col: any, i: number) => (
                      <th
                        key={i}
                        className={`p-4 text-center ${
                          col.highlight ? 'bg-brand-cyan text-black font-bold' : ''
                        }`}
                      >
                        {col.icon && (
                          <img src={col.icon} alt="" className="w-8 h-8 mx-auto mb-2" loading="lazy" />
                        )}
                        {col.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {value.rows?.map((row: any, i: number) => (
                    <tr key={i}>
                      <td className="p-4 font-medium text-white">{row.feature}</td>
                      {row.values?.map((val: string, j: number) => (
                        <td key={j} className="p-4 text-center text-slate-300">
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      },
      // ─── Custom Blog Block Components ────────────────────────────────
      accordion: ({ value }: any) => {
        if (!value) return null
        return <AccordionBlock data={value} />
      },
      buttonCTA: ({ value }: any) => {
        if (!value) return null
        return <ButtonCTABlock data={value} />
      },
      callout: ({ value }: any) => {
        if (!value) return null
        return <CalloutBlock data={value} />
      },
      quote: ({ value }: any) => {
        if (!value) return null
        return <QuoteBlock data={value} />
      },
      table: ({ value }: any) => {
        if (!value) return null
        return <TableBlock data={value} />
      },
      videoEmbed: ({ value }: any) => {
        if (!value) return null
        return <VideoEmbedBlock data={value} />
      },
    },
  }
}

// ─── Reading Progress Bar ──────────────────────────────────────────────────

const ReadingProgress: React.FC = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const prog = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(Math.min(prog, 100))
    }

    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-slate-800 z-50">
      <div
        className="h-full bg-gradient-to-r from-brand-blue to-brand-cyan transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

// ─── Sticky Sidebar TOC ────────────────────────────────────────────────────

const StickyTableOfContents: React.FC<{
  sections: Array<{ label: string; id: string }>
  sidebarCta?: BlogIndex['sidebarCta']
  tocTitle?: string
  locale: string
}> = ({ sections, sidebarCta, tocTitle, locale }) => {
  const t = useTranslations()
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    if (!sections || sections.length === 0) return

    const handleScroll = () => {
      let currentSection = ''
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            currentSection = section.id
          }
        }
      }
      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  return (
    <div className="space-y-6">
      {/* Table of Contents */}
      {sections && sections.length > 0 && (
        <div className="bg-brand-card border border-slate-700/50 rounded-2xl px-5 py-8 shadow-xl">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700/50">
            <BookOpen size={16} className="text-brand-cyan" />
            <h4 className="font-semibold text-white text-sm">
              {tocTitle || t('blog.detail.tocTitle')}
            </h4>
          </div>
          <nav>
            <ol className="space-y-1">
              {sections.map((item, i) => {
                const isActive = activeSection === item.id
                return (
                  <li key={i}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        const element = document.getElementById(item.id)
                        if (element) {
                          const offset = 100
                          const elementPosition =
                            element.getBoundingClientRect().top + window.scrollY
                          window.scrollTo({
                            top: elementPosition - offset,
                            behavior: 'smooth',
                          })
                        }
                      }}
                      className={`flex items-start gap-3 py-2 px-3 rounded-lg transition-all text-sm leading-relaxed ${
                        isActive
                          ? 'bg-brand-cyan/10 text-brand-cyan border-l-2 border-brand-cyan'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      <span
                        className={`font-mono text-[10px] mt-0.5 w-5 flex-shrink-0 ${
                          isActive ? 'text-brand-cyan' : 'text-slate-600'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="line-clamp-2">{item.label}</span>
                    </a>
                  </li>
                )
              })}
            </ol>
          </nav>
        </div>
      )}

      {/* Free Trial CTA */}
      <div className="bg-gradient-to-br from-brand-blue/10 to-brand-cyan/10 border border-brand-cyan/20 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-brand-cyan/20 flex items-center justify-center">
            <Rocket size={16} className="text-brand-cyan" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-cyan font-bold">
            {sidebarCta?.badge || t('blog.sidebar.badge')}
          </span>
        </div>
        <h4 className="text-white font-bold mb-2">
          <span>{sidebarCta?.headline || t('blog.sidebar.headline')}</span>
        </h4>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          {sidebarCta?.description || t('blog.sidebar.description')}
        </p>
        <a
          href={locale === 'en' ? 'https://eazybe.com/pricing' : (sidebarCta?.buttonUrl || `/${locale}/pricing`)}
          className="block w-full text-center bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
        >
          <span>{sidebarCta?.buttonText || t('blog.sidebar.buttonText')}</span>
        </a>
        <p className="text-[10px] text-center mt-3 font-mono text-slate-500 uppercase tracking-widest">
          {sidebarCta?.footnote || t('blog.sidebar.footnote')}
        </p>
      </div>
    </div>
  )
}

// ─── Related Post Card ─────────────────────────────────────────────────────

const RelatedPostCard: React.FC<{
  category: string
  title: string
  date: string
  readTime: string
  image: string
  slug: string
  locale: string
}> = ({ category, title, date, readTime, image, slug, locale }) => {
  const router = useRouter()
  const blogPath = locale === 'en' ? `/blog/${slug}` : `/${locale}/blog/${slug}`

  return (
    <div
      onClick={() => router.push(blogPath)}
      className="bg-brand-card border border-slate-700 rounded-2xl overflow-hidden shadow-xl hover:border-slate-500 transition-all cursor-pointer group h-full flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || '/logo.png'}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          width={600}
          height={400}
        />
        <div className="absolute top-4 left-4">
          <span className="font-mono text-[10px] uppercase font-bold bg-brand-blue px-2 py-1 rounded text-white">
            {category}
          </span>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 leading-snug group-hover:text-brand-cyan transition-colors relative z-10 cursor-pointer">
          <span>{title}</span>
        </h3>
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-800 font-mono text-[10px] uppercase text-slate-500 font-bold">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {readTime}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={12} /> {date}
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────

export const BlogPostClient: React.FC<BlogPostClientProps> = ({
  post,
  relatedPosts,
  blogIndex,
  slug,
  locale,
  translations = [],
  initialViewCount = 0,
}) => {
  const t = useTranslations()
  const router = useRouter()

  const sidebarCta = blogIndex?.sidebarCta
  const newsletterCta = blogIndex?.newsletterCta
  const relatedPostsSection = blogIndex?.relatedPostsSection
  const detailLabels = blogIndex?.detailLabels

  const blogPath = locale === 'en' ? '/blog' : `/${locale}/blog`

  // Dynamically extract TOC from content headings
  const dynamicToc = useMemo(() => {
    if (!post?.content || !Array.isArray(post.content)) return []
    return extractHeadingsFromContent(post.content)
  }, [post?.content])

  // Mobile active section state
  const [mobileActiveSection, setMobileActiveSection] = useState<string>('')

  useEffect(() => {
    if (!dynamicToc || dynamicToc.length === 0) return

    const handleScroll = () => {
      let currentSection = ''
      for (const section of dynamicToc) {
        const element = document.getElementById(section.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            currentSection = section.id
          }
        }
      }
      setMobileActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [dynamicToc])

  // View count tracking — initial count from server, increment in background
  const [viewCount, setViewCount] = useState(initialViewCount)
  useEffect(() => {
    fetch('/api/views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, locale }),
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data?.views) setViewCount(data.views) })
      .catch(() => {})
  }, [slug, locale])

  // Create portable text components with heading IDs
  const portableTextComponents = useMemo(() => {
    if (!post?.content || !Array.isArray(post.content))
      return createPortableTextComponents([])
    return createPortableTextComponents(post.content)
  }, [post?.content])

  return (
    <BlogTranslationsProvider translations={translations} currentSlug={slug}>
      <>
        <ReadingProgress />

      {/* Hero Section - Left Aligned */}
      <header className="pt-20 md:pt-24 lg:pt-32 pb-6 md:pb-8 lg:pb-12 relative overflow-x-clip">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 right-1/4 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-brand-blue/5 blur-[100px] md:blur-[150px] rounded-full -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm mb-0">
            <Link href={locale === 'en' ? '/' : `/${locale}`} className="text-slate-500 hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={12} className="text-slate-600 md:hidden" />
            <ChevronRight size={14} className="text-slate-600 hidden md:block" />
            <Link href={blogPath} className="text-slate-500 hover:text-white transition-colors">
              Blog
            </Link>
            <ChevronRight size={12} className="text-slate-600 md:hidden" />
            <ChevronRight size={14} className="text-slate-600 hidden md:block" />
            <span
              className="text-brand-cyan font-medium truncate max-w-[150px] sm:max-w-[200px] md:max-w-md"
              title={post.title}
            >
              {post.title}
            </span>
          </nav>

          {/* Category Badges — only show when categories are set via Sanity CMS */}
          {post.categories && post.categories.length > 0 && (
            <div className="my-4 flex flex-wrap gap-2">
              {post.categories.map((cat, i) => {
                const catLink = cat.link ? `${locale === 'en' ? '' : `/${locale}`}/blog/${cat.link}` : undefined
                return catLink ? (
                  <a
                    key={i}
                    href={catLink}
                    className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs md:text-sm font-medium hover:bg-brand-cyan/20 transition-colors"
                  >
                    {cat.title}
                  </a>
                ) : (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs md:text-sm font-medium"
                  >
                    {cat.title}
                  </span>
                )
              })}
            </div>
          )}

          {/* Title */}
          <h1 className="text-[20px] sm:text-[22px] md:text-[28px] lg:text-[36px] font-extrabold text-white leading-[1.2] tracking-tight mt-3 mb-3">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-[15px] sm:text-base md:text-lg text-slate-300 leading-[1.75] mb-4">
            {post.excerpt}
          </p>

          {/* Author & Meta */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 sm:gap-6 py-6 md:py-8 border-y border-slate-800/50">
            <div className="flex items-center gap-3 md:gap-4">
              {(() => {
                const authorUrl = post.author?.slug ? `${locale === 'en' ? '' : `/${locale}`}/blog/authors/${post.author.slug}` : undefined
                const avatar = post.author?.image ? (
                  <img
                    src={post.author.image}
                    alt={post.author.name}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-brand-cyan"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center text-white font-bold text-lg md:text-xl">
                    {post.author?.name?.[0] || <User size={20} />}
                  </div>
                )
                return authorUrl ? <a href={authorUrl} className="hover:opacity-80 transition-opacity">{avatar}</a> : avatar
              })()}
              <div>
                {post.author?.slug ? (
                  <a href={`${locale === 'en' ? '' : `/${locale}`}/blog/authors/${post.author.slug}`} className="font-semibold text-white text-base md:text-lg hover:text-brand-cyan transition-colors">
                    {post.author?.name || t('blog.detail.authorFallback')}
                  </a>
                ) : (
                  <p className="font-semibold text-white text-base md:text-lg">
                    {post.author?.name || t('blog.detail.authorFallback')}
                  </p>
                )}
                <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-slate-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {post.readTime} {detailLabels?.minReadSuffix || t('blog.detail.minRead')}
                  </span>
                  {viewCount > 0 && (
                    <span className="flex items-center gap-1">
                      <Eye size={14} />
                      {viewCount.toLocaleString()} views
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Share buttons — desktop only; mobile shows them in the author section at the bottom */}
            <div className="hidden md:flex items-center gap-1 sm:ml-auto w-full sm:w-auto justify-start sm:justify-end">
              <button
                className="p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-slate-800 text-slate-500 hover:text-white transition-all"
                title="Share on Twitter"
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}
              >
                <Twitter size={18} />
              </button>
              <button
                className="p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-slate-800 text-slate-500 hover:text-white transition-all"
                title="Share on LinkedIn"
                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
              >
                <Linkedin size={18} />
              </button>
              <button
                className="p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-slate-800 text-slate-500 hover:text-white transition-all"
                title="Share via Email"
                onClick={() => window.location.href = `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(window.location.href)}`}
              >
                <Mail size={18} />
              </button>
              <button
                className="p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-slate-800 text-slate-500 hover:text-white transition-all"
                title="Copy Link"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  alert('Link copied!')
                }}
              >
                <LinkIcon size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {post.featuredImage && (
        <figure className="max-w-7xl mx-auto px-4 md:px-6 mb-3">
          <div className={`relative rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden ${mobileAspectClass(post.featuredImageMobileRatio, 'aspect-[16/9]')} ${desktopAspectClass(post.featuredImageDesktopRatio, 'md:aspect-[2/1]')} shadow-xl md:shadow-2xl border border-slate-800/50`}>
            <img
              src={post.featuredImage}
              alt={post.featuredImageAlt || post.title}
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
              width={1200}
              height={630}
            />
          </div>
          <figcaption className="text-center text-slate-400 text-[10px] md:text-xs mt-3">
            {post.featuredImageCaption || post.featuredImageAlt || post.title}
          </figcaption>
        </figure>
      )}

      {/* Summarize with LLM — 5 provider icons; deep-link with locale-specific prefilled prompt */}
      <SummarizeWithLLM
        url={`https://eazybe.com${locale === 'en' ? '' : `/${locale}`}/blog/${post.slug}`}
        locale={locale}
      />


      {/* Main Content Area */}
      <main className="pb-12 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
            {/* Left Column - Main Content */}
            <div className="w-full lg:flex-1">
              {/* TL;DR Box (rich text from Sanity, supports bullets/links) */}
              {post.tldr && post.tldr.length > 0 && (
                <div className="mt-0 mb-6 md:mb-5 p-5 md:p-6 rounded-xl border-l-4 border-brand-cyan/50 bg-gradient-to-r from-brand-blue/15 via-brand-cyan/10 to-blue-500/5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 text-brand-cyan">
                      <BookOpen size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white mb-2">TL;DR</h4>
                      <div className="text-[14px] md:text-base text-slate-300 leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0 [&_a]:text-brand-cyan [&_a:hover]:text-cyan-200 [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors [&_strong]:font-semibold [&_strong]:text-white [&_em]:italic [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:bg-brand-cyan/15 [&_code]:text-cyan-200 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded">
                        <PortableText
                          value={post.tldr}
                          components={{
                            list: {
                              bullet: ({ children }) => <ul className="list-disc list-outside pl-0 md:pl-5 space-y-1.5 my-1 marker:text-brand-cyan last:mb-0">{children}</ul>,
                              number: ({ children }) => <ol className="list-decimal list-outside pl-0 md:pl-5 space-y-1.5 my-1 marker:text-brand-cyan last:mb-0">{children}</ol>,
                            },
                            marks: {
                              link: ({ children, value }) => (
                                <a
                                  href={value?.href}
                                  target={value?.blank ? '_blank' : undefined}
                                  rel={value?.blank ? 'noopener noreferrer' : undefined}
                                >
                                  {children}
                                </a>
                              ),
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Summary Box */}
              {post.quickAnswer && (
                <div className="bg-gradient-to-br from-brand-cyan/5 to-brand-blue/5 border border-brand-cyan/20 rounded-xl md:rounded-2xl p-5 md:p-7 lg:p-8 mb-6 md:mb-10">
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-5">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-brand-cyan/10 flex items-center justify-center">
                      <Zap size={18} className="text-brand-cyan md:hidden" />
                      <Zap size={24} className="text-brand-cyan hidden md:block" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm md:text-base lg:text-lg">
                        {detailLabels?.summaryTitle || t('blog.detail.summaryTitle')}
                      </h4>
                      <p className="text-xs md:text-sm text-slate-500">
                        {detailLabels?.summarySubtitle || t('blog.detail.summarySubtitle')}
                      </p>
                    </div>
                  </div>
                  <div
                    className="text-sm md:text-base lg:text-lg text-slate-300 leading-relaxed [&>p]:mb-3 [&>ul]:space-y-2 [&>ul>li]:flex [&>ul>li]:gap-2 [&>ul>li]:before:content-['->'] [&>ul>li]:before:text-brand-cyan"
                    dangerouslySetInnerHTML={{ __html: post.quickAnswer }}
                  />
                </div>
              )}

              {/* Mobile TOC Dropdown — hidden everywhere per request; desktop uses the sticky sidebar TOC */}
              {dynamicToc && dynamicToc.length > 0 && (
                <div className="hidden">
                  <details className="bg-brand-card border border-slate-700/50 rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-center gap-2 py-1.5 px-4 cursor-pointer hover:bg-slate-800/50 transition-colors">
                      <BookOpen size={18} className="text-brand-cyan" />
                      <span className="font-semibold text-white text-[14px] md:text-base">Table of Contents</span>
                      <ChevronDown
                        size={18}
                        className="text-slate-400 open:rotate-180 transition-transform ml-1"
                      />
                    </summary>
                    <nav className="px-3 py-2.5 border-t border-slate-700/50">
                      <ul className="list-disc pl-4 space-y-1 marker:text-slate-500" style={{ listStylePosition: 'outside' }}>
                        {dynamicToc.map((item, i) => {
                          const isActive = mobileActiveSection === item.id
                          return (
                            <li key={i} className={`text-[13px] leading-[1.6] pl-1 ${
                              isActive ? 'marker:text-brand-cyan' : 'marker:text-slate-500'
                            }`}>
                              <a
                                href={`#${item.id}`}
                                onClick={(e) => {
                                  e.preventDefault()
                                  const element = document.getElementById(item.id)
                                  if (element) {
                                    const offset = 100
                                    const elementPosition =
                                      element.getBoundingClientRect().top + window.scrollY
                                    window.scrollTo({
                                      top: elementPosition - offset,
                                      behavior: 'smooth',
                                    })
                                    const details = (e.target as HTMLElement).closest(
                                      'details'
                                    ) as HTMLDetailsElement
                                    if (details) details.open = false
                                  }
                                }}
                                className={`transition-colors duration-200 ${
                                  isActive
                                    ? 'text-brand-cyan font-medium'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                              >
                                {item.label}
                              </a>
                            </li>
                          )
                        })}
                      </ul>
                    </nav>
                  </details>
                </div>
              )}

              {/* Main Article Content */}
              <article className="blog-content prose prose-invert max-w-none px-1">
                {Array.isArray(post.content) ? (
                  <PortableText value={post.content} components={portableTextComponents} />
                ) : (
                  <>
                    <style
                      dangerouslySetInnerHTML={{
                        __html: `
                .blog-content {
                  font-size: 14px;
                  line-height: 1.8;
                  color: #d1d5db;
                  font-family: 'Inter', system-ui, -apple-system, sans-serif;
                }
                @media (min-width: 768px) {
                  .blog-content { font-size: 1.1rem; line-height: 1.9; }
                }
                @media (min-width: 1024px) {
                  .blog-content { font-size: 1.25rem; }
                }
                .blog-content h2 {
                  font-size: 19px; font-weight: 800; color: #ffffff;
                  margin-top: 0.75rem; margin-bottom: 1rem; line-height: 1.25;
                  letter-spacing: -0.025em; padding-top: 0.75rem;
                  border-top: 1px solid rgba(51, 65, 85, 0.5);
                  scroll-margin-top: 5rem;
                }
                @media (min-width: 768px) {
                  .blog-content h2 {
                    font-size: 30px; margin-top: 1.5rem; margin-bottom: 1.5rem;
                    padding-top: 1.5rem; scroll-margin-top: 7rem;
                  }
                }
                .blog-content h2:first-child { margin-top: 0; padding-top: 0; border-top: none; }
                .blog-content h3 {
                  font-size: 16px; font-weight: 700; color: #f1f5f9;
                  margin-top: 0.75rem; margin-bottom: 0.75rem; line-height: 1.35;
                  scroll-margin-top: 7rem;
                }
                @media (min-width: 768px) {
                  .blog-content h3 {
                    font-size: 24px;
                  }
                }
                .blog-content h4 {
                  font-size: 1.25rem; font-weight: 600; color: #e2e8f0;
                  margin-top: 2.5rem; margin-bottom: 1rem; scroll-margin-top: 7rem; line-height: 1.4;
                }
                .blog-content p { margin-bottom: 0.75rem; line-height: 1.8; }
                @media (min-width: 768px) { .blog-content p { margin-bottom: 1.5rem; } }
                .blog-content h2 + p, .blog-content h3 + p, .blog-content h4 + p { margin-top: 0; }
                .blog-content ul, .blog-content ol { margin: 2rem 0; padding-left: 0; }
                .blog-content li {
                  font-size: 14px; margin-bottom: 0.375rem; padding-left: 2rem;
                  position: relative; line-height: 1.8;
                }
                .blog-content ul li::before {
                  content: ""; position: absolute; left: 0; top: 0.85rem;
                  width: 8px; height: 8px; border-radius: 50%;
                  background: linear-gradient(135deg, #06b6d4, #2563eb);
                }
                .blog-content ol { counter-reset: item; }
                .blog-content ol li::before {
                  content: counter(item); counter-increment: item;
                  position: absolute; left: 0; top: 0; width: 1.5rem; height: 1.5rem;
                  background: linear-gradient(135deg, #06b6d4, #2563eb); color: white;
                  font-size: 0.75rem; font-weight: 700; border-radius: 50%;
                  display: flex; align-items: center; justify-content: center;
                }
                @media (min-width: 768px) { .blog-content li { font-size: 1.125rem; } }
                .blog-content strong, .blog-content b { color: #ffffff; font-weight: 700; }
                .blog-content em, .blog-content i { color: #cbd5e1; }
                .blog-content a { color: #06b6d4; text-decoration: none; transition: all 0.2s; }
                .blog-content a:hover { color: #22d3ee; }
                .blog-content blockquote {
                  margin: 2rem 0; padding: 1.25rem 1.5rem;
                  background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(6, 182, 212, 0.05));
                  border-left: 4px solid #2563eb; border-radius: 0 1rem 1rem 0;
                  font-size: 1rem; font-style: italic; color: #e2e8f0; line-height: 1.7;
                }
                @media (min-width: 768px) {
                  .blog-content blockquote {
                    margin: 3rem 0; padding: 2rem 2.5rem;
                    font-size: 1.35rem;
                  }
                }
                .blog-content blockquote p { margin-bottom: 0; }
                .blog-content code {
                  background: #1e293b; padding: 0.25em 0.5em; border-radius: 6px;
                  font-size: 0.9em; color: #f8fafc; font-family: 'JetBrains Mono', 'Fira Code', monospace;
                }
                .blog-content pre {
                  background: #0f172a; padding: 1.75rem; border-radius: 1rem;
                  overflow-x: auto; margin: 2.5rem 0; border: 1px solid #1e293b;
                }
                .blog-content pre code { background: none; padding: 0; font-size: 0.95rem; line-height: 1.7; }
                .blog-content table {
                  width: 100%; border-collapse: collapse; margin: 2.5rem 0;
                  background: rgba(15, 23, 42, 0.5); border: 1px solid #1e293b;
                  border-radius: 1rem; overflow: hidden;
                }
                .blog-content thead { background: rgba(30, 41, 59, 0.8); }
                .blog-content th {
                  padding: 1.25rem 1.5rem; text-align: left; font-size: 0.875rem;
                  font-weight: 700; color: #06b6d4; text-transform: uppercase; letter-spacing: 0.05em;
                }
                .blog-content td { padding: 1.25rem 1.5rem; border-top: 1px solid #1e293b; font-size: 1.1rem; }
                .blog-content tbody tr:hover { background: rgba(30, 41, 59, 0.4); }
                .blog-content img {
                  max-width: 100%; height: auto; border-radius: 1rem;
                  margin: 2.5rem 0; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }
                .blog-content hr {
                  border: none; height: 1px;
                  background: linear-gradient(to right, transparent, #334155, transparent); margin: 4rem 0;
                }
                .blog-content > p:first-of-type::first-letter {
                  float: left; font-size: 4.5rem; line-height: 0.8; font-weight: 800;
                  margin-right: 0.75rem; margin-top: 0.15rem; color: #06b6d4;
                }
                `,
                      }}
                    />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.content as unknown as string,
                      }}
                    />
                  </>
                )}
              </article>

              {/* FAQs Section */}
              {post.faqs && post.faqs.length > 0 && (
                <section
                  className="mt-3 pt-10 border-t border-slate-800"
                  aria-labelledby="faq-title"
                >
                  <h2
                    id="faq-title"
                    className="text-[19px] md:text-3xl font-bold text-white tracking-tight mb-8"
                  >
                    {post.faqTitle || detailLabels?.faqTitle || t('blog.detail.faqTitle')}
                  </h2>
                  <div className="space-y-4">
                    {post.faqs.map((faq, i) => (
                      <details
                        key={i}
                        className="group border border-slate-700/50 rounded-xl bg-slate-900/30 transition-all hover:border-slate-600"
                      >
                        <summary className="flex items-center justify-between p-6 text-white font-semibold cursor-pointer list-none text-[16px] md:text-lg">
                          <span className="pr-6">{faq.question}</span>
                          <Plus
                            size={20}
                            className="text-brand-cyan flex-shrink-0 group-open:rotate-45 transition-transform"
                          />
                        </summary>
                        <div className="px-6 pb-6 text-slate-400 text-[14px] md:text-lg leading-relaxed border-t border-slate-700/30 pt-4">
                          {Array.isArray(faq.answer) ? (
                            <PortableText
                              value={faq.answer}
                              components={{
                                marks: {
                                  link: ({ children, value: markValue }: any) => (
                                    <a
                                      href={markValue?.href}
                                      target={markValue?.openInNewTab ? '_blank' : undefined}
                                      rel={markValue?.openInNewTab ? 'noopener noreferrer' : undefined}
                                      className="text-brand-cyan hover:text-brand-blue underline transition-colors"
                                    >
                                      {children}
                                    </a>
                                  ),
                                },
                                block: {
                                  normal: ({ children }: any) => <p className="mb-2 last:mb-0">{children}</p>,
                                },
                              }}
                            />
                          ) : (
                            faq.answer
                          )}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* Author Section */}
              {post.author && (
                <div className="mt-16 pt-10 border-t border-slate-800">
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl p-10 flex flex-col sm:flex-row gap-8 items-center sm:items-start text-center sm:text-left border border-slate-700/30">
                    {(() => {
                      const authorUrl = post.author.slug ? `${locale === 'en' ? '' : `/${locale}`}/blog/authors/${post.author.slug}` : undefined
                      const avatar = post.author.image ? (
                        <img
                          src={post.author.image}
                          alt={post.author.name}
                          className="w-24 h-24 rounded-2xl object-cover border-2 border-brand-cyan flex-shrink-0"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
                          {post.author.name[0]}
                        </div>
                      )
                      return authorUrl ? <a href={authorUrl} className="hover:opacity-80 transition-opacity flex-shrink-0">{avatar}</a> : avatar
                    })()}
                    <div className="flex-1">
                      <p className="text-sm text-brand-cyan uppercase tracking-wider font-semibold mb-2">
                        {detailLabels?.authorLabel || t('blog.detail.authorLabel')}
                      </p>
                      {post.author.slug ? (
                        <a href={`${locale === 'en' ? '' : `/${locale}`}/blog/authors/${post.author.slug}`} className="block">
                          <h4 className="text-2xl font-bold text-white mb-4 hover:text-brand-cyan transition-colors">
                            {post.author.name}
                          </h4>
                        </a>
                      ) : (
                        <h4 className="text-2xl font-bold text-white mb-4">
                          {post.author.name}
                        </h4>
                      )}
                      {/* Mobile-only share buttons — moved from the top-fold header */}
                      <div className="flex md:hidden items-center gap-1 mb-4 justify-center sm:justify-start">
                        <button
                          className="p-2 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-white transition-all"
                          title="Share on Twitter"
                          onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}
                        >
                          <Twitter size={18} />
                        </button>
                        <button
                          className="p-2 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-white transition-all"
                          title="Share on LinkedIn"
                          onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                        >
                          <Linkedin size={18} />
                        </button>
                        <button
                          className="p-2 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-white transition-all"
                          title="Share via Email"
                          onClick={() => window.location.href = `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(window.location.href)}`}
                        >
                          <Mail size={18} />
                        </button>
                        <button
                          className="p-2 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-white transition-all"
                          title="Copy Link"
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.href)
                            alert('Link copied!')
                          }}
                        >
                          <LinkIcon size={18} />
                        </button>
                      </div>
                      <p className="text-lg text-slate-400 leading-relaxed">
                        {post.author.bio || t('blog.detail.authorBioFallback')}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Newsletter CTA */}
              <div id="newsletter-cta-section" className="mt-16 p-8 bg-gradient-to-br from-brand-blue/10 to-brand-cyan/10 rounded-3xl border border-brand-cyan/20 text-center">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {newsletterCta?.headline || t('blog.newsletter.headline')}
                </h3>
                <p className="text-lg text-slate-400 mb-8 max-w-md mx-auto">
                  {newsletterCta?.description || t('blog.newsletter.description')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder={
                      newsletterCta?.placeholder || t('blog.newsletter.placeholder')
                    }
                    className="flex-1 bg-brand-black border border-slate-700 rounded-xl px-5 py-4 text-white placeholder:text-slate-500 focus:border-brand-cyan outline-none transition-colors text-lg"
                  />
                  <button className="bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold py-4 px-8 rounded-xl transition-colors">
                    {newsletterCta?.buttonText || t('blog.newsletter.buttonText')}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Sticky Sidebar */}
            <aside className="hidden lg:block w-[300px] flex-shrink-0 sticky top-24 self-start">
              <StickyTableOfContents
                sections={dynamicToc}
                sidebarCta={sidebarCta}
                tocTitle={detailLabels?.tocTitle}
                locale={locale}
              />
            </aside>
          </div>
        </div>
      </main>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-20 bg-brand-surface border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <SectionBadge variant="cyan" className="mb-4">
                  {relatedPostsSection?.badge || t('blog.relatedPosts.badge')}
                </SectionBadge>
                <h2 className="text-3xl font-bold text-white">
                  {relatedPostsSection?.title || t('blog.relatedPosts.title')}
                </h2>
              </div>
              <button
                onClick={() => router.push(blogPath)}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white transition-all"
              >
                {relatedPostsSection?.viewAllText || t('blog.relatedPosts.viewAll')}
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts
                .filter((p) => p.slug !== slug)
                .slice(0, 3)
                .map((relatedPost, i) => (
                  <RelatedPostCard
                    key={i}
                    category={relatedPost.category}
                    title={relatedPost.title}
                    date={new Date(relatedPost.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                    readTime={`${relatedPost.readTime} ${
                      detailLabels?.minReadSuffix || t('blog.detail.minRead')
                    }`}
                    image={relatedPost.featuredImage || ''}
                    slug={relatedPost.slug}
                    locale={locale}
                  />
                ))}
            </div>
          </div>
        </section>
      )}
      </>
    </BlogTranslationsProvider>
  )
}
