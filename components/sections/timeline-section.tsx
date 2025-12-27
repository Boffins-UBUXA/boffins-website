"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { sectionStyles, responsive } from "@/lib/style-utils"
import { ChevronDown, ChevronUp } from "lucide-react"

interface TimelineItem {
  year: string
  title: string
  description: string
}

interface TimelineSectionProps {
  items?: TimelineItem[]
  title?: string
  subtitle?: string
  className?: string
}

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const shouldTruncate = item.description.length > 150

  return (
    <>
      <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
        <Card className="hover:shadow-lg transition-all duration-300 flex flex-col h-full">
          <CardHeader className="flex-shrink-0">
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-primary">{item.year}</span>
            </div>
            <CardTitle className="text-xl truncate">{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <div className="flex-grow">
              <p
                className={`text-muted-foreground text-pretty ${
                  !isExpanded && shouldTruncate ? "line-clamp-3" : ""
                }`}
              >
                {item.description}
              </p>
            </div>
            {shouldTruncate && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`mt-3 text-sm font-medium text-primary hover:underline flex items-center gap-1 ${
                  index % 2 === 0 ? "ml-auto" : "mr-auto"
                }`}
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
          </CardContent>
        </Card>
      </div>
      <div className="relative z-10">
        <div className="w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
      </div>
      <div className="w-1/2"></div>
    </>
  )
}

export function TimelineSection({
  items = [],
  title = "Our Journey",
  subtitle = "From a single vision to a diversified technology ecosystem - here's how we've grown and evolved.",
  className,
}: TimelineSectionProps) {
  if (items.length === 0) return null

  return (
    <section
      className={sectionStyles({
        padding: "lg",
        background: "muted",
        className,
      })}
    >
      <div className={responsive.container}>
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">{title}</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20"></div>
          <div className="space-y-12">
            {items.map((item, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                <TimelineCard item={item} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}