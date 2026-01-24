import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children,
  icon,
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-sans font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed rounded-btn tracking-tight active:scale-[0.98]";
  
  const variants = {
    // Primary: Solid Brand Blue
    primary: "bg-brand-blue text-white hover:bg-blue-700 shadow-sm border border-transparent",
    
    // Secondary: Dark
    secondary: "bg-brand-ink text-white hover:bg-slate-800 shadow-sm border border-transparent",
    
    // Outline: Clean border
    outline: "bg-white text-slate-700 border border-slate-300 hover:border-brand-blue hover:text-brand-blue shadow-sm",
    
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2 text-sm",
    lg: "px-8 py-3 text-base",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="flex items-center gap-2">
        {children}
        {icon && <span>{icon}</span>}
      </span>
    </button>
  );
};