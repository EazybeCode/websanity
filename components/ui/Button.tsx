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
    // Primary: High-CTR Gradient with glow (Light & Dark mode)
    primary: "bg-saas-gradient text-white hover:opacity-90 shadow-glow-purple border border-transparent hover:shadow-glow-purple hover:scale-105",

    // Secondary: Trust Blue gradient
    secondary: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-glow-blue border border-transparent",

    // Outline: For both themes
    outline: "bg-transparent text-slate-600 dark:text-slate-300 border-2 border-slate-300 dark:border-slate-600 hover:border-brand-violet hover:text-brand-violet dark:hover:border-brand-violet dark:hover:text-brand-violet shadow-sm",

    // Ghost: Subtle
    ghost: "bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-brand-violet",
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