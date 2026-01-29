import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'

interface ThemeToggleProps {
  variant?: 'desktop' | 'mobile'
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'desktop' }) => {
  const { theme, toggleTheme, isDark } = useTheme()

  if (variant === 'mobile') {
    return (
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-9 h-9 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Sun size={18} className="text-yellow-400" />
        ) : (
          <Moon size={18} className="text-slate-400" />
        )}
      </motion.div>
    </button>
  )
}

export default ThemeToggle
