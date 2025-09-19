"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { theme, generateCSSVariables } from "@/lib/theme"

// Theme context for accessing theme values in components
const ThemeContext = React.createContext<typeof theme>(theme)

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Inject CSS variables on mount
  React.useEffect(() => {
    const cssVars = generateCSSVariables()
    const root = document.documentElement

    Object.entries(cssVars).forEach(([property, value]) => {
      root.style.setProperty(property, value)
    })
  }, [])

  return (
    <NextThemesProvider {...props}>
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </NextThemesProvider>
  )
}

// Hook to access theme values
export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

// Utility hook for component styling
export const useComponentStyles = () => {
  const themeContext = React.useContext(ThemeContext)
  return {
    theme: themeContext,
    getStyles: (component: keyof typeof themeContext.componentStyles, variant?: string, size?: string) => {
      // Implementation for getting component styles
      return ""
    },
  }
}
