import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Calendar, Clock, Zap } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { ChunkyFooter } from '../components/footer/ChunkyFooter';
import { useBlogPosts, useBlogIndex, BlogCategory } from '../hooks/useBlog';
import { SectionBadge } from '../components/ui/SectionBadge';

const BlogCard: React.FC<{ post: any; minReadSuffix?: string }> = ({ post, minReadSuffix = 'min read' }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${post.slug.current}`)}
      className="group bg-brand-card border border-slate-700 rounded-2xl overflow-hidden hover:border-slate-500 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl h-full flex flex-col"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={post.featuredImage || 'https://picsum.photos/800/450'}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="font-mono text-[10px] uppercase font-bold bg-brand-blue px-2.5 py-1 rounded text-white">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-snug group-hover:text-brand-cyan transition-colors">
          {post.title}
        </h3>
        <p className="text-slate-400 mb-6 line-clamp-2 leading-relaxed text-sm flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-4 pt-4 border-t border-slate-800 font-mono text-[10px] uppercase text-slate-500 font-bold">
          {post.author?.name && (
            <span className="text-slate-400">
              {post.author.name}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock size={12} /> {post.readTime || 5} {minReadSuffix}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={12} /> {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>
    </div>
  );
};

const FeaturedBlogCard: React.FC<{ post: any; badgeText?: string; minReadSuffix?: string }> = ({
  post,
  badgeText = 'Featured',
  minReadSuffix = 'min read'
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${post.slug.current}`)}
      className="group bg-brand-card border border-slate-700 rounded-2xl overflow-hidden hover:border-slate-500 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl h-full"
    >
      <div className="grid md:grid-cols-2 h-full">
        <div className="relative h-64 md:h-full overflow-hidden">
          <img
            src={post.featuredImage || 'https://picsum.photos/800/600'}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className="font-mono text-[10px] uppercase font-bold bg-brand-blue px-2.5 py-1 rounded text-white">
              {badgeText}
            </span>
          </div>
        </div>
        <div className="p-8 flex flex-col justify-center">
          <span className="font-mono text-[10px] uppercase font-bold text-brand-cyan mb-3">
            {post.category}
          </span>
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-brand-cyan transition-colors">
            {post.title}
          </h3>
          <p className="text-slate-400 mb-6 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase text-slate-500 font-bold">
            {post.author?.name && (
              <span className="text-slate-400">
                By {post.author.name}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock size={12} /> {post.readTime || 5} {minReadSuffix}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} /> {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogListingPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  // Get language from i18n
  const language = i18n.language || 'en';
  const { data: allPosts, loading: postsLoading, error: postsError } = useBlogPosts(undefined, language);
  const { data: blogIndex, loading: indexLoading } = useBlogIndex(language);

  // Get categories from Sanity and always include "All" first
  const categories: BlogCategory[] = [
    { name: 'All', value: 'All' },
    ...(blogIndex?.categories || [
      { name: 'Sales', value: 'Sales' },
      { name: 'Product', value: 'Product' },
      { name: 'Automation', value: 'Automation' },
      { name: 'Best Practices', value: 'Best Practices' },
      { name: 'Case Studies', value: 'Case Studies' },
      { name: 'Security', value: 'Security' },
    ])
  ];

  const filteredPosts = React.useMemo(() => {
    if (!allPosts) return [];

    let filtered = allPosts;

    // Filter by category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(post => post.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [allPosts, activeCategory, searchQuery]);

  // Use featured posts from Sanity if available, otherwise use first post
  const featuredPost = React.useMemo(() => {
    if (blogIndex?.featuredSection?.featuredPosts && blogIndex.featuredSection.featuredPosts.length > 0) {
      return blogIndex.featuredSection.featuredPosts[0];
    }
    return allPosts?.[0] || null;
  }, [allPosts, blogIndex?.featuredSection?.featuredPosts]);

  const regularPosts = React.useMemo(() => {
    if (!filteredPosts) return [];
    // If showing all and no search, skip the featured post
    if (activeCategory === 'All' && !searchQuery && filteredPosts.length > 0 && featuredPost) {
      return filteredPosts.filter(post => post._id !== featuredPost._id);
    }
    return filteredPosts;
  }, [filteredPosts, activeCategory, searchQuery, featuredPost]);

  const loading = postsLoading || indexLoading;

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

  if (postsError) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center text-red-400">
          <p>{t('blog.error')}</p>
          <p className="text-sm mt-2">{postsError.message}</p>
        </div>
      </div>
    );
  }

  // Get content from Sanity with translation fallbacks
  const hero = blogIndex?.hero || {};
  const allArticlesSection = blogIndex?.allArticlesSection || {};
  const featuredSection = blogIndex?.featuredSection || {};
  const minReadSuffix = blogIndex?.detailLabels?.minReadSuffix || t('blog.detail.minRead');

  return (
    <div className="min-h-screen font-sans bg-brand-black text-slate-400 antialiased selection:bg-brand-blue selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/10 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-cyan/5 blur-[100px] rounded-full -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 text-center">
          <SectionBadge variant="cyan" className="mb-6">
            {hero.badge || t('blog.hero.badge')}
          </SectionBadge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            {hero.headline || t('blog.hero.headline')}{' '}
            <span className="text-brand-cyan">{hero.headlineHighlight || t('blog.hero.headlineHighlight')}</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed mb-10">
            {hero.description || t('blog.hero.description')}
          </p>

          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-4 flex items-center text-slate-500 group-focus-within:text-brand-cyan transition-colors">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder={hero.searchPlaceholder || t('blog.hero.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-surface border border-slate-700 focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-500 transition-all shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all border ${
                  activeCategory === cat.value
                  ? 'bg-brand-blue border-brand-blue text-white shadow-glow-blue'
                  : 'bg-transparent border-slate-800 text-slate-400 hover:border-slate-600 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && activeCategory === 'All' && !searchQuery && (
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <Zap className="text-brand-cyan" size={20} />
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {featuredSection.title || t('blog.featured.title')}
              </h2>
            </div>
            <FeaturedBlogCard
              post={featuredPost}
              badgeText={featuredSection.badgeText || t('blog.featured.badge')}
              minReadSuffix={minReadSuffix}
            />
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="bg-brand-surface py-20 border-t border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <SectionBadge variant="cyan" className="mb-4">
                {allArticlesSection.badge || t('blog.allArticles.badge')}
              </SectionBadge>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                {allArticlesSection.title || t('blog.allArticles.title')}
              </h2>
            </div>
            <p className="hidden md:block text-slate-500 font-mono text-xs font-bold uppercase tracking-widest">
              {filteredPosts.length} {filteredPosts.length === 1 ? t('blog.allArticles.articleSingular') : t('blog.allArticles.articlePlural')}
            </p>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400 text-lg mb-4">
                {allArticlesSection.emptyStateTitle || t('blog.allArticles.emptyTitle')}
              </p>
              <button
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="px-6 py-2 rounded-lg border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white transition-all"
              >
                {allArticlesSection.emptyStateButton || t('blog.allArticles.clearFilters')}
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <BlogCard key={post._id} post={post} minReadSuffix={minReadSuffix} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer with CTA and Security sections */}
      <ChunkyFooter />
    </div>
  );
};

export default BlogListingPage;
