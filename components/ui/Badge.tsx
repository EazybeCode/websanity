import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'blue' | 'indigo' | 'rose' | 'orange' | 'purple' | 'clean';
}

export const Badge: React.FC<BadgeProps> = ({ children, className = '', variant = 'blue' }) => {
  const colors = {
    blue: "text-blue-600 bg-blue-50/50 border-blue-100 ring-1 ring-blue-500/10",
    indigo: "text-indigo-600 bg-indigo-50/50 border-indigo-100 ring-1 ring-indigo-500/10",
    rose: "text-rose-600 bg-rose-50/50 border-rose-100 ring-1 ring-rose-500/10",
    orange: "text-orange-600 bg-orange-50/50 border-orange-100 ring-1 ring-orange-500/10",
    purple: "text-purple-600 bg-purple-50/50 border-purple-100 ring-1 ring-purple-500/10",
    clean: "text-slate-600 bg-slate-50 border-slate-200 ring-1 ring-slate-200"
  };

  return (
    <span className={`inline-flex items-center font-display text-[13px] font-bold px-3 py-1 rounded-full border ${colors[variant]} ${className}`}>
      {children}
    </span>
  );
};