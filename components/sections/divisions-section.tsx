import type React from "react"
import { DivisionCard } from "@/components/division-card"
import { sectionStyles, responsive } from "@/lib/style-utils"
import type { LucideIcon } from "lucide-react"

interface Division {
  title: string
  description: string
  features: string[]
  href: string
  icon: React.ReactElement<LucideIcon>
}

interface DivisionsSectionProps {
  divisions?: Division[]
  title?: string
  subtitle?: string
  className?: string
}

export function DivisionsSection({
  divisions = [],
  title = "Our Specialized Divisions",
  subtitle = "Each division operates semi-independently while collaborating within the Boffins ecosystem to deliver comprehensive technology solutions.",
  className,
}: DivisionsSectionProps) {
  if (divisions.length === 0) return null

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {divisions.map((division, index) => (
            <DivisionCard key={index} {...division} />
          ))}
        </div>
      </div>
    </section>
  )
}
