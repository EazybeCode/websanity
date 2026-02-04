import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Search,
  Calendar,
  Clock,
  Zap,
  TrendingUp,
  BookOpen,
  ArrowRight,
  Filter,
  Sparkles,
  ChevronDown,
  Grid3x3,
  List,
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { ChunkyFooter } from '../components/footer/ChunkyFooter';
import { useBlogPosts, useBlogIndex, BlogCategory } from '../hooks/useBlog';
import { SectionBadge } from '../components/ui/SectionBadge';
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced Blog Card with Modern Design
const BlogCard: React.FC<{
  post: any;
  index: number;
  minReadSuffix?: string;
}> = ({ post, index, minReadSuffix = 'min read' }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => navigate(`/blog/${post.slug.current}`)}
      className="group relative bg-brand-card border border-slate-700/50 rounded-3xl overflow-hidden cursor-pointer h-full flex flex-col shadow-xl hover:shadow-2xl hover:border-brand-cyan/50 transition-all duration-500"
    >
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 via-brand-blue/0 to-brand-purple/0 group-hover:from-brand-cyan/5 group-hover:via-brand-blue/5 group-hover:to-brand-purple/5 transition-all duration-500 pointer-events-none" />

      {/* Image Container with Parallax Effect */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent z-10" />
        <img
          src={post.featuredImage || 'https://picsum.photos/800/600'}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Category Badge - Floating */}
        <div className="absolute top-4 left-4 z-20">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase font-bold bg-brand-blue/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white border border-brand-blue/50 shadow-lg">
            <Sparkles size={10} className="text-brand-cyan" />
            {post.category}
          </span>
        </div>
        {/* Read Time Badge - Floating */}
        <div className="absolute bottom-4 right-4 z-20">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold bg-brand-black/80 backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-white border border-slate-700/50">
            <Clock size={10} className="text-brand-cyan" />
            {post.readTime || 5} {minReadSuffix}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col relative z-10">
        {/* Title with Line Clamp */}
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-snug group-hover:text-brand-cyan transition-colors duration-300">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-slate-400 mb-4 line-clamp-3 leading-relaxed text-sm flex-1">
          {post.excerpt}
        </p>

        {/* Meta Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          {/* Author */}
          {post.author?.name && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center text-white font-bold text-xs">
                {post.author.name[0]}
              </div>
              <span className="text-xs text-slate-400 font-medium">{post.author.name}</span>
            </div>
          )}

          {/* Date */}
          <span className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono uppercase font-bold">
            <Calendar size={10} />
            {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>

        {/* Read More Arrow - Animated */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2">
          <div className="w-10 h-10 rounded-full bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/20">
            <ArrowRight size={16} className="text-brand-cyan" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Featured Article Card - Hero Style
const FeaturedHeroCard: React.FC<{
  post: any;
  badgeText?: string;
  minReadSuffix?: string;
}> = ({ post, badgeText = 'Featured', minReadSuffix = 'min read' }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      onClick={() => navigate(`/blog/${post.slug.current}`)}
      className="group relative bg-gradient-to-br from-brand-card to-brand-surface border border-brand-cyan/30 rounded-3xl overflow-hidden cursor-pointer shadow-2xl hover:shadow-brand-cyan/20 hover:border-brand-cyan/50 transition-all duration-500"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-cyan/10 blur-[100px] rounded-full -z-10 group-hover:bg-brand-cyan/15 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-blue/10 blur-[80px] rounded-full -z-10 group-hover:bg-brand-blue/15 transition-all duration-500" />

      <div className="grid lg:grid-cols-2 gap-0">
        {/* Image Side */}
        <div className="relative h-80 lg:h-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black/60 to-transparent z-10 lg:bg-gradient-to-t lg:from-brand-black/80" />
          <img
            src={post.featuredImage || 'https://picsum.photos/800/800'}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Floating Badges */}
          <div className="absolute top-6 left-6 z-20 flex flex-col gap-3">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase font-bold bg-brand-cyan text-brand-black px-4 py-2 rounded-lg shadow-glow-cyan">
              <Zap size={14} />
              {badgeText}
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase font-bold bg-brand-blue/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content Side */}
        <div className="p-8 lg:p-12 flex flex-col justify-center relative z-10">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-brand-cyan" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-brand-cyan font-bold">
                Editor's Pick
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-6 group-hover:text-brand-cyan transition-colors">
              {post.title}
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed line-clamp-3 mb-8">
              {post.excerpt}
            </p>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8">
            {post.author?.name && (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {post.author.name[0]}
                </div>
                <div>
                  <p className="text-white font-semibold">{post.author.name}</p>
                  <p className="text-slate-500 text-xs font-mono uppercase">Author</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-1 text-slate-400 font-mono text-xs uppercase">
              <Clock size={14} className="text-brand-cyan" />
              <span>{post.readTime || 5} {minReadSuffix}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400 font-mono text-xs uppercase">
              <Calendar size={14} className="text-brand-cyan" />
              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-3 text-brand-cyan font-semibold group">
            <span className="font-mono text-sm uppercase tracking-wider">Read Article</span>
            <ArrowRight size={20} className="transform group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Newsletter Section
const NewsletterSection: React.FC<{ t: (key: string) => string }> = ({ t }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 via-brand-cyan/5 to-brand-purple/10" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-cyan/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-blue/10 blur-[120px] rounded-full" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="bg-brand-card/50 backdrop-blur-xl border border-brand-cyan/20 rounded-3xl p-12 text-center shadow-2xl">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-cyan/20 to-brand-blue/20 border border-brand-cyan/30 mb-6">
            <BookOpen size={32} className="text-brand-cyan" />
          </div>

          {/* Content */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
            Get the latest insights, tips, and trends delivered straight to your inbox. Join 10,000+ readers.
          </p>

          {/* Form */}
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-green-400 font-medium"
            >
              <Sparkles size={20} className="inline mr-2" />
              Thanks for subscribing!
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 bg-brand-black/50 border border-slate-700 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 rounded-xl px-5 py-4 text-white placeholder:text-slate-500 transition-all outline-none"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-semibold px-6 py-4 rounded-xl hover:shadow-lg hover:shadow-brand-cyan/20 transition-all duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}

          {/* Trust Badge */}
          <p className="text-slate-500 text-xs mt-6 font-mono uppercase tracking-wider">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

// Main Blog Listing Page
const BlogListingPageRedesigned: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const language = i18n.language || 'en';
  const { data: allPosts, loading: postsLoading, error: postsError } = useBlogPosts(undefined, language);
  const { data: blogIndex, loading: indexLoading } = useBlogIndex(language);

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

  const filteredPosts = useMemo(() => {
    if (!allPosts) return [];

    let filtered = allPosts;

    if (activeCategory !== 'All') {
      filtered = filtered.filter(post => post.category === activeCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [allPosts, activeCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    if (blogIndex?.featuredSection?.featuredPosts && blogIndex.featuredSection.featuredPosts.length > 0) {
      return blogIndex.featuredSection.featuredPosts[0];
    }
    return allPosts?.[0] || null;
  }, [allPosts, blogIndex?.featuredSection?.featuredPosts]);

  const regularPosts = useMemo(() => {
    if (!filteredPosts) return [];
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

  const hero = blogIndex?.hero || {};
  const allArticlesSection = blogIndex?.allArticlesSection || {};
  const featuredSection = blogIndex?.featuredSection || {};
  const minReadSuffix = blogIndex?.detailLabels?.minReadSuffix || t('blog.detail.minRead');

  return (
    <div className="min-h-screen font-sans bg-brand-black text-slate-400 antialiased selection:bg-brand-cyan selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section - Enhanced */}
      <section className="relative pt-32 pb-20">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-cyan/10 blur-[150px] rounded-full -z-10 animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-blue/10 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SectionBadge variant="cyan" className="text-sm">
                {hero.badge || t('blog.hero.badge')}
              </SectionBadge>
            </motion.div>
          </div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 text-center"
          >
            {hero.headline || t('blog.hero.headline')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple bg-300% animate-gradient bg-[length:200%_auto]">
              {hero.headlineHighlight || t('blog.hero.headlineHighlight')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-xl text-slate-400 leading-relaxed mb-12 text-center"
          >
            {hero.description || t('blog.hero.description')}
          </motion.p>

          {/* Search Bar - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto relative group"
          >
            <div className="absolute inset-y-0 left-5 flex items-center text-slate-500 group-focus-within:text-brand-cyan transition-colors z-10">
              <Search size={22} />
            </div>
            <input
              type="text"
              placeholder={hero.searchPlaceholder || t('blog.hero.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-card border border-slate-700 focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 rounded-2xl py-5 pl-14 pr-6 text-white placeholder:text-slate-500 transition-all shadow-xl text-lg"
            />
            {/* Active Filter Indicator */}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-5 flex items-center text-slate-400 hover:text-white transition-colors"
              >
                <span className="text-xs font-mono uppercase">Clear</span>
              </button>
            )}
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center gap-8 mt-12"
          >
            <div className="flex items-center gap-2 text-slate-500 font-mono text-xs uppercase">
              <TrendingUp size={14} className="text-brand-cyan" />
              <span>{allPosts?.length || 0} Articles</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-mono text-xs uppercase">
              <Sparkles size={14} className="text-brand-cyan" />
              <span>{categories.length - 1} Categories</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section - Enhanced */}
      <section className="pb-8 sticky top-0 z-40 bg-brand-black/95 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <Filter size={18} />
              <span className="text-sm font-medium">Filters</span>
            </button>

            {/* Filter Pills */}
            <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex flex-wrap items-center gap-3`}>
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`relative px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all border overflow-hidden group ${
                    activeCategory === cat.value
                    ? 'bg-gradient-to-r from-brand-blue to-brand-cyan border-transparent text-white shadow-glow-cyan'
                    : 'bg-transparent border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {cat.name}
                    {activeCategory === cat.value && <Sparkles size={12} />}
                  </span>
                  {/* Hover Effect Background */}
                  {activeCategory !== cat.value && (
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/0 via-brand-cyan/0 to-brand-blue/0 group-hover:from-brand-blue/10 group-hover:via-brand-cyan/10 group-hover:to-brand-blue/10 transition-all duration-300" />
                  )}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="hidden lg:flex items-center gap-2 bg-brand-card border border-slate-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-all ${viewMode === 'grid' ? 'bg-brand-cyan text-brand-black' : 'text-slate-400 hover:text-white'}`}
              >
                <Grid3x3 size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-all ${viewMode === 'list' ? 'bg-brand-cyan text-brand-black' : 'text-slate-400 hover:text-white'}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>

          {/* Active Filters Display */}
          <AnimatePresence>
            {(activeCategory !== 'All' || searchQuery) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-3 py-3 border-t border-slate-800/30"
              >
                <span className="text-xs font-mono uppercase text-slate-500">Active:</span>
                {activeCategory !== 'All' && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs font-medium border border-brand-cyan/20">
                    {activeCategory}
                    <button onClick={() => setActiveCategory('All')} className="hover:text-white">×</button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-medium border border-brand-blue/20">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="hover:text-white">×</button>
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && activeCategory === 'All' && !searchQuery && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-blue/20 flex items-center justify-center border border-brand-cyan/30">
                <Zap size={20} className="text-brand-cyan" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {featuredSection.title || t('blog.featured.title')}
                </h2>
                <p className="text-xs text-slate-500 font-mono uppercase mt-1">Handpicked for you</p>
              </div>
            </div>
            <FeaturedHeroCard
              post={featuredPost}
              badgeText={featuredSection.badgeText || t('blog.featured.badge')}
              minReadSuffix={minReadSuffix}
            />
          </div>
        </section>
      )}

      {/* All Articles Grid */}
      <section className="bg-brand-surface py-16 border-t border-slate-800/50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <SectionBadge variant="cyan" className="mb-4">
                {allArticlesSection.badge || t('blog.allArticles.badge')}
              </SectionBadge>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {allArticlesSection.title || t('blog.allArticles.title')}
              </h2>
            </div>
            <div className="hidden md:block">
              <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">
                {filteredPosts.length} {filteredPosts.length === 1 ? t('blog.allArticles.articleSingular') : t('blog.allArticles.articlePlural')}
              </p>
            </div>
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-card border border-slate-700 mb-6">
                <Search size={32} className="text-slate-600" />
              </div>
              <p className="text-slate-400 text-lg mb-6">
                {allArticlesSection.emptyStateTitle || t('blog.allArticles.emptyTitle')}
              </p>
              <button
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-semibold hover:shadow-lg hover:shadow-brand-cyan/20 transition-all"
              >
                <Filter size={16} />
                {allArticlesSection.emptyStateButton || t('blog.allArticles.clearFilters')}
              </button>
            </div>
          ) : (
            /* Grid */
            <div className={`grid gap-8 ${
              viewMode === 'grid'
                ? 'md:grid-cols-2 lg:grid-cols-3'
                : 'md:grid-cols-2'
            }`}>
              {regularPosts.map((post, index) => (
                <BlogCard key={post._id} post={post} index={index} minReadSuffix={minReadSuffix} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection t={t} />

      {/* Footer */}
      <ChunkyFooter />
    </div>
  );
};

export default BlogListingPageRedesigned;
