'use client'

import { motion } from 'framer-motion'
import { TestimonialsColumn } from '@/components/ui/testimonials-columns-1'

const TESTIMONIALS = [
  {
    text: 'Our HubSpot was a graveyard. Eazybe brought it back to life — every WhatsApp deal now flows in automatically.',
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
    name: 'Priya Sharma',
    role: 'Sales Ops Lead · SaaS · India',
  },
  {
    text: 'We tried WATI. It broke the moment a lead said anything off-script. Eazybe just… gets it.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Lucas Almeida',
    role: 'Founder · D2C · Brazil',
  },
  {
    text: 'We were losing 30% of after-hours leads. Now the agent qualifies them while we sleep.',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    name: 'Omar Al-Fahad',
    role: 'VP Sales · FinTech · UAE',
  },
  {
    text: 'Setup took 12 minutes. Twelve. Our CRM rollout took six months.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    name: 'Camila Ortiz',
    role: 'Head of RevOps · Logistics · Mexico',
  },
  {
    text: 'My reps stopped copy-pasting chats into Salesforce. That alone paid for the year.',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    name: 'Diego Fernández',
    role: 'Sales Director · Real Estate · Spain',
  },
  {
    text: "The AI replies sound like our top closer. Customers don't notice it isn't her.",
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Selin Kaya',
    role: 'CEO · EdTech · Turkey',
  },
  {
    text: 'We doubled response speed without hiring anyone. Pipeline grew 38% in two quarters.',
    image: 'https://randomuser.me/api/portraits/men/57.jpg',
    name: 'Rohan Mehta',
    role: 'COO · Insurance · India',
  },
  {
    text: 'It catches deals going quiet 48 hours before I would have. Worth the whole subscription.',
    image: 'https://randomuser.me/api/portraits/women/29.jpg',
    name: 'Beatriz Costa',
    role: 'Account Executive · B2B SaaS · Brazil',
  },
  {
    text: 'Other tools sold us a chatbot. Eazybe gave us a teammate.',
    image: 'https://randomuser.me/api/portraits/men/76.jpg',
    name: 'Andrés Vargas',
    role: 'Founder · Travel · Colombia',
  },
]

const firstColumn = TESTIMONIALS.slice(0, 3)
const secondColumn = TESTIMONIALS.slice(3, 6)
const thirdColumn = TESTIMONIALS.slice(6, 9)

export function CustomerStories() {
  return (
    <section className="section customer-stories" style={{ paddingBottom: 60 }}>
      <div className="container">
        <div className="sec-head centered">
          <span className="sec-tag">Customer Stories</span>
          <h2>What Teams Tell Us <em>in Demos.</em></h2>
          <p style={{ maxWidth: 'none', width: '100%', textAlign: 'justify', textAlignLast: 'center', hyphens: 'auto' }}>
            Real quotes from sales ops leads, founders, and revenue teams who switched to Eazybe in the last 90 days — and what changed in their pipeline once their WhatsApp conversations started flowing into the CRM automatically.
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
