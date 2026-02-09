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
          // CORE BACKGROUND LAYERS
          black: '#020617',   // Slate 950 (Page BG)
          surface: '#0F172A', // Slate 900 (Section BG)
          card: '#1E293B',    // Slate 800 (Card BG)
          border: '#334155',  // Slate 700 (Borders)

          // BRAND ACCENTS
          blue: '#2563EB',    // Primary Action (Blue 600)
          cyan: '#06B6D4',    // Tech/Feature Accent (Cyan 500)
          indigo: '#4F46E5',  // Deep Accent

          // FUNCTIONAL
          orange: '#F97316',  // Revenue/Alerts
          green: '#10B981',   // Success
          purple: '#A855F7',  // AI/Magic
          red: '#EF4444',     // Error
        }
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(37, 99, 235, 0.3)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.3)',
        'glow-orange': '0 0 20px rgba(249, 115, 22, 0.3)',
        'card': '0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 6px -1px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 0 0 1px rgba(255, 255, 255, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.4)',
      },
      borderRadius: {
        'card': '16px',
        'btn': '8px',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        'brand-gradient': 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
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
