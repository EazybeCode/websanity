/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          // DARK THEME CORE BACKGROUND LAYERS
          black: '#020617',   // Slate 950 (Page BG)
          surface: '#0F172A', // Slate 900 (Section BG)
          card: '#1E293B',    // Slate 800 (Card BG)
          border: '#334155',  // Slate 700 (Borders)

          // LIGHT THEME COLORS
          light: {
            bg: '#f8fafc',           // Slate 50 (Light Page BG)
            surface: '#ffffff',      // White (Light Section/Card BG)
            card: '#f1f5f9',         // Slate 100 (Light Card BG)
            border: '#e2e8f0',       // Slate 200 (Light Borders)
            text: '#1e293b',         // Slate 800 (Primary Text)
            textMuted: '#64748b',    // Slate 500 (Secondary Text)
          },

          // BRAND ACCENTS
          blue: '#2563EB',    // Primary Action (Blue 600)
          cyan: '#06B6D4',    // Tech/Feature Accent (Cyan 500)
          indigo: '#4F46E5',  // Deep Accent
          violet: '#8B5CF6',  // Violet 500 (SaaS Gradient)
          purple: '#A855F7',  // Purple 500 (SaaS Gradient)

          // SAAS GRADIENT COLORS
          gradient: {
            from: '#6366f1',   // Indigo 500
            via: '#8b5cf6',    // Violet 500
            to: '#a855f7',     // Purple 500
          },

          // FUNCTIONAL
          orange: '#F97316',  // Revenue/Alerts
          green: '#10B981',   // Success
          red: '#EF4444',     // Error
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
