import React from 'react'
import { Quote } from 'lucide-react'
import { urlFor } from '../../lib/sanity'

interface TestimonialData {
  quote?: string
  author?: string
  title?: string
  company?: string
  avatar?: any
}

interface ProductTestimonialDynamicProps {
  data: TestimonialData
  color?: string
}

export const ProductTestimonialDynamic: React.FC<ProductTestimonialDynamicProps> = ({ data }) => {
  if (!data || !data.quote) return null

  return (
    <section className="py-24 bg-brand-surface border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-6xl mb-8 font-serif text-brand-cyan" style={{ textShadow: '0 0 40px rgba(6, 182, 212, 0.3)' }}>"</div>
        <blockquote className="text-2xl font-medium text-white mb-8 leading-relaxed">
          {data.quote}
        </blockquote>
        <div className="flex items-center justify-center gap-4">
          {data.avatar && (
            <img
              src={urlFor(data.avatar).width(64).height(64).url()}
              alt={data.author}
              className="w-12 h-12 rounded-full border-2 border-slate-700"
            />
          )}
          <div className="text-left">
            <div className="font-bold text-white">{data.author}</div>
            <div className="text-sm text-slate-400">
              {data.title}
              {data.company && `, ${data.company}`}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductTestimonialDynamic
