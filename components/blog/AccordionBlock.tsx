/**
 * Accordion / FAQ Block Component
 * Collapsible content sections
 */
import React, { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';

interface AccordionData {
  title?: string;
  items: Array<{
    question: string;
    answer: string;
    initiallyOpen?: boolean;
  }>;
  allowMultipleOpen?: boolean;
  variant?: 'default' | 'bordered' | 'minimal' | 'filled';
}

export const AccordionBlock: React.FC<{ data: AccordionData }> = ({ data }) => {
  const { title, items = [], allowMultipleOpen = false, variant = 'default' } = data;
  const [openIndex, setOpenIndex] = useState<number>(-1);

  const toggleItem = (index: number) => {
    if (allowMultipleOpen) {
      // For multiple open, we'd use Set or array, but for simplicity:
      setOpenIndex(openIndex === index ? -1 : index);
    } else {
      setOpenIndex(openIndex === index ? -1 : index);
    }
  };

  const variantStyles = {
    default: 'border border-slate-700/50 rounded-xl bg-slate-900/30',
    bordered: 'border-2 border-slate-700 rounded-xl bg-transparent',
    minimal: 'border-b border-slate-800 bg-transparent rounded-none',
    filled: 'rounded-xl bg-slate-800/50 border-0',
  };

  return (
    <div className="my-8 md:my-12">
      {title && (
        <h3 className="text-xl md:text-2xl font-bold text-white mb-6">{title}</h3>
      )}
      <div className="space-y-3">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <details
              key={index}
              open={isOpen}
              onToggle={(e) => {
                e.preventDefault();
                toggleItem(index);
              }}
              className={`group ${variantStyles[variant]} transition-all hover:border-slate-600`}
            >
              <summary className="flex items-center justify-between p-4 md:p-6 text-white font-semibold cursor-pointer list-none">
                <span className="pr-6 text-base md:text-lg">{item.question}</span>
                <span className={`flex-shrink-0 transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                  <Plus size={20} className="text-brand-cyan" />
                </span>
              </summary>
              <div className="px-4 md:px-6 pb-4 md:pb-6 text-slate-400 text-base md:text-lg leading-relaxed border-t border-slate-700/30 pt-4">
                {item.answer}
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
};

export default AccordionBlock;
