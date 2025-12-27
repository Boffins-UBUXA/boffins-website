"use client"

import { useState } from "react"
import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { sectionStyles, responsive } from "@/lib/style-utils"
import type { LucideIcon } from "lucide-react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface Value {
  icon: React.ReactElement<LucideIcon>
  title: string
  description: string
}

interface ValuesSectionProps {
  values?: Value[]
  title?: string
  subtitle?: string
  className?: string
}

function ValueCard({ value }: { value: Value }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const shouldTruncate = value.description.length > 120

  return (
    <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <CardContent className="space-y-4 flex flex-col flex-grow p-0">
        <div className="flex justify-center text-primary flex-shrink-0">{value.icon}</div>
        <h3 className="text-xl font-semibold truncate px-2">{value.title}</h3>
        <div className="flex-grow flex flex-col">
          <p
            className={`text-muted-foreground text-pretty ${
              !isExpanded && shouldTruncate ? "line-clamp-3" : ""
            }`}
          >
            {value.description}
          </p>
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-3 text-sm font-medium text-primary hover:underline flex items-center gap-1 mx-auto"
            >
              {isExpanded ? (
                <>
                  Less <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  More <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function ValuesSection({
  values = [],
  title = "Our Core Values",
  subtitle = "These values guide every decision we make and every solution we create across all our divisions.",
  className,
}: ValuesSectionProps) {
  if (values.length === 0) return null

  const gridCols = values.length === 1 
    ? "grid-cols-1" 
    : values.length === 2 
    ? "grid-cols-1 md:grid-cols-2" 
    : values.length === 3
    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"

  return (
    <section
      className={sectionStyles({
        padding: "lg",
        background: "muted",
        className,
      })}
    >
      <div className={responsive.container}>
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-balance mb-4 px-4">{title}</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground text-pretty max-w-3xl mx-auto px-4">
            {subtitle}
          </p>
        </div>

        <div className={`grid ${gridCols} gap-6 lg:gap-8`}>
          {values.map((value, index) => (
            <ValueCard key={index} value={value} />
          ))}
        </div>
      </div>
    </section>
  )
}