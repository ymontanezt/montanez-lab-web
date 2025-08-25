'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from './button'

type Theme = 'light' | 'dark'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          disabled
          className="h-8 w-8 border-slate-300 bg-white p-0 dark:border-slate-600 dark:bg-slate-800"
        >
          <Sun className="h-4 w-4 text-slate-400 dark:text-slate-500" />
        </Button>
      </div>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="h-8 w-8 border-slate-300 bg-white p-0 hover:border-slate-400 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:hover:border-slate-500 dark:hover:bg-slate-700"
    >
      {theme === 'light' ? (
        <Sun className="h-4 w-4 text-slate-700 dark:text-slate-300" />
      ) : (
        <Moon className="h-4 w-4 text-slate-700 dark:text-slate-300" />
      )}
      <span className="sr-only">
        {theme === 'light' ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro'}
      </span>
    </Button>
  )
}

// Hook simplificado para usar el tema en otros componentes
export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme)
    }
  }, [])

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)

    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(newTheme)
  }

  return {
    theme,
    changeTheme,
    mounted,
  }
}
