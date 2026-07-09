'use client'

/**
 * Quote / Testimonial Block Component
 */
import React from 'react'
import { Quote } from 'lucide-react'

interface QuoteData {
  content: string
  author?: string
  role?: string
  company?: string
  avatar?: string
  variant?: 'default' | 'block' | 'card' | 'minimal'
  rating?: number
}

export const QuoteBlock: React.FC<{ data: QuoteData }> = ({ data }) => {
  const {
    content,
    author,
    role,
    company,
    avatar,
    variant = 'default',
    rating,
  } = data

  const renderStars = () => {
    if (!rating) return null
    return (
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-slate-600'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className="my-8 md:my-12 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-6 md:p-8 border border-slate-700/50">
        <Quote className="text-brand-cyan mb-4" size={32} />
        {renderStars()}
        <p className="text-lg md:text-xl text-slate-200 leading-relaxed mb-6 italic">
          &ldquo;{content}&rdquo;
        </p>
        {(author || avatar) && (
          <div className="flex items-center gap-4">
            {avatar && (
              <img
                src={avatar}
                alt={author}
                className="w-12 h-12 rounded-full object-cover"
               loading="lazy"/>
            )}
            <div>
              <p className="font-semibold text-white">{author}</p>
              {role && (
                <p className="text-sm text-slate-400">
                  {role}
                  {company && ` @ ${company}`}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <blockquote
      className={`my-8 md:my-12 ${variant === 'block' ? 'bg-slate-800/50 p-6 md:p-8 rounded-xl' : 'border-l-4 border-brand-cyan pl-6'}`}
    >
      <p className="text-lg md:text-xl text-slate-200 leading-relaxed italic">
        &ldquo;{content}&rdquo;
      </p>
      {(author || role) && (
        <footer className="mt-4 flex items-center gap-3">
          {avatar && (
            <img
              src={avatar}
              alt={author}
              className="w-10 h-10 rounded-full object-cover"
             loading="lazy"/>
          )}
          <div>
            <cite className="not-italic font-semibold text-white">
              {author}
            </cite>
            {role && (
              <p className="text-sm text-slate-400">
                {role}
                {company && `, ${company}`}
              </p>
            )}
          </div>
        </footer>
      )}
    </blockquote>
  )
}

export default QuoteBlock
