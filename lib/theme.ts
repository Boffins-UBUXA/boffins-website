export const theme = {
  // Brand Colors - Boffins Technologies
  colors: {
    brand: {
      primary: "oklch(0.55 0.15 200)", // Teal
      secondary: "oklch(0.65 0.2 25)", // Orange
      accent: "oklch(0.7 0.1 200)", // Light teal
    },
    semantic: {
      success: "oklch(0.6 0.15 140)",
      warning: "oklch(0.7 0.2 60)",
      error: "oklch(0.577 0.245 27.325)",
      info: "oklch(0.55 0.15 200)",
    },
    neutral: {
      white: "oklch(1 0 0)",
      black: "oklch(0.2 0 0)",
      gray: {
        50: "oklch(0.98 0.01 180)",
        100: "oklch(0.96 0.01 180)",
        200: "oklch(0.9 0.01 180)",
        300: "oklch(0.8 0.01 180)",
        400: "oklch(0.6 0 0)",
        500: "oklch(0.5 0 0)",
        600: "oklch(0.4 0 0)",
        700: "oklch(0.3 0 0)",
        800: "oklch(0.2 0 0)",
        900: "oklch(0.15 0 0)",
      },
    },
  },

  // Typography System
  typography: {
    fontFamily: {
      sans: "var(--font-geist-sans)",
      mono: "var(--font-geist-mono)",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    lineHeight: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.625",
    },
  },

  // Spacing System
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
    "4xl": "6rem",
    "5xl": "8rem",
  },

  // Border Radius
  borderRadius: {
    sm: "calc(var(--radius) - 4px)",
    md: "calc(var(--radius) - 2px)",
    lg: "var(--radius)",
    xl: "calc(var(--radius) + 4px)",
    full: "9999px",
  },

  // Shadows
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  },

  // Animation Durations
  animation: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
  },

  // Breakpoints
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
} as const

// Theme utility functions
export const getThemeValue = (path: string) => {
  return path.split(".").reduce((obj, key) => obj?.[key], theme)
}

// CSS custom properties generator
export const generateCSSVariables = () => {
  const cssVars: Record<string, string> = {}

  // Generate color variables
  Object.entries(theme.colors.brand).forEach(([key, value]) => {
    cssVars[`--color-brand-${key}`] = value
  })

  Object.entries(theme.colors.semantic).forEach(([key, value]) => {
    cssVars[`--color-${key}`] = value
  })

  Object.entries(theme.colors.neutral.gray).forEach(([key, value]) => {
    cssVars[`--color-gray-${key}`] = value
  })

  // Generate spacing variables
  Object.entries(theme.spacing).forEach(([key, value]) => {
    cssVars[`--spacing-${key}`] = value
  })

  return cssVars
}

// Component style variants
export const componentStyles = {
  button: {
    base: "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    variants: {
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-8 text-lg",
      },
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
    },
  },
  card: {
    base: "rounded-lg border bg-card text-card-foreground shadow-sm",
    variants: {
      padding: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      elevation: {
        flat: "shadow-none",
        low: "shadow-sm",
        medium: "shadow-md",
        high: "shadow-lg",
      },
    },
  },
  section: {
    base: "w-full",
    variants: {
      padding: {
        sm: "py-8",
        md: "py-16",
        lg: "py-20",
        xl: "py-24",
      },
      background: {
        default: "bg-background",
        muted: "bg-muted/50",
        primary: "bg-primary",
        gradient: "bg-gradient-to-br from-primary/5 via-background to-secondary/5",
      },
    },
  },
}
