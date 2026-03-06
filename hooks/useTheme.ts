import { useState, useEffect, useCallback } from 'react'

export type Theme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'theme'

function getInitialTheme(): Theme {
  // Check localStorage first
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') {
      return stored
    }
  }
  // Default to dark mode
  return 'dark'
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark',
  }
}

export default useTheme
