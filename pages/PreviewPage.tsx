/**
 * Preview Page for Draft Blog Posts
 * Allows content editors to preview unpublished content from Sanity CMS
 */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { Navbar } from '../components/Navbar';
import { ChunkyFooter } from '../components/footer/ChunkyFooter';
import { client } from '../lib/sanity';
import TableBlock from './components/blog/TableBlock';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';

export const PreviewPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const [previewData, setPreviewData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreviewData = async () => {
      if (!slug) {
        setError('No slug provided for preview');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Get language from URL or default to 'en'
        const language = new URLSearchParams(window.location.search).get('lang') || 'en';

        // Fetch draft content from Sanity (no _id filter for drafts)
        const query = `*[_type == "blogPost" && slug.current == $slug && language == $language][0]{
          _id,
          title,
          slug,
          excerpt,
          content,
          category,
          language,
          "featuredImage": featuredImage.asset->url,
          "featuredImageAlt": featuredImage.alt,
          publishedAt,
          readTime,
          author{
            name,
            bio,
            "image": image.asset->url,
            url
          },
          quickAnswer,
          tableOfContents[]{label, id},
          "faqs": faq[]{question, answer, acceptedAnswer}
        }`;

        const data = await client.fetch(query, { slug, language });

        if (!data) {
          setError(`Blog post not found with slug "${slug}" and language "${language}". Make sure the post exists in Sanity.`);
          return;
        }

        setPreviewData(data);
      } catch (err) {
        console.error('Error fetching preview data:', err);
        setError('Failed to load preview. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPreviewData();
  }, [slug]);

  const exitPreview = () => {
    const language = new URLSearchParams(window.location.search).get('lang') || 'en';
    const prefix = language === 'en' ? '' : `/${language === 'pt-BR' ? 'br' : language}`;
    navigate(prefix ? `${prefix}/blog` : '/blog');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <div className="flex items-center justify-center pt-20">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-cyan mb-4"></div>
            <p className="text-slate-300">Loading preview...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <div className="flex items-center justify-center pt-20 px-4">
          <div className="bg-slate-800 rounded-lg p-8 max-w-md">
            <div className="text-red-400 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Preview Error</h2>
            <p className="text-slate-300 mb-4">{error}</p>
            <button
              onClick={exitPreview}
              className="bg-brand-cyan text-slate-900 px-4 py-2 rounded-lg hover:bg-brand-cyan/80 transition-colors w-full"
            >
              Back to Blog
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Portable Text components
  const components = {
    types: {
      table: ({ value }: any) => <TableBlock data={value} />,
    },
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      {/* Preview Banner */}
      <div className="bg-gradient-to-r from-brand-cyan to-blue-500 text-slate-900 py-3 px-4 sticky top-16 z-50 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👁️</span>
              <span className="font-bold">Preview Mode</span>
            </div>
            <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded">
              Draft Content
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium max-w-md truncate">
              {previewData?.title}
            </span>
            <button
              onClick={exitPreview}
              className="bg-slate-900 text-white px-3 py-1 rounded text-sm hover:bg-slate-800 transition-colors"
            >
              Exit Preview
            </button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <article className="relative pt-8 pb-16">
        <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-9xl font-bold text-brand-cyan rotate-[-45deg]">DRAFT</span>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Back Button */}
          <button
            onClick={exitPreview}
            className="flex items-center gap-2 text-slate-400 hover:text-brand-cyan mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Blog</span>
          </button>

          {/* Blog Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
              {previewData.category && (
                <span className="text-brand-cyan font-semibold">{previewData.category}</span>
              )}
              {previewData.publishedAt && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {new Date(previewData.publishedAt).toLocaleDateString()}
                  </span>
                </>
              )}
              {previewData.readTime && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {previewData.readTime} min read
                  </span>
                </>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {previewData.title}
            </h1>

            {previewData.excerpt && (
              <p className="text-xl text-slate-300 mb-4">
                {previewData.excerpt}
              </p>
            )}

            {previewData.author && (
              <div className="flex items-center gap-3">
                {previewData.author.image && (
                  <img
                    src={previewData.author.image}
                    alt={previewData.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <p className="text-white font-semibold flex items-center gap-2">
                    <User size={16} />
                    {previewData.author.name}
                  </p>
                  {previewData.author.bio && (
                    <p className="text-sm text-slate-400">{previewData.author.bio}</p>
                  )}
                </div>
              </div>
            )}
          </header>

          {/* Featured Image */}
          {previewData.featuredImage && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <img
                src={previewData.featuredImage}
                alt={previewData.featuredImageAlt || previewData.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Blog Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            {previewData.content && (
              <PortableText
                value={previewData.content}
                components={components}
              />
            )}
          </div>

          {/* FAQs */}
          {previewData.faqs && previewData.faqs.length > 0 && (
            <div className="mt-12 bg-slate-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {previewData.faqs.map((faq: any, index: number) => (
                  <div key={index} className="border-b border-slate-700 pb-4">
                    <h3 className="text-lg font-semibold text-brand-cyan mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-slate-300">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Preview Tips Footer */}
      <div className="bg-slate-800 border-t border-slate-700 py-6 px-4">
        <div className="container mx-auto">
          <h3 className="text-brand-cyan font-bold mb-3">💡 Preview Tips</h3>
          <ul className="text-slate-300 text-sm space-y-2">
            <li>• This is how your blog post will appear when published</li>
            <li>• Check formatting, images, and links before publishing</li>
            <li>• Make sure all content is complete and error-free</li>
            <li>• Tables, accordions, and other content blocks should render correctly</li>
            <li>• Use the "Exit Preview" button to return to the blog</li>
          </ul>
        </div>
      </div>

      <ChunkyFooter />
    </div>
  );
};

export default PreviewPage;
