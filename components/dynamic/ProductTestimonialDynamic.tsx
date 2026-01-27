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

export const ProductTestimonialDynamic: React.FC<ProductTestimonialDynamicProps> = ({ data, color = '#25D366' }) => {
  if (!data || !data.quote) return null

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div
            className="absolute -top-4 -left-4 w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${color}15` }}
          >
            <Quote size={32} style={{ color }} />
          </div>

          <blockquote className="pt-8 pl-8">
            <p className="text-2xl md:text-3xl font-medium text-white leading-relaxed mb-8">
              "{data.quote}"
            </p>

            <div className="flex items-center gap-4">
              {data.avatar && (
                <img
                  src={urlFor(data.avatar).width(64).height(64).url()}
                  alt={data.author}
                  className="w-14 h-14 rounded-full object-cover border-2"
                  style={{ borderColor: color }}
                />
              )}
              <div>
                <div className="font-bold text-white">{data.author}</div>
                <div className="text-slate-400 text-sm">
                  {data.title}
                  {data.company && ` at ${data.company}`}
                </div>
              </div>
            </div>
          </blockquote>

          <div
            className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: color }}
          ></div>
        </div>
      </div>
    </section>
  )
}

export default ProductTestimonialDynamic
