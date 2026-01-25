import React from 'react';

interface SectionBadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'orange' | 'green' | 'default';
  icon?: React.ReactNode;
  className?: string;
}

export const SectionBadge: React.FC<SectionBadgeProps> = ({
  children,
  variant = 'cyan',
  icon,
  className = ''
}) => {
  const styles = {
    cyan: {
      wrapper: "text-brand-cyan border-cyan-500/20 bg-cyan-950/10",
      dot: "bg-brand-cyan shadow-glow-cyan"
    },
    orange: {
      wrapper: "text-brand-orange border-orange-500/20 bg-orange-950/10",
      dot: "bg-brand-orange shadow-glow-orange"
    },
    green: {
      wrapper: "text-brand-green border-green-500/20 bg-green-950/10",
      dot: "bg-brand-green shadow-[0_0_10px_rgba(16,185,129,0.3)]"
    },
    default: {
       wrapper: "text-slate-300 border-slate-700 bg-slate-800/50",
       dot: "bg-slate-400"
    }
  };

  const currentStyle = styles[variant];

  return (
    <span className={`inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full border ${currentStyle.wrapper} ${className}`}>
      {icon ? (
        icon
      ) : (
        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${currentStyle.dot}`}></span>
      )}
      {children}
    </span>
  );
};
