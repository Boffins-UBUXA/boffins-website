import type React from "react"
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
  if (benefits.length === 0) return null

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

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(benefits.length, 4)} gap-8`}>
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <CardContent className="space-y-4">
                <div className="flex justify-center text-primary">{benefit.icon}</div>
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground text-pretty">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
