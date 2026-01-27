import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Globe, ChevronDown, Calendar, Clock, Zap } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { FooterDynamic } from '../components/dynamic/FooterDynamic';
import { useFooter } from '../hooks/useFooter';
import { useBlogPosts } from '../hooks/useBlog';
import { Button } from '../components/ui/Button';

enum Category {
  ALL = 'All',
  SALES = 'Sales',
  PRODUCT = 'Product',
  AUTOMATION = 'Automation',
  BEST_PRACTICES = 'Best Practices',
  CASE_STUDIES = 'Case Studies',
  SECURITY = 'Security',
}

const SectionKicker: React.FC<{ label: string; color?: string }> = ({ label, color = 'cyan' }) => {
  const colorClasses = {
    cyan: 'text-brand-cyan border-cyan-500/20 bg-cyan-950/10',
    blue: 'text-brand-blue border-brand-blue/20 bg-blue-950/10'
  };

  return (
    <span className={`inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full border ${colorClasses[color as keyof typeof colorClasses] || colorClasses.cyan}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${color === 'cyan' ? 'bg-brand-cyan' : 'bg-brand-blue'} shadow-glow-cyan animate-pulse`}></span>
      {label}
    </span>
  );
};

const BlogCard: React.FC<{ post: any; layout?: 'vertical' | 'horizontal' }> = ({ post, layout = 'horizontal' }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${post.slug.current}`)}
      className="group bg-brand-card border border-slate-700 rounded-2xl overflow-hidden hover:border-slate-500 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl h-full flex flex-col"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={post.featuredImage || 'https://picsum.photos/800/450'}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="font-mono text-[10px] uppercase font-bold bg-brand-blue px-2 py-1 rounded text-white">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-8 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2 leading-tight group-hover:text-brand-cyan transition-colors">
          {post.title}
        </h3>
        <p className="text-slate-400 mb-6 line-clamp-3 leading-relaxed flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-6 pt-6 border-t border-slate-800 font-mono text-[10px] uppercase text-slate-500 font-bold">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {post.readTime} min read
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={12} /> {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>
    </div>
  );
};

const BlogListingPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: allPosts, loading } = useBlogPosts();
  const { data: footerData } = useFooter();

  const filteredPosts = React.useMemo(() => {
    if (!allPosts) return [];

    let filtered = allPosts;

    // Filter by category
    if (activeCategory !== Category.ALL) {
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

  const featuredPosts = React.useMemo(() => {
    return allPosts?.slice(0, 2) || [];
  }, [allPosts]);

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

  return (
    <div className="min-h-screen font-sans selection:bg-brand-blue selection:text-white bg-brand-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/10 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-cyan/5 blur-[100px] rounded-full -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 text-center">
          <SectionKicker label="Knowledge Hub" color="cyan" />
          <h1 className="text-5xl lg:text-7xl font-sans font-extrabold tracking-tight text-white leading-[1.05] mt-6 mb-8">
            Blog & <span className="text-brand-cyan">Resources</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg lg:text-xl text-slate-400 leading-relaxed mb-12">
            Expert insights, guides, and best practices for WhatsApp CRM success.
            Master the art of agentic sales automation.
          </p>

          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-4 flex items-center text-slate-500 group-focus-within:text-brand-cyan transition-colors">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search articles, guides, or case studies..."
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
          <div className="flex flex-wrap items-center justify-center gap-3">
            {Object.values(Category).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-widest transition-all border ${
                  activeCategory === cat
                  ? 'bg-brand-blue border-brand-blue text-white shadow-glow-blue'
                  : 'bg-transparent border-slate-800 text-slate-400 hover:border-slate-500 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-10">
              <Zap className="text-brand-cyan" size={24} />
              <h2 className="text-3xl font-bold text-white tracking-tight">Featured Articles</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post._id} post={post} layout="vertical" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="bg-brand-surface py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <SectionKicker label="Exploration" color="blue" />
              <h2 className="text-4xl font-bold text-white tracking-tight mt-4">All Articles</h2>
            </div>
            <p className="hidden md:block text-slate-500 font-mono text-xs font-bold uppercase tracking-widest">
              Showing {filteredPosts.length} Results
            </p>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400 text-lg">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-black py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative bg-gradient-to-br from-brand-surface to-slate-900 border border-slate-700 rounded-3xl p-10 lg:p-20 text-center shadow-2xl overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-blue/10 blur-[80px] rounded-full group-hover:bg-brand-blue/20 transition-all duration-700"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-cyan/10 blur-[80px] rounded-full group-hover:bg-brand-cyan/20 transition-all duration-700"></div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight relative z-10">
              Ready to Transform Your Sales?
            </h2>
            <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed relative z-10">
              Join 50,000+ businesses using Eazybe to manage WhatsApp conversations into conversions with seamless CRM integration.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Button variant="primary" size="lg" className="w-full sm:w-auto px-8 py-4 text-lg">
                Install for Free →
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-4 text-lg">
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-brand-surface border-y border-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Never Miss an Update</h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                Get the latest WhatsApp CRM tips, product updates, and exclusive insights delivered to your inbox weekly.
              </p>
            </div>
            <div className="relative">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  className="flex-grow bg-brand-black border border-slate-700 focus:border-brand-blue focus:outline-none rounded-xl py-4 px-6 text-white placeholder:text-slate-600 transition-all"
                />
                <Button variant="primary" size="lg" className="px-8 py-4 whitespace-nowrap">
                  Subscribe Now
                </Button>
              </div>
              <p className="mt-4 text-xs font-mono text-slate-500 uppercase tracking-widest">
                Join 10,000+ professionals. No spam, unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {footerData && <FooterDynamic data={footerData} />}
    </div>
  );
};

export default BlogListingPage;
