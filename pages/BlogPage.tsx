import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  ArrowLeft,
  ArrowRight,
  User,
  BookOpen,
  Rocket
} from 'lucide-react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { Navbar } from '../components/Navbar';
import { ChunkyFooter } from '../components/footer/ChunkyFooter';
import { useBlogPost, useBlogPosts, useBlogIndex, BlogIndexSidebarCta, BlogIndexNewsletterCta, BlogIndexDetailLabels, BlogIndexRelatedPostsSection, PortableTextBlock } from '../hooks/useBlog';
import { Button } from '../components/ui/Button';
import { SectionBadge } from '../components/ui/SectionBadge';
import { getLanguageFromPath } from '../components/LanguageProvider';
import { translateBlogPost, getUIText, SupportedLanguage } from '../lib/blogTranslations';
// Import new content type components
import { TableBlock } from '../components/blog/TableBlock';
import { AccordionBlock } from '../components/blog/AccordionBlock';
import { CalloutBlock } from '../components/blog/CalloutBlock';
import { VideoEmbedBlock } from '../components/blog/VideoEmbedBlock';
import { ButtonCTABlock } from '../components/blog/ButtonCTABlock';
import { QuoteBlock } from '../components/blog/QuoteBlock';

// Generate a URL-friendly slug from text
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Extract text content from Portable Text block children
const extractTextFromBlock = (block: PortableTextBlock): string => {
  if (!block.children) return '';
  return block.children
    .filter((child: any) => child._type === 'span')
    .map((child: any) => child.text || '')
    .join('');
};

// Extract headings from Portable Text content for dynamic TOC - H2 only
const extractHeadingsFromContent = (content: PortableTextBlock[]): Array<{ label: string; id: string }> => {
  if (!Array.isArray(content)) return [];

  return content
    .filter((block) => block._type === 'block' && block.style === 'h2')
    .map((block) => {
      const text = extractTextFromBlock(block);
      return {
        label: text,
        id: generateSlug(text),
      };
    })
    .filter((item) => item.label.length > 0);
};

// Create Portable Text components with dynamic IDs for headings
const createPortableTextComponents = (content: PortableTextBlock[]): PortableTextComponents => {
  // Pre-generate heading IDs to ensure consistency
  const headingIds = new Map<string, string>();
  if (Array.isArray(content)) {
    content
      .filter((block) => block._type === 'block' && ['h1', 'h2', 'h3', 'h4'].includes(block.style || ''))
      .forEach((block) => {
        const text = extractTextFromBlock(block);
        headingIds.set(block._key, generateSlug(text));
      });
  }

  return {
    block: {
      h1: ({ children, value }) => {
        const id = headingIds.get(value._key) || generateSlug(String(children));
        return <h1 id={id} className="text-4xl font-extrabold text-white mt-16 mb-6 first:mt-0 scroll-mt-28">{children}</h1>;
      },
      h2: ({ children, value }) => {
        const id = headingIds.get(value._key) || generateSlug(String(children));
        return <h2 id={id} className="text-[19px] md:text-3xl font-bold text-white mt-3 mb-4 pt-3 border-t border-slate-800/50 first:border-t-0 first:pt-0 first:mt-0 scroll-mt-28">{children}</h2>;
      },
      h3: ({ children, value }) => {
        const id = headingIds.get(value._key) || generateSlug(String(children));
        return <h3 id={id} className="text-[18px] md:text-2xl font-semibold text-slate-100 mt-3 mb-3 scroll-mt-28">{children}</h3>;
      },
      h4: ({ children, value }) => {
        const id = headingIds.get(value._key) || generateSlug(String(children));
        return <h4 id={id} className="text-xl font-semibold text-slate-200 mt-8 mb-3 scroll-mt-28">{children}</h4>;
      },
      normal: ({ children }) => <p className="text-[14px] md:text-lg text-slate-300 leading-relaxed mb-3">{children}</p>,
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-brand-cyan pl-6 my-8 italic text-slate-400 text-xl">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => <ul className="my-6 space-y-3">{children}</ul>,
      number: ({ children }) => <ol className="my-6 space-y-3 list-decimal list-inside">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="text-[14px] md:text-lg text-slate-300 leading-relaxed pl-6 mb-1.5 relative before:content-[''] before:absolute before:left-0 before:top-3 before:w-2 before:h-2 before:rounded-full before:bg-gradient-to-r before:from-brand-cyan before:to-brand-blue">
          {children}
        </li>
      ),
      number: ({ children }) => <li className="text-[14px] md:text-lg text-slate-300 leading-relaxed mb-1.5">{children}</li>,
    },
    marks: {
      strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      code: ({ children }) => (
        <code className="bg-slate-800 text-brand-cyan px-2 py-1 rounded text-sm font-mono">{children}</code>
      ),
      link: ({ children, value }) => (
        <a
          href={value?.href}
          className="text-brand-cyan hover:text-brand-blue underline underline-offset-4 transition-colors"
          target={value?.href?.startsWith('http') ? '_blank' : undefined}
          rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      ),
    },
    types: {
      image: ({ value }) => {
        if (!value?.url) return null;
        return (
          <figure className="my-10">
            <img
              src={value.url}
              alt={value.alt || ''}
              className="w-full rounded-2xl shadow-2xl border border-slate-800/50"
              fetchPriority="high"
              loading="eager"
            />
            {value.caption && (
              <figcaption className="text-center text-slate-500 text-sm mt-4">{value.caption}</figcaption>
            )}
          </figure>
        );
      },
      // NEW CONTENT TYPES
      table: ({ value }) => {
        if (!value) return null;
        return <TableBlock data={value} />;
      },
      accordion: ({ value }) => {
        if (!value) return null;
        return <AccordionBlock data={value} />;
      },
      callout: ({ value }) => {
        if (!value) return null;
        return <CalloutBlock data={value} />;
      },
      videoEmbed: ({ value }) => {
        if (!value) return null;
        return <VideoEmbedBlock data={value} />;
      },
      buttonCTA: ({ value }) => {
        if (!value) return null;
        return <ButtonCTABlock data={value} />;
      },
      quote: ({ value }) => {
        if (!value) return null;
        return <QuoteBlock data={value} />;
      },
      codeBlock: ({ value }) => {
        if (!value) return null;
        return (
          <figure className="my-8">
            {value.filename && (
              <div className="text-xs text-slate-500 mb-2 font-mono">{value.filename}</div>
            )}
            <pre className={`bg-slate-900 rounded-xl p-4 md:p-6 overflow-x-auto border border-slate-700 ${value.theme === 'light' ? 'light' : ''}`}>
              <code className={`text-sm md:text-base ${value.language ? `language-${value.language}` : ''}`}>
                {value.code}
              </code>
            </pre>
          </figure>
        );
      },
      imageGallery: ({ value }) => {
        if (!value || !value.images?.length) return null;
        const gridCols = value.layout === 'grid-2' ? 'grid-cols-2' : value.layout === 'grid-3' ? 'grid-cols-3' : value.layout === 'grid-4' ? 'grid-cols-4' : 'grid-cols-2 md:grid-cols-3';
        return (
          <figure className="my-8 md:my-12">
            {value.caption && <figcaption className="text-center text-slate-400 mb-4">{value.caption}</figcaption>}
            <div className={`grid ${gridCols} gap-4`}>
              {value.images.map((img: any, i: number) => (
                <div key={i} className="aspect-square overflow-hidden rounded-xl">
                  <img src={img.url} alt={img.alt || ''} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </figure>
        );
      },
      fileDownload: ({ value }) => {
        if (!value) return null;
        return (
          <a
            href={value.file?.asset?.url}
            download
            className={`my-6 inline-flex items-center gap-4 p-4 md:p-6 rounded-xl border border-slate-700 hover:border-brand-cyan transition-colors ${
              value.variant === 'button' ? 'bg-brand-cyan text-black hover:bg-brand-cyan/90' : 'bg-slate-800 text-slate-300'
            }`}
          >
            <div className="w-12 h-12 rounded-lg bg-brand-cyan/20 flex items-center justify-center">
              <span className="text-2xl">📄</span>
            </div>
            <div>
              <p className="font-semibold">{value.title}</p>
              {value.description && <p className="text-sm opacity-70">{value.description}</p>}
            </div>
          </a>
        );
      },
      comparisonTable: ({ value }) => {
        if (!value || !value.columns?.length) return null;
        return (
          <div className="my-8 md:my-12">
            {value.title && <h3 className="text-xl font-bold text-white mb-6">{value.title}</h3>}
            <div className="overflow-x-auto rounded-xl border border-slate-700">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-800">
                    <th className="p-4 text-left text-slate-400">Feature</th>
                    {value.columns.map((col: any, i: number) => (
                      <th
                        key={i}
                        className={`p-4 text-center ${col.highlight ? 'bg-brand-cyan text-black font-bold' : ''}`}
                      >
                        {col.icon && <img src={col.icon} alt="" className="w-8 h-8 mx-auto mb-2" />}
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
                          {row.checkmarks ? (val === '✓' || val === 'Yes' ? '✅' : '❌') : val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {value.cta?.url && (
              <div className="mt-6 text-center">
                <a href={value.cta.url} className="inline-flex items-center gap-2 px-6 py-3 bg-brand-cyan text-black font-semibold rounded-xl hover:bg-brand-cyan/90 transition-colors">
                  {value.cta.text || 'Learn More'}
                  <ArrowRight size={18} />
                </a>
              </div>
            )}
          </div>
        );
      },
    },
  };
};

// Reading progress bar
const ReadingProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-slate-800 z-50">
      <div
        className="h-full bg-gradient-to-r from-brand-blue to-brand-cyan transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// Sticky Sidebar TOC with scroll spy
const StickyTableOfContents: React.FC<{
  sections: Array<{ label: string; id: string }>;
  sidebarCta?: BlogIndexSidebarCta;
  tocTitle?: string;
  t: (key: string) => string;
}> = ({ sections, sidebarCta, tocTitle, t }) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    if (!sections || sections.length === 0) return;

    const handleScroll = () => {
      // Find active section based on scroll position
      let currentSection = '';
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            currentSection = section.id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <div className="space-y-6">
      {/* Table of Contents */}
      {sections && sections.length > 0 && (
        <div className="bg-brand-card border border-slate-700/50 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700/50">
            <BookOpen size={16} className="text-brand-cyan" />
            <h4 className="font-semibold text-white text-sm">{tocTitle || t('blog.detail.tocTitle')}</h4>
          </div>
          <nav>
            <ol className="space-y-1">
              {sections.map((item, i) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={i}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(item.id);
                        if (element) {
                          const offset = 100;
                          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                          window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
                        }
                      }}
                      className={`flex items-start gap-3 py-2 px-3 rounded-lg transition-all text-sm leading-relaxed ${
                        isActive
                          ? 'bg-brand-cyan/10 text-brand-cyan border-l-2 border-brand-cyan'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      <span className={`font-mono text-[10px] mt-0.5 w-5 flex-shrink-0 ${isActive ? 'text-brand-cyan' : 'text-slate-600'}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="line-clamp-2">{item.label}</span>
                    </a>
                  </li>
                );
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
          {sidebarCta?.headline || t('blog.sidebar.headline')}
        </h4>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          {sidebarCta?.description || t('blog.sidebar.description')}
        </p>
        <Button variant="primary" size="md" className="w-full">
          {sidebarCta?.buttonText || t('blog.sidebar.buttonText')}
        </Button>
        <p className="text-[10px] text-center mt-3 font-mono text-slate-500 uppercase tracking-widest">
          {sidebarCta?.footnote || t('blog.sidebar.footnote')}
        </p>
      </div>
    </div>
  );
};

const RelatedPostCard: React.FC<{
  category: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
}> = ({ category, title, date, readTime, image, slug }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${slug}`)}
      className="bg-brand-card border border-slate-700 rounded-2xl overflow-hidden shadow-xl hover:border-slate-500 transition-all cursor-pointer group h-full flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <img src={image || 'https://picsum.photos/600/400'} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" fetchPriority="high" loading="eager" width={600} height={400} />
        <div className="absolute top-4 left-4">
          <span className="font-mono text-[10px] uppercase font-bold bg-brand-blue px-2 py-1 rounded text-white">{category}</span>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 leading-snug group-hover:text-brand-cyan transition-colors">{title}</h3>
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-800 font-mono text-[10px] uppercase text-slate-500 font-bold">
          <span className="flex items-center gap-1"><Clock size={12} /> {readTime}</span>
          <span className="flex items-center gap-1"><Calendar size={12} /> {date}</span>
        </div>
      </div>
    </div>
  );
};

const BlogPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  // Get language from URL pathname instead of i18n state to ensure correct language content
  const language = getLanguageFromPath(location.pathname);
  const { data: post, loading, error } = useBlogPost(slug || '', language);
  const { data: relatedPosts } = useBlogPosts(4, language);
  const { data: blogIndex } = useBlogIndex(language);

  // State for translated post content
  const [translatedPost, setTranslatedPost] = useState<any>(null);

  // Apply translation when post loads and needs translation
  useEffect(() => {
    if (!post) return;

    // If post is marked as translated from English, apply translation
    if (post._translatedFrom === 'en' && language !== 'en') {
      translateBlogPost(post, language as SupportedLanguage).then(setTranslatedPost);
    } else {
      setTranslatedPost(post);
    }
  }, [post, language]);

  // Use translated post if available, otherwise use original post
  const displayPost = translatedPost || post;

  // Get content from Sanity with translation fallbacks
  const sidebarCta = blogIndex?.sidebarCta;
  const newsletterCta = blogIndex?.newsletterCta;
  const relatedPostsSection = blogIndex?.relatedPostsSection;
  const detailLabels = blogIndex?.detailLabels;

  // Dynamically extract TOC from content headings
  const dynamicToc = useMemo(() => {
    if (!displayPost?.content || !Array.isArray(displayPost.content)) return [];
    return extractHeadingsFromContent(displayPost.content);
  }, [displayPost?.content]);

  // Mobile active section state
  const [mobileActiveSection, setMobileActiveSection] = useState<string>('');

  // Mobile scroll spy for active section highlighting
  useEffect(() => {
    if (!dynamicToc || dynamicToc.length === 0) return;

    const handleScroll = () => {
      let currentSection = '';
      for (const section of dynamicToc) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            currentSection = section.id;
          }
        }
      }
      setMobileActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [dynamicToc]);

  // Create portable text components with heading IDs
  const portableTextComponents = useMemo(() => {
    if (!displayPost?.content || !Array.isArray(displayPost.content)) return createPortableTextComponents([]);
    return createPortableTextComponents(displayPost.content);
  }, [displayPost?.content]);

  // SEO Meta Tags for specific blog displayPost
  useEffect(() => {
    if (!displayPost) return;

    const slug = displayPost.slug?.current || '';
    const featuredImageUrl = displayPost.featuredImage || 'https://eazybe.com/logo.png';
    const postTitle = displayPost.title || 'Blog Post';
    const postDescription = displayPost.excerpt || displayPost.title || 'Read this blog post on Eazybe';
    const postUrl = `https://eazybe.com/blog/${slug}`;

    // Helper function to set or update meta tag
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      let element: HTMLMetaElement | null = document.querySelector(
        isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
      );
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          (element as any).setAttribute('property', name);
        } else {
          element.name = name;
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Set dynamic meta tags for ALL blog posts
    document.title = `${postTitle} | Eazybe`;
    setMetaTag('description', postDescription);
    setMetaTag('thumbnail', featuredImageUrl);
    setMetaTag('og:type', 'article', true);
    setMetaTag('og:url', postUrl, true);
    setMetaTag('og:title', postTitle, true);
    setMetaTag('og:description', postDescription, true);
    setMetaTag('og:image', featuredImageUrl, true);
    setMetaTag('og:image:alt', postTitle, true);
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', postTitle);
    setMetaTag('twitter:description', postDescription);
    setMetaTag('twitter:image', featuredImageUrl);
    setMetaTag('twitter:image:alt', postTitle);

    // Special meta tags for "how-to-read-deleted-messages-on-whatsapp" displayPost
    if (slug === 'how-to-read-deleted-messages-on-whatsapp') {
      // Update title with custom title
      document.title = 'How To Read Deleted Messages On WhatsApp (Android & iPhone Guide)';

      // Helper function to set link tag
      const setLinkTag = (rel: string, href: string) => {
        let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
        if (!link) {
          link = document.createElement('link');
          link.rel = rel;
          document.head.appendChild(link);
        }
        link.href = href;
      };

      // Override with specific meta tags for this post
      setMetaTag('description', 'Learn how to read deleted messages on WhatsApp Android, iPhone, and WhatsApp Web. Discover proven methods to recover deleted WhatsApp chats, notifications, and backup tricks.');
      setMetaTag('keywords', 'how to read deleted messages on WhatsApp, read deleted WhatsApp messages, recover deleted WhatsApp chats, see deleted WhatsApp messages Android, iPhone WhatsApp deleted messages, WhatsApp Web deleted messages, WhatsApp notification history, WhatsApp chat recovery');
      setMetaTag('author', 'Eazybe');
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
      setMetaTag('bingbot', 'index, follow');
      setMetaTag('thumbnail', featuredImageUrl);

      // Article meta tags
      setMetaTag('article:published_time', '2026-02-21T08:00:00+00:00', true);
      setMetaTag('article:modified_time', '2026-02-21T10:30:00+00:00', true);
      setMetaTag('article:section', 'Technology', true);
      setMetaTag('article:tag', 'WhatsApp Tips', true);
      setMetaTag('article:author', 'Eazybe Team', true);

      // Open Graph / Facebook - override with specific content
      setMetaTag('og:url', 'https://eazybe.com/blog/how-to-read-deleted-messages-on-whatsapp', true);
      setMetaTag('og:title', 'How To Read Deleted Messages On WhatsApp (Android & iPhone Guide)', true);
      setMetaTag('og:description', 'Learn how to read deleted messages on WhatsApp Android, iPhone, and WhatsApp Web. Discover proven methods to recover deleted WhatsApp chats, notifications, and backup tricks.', true);
      setMetaTag('og:image', featuredImageUrl, true);
      setMetaTag('og:image:width', '1200', true);
      setMetaTag('og:image:height', '630', true);
      setMetaTag('og:image:alt', 'How to read deleted messages on WhatsApp', true);
      setMetaTag('og:locale', 'en_US', true);
      setMetaTag('og:site_name', 'Eazybe', true);

      // Twitter Card - override with specific content
      setMetaTag('twitter:site', '@eazybe');
      setMetaTag('twitter:creator', '@eazybe');
      setMetaTag('twitter:title', 'How To Read Deleted Messages On WhatsApp (Android & iPhone)');
      setMetaTag('twitter:description', 'Learn how to read deleted messages on WhatsApp Android, iPhone, and WhatsApp Web. Discover proven methods to recover deleted chats.');
      setMetaTag('twitter:image', featuredImageUrl);
      setMetaTag('twitter:image:alt', 'How to read deleted messages on WhatsApp guide');

      // Mobile web app tags
      setMetaTag('mobile-web-app-capable', 'yes');
      setMetaTag('apple-mobile-web-app-capable', 'yes');
      setMetaTag('apple-mobile-web-app-status-bar-style', 'default');
      setMetaTag('apple-mobile-web-app-title', 'Eazybe');

      // AI and SEO specific meta tags
      setMetaTag('answer-type', 'how-to, troubleshooting-guide, technical-tutorial');
      setMetaTag('target-audience', 'WhatsApp users, Android users, iPhone users, people looking to recover deleted messages');
      setMetaTag('content-intent', 'informational, how-to-guide');
      setMetaTag('conversational-query', 'how to read deleted messages on WhatsApp, recover deleted WhatsApp chats, see deleted messages');
      setMetaTag('ai-readability', 'clear, step-by-step, beginner-friendly');
      setMetaTag('context-window', 'WhatsApp messaging, deleted message recovery, Android notifications, iPhone chat backup, WhatsApp Web tricks');
      setMetaTag('user-problem', 'WhatsApp messages were deleted and user wants to read them');
      setMetaTag('solution-summary', 'methods to read deleted WhatsApp messages using notification log, chat backup, and third-party tools');
      setMetaTag('primary-benefit', 'recover and read deleted WhatsApp messages on Android and iPhone');
      setMetaTag('use-case', 'WhatsApp users who accidentally deleted messages or want to see messages sent by others');
      setMetaTag('implementation-difficulty', 'easy to intermediate depending on method chosen');
      setMetaTag('time-to-value', 'instant for notification log method, varies for backup method');

      // Additional SEO tags
      setMetaTag('referrer', 'origin-when-cross-origin');
      setMetaTag('format-detection', 'telephone=no');

      // Link tags
      setLinkTag('preconnect', 'https://fonts.googleapis.com');
      setLinkTag('dns-prefetch', 'https://fonts.googleapis.com');

      // HTTP equiv meta tag
      let httpEquiv = document.querySelector('meta[http-equiv="X-UA-Compatible"]');
      if (!httpEquiv) {
        httpEquiv = document.createElement('meta');
        httpEquiv.setAttribute('http-equiv', 'X-UA-Compatible');
        document.head.appendChild(httpEquiv);
      }
      httpEquiv.setAttribute('content', 'IE=edge');

      // Set canonical URL
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = 'https://eazybe.com/blog/how-to-read-deleted-messages-on-whatsapp';

      // Add BreadcrumbList Schema
      const breadcrumbSchema = {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Eazybe",
            "item": "https://eazybe.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://eazybe.com/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "How To Read Deleted Messages On WhatsApp",
            "item": "https://eazybe.com/blog/how-to-read-deleted-messages-on-whatsapp"
          }
        ]
      };

      let breadcrumbScript = document.querySelector('script[type="application/ld+json"][data-schema="breadcrumb-deleted-whatsapp"]') as HTMLScriptElement;
      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement('script') as HTMLScriptElement;
        breadcrumbScript.type = 'application/ld+json';
        breadcrumbScript.setAttribute('data-schema', 'breadcrumb-deleted-whatsapp');
        document.head.appendChild(breadcrumbScript);
      }
      breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);

      // Add FAQPage Schema
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How can I read deleted messages on WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can read deleted messages on WhatsApp using the notification log on Android, checking WhatsApp chat backups, or using third-party apps that store notification history. The notification history method is the most reliable way to see messages that were deleted after being received."
            }
          },
          {
            "@type": "Question",
            "name": "Is it possible to recover deleted WhatsApp messages on Android?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, on Android you can recover deleted WhatsApp messages by checking the notification log in your phone settings, restoring from a recent Google Drive backup, or using third-party notification history apps that archive WhatsApp notifications."
            }
          },
          {
            "@type": "Question",
            "name": "Can I read deleted WhatsApp messages on iPhone?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "On iPhone, you can read deleted WhatsApp messages by restoring from an iCloud backup. The notification log method doesn't work on iOS due to system restrictions. Make sure to back up your chats regularly to iCloud to enable recovery."
            }
          },
          {
            "@type": "Question",
            "name": "Does WhatsApp notify when someone reads deleted messages?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, WhatsApp does not notify the sender when you read a deleted message. Once a message is deleted for everyone, the sender has no way of knowing if you saw it before deletion or recovered it through other means."
            }
          },
          {
            "@type": "Question",
            "name": "Can I see messages deleted for everyone on WhatsApp Web?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Messages deleted for everyone are removed from WhatsApp Web as well. However, if you have browser extensions that cache notifications or if you're using third-party tools, you might be able to view message content before synchronization completes."
            }
          },
          {
            "@type": "Question",
            "name": "How do I enable notification log to read deleted WhatsApp messages?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "On Android, go to Settings > Apps & Notifications > Notifications > Notification History and enable it. This will keep a log of all notifications including WhatsApp messages, allowing you to read message content even after it's deleted from the chat."
            }
          },
          {
            "@type": "Question",
            "name": "Are third-party apps safe for reading deleted WhatsApp messages?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Be cautious when using third-party apps to read deleted WhatsApp messages. Only download apps from trusted sources like Google Play Store, review permissions carefully, and avoid apps that require unnecessary access to your data or ask for your WhatsApp credentials."
            }
          },
          {
            "@type": "Question",
            "name": "How long are deleted WhatsApp messages recoverable?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Deleted WhatsApp messages can be recovered if you have a recent backup. WhatsApp creates daily backups on Android (Google Drive) and iPhone (iCloud). Messages are recoverable as long as you have a backup from before the deletion occurred. Local backups on Android are also stored for the last 7 days."
            }
          }
        ]
      };

      let faqScript = document.querySelector('script[type="application/ld+json"][data-schema="faq-deleted-whatsapp"]') as HTMLScriptElement;
      if (!faqScript) {
        faqScript = document.createElement('script') as HTMLScriptElement;
        faqScript.type = 'application/ld+json';
        faqScript.setAttribute('data-schema', 'faq-deleted-whatsapp');
        document.head.appendChild(faqScript);
      }
      faqScript.textContent = JSON.stringify(faqSchema);

      // Add Organization Schema
      const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Eazybe",
        "url": "https://eazybe.com/",
        "logo": { "@type": "ImageObject", "url": "https://eazybe.com/logo.png", "width": 600, "height": 60 },
        "image": "https://eazybe.com/logo.png",
        "description": "Eazybe helps sales teams connect WhatsApp with CRM platforms like HubSpot, Zoho, Salesforce, and Google Sheets to sync conversations, automate follow-ups, and improve customer engagement.",
        "foundingDate": "2021",
        "sameAs": ["https://twitter.com/eazybe", "https://linkedin.com/company/eazybe", "https://youtube.com/@eazybe"],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "email": "support@eazybe.com",
            "url": "https://eazybe.com/",
            "areaServed": "US",
            "availableLanguage": ["English"]
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8, The Green STE B",
          "addressLocality": "Dover",
          "addressRegion": "Delaware",
          "postalCode": "19901",
          "addressCountry": "US"
        },
        "knowsAbout": [
          "WhatsApp CRM",
          "WhatsApp integration",
          "Sales automation",
          "CRM integration",
          "AI agents for CRM",
          "Customer engagement"
        ]
      };

      let orgScript = document.querySelector('script[type="application/ld+json"][data-schema="org-deleted-whatsapp"]') as HTMLScriptElement;
      if (!orgScript) {
        orgScript = document.createElement('script') as HTMLScriptElement;
        orgScript.type = 'application/ld+json';
        orgScript.setAttribute('data-schema', 'org-deleted-whatsapp');
        document.head.appendChild(orgScript);
      }
      orgScript.textContent = JSON.stringify(organizationSchema);

      // Add SoftwareApplication Schema
      const softwareAppSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "HubSpot WhatsApp Integration - Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "CRM Integration, WhatsApp Automation, AI Agents for WhatsApp",
        "operatingSystem": "Web, Chrome Extension",
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/pricing",
          "priceCurrency": "USD",
          "lowPrice": 1160,
          "highPrice": 1960,
          "offerCount": 5,
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.7",
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": 53766
        },
        "featureList": [
          "Automatic WhatsApp to HubSpot sync",
          "AI-powered reply suggestions",
          "Shared inbox for team collaboration",
          "Deal tracking from WhatsApp",
          "Contact synchronization",
          "Message scheduling",
          "WhatsApp Chat Backup"
        ]
      };

      let softwareAppScript = document.querySelector('script[type="application/ld+json"][data-schema="software-deleted-whatsapp"]') as HTMLScriptElement;
      if (!softwareAppScript) {
        softwareAppScript = document.createElement('script') as HTMLScriptElement;
        softwareAppScript.type = 'application/ld+json';
        softwareAppScript.setAttribute('data-schema', 'software-deleted-whatsapp');
        document.head.appendChild(softwareAppScript);
      }
      softwareAppScript.textContent = JSON.stringify(softwareAppSchema);

      // Add Article Schema
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://eazybe.com/blog/how-to-read-deleted-messages-on-whatsapp"
        },
        "headline": "How To Read Deleted Messages On WhatsApp (Android & iPhone Guide)",
        "description": "Learn how to read deleted messages on WhatsApp Android, iPhone, and WhatsApp Web. Discover proven methods to recover deleted WhatsApp chats, notifications, and backup tricks.",
        "image": "https://cdn.sanity.io/images/5awzi0t4/production/ae2f43e2dce48963e01c4dd39a1c7b24dc8efb7c-1280x720.webp",
        "author": {
          "@type": "Organization",
          "name": "Eazybe",
          "url": "https://eazybe.com/"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Eazybe",
          "logo": {
            "@type": "ImageObject",
            "url": "https://eazybe.com/logo.png"
          }
        },
        "datePublished": "2026-02-20",
        "dateModified": "2026-02-21"
      };

      let articleScript = document.querySelector('script[type="application/ld+json"][data-schema="article-deleted-whatsapp"]') as HTMLScriptElement;
      if (!articleScript) {
        articleScript = document.createElement('script') as HTMLScriptElement;
        articleScript.type = 'application/ld+json';
        articleScript.setAttribute('data-schema', 'article-deleted-whatsapp');
        document.head.appendChild(articleScript);
      }
      articleScript.textContent = JSON.stringify(articleSchema);

      // Cleanup function to remove meta tags when unmounting
      return () => {
        const metaTags = [
          'name="description"',
          'name="keywords"',
          'name="author"',
          'name="robots"',
          'name="googlebot"',
          'name="bingbot"',
          'name="thumbnail"',
          'property="article:published_time"',
          'property="article:modified_time"',
          'property="article:section"',
          'property="article:tag"',
          'property="article:author"',
          'property="og:type"',
          'property="og:url"',
          'property="og:title"',
          'property="og:description"',
          'property="og:image"',
          'property="og:image:width"',
          'property="og:image:height"',
          'property="og:image:alt"',
          'property="og:locale"',
          'property="og:site_name"',
          'name="twitter:card"',
          'name="twitter:site"',
          'name="twitter:creator"',
          'name="twitter:title"',
          'name="twitter:description"',
          'name="twitter:image"',
          'name="twitter:image:alt"',
          'name="mobile-web-app-capable"',
          'name="apple-mobile-web-app-capable"',
          'name="apple-mobile-web-app-status-bar-style"',
          'name="apple-mobile-web-app-title"',
          'name="answer-type"',
          'name="target-audience"',
          'name="content-intent"',
          'name="conversational-query"',
          'name="ai-readability"',
          'name="context-window"',
          'name="user-problem"',
          'name="solution-summary"',
          'name="primary-benefit"',
          'name="use-case"',
          'name="implementation-difficulty"',
          'name="time-to-value"',
          'name="referrer"',
          'name="format-detection"',
        ];

        metaTags.forEach(selector => {
          const meta = document.querySelector(`meta[${selector}]`);
          if (meta) meta.remove();
        });

        // Remove link tags
        const preconnect = document.querySelector('link[rel="preconnect"]');
        if (preconnect) preconnect.remove();
        const dnsPrefetch = document.querySelector('link[rel="dns-prefetch"]');
        if (dnsPrefetch) dnsPrefetch.remove();

        // Remove BreadcrumbList schema
        const breadcrumbSchema = document.querySelector('script[type="application/ld+json"][data-schema="breadcrumb-deleted-whatsapp"]');
        if (breadcrumbSchema) breadcrumbSchema.remove();

        // Remove FAQ schema
        const faqSchema = document.querySelector('script[type="application/ld+json"][data-schema="faq-deleted-whatsapp"]');
        if (faqSchema) faqSchema.remove();

        // Remove Organization schema
        const orgSchema = document.querySelector('script[type="application/ld+json"][data-schema="org-deleted-whatsapp"]');
        if (orgSchema) orgSchema.remove();

        // Remove SoftwareApplication schema
        const softwareAppSchema = document.querySelector('script[type="application/ld+json"][data-schema="software-deleted-whatsapp"]');
        if (softwareAppSchema) softwareAppSchema.remove();

        // Remove Article schema
        const articleSchema = document.querySelector('script[type="application/ld+json"][data-schema="article-deleted-whatsapp"]');
        if (articleSchema) articleSchema.remove();

        // Remove dynamic FAQ schema
        const dynamicFaqSchema = document.querySelector('script[type="application/ld+json"][data-schema="dynamic-faq"]');
        if (dynamicFaqSchema) dynamicFaqSchema.remove();

        // Remove AI Support schemas
        const aiOrgSchema = document.querySelector('script[type="application/ld+json"][data-schema="org-ai-support"]');
        if (aiOrgSchema) aiOrgSchema.remove();
        const aiSoftwareAppSchema = document.querySelector('script[type="application/ld+json"][data-schema="software-ai-support"]');
        if (aiSoftwareAppSchema) aiSoftwareAppSchema.remove();
        const aiBreadcrumbSchema = document.querySelector('script[type="application/ld+json"][data-schema="breadcrumb-ai-support"]');
        if (aiBreadcrumbSchema) aiBreadcrumbSchema.remove();
        const aiWebPageSchema = document.querySelector('script[type="application/ld+json"][data-schema="webpage-ai-support"]');
        if (aiWebPageSchema) aiWebPageSchema.remove();
        const aiBlogPostingSchema = document.querySelector('script[type="application/ld+json"][data-schema="blogposting-ai-support"]');
        if (aiBlogPostingSchema) aiBlogPostingSchema.remove();
        const aiFaqPageSchema = document.querySelector('script[type="application/ld+json"][data-schema="faqpage-ai-support"]');
        if (aiFaqPageSchema) aiFaqPageSchema.remove();
      };
    }

    // Special meta tags for "best-ai-agents-for-customer-support" blog post
    if (slug === 'best-ai-agents-for-customer-support') {
      // Update title with custom title
      document.title = 'Best AI Agents for Customer Support in 2026 | Eazybe';

      // Override with specific meta tags for this post
      setMetaTag('description', 'Top AI agents for customer support in 2026. Compare leading AI chatbots, automation tools, and CX platforms that reduce costs, improve response time, and scale support teams.');
      setMetaTag('keywords', 'best AI customer support tools, AI chatbots for support, AI agents for customer service, customer support automation tools, AI helpdesk software, CX automation platforms');
      setMetaTag('author', 'Eazybe');
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
      setMetaTag('bingbot', 'index, follow');
      setMetaTag('thumbnail', featuredImageUrl);

      // Article meta tags
      setMetaTag('article:published_time', '2026-02-03T08:00:00+00:00', true);
      setMetaTag('article:modified_time', '2026-02-03T10:30:00+00:00', true);
      setMetaTag('article:section', 'AI & Customer Support', true);
      setMetaTag('article:tag', 'AI Customer Support Tools', true);

      // Open Graph / Facebook - override with specific content
      setMetaTag('og:url', 'https://eazybe.com/blog/best-ai-agents-for-customer-support', true);
      setMetaTag('og:title', 'Best AI Agents for Customer Support in 2026', true);
      setMetaTag('og:description', 'Discover the top AI agents and chatbots for customer support in 2026. Compare features, automation capabilities, and pricing to choose the right platform.', true);
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true);
      setMetaTag('og:image:width', '1200', true);
      setMetaTag('og:image:height', '630', true);
      setMetaTag('og:image:alt', 'Best AI agents for customer support comparison', true);
      setMetaTag('og:locale', 'en_US', true);
      setMetaTag('og:site_name', 'Eazybe', true);

      // Twitter Card - override with specific content
      setMetaTag('twitter:site', '@eazybe');
      setMetaTag('twitter:creator', '@eazybe');
      setMetaTag('twitter:title', 'Best AI Agents for Customer Support in 2026');
      setMetaTag('twitter:description', 'Compare the leading AI chatbots and automation platforms for customer support. See which tools deliver faster replies, lower costs, and better CX.');
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png');
      setMetaTag('twitter:image:alt', 'AI customer support tools comparison');

      // Twitter Card labels
      setMetaTag('twitter:label1', 'Content Type');
      setMetaTag('twitter:data1', 'Comparison Guide');
      setMetaTag('twitter:label2', 'Topic');
      setMetaTag('twitter:data2', 'AI Customer Support Tools');

      // Mobile web app tags
      setMetaTag('mobile-web-app-capable', 'yes');
      setMetaTag('apple-mobile-web-app-capable', 'yes');
      setMetaTag('apple-mobile-web-app-status-bar-style', 'default');
      setMetaTag('apple-mobile-web-app-title', 'Eazybe');

      // AI and SEO specific meta tags
      setMetaTag('answer-type', 'comparison, list, guide, recommendations');
      setMetaTag('target-audience', 'support leaders, SaaS founders, CX managers, operations teams, startups, enterprise teams');
      setMetaTag('content-intent', 'informational, commercial-investigation');
      setMetaTag('conversational-query', 'best AI agents for customer support, top AI chatbots for support, AI helpdesk tools comparison, automation tools for customer service');
      setMetaTag('ai-readability', 'professional, educational, comparison-focused');
      setMetaTag('context-window', 'customer support automation, AI chatbots, helpdesk AI, CX optimization, support scalability');
      setMetaTag('user-problem', 'support teams overloaded with tickets, slow response time, rising support costs');
      setMetaTag('solution-summary', 'compare AI-powered support agents to automate responses and improve customer experience');
      setMetaTag('primary-benefit', 'find the best AI support platform to reduce workload and improve CX');
      setMetaTag('use-case', 'businesses researching AI tools to automate customer support');
      setMetaTag('implementation-difficulty', 'varies by platform');
      setMetaTag('time-to-value', 'quick impact after implementation');

      // Add Organization Schema
      const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Eazybe",
        "url": "https://eazybe.com/",
        "logo": { "@type": "ImageObject", "url": "https://eazybe.com/logo.png", "width": 600, "height": 60 },
        "image": "https://eazybe.com/logo.png",
        "description": "Eazybe helps organization & sales teams connect WhatsApp with CRM platforms to sync conversations, automate follow-ups, and improve customer engagement.",
        "foundingDate": "2021",
        "sameAs": ["https://twitter.com/eazybe", "https://linkedin.com/company/eazybe", "https://youtube.com/@eazybe"],
        "publishingPrinciples": "https://eazybe.com/blog",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8, The Green STE B",
          "addressLocality": "Dover",
          "addressRegion": "Delaware",
          "postalCode": "19901",
          "addressCountry": "US"
        }
      };

      let orgScript = document.querySelector('script[type="application/ld+json"][data-schema="org-ai-support"]') as HTMLScriptElement;
      if (!orgScript) {
        orgScript = document.createElement('script') as HTMLScriptElement;
        orgScript.type = 'application/ld+json';
        orgScript.setAttribute('data-schema', 'org-ai-support');
        document.head.appendChild(orgScript);
      }
      orgScript.textContent = JSON.stringify(organizationSchema);

      // Add SoftwareApplication Schema
      const softwareAppSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "WhatsApp CRM Integration - Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "CRM Integration, WhatsApp Automation, AI Agents for WhatsApp",
        "operatingSystem": "Web, Chrome Extension",
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/pricing",
          "priceCurrency": "USD",
          "lowPrice": 29,
          "highPrice": 49,
          "offerCount": 5,
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.7",
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": 53766
        },
        "featureList": [
          "Automatic WhatsApp to CRM sync",
          "AI-powered reply suggestions",
          "Shared inbox for team collaboration",
          "Deal tracking from WhatsApp",
          "Contact synchronization",
          "Message scheduling",
          "AI Agents for CRM"
        ]
      };

      let softwareAppScript = document.querySelector('script[type="application/ld+json"][data-schema="software-ai-support"]') as HTMLScriptElement;
      if (!softwareAppScript) {
        softwareAppScript = document.createElement('script') as HTMLScriptElement;
        softwareAppScript.type = 'application/ld+json';
        softwareAppScript.setAttribute('data-schema', 'software-ai-support');
        document.head.appendChild(softwareAppScript);
      }
      softwareAppScript.textContent = JSON.stringify(softwareAppSchema);

      // Add BreadcrumbList Schema
      const breadcrumbSchema = {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Eazybe",
            "item": "https://eazybe.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://eazybe.com/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Best AI Agent",
            "item": "https://eazybe.com/blog/best-ai-agents-for-customer-support"
          }
        ]
      };

      let breadcrumbScript = document.querySelector('script[type="application/ld+json"][data-schema="breadcrumb-ai-support"]') as HTMLScriptElement;
      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement('script') as HTMLScriptElement;
        breadcrumbScript.type = 'application/ld+json';
        breadcrumbScript.setAttribute('data-schema', 'breadcrumb-ai-support');
        document.head.appendChild(breadcrumbScript);
      }
      breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);

      // Add WebPage Schema
      const webPageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Best AI Agents for Customer Support in 2026 | Eazybe",
        "description": "Top AI agents for customer support in 2026. Learn which AI chatbots and automation platforms deliver faster responses, lower costs, and better CX.",
        "url": "https://eazybe.com/blog/best-ai-agents-for-customer-support",
        "inLanguage": "en-US",
        "publisher": {
          "@type": "Organization",
          "name": "Eazybe",
          "url": "https://eazybe.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://eazybe.com/logo.png",
            "width": 600,
            "height": 60
          }
        },
        "isPartOf": {
          "@type": "Blog",
          "name": "Eazybe Blog",
          "url": "https://eazybe.com/blog"
        }
      };

      let webPageScript = document.querySelector('script[type="application/ld+json"][data-schema="webpage-ai-support"]') as HTMLScriptElement;
      if (!webPageScript) {
        webPageScript = document.createElement('script') as HTMLScriptElement;
        webPageScript.type = 'application/ld+json';
        webPageScript.setAttribute('data-schema', 'webpage-ai-support');
        document.head.appendChild(webPageScript);
      }
      webPageScript.textContent = JSON.stringify(webPageSchema);

      // Add BlogPosting Schema
      const blogPostingSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://eazybe.com/blog/best-ai-agents-for-customer-support"
        },
        "inLanguage": "en-US",
        "headline": "Best AI Agents for Customer Support in 2026 | Eazybe",
        "description": "Top AI agents for customer support in 2026. Learn which AI chatbots and automation platforms deliver faster responses, lower costs, and better CX.",
        "keywords": [
          "AI agents for customer support",
          "AI customer service",
          "AI chatbots",
          "customer support automation",
          "CX automation",
          "helpdesk AI"
        ],
        "articleSection": "AI & Customer Support",
        "url": "https://eazybe.com/blog/best-ai-agents-for-customer-support",
        "image": {
          "@type": "ImageObject",
          "url": "https://eazybe.com/logo.png",
          "width": 1200,
          "height": 630
        },
        "author": {
          "@type": "Organization",
          "name": "Eazybe",
          "url": "https://eazybe.com/"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Eazybe",
          "url": "https://eazybe.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://eazybe.com/logo.png",
            "width": 600,
            "height": 60
          }
        },
        "about": [
          { "@type": "Thing", "name": "Customer Support" },
          { "@type": "Thing", "name": "AI Agents" },
          { "@type": "Thing", "name": "Customer Experience" },
          { "@type": "Thing", "name": "Automation" }
        ]
      };

      let blogPostingScript = document.querySelector('script[type="application/ld+json"][data-schema="blogposting-ai-support"]') as HTMLScriptElement;
      if (!blogPostingScript) {
        blogPostingScript = document.createElement('script') as HTMLScriptElement;
        blogPostingScript.type = 'application/ld+json';
        blogPostingScript.setAttribute('data-schema', 'blogposting-ai-support');
        document.head.appendChild(blogPostingScript);
      }
      blogPostingScript.textContent = JSON.stringify(blogPostingSchema);

      // Add FAQPage Schema
      const faqPageSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "inLanguage": "en-US",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are AI agents for customer support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An AI support agent is software that can understand customer requests, retrieve relevant answers from your knowledge base or systems, and resolve issues automatically—or escalate to a human agent when needed."
            }
          },
          {
            "@type": "Question",
            "name": "How are AI agents different from traditional chatbots?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Traditional chatbots rely on scripted flows and keywords. AI agents use language models and retrieval to handle open-ended questions, follow context across messages, and take actions via integrations (e.g., create tickets, update CRM, check orders)."
            }
          },
          {
            "@type": "Question",
            "name": "Which features matter most when choosing an AI agent in 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Key features include high answer accuracy, knowledge base syncing, multi-channel support, human handoff, integrations (helpdesk/CRM), analytics, brand tone controls, and enterprise security (SSO, audit logs, data controls)."
            }
          },
          {
            "@type": "Question",
            "name": "Can AI agents reduce customer support costs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. AI agents can deflect repetitive tickets, speed up first response time, and help human agents handle more volume. Cost savings depend on ticket mix, knowledge base quality, and handoff rules."
            }
          },
          {
            "@type": "Question",
            "name": "Do AI agents work on WhatsApp for customer support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. AI agents can support WhatsApp workflows when connected via the WhatsApp Business Platform or approved integrations, enabling automated replies, ticket creation, and escalation to human agents while keeping conversation context."
            }
          },
          {
            "@type": "Question",
            "name": "How do you prevent AI agents from giving wrong answers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use grounded responses from verified sources (knowledge base), confidence thresholds, restricted actions, human review for sensitive topics, and continuous testing on real tickets. Clear escalation rules reduce risk."
            }
          },
          {
            "@type": "Question",
            "name": "What security and compliance should I look for?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Look for encryption, role-based access, SSO/SAML, audit logs, data retention controls, PII redaction, and region/compliance options (e.g., GDPR/LGPD) depending on your customers and industry."
            }
          },
          {
            "@type": "Question",
            "name": "What KPIs should I track to measure AI agent performance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Track deflection rate, first response time, resolution time, CSAT, containment rate, escalation rate, recontact rate, and cost per resolved ticket. Review accuracy and failure reasons regularly to improve outcomes."
            }
          }
        ]
      };

      let faqPageScript = document.querySelector('script[type="application/ld+json"][data-schema="faqpage-ai-support"]') as HTMLScriptElement;
      if (!faqPageScript) {
        faqPageScript = document.createElement('script') as HTMLScriptElement;
        faqPageScript.type = 'application/ld+json';
        faqPageScript.setAttribute('data-schema', 'faqpage-ai-support');
        document.head.appendChild(faqPageScript);
      }
      faqPageScript.textContent = JSON.stringify(faqPageSchema);

      // Cleanup function to remove schemas when unmounting
      return () => {
        // Remove Organization schema
        const orgSchema = document.querySelector('script[type="application/ld+json"][data-schema="org-ai-support"]');
        if (orgSchema) orgSchema.remove();

        // Remove SoftwareApplication schema
        const softwareAppSchema = document.querySelector('script[type="application/ld+json"][data-schema="software-ai-support"]');
        if (softwareAppSchema) softwareAppSchema.remove();

        // Remove BreadcrumbList schema
        const breadcrumbSchema = document.querySelector('script[type="application/ld+json"][data-schema="breadcrumb-ai-support"]');
        if (breadcrumbSchema) breadcrumbSchema.remove();

        // Remove WebPage schema
        const webPageSchema = document.querySelector('script[type="application/ld+json"][data-schema="webpage-ai-support"]');
        if (webPageSchema) webPageSchema.remove();

        // Remove BlogPosting schema
        const blogPostingSchema = document.querySelector('script[type="application/ld+json"][data-schema="blogposting-ai-support"]');
        if (blogPostingSchema) blogPostingSchema.remove();

        // Remove FAQPage schema
        const faqPageSchema = document.querySelector('script[type="application/ld+json"][data-schema="faqpage-ai-support"]');
        if (faqPageSchema) faqPageSchema.remove();
      };
    }

    // Add Dynamic FAQPage Schema for ALL blog posts
    if (displayPost.faqs && displayPost.faqs.length > 0) {
      const dynamicFaqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": displayPost.faqs.map((faq: any) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      };

      // Remove existing dynamic FAQ schema if any
      const existingFaqScript = document.querySelector('script[type="application/ld+json"][data-schema="dynamic-faq"]');
      if (existingFaqScript) {
        existingFaqScript.remove();
      }

      const dynamicFaqScript = document.createElement('script') as HTMLScriptElement;
      dynamicFaqScript.type = 'application/ld+json';
      dynamicFaqScript.setAttribute('data-schema', 'dynamic-faq');
      dynamicFaqScript.textContent = JSON.stringify(dynamicFaqSchema);
      document.head.appendChild(dynamicFaqScript);
    }
  }, [displayPost]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">{t('blog.loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !displayPost) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center text-red-400">
          <p>{t('blog.errorPost')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black font-sans text-slate-400 antialiased selection:bg-brand-blue selection:text-white">
      <ReadingProgress />
      <Navbar />

      {/* Hero Section - Left Aligned */}
      <header className="pt-20 md:pt-24 lg:pt-32 pb-6 md:pb-8 lg:pb-12 relative overflow-x-clip">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 right-1/4 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-brand-blue/5 blur-[100px] md:blur-[150px] rounded-full -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm mb-0">
            <Link to="/" className="text-slate-500 hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={12} className="text-slate-600 md:hidden" />
            <ChevronRight size={14} className="text-slate-600 hidden md:block" />
            <Link to="/blog" className="text-slate-500 hover:text-white transition-colors">
              Blog
            </Link>
            <ChevronRight size={12} className="text-slate-600 md:hidden" />
            <ChevronRight size={14} className="text-slate-600 hidden md:block" />
            <span className="text-brand-cyan font-medium truncate max-w-[150px] sm:max-w-[200px] md:max-w-md" title={displayPost.title}>
              {displayPost.title}
            </span>
          </nav>

          {/* Category Badge */}
          <div className="mb-5 md:mb-8">
            <span className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs md:text-sm font-medium">
              {displayPost.category || 'Blog'}
            </span>
          </div>

          {/* Title - Large, Bold, Readable */}
          <h1 className="text-[20px] sm:text-[22px] md:text-[28px] lg:text-[36px] font-extrabold text-white leading-[1.2] tracking-tight mb-3">
            {displayPost.title}
          </h1>

          {/* Excerpt - Generous size */}
          <p className="text-base md:text-xl lg:text-2xl text-slate-400 leading-relaxed mb-3">
            {displayPost.excerpt}
          </p>

          {/* Author & Meta - Clean horizontal layout */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 sm:gap-6 py-6 md:py-8 border-y border-slate-800/50">
            <div className="flex items-center gap-3 md:gap-4">
              {displayPost.author?.image ? (
                <img
                  src={displayPost.author.image}
                  alt={displayPost.author.name}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-brand-cyan"
                />
              ) : (
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center text-white font-bold text-lg md:text-xl">
                  {displayPost.author?.name?.[0] || <User size={20} className="md:hidden" />}
                  {displayPost.author?.name?.[0] || <User size={24} className="hidden md:block" />}
                </div>
              )}
              <div>
                <p className="font-semibold text-white text-base md:text-lg">{displayPost.author?.name || t('blog.detail.authorFallback')}</p>
                <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-slate-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="md:hidden" />
                    <Calendar size={14} className="hidden md:inline" />
                    {new Date(displayPost.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="md:hidden" />
                    <Clock size={14} className="hidden md:inline" />
                    {displayPost.readTime} {detailLabels?.minReadSuffix || t('blog.detail.minRead')}
                  </span>
                </div>
              </div>
            </div>

            {/* Share buttons */}
            <div className="flex items-center gap-1 sm:ml-auto w-full sm:w-auto justify-start sm:justify-end">
              <button className="p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-slate-800 text-slate-500 hover:text-white transition-all" title="Share on Twitter">
                <Twitter size={16} className="md:hidden" />
                <Twitter size={18} className="hidden md:block" />
              </button>
              <button className="p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-slate-800 text-slate-500 hover:text-white transition-all" title="Share on LinkedIn">
                <Linkedin size={16} className="md:hidden" />
                <Linkedin size={18} className="hidden md:block" />
              </button>
              <button className="p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-slate-800 text-slate-500 hover:text-white transition-all" title="Share via Email">
                <Mail size={16} className="md:hidden" />
                <Mail size={18} className="hidden md:block" />
              </button>
              <button className="p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-slate-800 text-slate-500 hover:text-white transition-all" title="Copy Link">
                <LinkIcon size={16} className="md:hidden" />
                <LinkIcon size={18} className="hidden md:block" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image - Left Aligned */}
      {displayPost.featuredImage && (
        <figure className="max-w-7xl mx-auto px-4 md:px-6 mb-3">
          <div className="relative rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[2/1] shadow-xl md:shadow-2xl border border-slate-800/50">
            <img
              src={displayPost.featuredImage}
              alt={displayPost.title}
              className="w-full h-full object-cover"
              fetchPriority="high"
              loading="eager"
              width={1200}
              height={630}
            />
          </div>
          <figcaption className="text-center text-slate-400 text-[10px] md:text-xs mt-3">{displayPost.title}</figcaption>
        </figure>
      )}

      {/* Main Content Area - Left Aligned */}
      <main className="pb-12 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Left Column - Main Content - Left Aligned */}
            <div className="w-full lg:flex-1">
              {/* Summary Box - Prominent */}
              {displayPost.quickAnswer && (
                <div className="bg-gradient-to-br from-brand-cyan/5 to-brand-blue/5 border border-brand-cyan/20 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 mb-8 md:mb-12">
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
                    className="text-sm md:text-base lg:text-lg text-slate-300 leading-relaxed [&>p]:mb-3 [&>ul]:space-y-2 [&>ul>li]:flex [&>ul>li]:gap-2 [&>ul>li]:before:content-['→'] [&>ul>li]:before:text-brand-cyan"
                    dangerouslySetInnerHTML={{ __html: displayPost.quickAnswer }}
                  />
                </div>
              )}

              {/* Mobile TOC Dropdown - Visible on mobile only */}
              {dynamicToc && dynamicToc.length > 0 && (
                <div className="lg:hidden mb-8">
                  <details className="bg-brand-card border border-slate-700/50 rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-800/50 transition-colors">
                      <div className="flex items-center gap-2">
                        <BookOpen size={18} className="text-brand-cyan" />
                        <span className="font-semibold text-white">Table of Contents</span>
                      </div>
                      <ChevronDown size={20} className="text-slate-400 open:rotate-180 transition-transform" />
                    </summary>
                    <nav className="p-4 pt-0 border-t border-slate-700/50">
                      <ul className="space-y-1">
                        {dynamicToc.map((item, i) => {
                          const isActive = mobileActiveSection === item.id;
                          return (
                            <li key={i}>
                              <a
                                href={`#${item.id}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  const element = document.getElementById(item.id);
                                  if (element) {
                                    const offset = 100;
                                    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                                    window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
                                    // Close the details element
                                    (e.target.closest('details') as HTMLDetailsElement).open = false;
                                  }
                                }}
                                className={`block py-2 px-3 rounded-lg text-sm transition-all ${
                                  isActive
                                    ? 'bg-brand-cyan/10 text-brand-cyan font-medium'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                }`}
                              >
                                {item.label}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </nav>
                  </details>
                </div>
              )}

              {/* Main Article Content */}
              <article className="blog-content prose prose-invert max-w-none">
                {/* Render Portable Text content if it's an array, otherwise render as HTML for legacy content */}
                {Array.isArray(displayPost.content) ? (
                  <PortableText value={displayPost.content} components={portableTextComponents} />
                ) : (
                  <>
                    <style dangerouslySetInnerHTML={{ __html: `
                .blog-content {
                  font-size: 14px;
                  line-height: 1.8;
                  color: #d1d5db;
                  font-family: 'Inter', system-ui, -apple-system, sans-serif;
                }

                @media (min-width: 768px) {
                  .blog-content {
                    font-size: 1.1rem;
                    line-height: 1.9;
                  }
                }

                @media (min-width: 1024px) {
                  .blog-content {
                    font-size: 1.25rem;
                  }
                }

                /* Headings - Clear hierarchy */
                .blog-content h2 {
                  font-size: 19px;
                  font-weight: 800;
                  color: #ffffff;
                  margin-top: 0.75rem;
                  margin-bottom: 1rem;
                  line-height: 1.25;
                  letter-spacing: -0.025em;
                  padding-top: 0.75rem;
                  border-top: 1px solid rgba(51, 65, 85, 0.5);
                  scroll-margin-top: 5rem;
                }

                @media (min-width: 768px) {
                  .blog-content h2 {
                    font-size: 30px;
                    margin-top: 1.5rem;
                    margin-bottom: 1.5rem;
                    padding-top: 1.5rem;
                    scroll-margin-top: 7rem;
                  }
                }

                .blog-content h2:first-child {
                  margin-top: 0;
                  padding-top: 0;
                  border-top: none;
                }

                .blog-content h3 {
                  font-size: 18px;
                  font-weight: 700;
                  color: #f1f5f9;
                  margin-top: 0.75rem;
                  margin-bottom: 0.75rem;
                  line-height: 1.35;
                  scroll-margin-top: 7rem;
                }

                .blog-content h4 {
                  font-size: 1.25rem;
                  font-weight: 600;
                  color: #e2e8f0;
                  margin-top: 2.5rem;
                  margin-bottom: 1rem;
                  scroll-margin-top: 7rem;
                  line-height: 1.4;
                }

                /* Paragraphs - Generous spacing */
                .blog-content p {
                  margin-bottom: 0.75rem;
                  line-height: 1.8;
                }

                @media (min-width: 768px) {
                  .blog-content p {
                    margin-bottom: 1.5rem;
                  }
                }

                /* First paragraph after heading - no extra top margin */
                .blog-content h2 + p,
                .blog-content h3 + p,
                .blog-content h4 + p {
                  margin-top: 0;
                }

                /* Lists - Clean, scannable */
                .blog-content ul,
                .blog-content ol {
                  margin: 2rem 0;
                  padding-left: 0;
                }

                .blog-content li {
                  font-size: 14px;
                  margin-bottom: 0.375rem;
                  padding-left: 2rem;
                  position: relative;
                  line-height: 1.8;
                }

                .blog-content ul li::before {
                  content: "";
                  position: absolute;
                  left: 0;
                  top: 0.85rem;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  background: linear-gradient(135deg, #06b6d4, #2563eb);
                }

                .blog-content ol {
                  counter-reset: item;
                }

                .blog-content ol li::before {
                  content: counter(item);
                  counter-increment: item;
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 1.5rem;
                  height: 1.5rem;
                  background: linear-gradient(135deg, #06b6d4, #2563eb);
                  color: white;
                  font-size: 0.75rem;
                  font-weight: 700;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }

                @media (min-width: 768px) {
                  .blog-content li {
                    font-size: 1.125rem;
                  }
                }

                /* Emphasis */
                .blog-content strong,
                .blog-content b {
                  color: #ffffff;
                  font-weight: 700;
                }

                .blog-content em,
                .blog-content i {
                  color: #cbd5e1;
                }

                /* Links */
                .blog-content a {
                  color: #06b6d4;
                  text-decoration: none;
                  background-image: linear-gradient(transparent 90%, rgba(6, 182, 212, 0.3) 90%);
                  transition: all 0.2s;
                }

                .blog-content a:hover {
                  background-image: linear-gradient(transparent 0%, rgba(6, 182, 212, 0.15) 0%);
                }

                /* Blockquotes - Prominent */
                .blog-content blockquote {
                  margin: 3rem 0;
                  padding: 2rem 2.5rem;
                  background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(6, 182, 212, 0.05));
                  border-left: 4px solid #2563eb;
                  border-radius: 0 1rem 1rem 0;
                  font-size: 1.35rem;
                  font-style: italic;
                  color: #e2e8f0;
                  line-height: 1.7;
                }

                .blog-content blockquote p {
                  margin-bottom: 0;
                }

                /* Code */
                .blog-content code {
                  background: #1e293b;
                  padding: 0.25em 0.5em;
                  border-radius: 6px;
                  font-size: 0.9em;
                  color: #f8fafc;
                  font-family: 'JetBrains Mono', 'Fira Code', monospace;
                }

                .blog-content pre {
                  background: #0f172a;
                  padding: 1.75rem;
                  border-radius: 1rem;
                  overflow-x: auto;
                  margin: 2.5rem 0;
                  border: 1px solid #1e293b;
                }

                .blog-content pre code {
                  background: none;
                  padding: 0;
                  font-size: 0.95rem;
                  line-height: 1.7;
                }

                /* Tables */
                .blog-content table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 2.5rem 0;
                  background: rgba(15, 23, 42, 0.5);
                  border: 1px solid #1e293b;
                  border-radius: 1rem;
                  overflow: hidden;
                }

                .blog-content thead {
                  background: rgba(30, 41, 59, 0.8);
                }

                .blog-content th {
                  padding: 1.25rem 1.5rem;
                  text-align: left;
                  font-size: 0.875rem;
                  font-weight: 700;
                  color: #06b6d4;
                  text-transform: uppercase;
                  letter-spacing: 0.05em;
                }

                .blog-content td {
                  padding: 1.25rem 1.5rem;
                  border-top: 1px solid #1e293b;
                  font-size: 1.1rem;
                }

                .blog-content tbody tr:hover {
                  background: rgba(30, 41, 59, 0.4);
                }

                /* Images */
                .blog-content img {
                  max-width: 100%;
                  height: auto;
                  border-radius: 1rem;
                  margin: 2.5rem 0;
                  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }

                /* Horizontal rule */
                .blog-content hr {
                  border: none;
                  height: 1px;
                  background: linear-gradient(to right, transparent, #334155, transparent);
                  margin: 4rem 0;
                }

                /* Drop cap for first paragraph (optional) */
                .blog-content > p:first-of-type::first-letter {
                  float: left;
                  font-size: 4.5rem;
                  line-height: 0.8;
                  font-weight: 800;
                  margin-right: 0.75rem;
                  margin-top: 0.15rem;
                  color: #06b6d4;
                }
                ` }} />
                    <div dangerouslySetInnerHTML={{ __html: displayPost.content as unknown as string }} />
                  </>
                )}
              </article>

              {/* FAQs Section */}
              {displayPost.faqs && displayPost.faqs.length > 0 && (
                <section className="mt-20 pt-12 border-t border-slate-800" aria-labelledby="faq-title">
                  <h2 id="faq-title" className="text-[19px] md:text-3xl font-bold text-white tracking-tight mb-8">
                    {detailLabels?.faqTitle || t('blog.detail.faqTitle')}
                  </h2>
                  <div className="space-y-4">
                    {displayPost.faqs.map((faq, i) => (
                      <details key={i} className="group border border-slate-700/50 rounded-xl bg-slate-900/30 transition-all hover:border-slate-600">
                        <summary className="flex items-center justify-between p-6 text-white font-semibold cursor-pointer list-none text-[18px] md:text-lg">
                          <span className="pr-6">{faq.question}</span>
                          <Plus size={20} className="text-brand-cyan flex-shrink-0 group-open:rotate-45 transition-transform" />
                        </summary>
                        <div className="px-6 pb-6 text-slate-400 text-[14px] md:text-lg leading-relaxed border-t border-slate-700/30 pt-4">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* Author Section */}
              {displayPost.author && (
                <div className="mt-20 pt-12 border-t border-slate-800">
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl p-10 flex flex-col sm:flex-row gap-8 items-center sm:items-start text-center sm:text-left border border-slate-700/30">
                    {displayPost.author.image ? (
                      <img
                        src={displayPost.author.image}
                        alt={displayPost.author.name}
                        className="w-24 h-24 rounded-2xl object-cover border-2 border-brand-cyan flex-shrink-0"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
                        {displayPost.author.name[0]}
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm text-brand-cyan uppercase tracking-wider font-semibold mb-2">
                        {detailLabels?.authorLabel || t('blog.detail.authorLabel')}
                      </p>
                      <h4 className="text-2xl font-bold text-white mb-4">{displayPost.author.name}</h4>
                      <p className="text-lg text-slate-400 leading-relaxed">
                        {displayPost.author.bio || t('blog.detail.authorBioFallback')}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Newsletter CTA - Inline */}
              <div className="mt-20 p-10 bg-gradient-to-br from-brand-blue/10 to-brand-cyan/10 rounded-3xl border border-brand-cyan/20 text-center">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {newsletterCta?.headline || t('blog.newsletter.headline')}
                </h3>
                <p className="text-lg text-slate-400 mb-8 max-w-md mx-auto">
                  {newsletterCta?.description || t('blog.newsletter.description')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder={newsletterCta?.placeholder || t('blog.newsletter.placeholder')}
                    className="flex-1 bg-brand-black border border-slate-700 rounded-xl px-5 py-4 text-white placeholder:text-slate-500 focus:border-brand-cyan outline-none transition-colors text-lg"
                  />
                  <Button variant="primary" size="lg">
                    {newsletterCta?.buttonText || t('blog.newsletter.buttonText')}
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Sticky Sidebar (hidden on mobile) */}
            <aside className="hidden lg:block w-[300px] flex-shrink-0 sticky top-24 self-start">
              <StickyTableOfContents
                sections={dynamicToc}
                sidebarCta={sidebarCta}
                tocTitle={detailLabels?.tocTitle}
                t={t}
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
              <Button variant="outline" onClick={() => navigate('/blog')} className="hidden sm:flex" icon={<ChevronRight size={16} />}>
                {relatedPostsSection?.viewAllText || t('blog.relatedPosts.viewAll')}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.filter(p => p.slug.current !== slug).slice(0, 3).map((relatedPost, i) => (
                <RelatedPostCard
                  key={i}
                  category={relatedPost.category}
                  title={relatedPost.title}
                  date={new Date(relatedPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  readTime={`${relatedPost.readTime} ${detailLabels?.minReadSuffix || t('blog.detail.minRead')}`}
                  image={relatedPost.featuredImage}
                  slug={relatedPost.slug.current}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer with CTA and Security sections */}
      <ChunkyFooter />
    </div>
  );
};

export default BlogPage;
