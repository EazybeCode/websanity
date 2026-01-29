import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Quote } from 'lucide-react';

export const Testimonial: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-slate-50 text-slate-900 relative overflow-hidden border-y border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="flex justify-center mb-10">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <Quote size={24} fill="currentColor" />
            </div>
        </div>
        <blockquote className="text-2xl md:text-4xl font-display font-medium leading-snug tracking-tight mb-12 text-slate-800">
          "<Trans i18nKey="home.testimonial.quote" components={{ highlight: <span className="text-blue-600 bg-blue-50 px-2 rounded" /> }} />"
        </blockquote>
        <div className="flex flex-col items-center">
          <div className="font-bold text-lg text-slate-900">{t('home.testimonial.name')}</div>
          <div className="text-slate-500 font-mono text-xs mt-2 uppercase tracking-widest font-bold">{t('home.testimonial.title')}</div>
        </div>
      </div>
    </section>
  );
};