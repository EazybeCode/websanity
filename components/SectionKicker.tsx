import React from 'react';

interface SectionKickerProps {
  label: string;
  className?: string;
  color?: 'cyan' | 'blue' | 'orange' | 'green' | 'default';
}

const SectionKicker: React.FC<SectionKickerProps> = ({ label, className = '', color = 'default' }) => {
  const colorClasses: Record<string, string> = {
    cyan: 'text-brand-cyan border-brand-cyan/30 bg-brand-cyan/5',
    blue: 'text-brand-blue border-brand-blue/30 bg-brand-blue/5',
    orange: 'text-brand-orange border-brand-orange/30 bg-brand-orange/5',
    green: 'text-brand-green border-brand-green/30 bg-brand-green/5',
    default: 'text-brand-cyan border-brand-cyan/30 bg-brand-cyan/5',
  };

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${colorClasses[color] || colorClasses.default} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'currentColor' }}></span>
      <span className="text-xs font-mono font-bold uppercase tracking-widest">{label}</span>
    </div>
  );
};

export default SectionKicker;
