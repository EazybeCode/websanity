import React from 'react';

interface SectionKickerProps {
  label: string;
  className?: string;
  color?: 'cyan' | 'blue' | 'orange';
}

const SectionKicker: React.FC<SectionKickerProps> = ({ label, className = '', color = 'cyan' }) => {
  const colorClasses = {
    cyan: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/5',
    blue: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
    orange: 'text-orange-400 border-orange-400/30 bg-orange-400/5',
  };

  return (
    <div className={`inline-flex items-center px-4 py-1.5 rounded-full border ${colorClasses[color]} ${className}`}>
      <span className="text-xs font-mono uppercase tracking-widest">{label}</span>
    </div>
  );
};

export default SectionKicker;
