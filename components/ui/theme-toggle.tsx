'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { Button } from './button'
import { cn } from '@/lib/utils'

type Theme = 'light' | 'dark' | 'system'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }

    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
  }

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" disabled>
          <Sun className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-background flex items-center space-x-1 rounded-lg border p-1">
      <Button
        variant={theme === 'light' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => handleThemeChange('light')}
        className={cn('h-8 w-8 p-0', theme === 'light' && 'bg-primary text-primary-foreground')}
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Tema claro</span>
      </Button>

      <Button
        variant={theme === 'system' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => handleThemeChange('system')}
        className={cn('h-8 w-8 p-0', theme === 'system' && 'bg-primary text-primary-foreground')}
      >
        <Monitor className="h-4 w-4" />
        <span className="sr-only">Tema del sistema</span>
      </Button>

      <Button
        variant={theme === 'dark' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => handleThemeChange('dark')}
        className={cn('h-8 w-8 p-0', theme === 'dark' && 'bg-primary text-primary-foreground')}
      >
        <Moon className="h-4 w-4" />
        <span className="sr-only">Tema oscuro</span>
      </Button>
    </div>
  )
}

// Hook para usar el tema en otros componentes
export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)

    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(newTheme)
    }
  }

  return {
    theme,
    changeTheme,
    mounted,
  }
}
