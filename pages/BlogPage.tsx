import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Rocket
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { ChunkyFooter } from '../components/footer/ChunkyFooter';
import { useBlogPost, useBlogPosts, useBlogIndex, BlogIndexSidebarCta, BlogIndexNewsletterCta, BlogIndexDetailLabels, BlogIndexRelatedPostsSection } from '../hooks/useBlog';
import { Button } from '../components/ui/Button';
import { SectionBadge } from '../components/ui/SectionBadge';

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
}> = ({ sections, sidebarCta, tocTitle }) => {
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
            <h4 className="font-semibold text-white text-sm">{tocTitle || 'In This Article'}</h4>
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
            {sidebarCta?.badge || 'Free Trial'}
          </span>
        </div>
        <h4 className="text-white font-bold mb-2">
          {sidebarCta?.headline || 'Transform Your WhatsApp Sales'}
        </h4>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          {sidebarCta?.description || 'Join 1,000+ businesses using Eazybe to manage conversations.'}
        </p>
        <Button variant="primary" size="md" className="w-full">
          {sidebarCta?.buttonText || 'Start Free Trial'}
        </Button>
        <p className="text-[10px] text-center mt-3 font-mono text-slate-500 uppercase tracking-widest">
          {sidebarCta?.footnote || 'No credit card required'}
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
        <img src={image || 'https://picsum.photos/600/400'} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: post, loading, error } = useBlogPost(slug || '');
  const { data: relatedPosts } = useBlogPosts(4);
  const { data: blogIndex } = useBlogIndex('en');

  // Get content from Sanity with fallbacks
  const sidebarCta = blogIndex?.sidebarCta;
  const newsletterCta = blogIndex?.newsletterCta;
  const relatedPostsSection = blogIndex?.relatedPostsSection;
  const detailLabels = blogIndex?.detailLabels;

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center text-red-400">
          <p>Error loading blog post</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black font-sans text-slate-400 antialiased selection:bg-brand-blue selection:text-white">
      <ReadingProgress />
      <Navbar />

      {/* Hero Section - Centered, Clean */}
      <header className="pt-32 pb-12 relative overflow-x-clip">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-brand-blue/5 blur-[150px] rounded-full -z-10"></div>

        <div className="max-w-3xl mx-auto px-6">
          {/* Back link */}
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-10 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-xs uppercase tracking-widest">
              {detailLabels?.backToBlog || 'Back to Blog'}
            </span>
          </button>

          {/* Category Badge */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-sm font-medium">
              {post.category || 'Blog'}
            </span>
          </div>

          {/* Title - Large, Bold, Readable */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-8">
            {post.title}
          </h1>

          {/* Excerpt - Generous size */}
          <p className="text-xl md:text-2xl text-slate-400 leading-relaxed mb-10">
            {post.excerpt}
          </p>

          {/* Author & Meta - Clean horizontal layout */}
          <div className="flex flex-wrap items-center gap-6 py-8 border-y border-slate-800/50">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center text-white font-bold text-xl">
                {post.author?.name?.[0] || <User size={24} />}
              </div>
              <div>
                <p className="font-semibold text-white text-lg">{post.author?.name || 'Eazybe Editorial'}</p>
                <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {post.readTime} {detailLabels?.minReadSuffix || 'min read'}
                  </span>
                </div>
              </div>
            </div>

            {/* Share buttons */}
            <div className="flex items-center gap-1 ml-auto">
              <button className="p-3 rounded-xl hover:bg-slate-800 text-slate-500 hover:text-white transition-all" title="Share on Twitter">
                <Twitter size={18} />
              </button>
              <button className="p-3 rounded-xl hover:bg-slate-800 text-slate-500 hover:text-white transition-all" title="Share on LinkedIn">
                <Linkedin size={18} />
              </button>
              <button className="p-3 rounded-xl hover:bg-slate-800 text-slate-500 hover:text-white transition-all" title="Share via Email">
                <Mail size={18} />
              </button>
              <button className="p-3 rounded-xl hover:bg-slate-800 text-slate-500 hover:text-white transition-all" title="Copy Link">
                <LinkIcon size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image - Full width with max constraint */}
      {post.featuredImage && (
        <div className="max-w-5xl mx-auto px-6 mb-16">
          <div className="relative rounded-3xl overflow-hidden aspect-[2/1] shadow-2xl border border-slate-800/50">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Main Content Area - Two Column Layout */}
      <main className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-12 items-start">
            {/* Left Column - Main Content */}
            <div className="flex-1 max-w-3xl">
              {/* Summary Box - Prominent */}
              {post.quickAnswer && (
                <div className="bg-gradient-to-br from-brand-cyan/5 to-brand-blue/5 border border-brand-cyan/20 rounded-2xl p-8 mb-12">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center">
                      <Zap size={24} className="text-brand-cyan" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">
                        {detailLabels?.summaryTitle || 'Summary'}
                      </h4>
                      <p className="text-sm text-slate-500">
                        {detailLabels?.summarySubtitle || 'Quick takeaways from this article'}
                      </p>
                    </div>
                  </div>
                  <div
                    className="text-lg text-slate-300 leading-relaxed [&>p]:mb-3 [&>ul]:space-y-2 [&>ul>li]:flex [&>ul>li]:gap-2 [&>ul>li]:before:content-['→'] [&>ul>li]:before:text-brand-cyan"
                    dangerouslySetInnerHTML={{ __html: post.quickAnswer }}
                  />
                </div>
              )}

              {/* Main Article Content */}
              <article className="blog-content">
                <style dangerouslySetInnerHTML={{ __html: `
                .blog-content {
                  font-size: 1.25rem;
                  line-height: 1.9;
                  color: #d1d5db;
                  font-family: 'Inter', system-ui, -apple-system, sans-serif;
                }

                /* Headings - Clear hierarchy */
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
                }

                .blog-content h4 {
                  font-size: 1.25rem;
                  font-weight: 600;
                  color: #e2e8f0;
                  margin-top: 2.5rem;
                  margin-bottom: 1rem;
                  line-height: 1.4;
                }

                /* Paragraphs - Generous spacing */
                .blog-content p {
                  margin-bottom: 2rem;
                  line-height: 1.9;
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
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </article>

              {/* FAQs Section */}
              {post.faqs && post.faqs.length > 0 && (
                <div className="mt-20 pt-12 border-t border-slate-800">
                  <h2 className="text-3xl font-bold text-white tracking-tight mb-8">
                    {detailLabels?.faqTitle || 'Frequently Asked Questions'}
                  </h2>
                  <div className="space-y-4">
                    {post.faqs.map((faq, i) => (
                      <details key={i} className="group border border-slate-700/50 rounded-xl bg-slate-900/30 transition-all hover:border-slate-600">
                        <summary className="flex items-center justify-between p-6 text-white font-semibold cursor-pointer list-none text-lg">
                          <span className="pr-6">{faq.question}</span>
                          <Plus size={20} className="text-brand-cyan flex-shrink-0 group-open:rotate-45 transition-transform" />
                        </summary>
                        <div className="px-6 pb-6 text-slate-400 text-lg leading-relaxed border-t border-slate-700/30 pt-4">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Section */}
              {post.author && (
                <div className="mt-20 pt-12 border-t border-slate-800">
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl p-10 flex flex-col sm:flex-row gap-8 items-center sm:items-start text-center sm:text-left border border-slate-700/30">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
                      {post.author.name[0]}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-brand-cyan uppercase tracking-wider font-semibold mb-2">
                        {detailLabels?.authorLabel || 'Written by'}
                      </p>
                      <h4 className="text-2xl font-bold text-white mb-4">{post.author.name}</h4>
                      <p className="text-lg text-slate-400 leading-relaxed">
                        {post.author.bio || 'Helping businesses transform their WhatsApp communication into revenue.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Newsletter CTA - Inline */}
              <div className="mt-20 p-10 bg-gradient-to-br from-brand-blue/10 to-brand-cyan/10 rounded-3xl border border-brand-cyan/20 text-center">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {newsletterCta?.headline || 'Enjoyed this article?'}
                </h3>
                <p className="text-lg text-slate-400 mb-8 max-w-md mx-auto">
                  {newsletterCta?.description || 'Get weekly insights on WhatsApp sales, CRM tips, and business growth strategies.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder={newsletterCta?.placeholder || 'your@email.com'}
                    className="flex-1 bg-brand-black border border-slate-700 rounded-xl px-5 py-4 text-white placeholder:text-slate-500 focus:border-brand-cyan outline-none transition-colors text-lg"
                  />
                  <Button variant="primary" size="lg">
                    {newsletterCta?.buttonText || 'Subscribe'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Sticky Sidebar (hidden on mobile) */}
            <aside className="hidden lg:block w-[300px] flex-shrink-0 sticky top-24 self-start">
              <StickyTableOfContents
                sections={post.tableOfContents || []}
                sidebarCta={sidebarCta}
                tocTitle={detailLabels?.tocTitle}
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
                  {relatedPostsSection?.badge || 'Keep Reading'}
                </SectionBadge>
                <h2 className="text-3xl font-bold text-white">
                  {relatedPostsSection?.title || 'Related Articles'}
                </h2>
              </div>
              <Button variant="outline" onClick={() => navigate('/blog')} className="hidden sm:flex" icon={<ChevronRight size={16} />}>
                {relatedPostsSection?.viewAllText || 'View All'}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.filter(p => p.slug.current !== slug).slice(0, 3).map((relatedPost, i) => (
                <RelatedPostCard
                  key={i}
                  category={relatedPost.category}
                  title={relatedPost.title}
                  date={new Date(relatedPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  readTime={`${relatedPost.readTime} ${detailLabels?.minReadSuffix || 'min'}`}
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
