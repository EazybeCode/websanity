import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  ArrowLeft,
  User,
  BookOpen,
  Share2,
  Bookmark,
  Eye,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { Navbar } from '../components/Navbar';
import { ChunkyFooter } from '../components/footer/ChunkyFooter';
import { useBlogPost, useBlogPosts, useBlogIndex, PortableTextBlock } from '../hooks/useBlog';
import { Button } from '../components/ui/Button';
import { SectionBadge } from '../components/ui/SectionBadge';
import { motion, AnimatePresence } from 'framer-motion';

// Generate URL-friendly slug
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Extract text from Portable Text block
const extractTextFromBlock = (block: PortableTextBlock): string => {
  if (!block.children) return '';
  return block.children
    .filter((child: any) => child._type === 'span')
    .map((child: any) => child.text || '')
    .join('');
};

// Extract headings for TOC
const extractHeadingsFromContent = (content: PortableTextBlock[]): Array<{ label: string; id: string; level: number }> => {
  if (!Array.isArray(content)) return [];

  return content
    .filter((block) => block._type === 'block' && ['h1', 'h2', 'h3', 'h4'].includes(block.style || ''))
    .map((block) => {
      const text = extractTextFromBlock(block);
      const level = block.style === 'h1' ? 1 : block.style === 'h2' ? 2 : block.style === 'h3' ? 3 : 4;
      return {
        label: text,
        id: generateSlug(text),
        level,
      };
    })
    .filter((item) => item.label.length > 0);
};

// Enhanced Reading Progress Bar with Chapter Indicators
const ReadingProgress: React.FC<{ sections: Array<{ id: string }> }> = ({ sections }) => {
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(progress, 100));

      // Determine active chapter
      const chapterIndex = sections.findIndex((_, index) => {
        const element = document.getElementById(sections[index]?.id || '');
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top > 100 && rect.top < 500;
      });
      if (chapterIndex !== -1) setActiveChapter(chapterIndex);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, [sections]);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-slate-800 z-50">
      <div
        className="h-full bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple transition-all duration-150 relative"
        style={{ width: `${progress}%` }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg shadow-brand-cyan/50" />
      </div>
    </div>
  );
};

// Enhanced TOC with Progress Indicators
const StickyTableOfContents: React.FC<{
  sections: Array<{ label: string; id: string; level: number }>;
  tocTitle?: string;
  t: (key: string) => string;
}> = ({ sections, tocTitle, t }) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!sections || sections.length === 0) return;

    const handleScroll = () => {
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
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  if (!sections || sections.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* TOC Card */}
      <div className="bg-brand-card border border-slate-700/50 rounded-2xl p-5 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-brand-cyan" />
            <h4 className="font-semibold text-white text-sm">{tocTitle || t('blog.detail.tocTitle')}</h4>
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronRight size={16} className="rotate-90" />}
          </button>
        </div>

        {/* TOC Items */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ol className="space-y-1">
                {sections.map((item, i) => {
                  const isActive = activeSection === item.id;
                  const paddingLeft = item.level > 2 ? 'pl-6' : '';

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
                        className={`flex items-start gap-3 py-2.5 px-3 rounded-lg transition-all text-sm leading-relaxed ${paddingLeft} ${
                          isActive
                            ? 'bg-gradient-to-r from-brand-cyan/10 to-transparent text-brand-cyan border-l-2 border-brand-cyan'
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
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-brand-cyan/10 to-brand-blue/10 border border-brand-cyan/20 rounded-2xl p-5 shadow-xl">
        <h4 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
          <Share2 size={14} className="text-brand-cyan" />
          Share Article
        </h4>
        <div className="grid grid-cols-4 gap-2">
          <button className="p-3 rounded-xl bg-brand-card border border-slate-700 hover:border-brand-cyan/50 hover:bg-brand-cyan/10 transition-all text-slate-400 hover:text-brand-cyan">
            <Twitter size={16} />
          </button>
          <button className="p-3 rounded-xl bg-brand-card border border-slate-700 hover:border-brand-cyan/50 hover:bg-brand-cyan/10 transition-all text-slate-400 hover:text-brand-cyan">
            <Linkedin size={16} />
          </button>
          <button className="p-3 rounded-xl bg-brand-card border border-slate-700 hover:border-brand-cyan/50 hover:bg-brand-cyan/10 transition-all text-slate-400 hover:text-brand-cyan">
            <Mail size={16} />
          </button>
          <button className="p-3 rounded-xl bg-brand-card border border-slate-700 hover:border-brand-cyan/50 hover:bg-brand-cyan/10 transition-all text-slate-400 hover:text-brand-cyan">
            <LinkIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced Related Post Card
const RelatedPostCard: React.FC<{
  category: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
  index: number;
}> = ({ category, title, date, readTime, image, slug, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={() => navigate(`/blog/${slug}`)}
      className="group bg-brand-card border border-slate-700/50 rounded-2xl overflow-hidden shadow-xl hover:border-brand-cyan/50 transition-all cursor-pointer h-full flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent z-10" />
        <img
          src={image || 'https://picsum.photos/600/400'}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="font-mono text-[10px] uppercase font-bold bg-brand-blue/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-white">
            {category}
          </span>
        </div>
        {/* Read Time */}
        <div className="absolute bottom-4 right-4 z-20">
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold bg-brand-black/80 backdrop-blur-sm px-2 py-1 rounded-lg text-white">
            <Clock size={10} className="text-brand-cyan" />
            {readTime}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 leading-snug group-hover:text-brand-cyan transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-700/50 font-mono text-[10px] uppercase text-slate-500 font-bold">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {date}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Main Blog Page
const BlogPageRedesigned: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const language = i18n.language || 'en';
  const { data: post, loading, error } = useBlogPost(slug || '', language);
  const { data: relatedPosts } = useBlogPosts(4, language);
  const { data: blogIndex } = useBlogIndex(language);

  const sidebarCta = blogIndex?.sidebarCta;
  const newsletterCta = blogIndex?.newsletterCta;
  const relatedPostsSection = blogIndex?.relatedPostsSection;
  const detailLabels = blogIndex?.detailLabels;

  const dynamicToc = useMemo(() => {
    if (!post?.content || !Array.isArray(post.content)) return [];
    return extractHeadingsFromContent(post.content);
  }, [post?.content]);

  const portableTextComponents = useMemo(() => {
    if (!post?.content || !Array.isArray(post.content)) return createPortableTextComponents([]);
    return createPortableTextComponents(post.content);
  }, [post?.content]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-slate-800"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-brand-cyan animate-spin"></div>
            <Sparkles size={20} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-cyan" />
          </div>
          <p className="text-slate-400 font-medium">{t('blog.loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center text-red-400">
          <p>{t('blog.errorPost')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black font-sans text-slate-400 antialiased selection:bg-brand-cyan selection:text-white">
      <ReadingProgress sections={dynamicToc} />
      <Navbar />

      {/* Breadcrumb Navigation */}
      <nav className="border-b border-slate-800/50 bg-brand-black/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 py-4 text-sm">
            <button
              onClick={() => navigate('/blog')}
              className="flex items-center gap-2 text-slate-500 hover:text-brand-cyan transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="font-medium">Back to Blog</span>
            </button>
            <span className="text-slate-700">/</span>
            <span className="text-brand-cyan font-medium truncate max-w-[200px]">{post.title}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section - Enhanced */}
      <header className="pt-16 pb-12 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-brand-cyan/10 blur-[150px] rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-blue/10 blur-[120px] rounded-full -z-10" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-cyan/10 to-brand-blue/10 border border-brand-cyan/20 text-brand-cyan text-sm font-semibold">
              <Sparkles size={14} />
              {post.category || 'Blog'}
            </span>
          </motion.div>

          {/* Title - Large & Bold */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-8"
          >
            {post.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-400 leading-relaxed mb-10 max-w-3xl"
          >
            {post.excerpt}
          </motion.p>

          {/* Author & Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-6 p-6 bg-brand-card/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl"
          >
            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-brand-cyan/20">
                {post.author?.name?.[0] || <User size={28} />}
              </div>
              <div>
                <p className="font-semibold text-white text-lg">{post.author?.name || t('blog.detail.authorFallback')}</p>
                <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-brand-cyan" />
                    {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-brand-cyan" />
                    {post.readTime} {detailLabels?.minReadSuffix || t('blog.detail.minRead')}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 ml-auto">
              <button className="p-3 rounded-xl hover:bg-slate-800 text-slate-500 hover:text-white transition-all" title="Bookmark">
                <Bookmark size={18} />
              </button>
              <button className="p-3 rounded-xl hover:bg-slate-800 text-slate-500 hover:text-white transition-all" title="Share">
                <Share2 size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Featured Image */}
      {post.featuredImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto px-6 mb-16"
        >
          <div className="relative rounded-3xl overflow-hidden aspect-[2/1] shadow-2xl border border-slate-800/50">
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/20 to-transparent" />
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      )}

      {/* Main Content Area */}
      <main className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-12 items-start">
            {/* Left Column - Main Content */}
            <div className="flex-1 max-w-3xl">
              {/* Summary Box */}
              {post.quickAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-brand-cyan/5 via-brand-blue/5 to-brand-purple/5 border border-brand-cyan/20 rounded-2xl p-8 mb-12 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/10 blur-[60px] rounded-full" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-blue/10 blur-[50px] rounded-full" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-blue/20 flex items-center justify-center border border-brand-cyan/30">
                        <Zap size={24} className="text-brand-cyan" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg">
                          {detailLabels?.summaryTitle || t('blog.detail.summaryTitle')}
                        </h4>
                        <p className="text-sm text-slate-500">
                          {detailLabels?.summarySubtitle || t('blog.detail.summarySubtitle')}
                        </p>
                      </div>
                    </div>
                    <div
                      className="text-lg text-slate-300 leading-relaxed [&>p]:mb-3 [&>ul]:space-y-2 [&>ul>li]:flex [&>ul>li]:gap-2 [&>ul>li]:before:content-['→'] [&>ul>li]:before:text-brand-cyan"
                      dangerouslySetInnerHTML={{ __html: post.quickAnswer }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Main Article Content */}
              <article className="blog-content prose prose-invert max-w-none">
                {Array.isArray(post.content) ? (
                  <PortableText value={post.content} components={portableTextComponents} />
                ) : (
                  <>
                    <style dangerouslySetInnerHTML={{ __html: `
                      .blog-content {
                        font-size: 1.125rem;
                        line-height: 1.9;
                        color: #d1d5db;
                        font-family: 'Inter', system-ui, -apple-system, sans-serif;
                      }
                      .blog-content h2 {
                        font-size: 2rem;
                        font-weight: 800;
                        color: #ffffff;
                        margin-top: 4rem;
                        margin-bottom: 1.5rem;
                        line-height: 1.25;
                        letter-spacing: -0.025em;
                        padding-top: 2rem;
                        border-top: 1px solid rgba(51, 65, 85, 0.5);
                        scroll-margin-top: 7rem;
                      }
                      .blog-content h2:first-child {
                        margin-top: 0;
                        padding-top: 0;
                        border-top: none;
                      }
                      .blog-content h3 {
                        font-size: 1.5rem;
                        font-weight: 700;
                        color: #f1f5f9;
                        margin-top: 3rem;
                        margin-bottom: 1.25rem;
                        line-height: 1.35;
                        scroll-margin-top: 7rem;
                      }
                      .blog-content p {
                        margin-bottom: 1.75rem;
                      }
                      .blog-content ul, .blog-content ol {
                        margin: 2rem 0;
                        padding-left: 0;
                      }
                      .blog-content li {
                        margin-bottom: 1rem;
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
                      .blog-content strong { color: #ffffff; font-weight: 700; }
                      .blog-content a { color: #06b6d4; text-decoration: none; }
                      .blog-content a:hover { text-decoration: underline; }
                      .blog-content blockquote {
                        margin: 3rem 0;
                        padding: 2rem 2.5rem;
                        background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(6, 182, 212, 0.05));
                        border-left: 4px solid #2563eb;
                        border-radius: 0 1rem 1rem 0;
                        font-size: 1.35rem;
                        font-style: italic;
                        color: #e2e8f0;
                      }
                    ` }} />
                    <div dangerouslySetInnerHTML={{ __html: post.content as unknown as string }} />
                  </>
                )}
              </article>

              {/* FAQ Section */}
              {post.faqs && post.faqs.length > 0 && (
                <div className="mt-20 pt-12 border-t border-slate-800/50">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-blue/20 flex items-center justify-center border border-brand-cyan/30">
                      <Sparkles size={20} className="text-brand-cyan" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                      {detailLabels?.faqTitle || t('blog.detail.faqTitle')}
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {post.faqs.map((faq, i) => (
                      <details
                        key={i}
                        className="group bg-brand-card/50 border border-slate-700/50 rounded-2xl transition-all hover:border-slate-600 overflow-hidden"
                      >
                        <summary className="flex items-center justify-between p-6 text-white font-semibold cursor-pointer list-none text-lg hover:bg-slate-800/30 transition-colors">
                          <span className="pr-6">{faq.question}</span>
                          <Plus size={20} className="text-brand-cyan flex-shrink-0 group-open:rotate-45 transition-transform" />
                        </summary>
                        <div className="px-6 pb-6 text-slate-400 text-lg leading-relaxed border-t border-slate-700/30 pt-4 bg-slate-900/20">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Section - Enhanced */}
              {post.author && (
                <div className="mt-20 pt-12 border-t border-slate-800/50">
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl p-10 border border-slate-700/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 blur-[100px] rounded-full" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-blue/10 blur-[80px] rounded-full" />

                    <div className="relative z-10 flex flex-col sm:flex-row gap-8 items-center sm:items-start text-center sm:text-left">
                      <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center text-white font-bold text-4xl flex-shrink-0 shadow-xl shadow-brand-cyan/20">
                        {post.author.name[0]}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-brand-cyan uppercase tracking-wider font-semibold mb-2 flex items-center justify-center sm:justify-start gap-2">
                          <User size={14} />
                          {detailLabels?.authorLabel || t('blog.detail.authorLabel')}
                        </p>
                        <h4 className="text-2xl font-bold text-white mb-4">{post.author.name}</h4>
                        <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
                          {post.author.bio || t('blog.detail.authorBioFallback')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Newsletter CTA - Enhanced */}
              <div className="mt-20 p-10 bg-gradient-to-br from-brand-blue/10 via-brand-cyan/10 to-brand-purple/10 rounded-3xl border border-brand-cyan/20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-brand-cyan/20 blur-[150px] rounded-full" />

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-cyan/20 to-brand-blue/20 border border-brand-cyan/30 mb-6">
                    <Mail size={32} className="text-brand-cyan" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {newsletterCta?.headline || t('blog.newsletter.headline')}
                  </h3>
                  <p className="text-lg text-slate-400 mb-8 max-w-md mx-auto">
                    {newsletterCta?.description || t('blog.newsletter.description')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder={newsletterCta?.placeholder || t('blog.newsletter.placeholder')}
                      className="flex-1 bg-brand-black/50 border border-slate-700 focus:border-brand-cyan outline-none rounded-xl px-5 py-4 text-white placeholder:text-slate-500 transition-colors text-base"
                    />
                    <button className="bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-semibold px-6 py-4 rounded-xl hover:shadow-lg hover:shadow-brand-cyan/20 transition-all whitespace-nowrap">
                      {newsletterCta?.buttonText || t('blog.newsletter.buttonText')}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-4 font-mono uppercase tracking-wider">
                    No spam. Unsubscribe anytime.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Sticky Sidebar */}
            <aside className="hidden lg:block w-[320px] flex-shrink-0 sticky top-24 self-start">
              <StickyTableOfContents
                sections={dynamicToc}
                tocTitle={detailLabels?.tocTitle}
                t={t}
              />
            </aside>
          </div>
        </div>
      </main>

      {/* Related Posts - Enhanced */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-20 bg-brand-surface border-t border-slate-800/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex items-center justify-between mb-12">
              <div>
                <SectionBadge variant="cyan" className="mb-4">
                  {relatedPostsSection?.badge || t('blog.relatedPosts.badge')}
                </SectionBadge>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  {relatedPostsSection?.title || t('blog.relatedPosts.title')}
                </h2>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate('/blog')}
                className="hidden sm:flex"
                icon={<ChevronRight size={16} />}
              >
                {relatedPostsSection?.viewAllText || t('blog.relatedPosts.viewAll')}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts
                .filter(p => p.slug.current !== slug)
                .slice(0, 3)
                .map((relatedPost, i) => (
                  <RelatedPostCard
                    key={i}
                    category={relatedPost.category}
                    title={relatedPost.title}
                    date={new Date(relatedPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    readTime={`${relatedPost.readTime} ${detailLabels?.minReadSuffix || t('blog.detail.minRead')}`}
                    image={relatedPost.featuredImage}
                    slug={relatedPost.slug.current}
                    index={i}
                  />
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <ChunkyFooter />
    </div>
  );
};

// Helper function for PortableText components
const createPortableTextComponents = (content: PortableTextBlock[]): PortableTextComponents => {
  const headingIds = new Map<string, string>();
  if (Array.isArray(content)) {
    content
      .filter((block) => block._type === 'block' && ['h1', 'h2', 'h3', 'h4'].includes(block.style || ''))
      .forEach((block) => {
        const text = block.children?.map((c: any) => c.text).join('') || '';
        headingIds.set(block._key, text.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
      });
  }

  return {
    block: {
      h1: ({ children }) => <h1 className="text-4xl font-extrabold text-white mt-16 mb-6 first:mt-0 scroll-mt-28">{children}</h1>,
      h2: ({ children }) => <h2 className="text-3xl font-bold text-white mt-12 mb-4 pt-8 border-t border-slate-800/50 first:border-t-0 first:pt-0 first:mt-0 scroll-mt-28">{children}</h2>,
      h3: ({ children }) => <h3 className="text-2xl font-semibold text-slate-100 mt-10 mb-4 scroll-mt-28">{children}</h3>,
      h4: ({ children }) => <h4 className="text-xl font-semibold text-slate-200 mt-8 mb-3 scroll-mt-28">{children}</h4>,
      normal: ({ children }) => <p className="text-lg text-slate-300 leading-relaxed mb-6">{children}</p>,
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-brand-cyan pl-6 my-8 italic text-slate-400 text-xl">
          {children}
        </blockquote>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
      link: ({ children, value }) => (
        <a href={value?.href} className="text-brand-cyan hover:text-brand-blue underline underline-offset-4 transition-colors" target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
    },
  };
};

export default BlogPageRedesigned;
