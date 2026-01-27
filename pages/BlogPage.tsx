import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Link as LinkIcon,
  CheckCircle2,
  Zap,
  Plus,
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { FooterDynamic } from '../components/dynamic/FooterDynamic';
import { useFooter } from '../hooks/useFooter';
import { useBlogPost, useBlogPosts } from '../hooks/useBlog';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

const SectionKicker: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full text-brand-cyan border border-cyan-500/20 bg-cyan-950/10">
    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan shadow-glow-cyan animate-pulse"></span>
    {label}
  </span>
);

const GlowOrb: React.FC<{ color?: string, className?: string }> = ({ color = "bg-brand-blue/10", className = "" }) => (
  <div className={`absolute w-[500px] h-[500px] blur-[120px] rounded-full -z-10 pointer-events-none ${color} ${className}`}></div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-brand-card border border-slate-700 rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:border-slate-500 ${className}`}>
    {children}
  </div>
);

const TableOfContents: React.FC<{ sections: Array<{ label: string; id: string }> }> = ({ sections }) => {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle size={18} className="text-brand-cyan" />
        <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-white">Table of Contents</h4>
      </div>
      <ul className="space-y-3 text-sm">
        {sections.map((item, i) => (
          <li key={i}>
            <a
              href={`#${item.id}`}
              className="flex items-center gap-3 text-slate-400 hover:text-brand-blue transition-colors group"
            >
              <span className="font-mono text-[10px] text-slate-600 group-hover:text-brand-blue">{i + 1 < 10 ? `0${i + 1}` : i + 1}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-8 pt-6 border-t border-slate-700">
        <p className="text-xs text-slate-500 mb-4 leading-relaxed">Need help implementing?</p>
        <Button variant="outline" className="w-full">Book a Demo Call</Button>
      </div>
    </Card>
  );
};

const RelatedPostCard: React.FC<{
  category: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
}> = ({ category, title, date, readTime, image, slug }) => (
  <Card className="flex flex-col h-full group cursor-pointer" onClick={() => window.location.href = `/blog/${slug}`}>
    <div className="relative h-48 mb-6 overflow-hidden rounded-xl">
      <img src={image || 'https://picsum.photos/600/400'} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute top-4 left-4">
        <span className="font-mono text-[10px] uppercase font-bold bg-brand-blue px-2 py-1 rounded text-white">{category}</span>
      </div>
    </div>
    <div className="flex-1">
      <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-tight group-hover:text-brand-cyan transition-colors">{title}</h3>
    </div>
    <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-800 font-mono text-[10px] uppercase text-slate-500 font-bold">
      <span className="flex items-center gap-1"><Clock size={12} /> {readTime}</span>
      <span className="flex items-center gap-1"><Calendar size={12} /> {date}</span>
    </div>
  </Card>
);

const BlogPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, loading, error } = useBlogPost(slug || '');
  const { data: relatedPosts } = useBlogPosts(3);
  const { data: footerData } = useFooter();

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
    <div className="min-h-screen bg-brand-black selection:bg-brand-blue selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <header className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <GlowOrb color="bg-brand-blue/10" className="top-0 -left-64" />
        <GlowOrb color="bg-brand-cyan/10" className="bottom-0 -right-64" />

        <div className="max-w-7xl mx-auto px-4 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div className="max-w-3xl">
              <div className="mb-6 flex justify-center lg:justify-start">
                <SectionKicker label={post.category} />
              </div>
              <h1 className="text-5xl lg:text-7xl font-sans font-extrabold tracking-tight text-white leading-[1.05] mb-6">
                {post.title}
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed font-medium">
                {post.excerpt}
              </p>
            </div>

            <div className="flex flex-col items-center lg:items-end gap-6 pb-2">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full border border-slate-700 bg-brand-purple/20 flex items-center justify-center text-brand-purple font-bold">
                   {post.author?.name?.[0] || 'E'}
                 </div>
                 <div className="text-left">
                   <p className="text-sm font-bold text-white">{post.author?.name || 'Eazybe Editorial'}</p>
                   <p className="font-mono text-[10px] uppercase text-slate-500 font-bold">
                     {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {post.readTime} min read
                   </p>
                 </div>
               </div>
               <div className="flex items-center gap-3 text-slate-500">
                 <Share2 size={16} className="hover:text-brand-blue cursor-pointer" />
                 <Twitter size={16} className="hover:text-brand-blue cursor-pointer" />
                 <Linkedin size={16} className="hover:text-brand-blue cursor-pointer" />
                 <Mail size={16} className="hover:text-brand-blue cursor-pointer" />
                 <LinkIcon size={16} className="hover:text-brand-blue cursor-pointer" />
               </div>
            </div>
          </div>

          {post.featuredImage && (
            <div className="relative rounded-3xl overflow-hidden aspect-[21/9] shadow-2xl border border-slate-700">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent"></div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">

            {/* Quick Answer Box */}
            {post.quickAnswer && (
              <div className="bg-brand-surface border-l-4 border-brand-cyan p-8 rounded-r-2xl shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Zap size={20} className="text-brand-cyan" />
                  <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-white">Quick Answer</h4>
                </div>
                <div className="text-slate-300 leading-relaxed prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.quickAnswer }} />
              </div>
            )}

            {/* Main Content */}
            <article className="blog-content max-w-none">
              <style dangerouslySetInnerHTML={{
                __html: `
                  .blog-content h2 {
                    font-family: 'Inter', sans-serif;
                    font-size: 2.25rem;
                    font-weight: 700;
                    color: #ffffff;
                    margin-top: 3rem;
                    margin-bottom: 1.5rem;
                    line-height: 1.2;
                    letter-spacing: -0.02em;
                  }
                  .blog-content h3 {
                    font-family: 'Inter', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #ffffff;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    line-height: 1.3;
                  }
                  .blog-content h4 {
                    font-family: 'Inter', sans-serif;
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #e2e8f0;
                    margin-top: 1.5rem;
                    margin-bottom: 0.75rem;
                    line-height: 1.4;
                  }
                  .blog-content p {
                    font-size: 1.125rem;
                    color: #94a3b8;
                    line-height: 1.75;
                    margin-bottom: 1.5rem;
                  }
                  .blog-content ul, .blog-content ol {
                    margin-top: 1.5rem;
                    margin-bottom: 1.5rem;
                    padding-left: 1.5rem;
                  }
                  .blog-content li {
                    font-size: 1.125rem;
                    color: #94a3b8;
                    line-height: 1.75;
                    margin-bottom: 1rem;
                  }
                  .blog-content strong {
                    color: #ffffff;
                    font-weight: 600;
                  }
                  .blog-content a {
                    color: #22d3ee;
                    text-decoration: none;
                  }
                  .blog-content a:hover {
                    text-decoration: underline;
                  }
                  .blog-content table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 2rem 0;
                    background: rgba(15, 23, 42, 0.5);
                    border: 1px solid #334155;
                    border-radius: 12px;
                    overflow: hidden;
                  }
                  .blog-content thead {
                    background: rgba(51, 65, 85, 0.5);
                  }
                  .blog-content th {
                    padding: 1rem;
                    text-align: left;
                    font-size: 0.875rem;
                    font-weight: 700;
                    color: #22d3ee;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    border-bottom: 2px solid #334155;
                  }
                  .blog-content td {
                    padding: 1rem;
                    font-size: 1rem;
                    color: #cbd5e1;
                    border-bottom: 1px solid #334155;
                  }
                  .blog-content tbody tr:last-child td {
                    border-bottom: none;
                  }
                  .blog-content tbody tr:hover {
                    background: rgba(51, 65, 85, 0.3);
                  }
                  .blog-content ul {
                    list-style: none;
                  }
                  .blog-content ul li:before {
                    content: "•";
                    color: #22d3ee;
                    font-weight: bold;
                    display: inline-block;
                    width: 1.5em;
                    margin-left: -1.5em;
                  }
                  .blog-content ol {
                    counter-reset: item;
                    list-style: none;
                  }
                  .blog-content ol li:before {
                    content: counter(item) ".";
                    counter-increment: item;
                    color: #22d3ee;
                    font-weight: bold;
                    display: inline-block;
                    width: 2em;
                    margin-left: -2em;
                  }
                `
              }} />
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            {/* FAQs Section */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-4xl font-sans font-bold text-white tracking-tight">Frequently Asked Questions</h2>
                {post.faqs.map((faq, i) => (
                  <details key={i} className="group border border-slate-700 rounded-2xl p-6 bg-brand-card transition-all cursor-pointer">
                    <summary className="flex items-center justify-between text-white font-bold list-none">
                      {faq.question}
                      <Plus size={18} className="text-brand-cyan group-open:rotate-45 transition-transform" />
                    </summary>
                    <p className="mt-4 text-slate-400 leading-relaxed pt-4 border-t border-slate-800">{faq.answer}</p>
                  </details>
                ))}
              </div>
            )}

            {/* Author Section */}
            {post.author && (
              <div className="pt-12 border-t border-slate-800">
                <div className="bg-brand-surface p-8 rounded-3xl flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                  <div className="w-24 h-24 rounded-full border-4 border-slate-700 bg-brand-purple/20 flex items-center justify-center text-brand-purple font-bold text-3xl flex-shrink-0">
                    {post.author.name[0]}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-2">About {post.author.name}</h4>
                    <p className="text-slate-400 leading-relaxed mb-4">
                      {post.author.bio || 'Content creator and industry expert.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <aside className="space-y-12 sticky top-24 self-start">

            {/* CTA Card */}
            <Card className="bg-gradient-to-br from-brand-blue/20 to-brand-cyan/20 border-brand-cyan/30">
              <SectionKicker label="Limited Offer" />
              <h3 className="text-2xl font-bold text-white mt-4 mb-4">Start Your Free Trial Today</h3>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Transform your WhatsApp sales. Join 1,000+ businesses already using Eazybe.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300">
                  <CheckCircle2 size={14} className="text-brand-green" /> Setup in under 30 minutes
                </li>
                <li className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300">
                  <CheckCircle2 size={14} className="text-brand-green" /> No credit card required
                </li>
                <li className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300">
                  <CheckCircle2 size={14} className="text-brand-green" /> Keep your existing number
                </li>
              </ul>
              <Button variant="primary" size="lg" className="w-full py-4 text-md">Start Free Trial</Button>
              <p className="text-[10px] text-center mt-4 font-mono text-slate-500 uppercase tracking-widest">No commitment • Cancel anytime</p>
            </Card>

            {post.tableOfContents && post.tableOfContents.length > 0 && (
              <TableOfContents sections={post.tableOfContents} />
            )}

            {/* Newsletter */}
            <div className="bg-brand-surface p-8 rounded-2xl border border-slate-700">
              <h4 className="text-white font-bold mb-4">Never Miss an Update</h4>
              <p className="text-sm text-slate-500 mb-6">Get the latest WhatsApp CRM tips delivered to your inbox.</p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-brand-black border border-slate-700 rounded-btn px-4 py-2.5 text-sm text-white focus:border-brand-blue outline-none transition-colors"
                />
                <Button variant="primary" size="md" className="w-full">Subscribe</Button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* CTA Bottom Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-surface/50"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <SectionKicker label="Ready to Scale?" />
          <h2 className="text-4xl md:text-5xl font-sans font-extrabold text-white mt-6 mb-8 tracking-tight">
            Ready to Transform Your WhatsApp Sales?
          </h2>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            Join thousands of high-performance sales teams using Eazybe to manage conversations seamlessly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" className="px-8 py-4 text-lg">Install Eazybe for Free</Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg">Book a Demo Call</Button>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-24 bg-brand-black">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <SectionKicker label="Library" />
                <h2 className="text-3xl font-bold text-white mt-4">Related Articles</h2>
              </div>
              <Button variant="outline" className="hidden sm:flex">View Blog Archive <ChevronRight size={16} /></Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, i) => (
                <RelatedPostCard
                  key={i}
                  category={relatedPost.category}
                  title={relatedPost.title}
                  date={new Date(relatedPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  readTime={`${relatedPost.readTime} min`}
                  image={relatedPost.featuredImage}
                  slug={relatedPost.slug.current}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {footerData && <FooterDynamic data={footerData} />}
    </div>
  );
};

export default BlogPage;
