import React from 'react';

const logos = [
  "Apollo Hospitals", "University Living", "Jodopay", "Avendus", 
  "Lion Parcel", "Casita", "Hurst Capital", "Insuright"
];

export const ClientLogos: React.FC = () => {
  return (
    <section className="py-12 border-b border-slate-100 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 font-bold">
          Trusted by Sales Teams at
        </p>
      </div>
      
      <div className="flex overflow-hidden space-x-16 group mask-linear-gradient">
        {/* First set of logos */}
        <div className="flex space-x-16 animate-loop-scroll">
            {logos.map((logo, index) => (
                <span key={index} className="text-xl font-display font-bold text-slate-400 hover:text-brand-blue transition-colors cursor-default tracking-tight whitespace-nowrap">
                    {logo}
                </span>
            ))}
        </div>
        
        {/* Duplicate set for seamless looping */}
        <div className="flex space-x-16 animate-loop-scroll" aria-hidden="true">
            {logos.map((logo, index) => (
                <span key={`dup-${index}`} className="text-xl font-display font-bold text-slate-400 hover:text-brand-blue transition-colors cursor-default tracking-tight whitespace-nowrap">
                    {logo}
                </span>
            ))}
        </div>
        
        {/* Third set to ensure no gaps on very large screens */}
        <div className="flex space-x-16 animate-loop-scroll" aria-hidden="true">
            {logos.map((logo, index) => (
                <span key={`dup2-${index}`} className="text-xl font-display font-bold text-slate-400 hover:text-brand-blue transition-colors cursor-default tracking-tight whitespace-nowrap">
                    {logo}
                </span>
            ))}
        </div>
      </div>
    </section>
  );
};