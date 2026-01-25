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
    // Primary: Solid Brand Blue with glow
    primary: "bg-brand-blue text-white hover:bg-blue-700 shadow-glow-blue border border-brand-blue",

    // Secondary: Dark surface
    secondary: "bg-brand-card text-white hover:bg-slate-700 shadow-sm border border-slate-700",

    // Outline: For dark theme
    outline: "bg-transparent text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white shadow-sm",

    ghost: "bg-transparent text-slate-400 hover:bg-white/5 hover:text-white",
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