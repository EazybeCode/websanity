import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'monospace'],
        display: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          black: '#020617',
          surface: '#0F172A',
          card: '#1E293B',
          border: '#334155',
          light: {
            bg: '#f8fafc',
            surface: '#ffffff',
            card: '#f1f5f9',
            border: '#e2e8f0',
            text: '#1e293b',
            textMuted: '#64748b',
          },
          blue: '#2563EB',
          cyan: '#06B6D4',
          indigo: '#4F46E5',
          violet: '#8B5CF6',
          purple: '#A855F7',
          gradient: {
            from: '#6366f1',
            via: '#8b5cf6',
            to: '#a855f7',
          },
          orange: '#F97316',
          green: '#10B981',
          red: '#EF4444',
        }
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(37, 99, 235, 0.3)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.3)',
        'glow-orange': '0 0 20px rgba(249, 115, 22, 0.3)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
        'card': '0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 6px -1px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 0 0 1px rgba(255, 255, 255, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.4)',
        'saas-light': '0 4px 20px rgba(99, 102, 241, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
        'saas-light-hover': '0 8px 30px rgba(99, 102, 241, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        'card': '16px',
        'btn': '8px',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        'brand-gradient': 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
        'saas-gradient': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
        'saas-gradient-subtle': 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 25%, #fce7f3 50%, #ecfdf5 75%, #fef3c7 100%)',
        'hero-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'card-gradient': 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
      },
      animation: {
        'loop-scroll': 'loop-scroll 40s linear infinite',
        'loop-scroll-reverse': 'loop-scroll-reverse 40s linear infinite',
        'scroll-hover': 'scroll-hover 60s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'radar': 'radar 4s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        'loop-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'loop-scroll-reverse': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        'scroll-hover': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-33.333%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fadeInUp': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'radar': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}

export default config
