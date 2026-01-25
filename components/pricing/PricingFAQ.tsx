import React, { useState } from 'react'
import { ChevronDown, Plus, Minus } from 'lucide-react'

export interface FAQItem {
  question: string
  answer: string
}

interface PricingFAQProps {
  faqs: FAQItem[]
}

const FAQAccordion: React.FC<{ item: FAQItem; isOpen: boolean; onToggle: () => void }> = ({
  item,
  isOpen,
  onToggle,
}) => {
  return (
    <div
      className={`border rounded-xl transition-all duration-300 ${
        isOpen
          ? 'border-slate-600 bg-brand-surface'
          : 'border-slate-700 bg-brand-card hover:border-slate-600'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className={`text-base font-semibold pr-4 ${isOpen ? 'text-white' : 'text-slate-200'}`}>
          {item.question}
        </span>
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
            isOpen ? 'bg-brand-blue text-white' : 'bg-slate-700 text-slate-400'
          }`}
        >
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 text-slate-400 leading-relaxed">
          {item.answer}
        </div>
      </div>
    </div>
  )
}

export const PricingFAQ: React.FC<PricingFAQProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Split FAQs into two columns
  const midpoint = Math.ceil(faqs.length / 2)
  const leftColumn = faqs.slice(0, midpoint)
  const rightColumn = faqs.slice(midpoint)

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-4">
        {leftColumn.map((faq, index) => (
          <FAQAccordion
            key={index}
            item={faq}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
      <div className="space-y-4">
        {rightColumn.map((faq, index) => (
          <FAQAccordion
            key={index + midpoint}
            item={faq}
            isOpen={openIndex === index + midpoint}
            onToggle={() => handleToggle(index + midpoint)}
          />
        ))}
      </div>
    </div>
  )
}
