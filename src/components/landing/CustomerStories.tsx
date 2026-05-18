'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { TestimonialsColumn } from '@/components/ui/testimonials-columns-1'

const IMAGES = [
  'https://randomuser.me/api/portraits/women/12.jpg',
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/men/45.jpg',
  'https://randomuser.me/api/portraits/women/68.jpg',
  'https://randomuser.me/api/portraits/men/22.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/57.jpg',
  'https://randomuser.me/api/portraits/women/29.jpg',
  'https://randomuser.me/api/portraits/men/76.jpg',
]

export function CustomerStories() {
  const t = useTranslations('landingV3.customerStories')
  const items = (t.raw('testimonials') as { text: string; name: string; role: string }[]).map((item, i) => ({
    ...item,
    image: IMAGES[i] ?? IMAGES[0],
  }))
  const firstColumn = items.slice(0, 3)
  const secondColumn = items.slice(3, 6)
  const thirdColumn = items.slice(6, 9)
  return (
    <section className="section customer-stories" style={{ paddingBottom: 60 }}>
      <div className="container">
        <div className="sec-head centered">
          <span className="sec-tag">{t('tag')}</span>
          <h2>{t('headline')} <em>{t('headlineEm')}</em></h2>
          <p style={{ maxWidth: 'none', width: '100%', textAlign: 'justify', textAlignLast: 'center', hyphens: 'auto' }}>
            {t('subtitle')}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 mt-10 max-h-[640px] overflow-hidden"
          style={{
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
            maskImage:
              'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
          }}
        >
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={22} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={20} />
        </motion.div>
      </div>
    </section>
  )
}
