import React from 'react';
import { useTranslation } from 'react-i18next';

export const Stats: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { value: "2,000+", label: t('home.stats.salesTeams') },
    { value: "10M+", label: t('home.stats.messagesSynced') },
    { value: "40%", label: t('home.stats.fasterResponse') },
    { value: "30 min", label: t('home.stats.setupTime') }
  ];

  return (
    <section className="py-20 border-y border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-200/50">
            {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center px-4 group">
                    <div className="text-4xl md:text-5xl font-display font-bold tracking-tight text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {stat.value}
                    </div>
                    <div className="text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold">
                        {stat.label}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};