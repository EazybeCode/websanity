import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'blue' | 'indigo' | 'rose' | 'orange' | 'purple' | 'clean';
}

export const Badge: React.FC<BadgeProps> = ({ children, className = '', variant = 'blue' }) => {
  const colors = {
    blue: "text-brand-blue bg-blue-900/30 border-blue-800/50 ring-1 ring-blue-500/20",
    indigo: "text-brand-indigo bg-indigo-900/30 border-indigo-800/50 ring-1 ring-indigo-500/20",
    rose: "text-rose-400 bg-rose-900/30 border-rose-800/50 ring-1 ring-rose-500/20",
    orange: "text-brand-orange bg-orange-900/30 border-orange-800/50 ring-1 ring-orange-500/20",
    purple: "text-brand-purple bg-purple-900/30 border-purple-800/50 ring-1 ring-purple-500/20",
    clean: "text-slate-300 bg-slate-800/50 border-slate-700 ring-1 ring-slate-700"
  };

  return (
    <span className={`inline-flex items-center font-display text-[13px] font-bold px-3 py-1 rounded-full border ${colors[variant]} ${className}`}>
      {children}
    </span>
  );
};