import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { componentStyles } from "./theme"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Style variant generator
export function createStyleVariants<T extends Record<string, Record<string, string>>>(base: string, variants: T) {
  return (props: { [K in keyof T]?: keyof T[K] } & { className?: string }) => {
    const variantClasses = Object.entries(variants)
      .map(([key, values]) => {
        const selectedVariant = props[key as keyof typeof props]
        return selectedVariant ? values[selectedVariant as string] : ""
      })
      .filter(Boolean)
      .join(" ")

    return cn(base, variantClasses, props.className)
  }
}

// Component style helpers
export const buttonStyles = createStyleVariants(componentStyles.button.base, componentStyles.button.variants)

export const cardStyles = createStyleVariants(componentStyles.card.base, componentStyles.card.variants)

export const sectionStyles = createStyleVariants(componentStyles.section.base, componentStyles.section.variants)

// Responsive utilities
export const responsive = {
  container: "container mx-auto px-4 sm:px-6 lg:px-8",
  grid: {
    cols1: "grid grid-cols-1",
    cols2: "grid grid-cols-1 md:grid-cols-2",
    cols3: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    cols4: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  },
  flex: {
    center: "flex items-center justify-center",
    between: "flex items-center justify-between",
    col: "flex flex-col",
    colCenter: "flex flex-col items-center justify-center",
  },
  text: {
    center: "text-center",
    left: "text-left",
    right: "text-right",
    balance: "text-balance",
    pretty: "text-pretty",
  },
  spacing: {
    section: "py-16 lg:py-20",
    sectionLarge: "py-20 lg:py-32",
    gap: "gap-4 md:gap-6 lg:gap-8",
    gapLarge: "gap-8 md:gap-12 lg:gap-16",
  },
}

// Animation utilities
export const animations = {
  fadeIn: "animate-in fade-in duration-500",
  slideUp: "animate-in slide-in-from-bottom-4 duration-500",
  slideDown: "animate-in slide-in-from-top-4 duration-500",
  scaleIn: "animate-in zoom-in-95 duration-300",
}
