import React from 'react';
import { Quote } from 'lucide-react';

export const Testimonial: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 text-slate-900 relative overflow-hidden border-y border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="flex justify-center mb-10">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <Quote size={24} fill="currentColor" />
            </div>
        </div>
        <blockquote className="text-2xl md:text-4xl font-display font-medium leading-snug tracking-tight mb-12 text-slate-800">
          "We went from zero visibility into WhatsApp to seeing every unreplied chat and hot deal in one dashboard. Response times dropped <span className="text-blue-600 bg-blue-50 px-2 rounded">40% in the first month.</span>"
        </blockquote>
        <div className="flex flex-col items-center">
          <div className="font-bold text-lg text-slate-900">Alex Richardson</div>
          <div className="text-slate-500 font-mono text-xs mt-2 uppercase tracking-widest font-bold">VP Sales • Enterprise Financial Services</div>
        </div>
      </div>
    </section>
  );
};