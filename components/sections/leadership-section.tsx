"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, ChevronDown, ChevronUp } from "lucide-react"
import { sectionStyles, responsive } from "@/lib/style-utils"

interface LeadershipRole {
  name: string
  role: string
  description: string
}

interface LeadershipSectionProps {
  leadership?: LeadershipRole[]
  title?: string
  subtitle?: string
  className?: string
}

function LeadershipCard({ leader }: { leader: LeadershipRole }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const shouldTruncate = leader.description.length > 150

  return (
    <Card className="hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center space-x-3 min-w-0">
          <Building className="h-6 w-6 text-primary flex-shrink-0" />
          <CardTitle className="text-lg truncate">{leader.name}</CardTitle>
        </div>
        <CardDescription className="font-medium text-primary truncate">
          {leader.role}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <div className="flex-grow">
          <p
            className={`text-muted-foreground text-pretty ${
              !isExpanded && shouldTruncate ? "line-clamp-3" : ""
            }`}
          >
            {leader.description}
          </p>
        </div>
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-sm font-medium text-primary hover:underline flex items-center gap-1 self-start"
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
  )
}

export function LeadershipSection({
  leadership = [],
  title = "Organizational Structure",
  subtitle = "Our lean but effective leadership structure ensures strategic alignment while maintaining operational efficiency across all divisions.",
  className,
}: LeadershipSectionProps) {
  if (leadership.length === 0) return null

  return (
    <section
      className={sectionStyles({
        padding: "lg",
        className,
      })}
    >
      <div className={responsive.container}>
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-balance mb-4 px-4">
            {title}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground text-pretty max-w-3xl mx-auto px-4">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {leadership.map((leader, index) => (
            <LeadershipCard key={index} leader={leader} />
          ))}
        </div>
      </div>
    </section>
  )
}