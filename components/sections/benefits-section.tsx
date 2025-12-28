"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { sectionStyles, responsive } from "@/lib/style-utils"
import type { LucideIcon } from "lucide-react"

interface Benefit {
  icon: React.ReactElement<LucideIcon>
  title: string
  description: string
}

interface BenefitsSectionProps {
  benefits?: Benefit[]
  title?: string
  subtitle?: string
  className?: string
}

export function BenefitsSection({
  benefits = [],
  title = "Why Choose Boffins Technology?",
  subtitle = "Our unique approach combines specialized expertise with collaborative innovation to deliver exceptional results.",
  className,
}: BenefitsSectionProps) {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())

  if (benefits.length === 0) return null

  const toggleExpand = (index: number) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedCards(newExpanded)
  }

  const getGridCols = () => {
    if (benefits.length <= 2) return "lg:grid-cols-2"
    if (benefits.length <= 3) return "lg:grid-cols-3"
    return "lg:grid-cols-4"
  }

  return (
    <section
      className={sectionStyles({
        padding: "lg",
        className,
      })}
    >
      <div className={responsive.container}>
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">{title}</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 ${getGridCols()} gap-8`}>
          {benefits.map((benefit, index) => {
            const isExpanded = expandedCards.has(index)
            return (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-lg transition-all duration-300 h-full flex flex-col"
              >
                <CardContent className="space-y-4 flex flex-col items-center flex-grow">
                  <div className="flex justify-center text-primary">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold line-clamp-2">{benefit.title}</h3>
                  <p className={`text-muted-foreground text-pretty ${!isExpanded ? "line-clamp-3" : ""}`}>
                    {benefit.description}
                  </p>
                  <button
                    onClick={() => toggleExpand(index)}
                    className="text-primary hover:underline text-sm font-medium mt-auto pt-2"
                  >
                    {isExpanded ? "See Less" : "See More"}
                  </button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}