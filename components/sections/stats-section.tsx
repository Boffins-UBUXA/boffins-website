import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { sectionStyles, responsive } from "@/lib/style-utils"
import type { LucideIcon } from "lucide-react"

interface StatItem {
  icon: React.ReactElement<LucideIcon>
  value: string
  label: string
}

interface StatsSectionProps {
  stats?: StatItem[]
  title?: string
  className?: string
}

export function StatsSection({ stats = [], title, className }: StatsSectionProps) {
  if (stats.length === 0) return null

  return (
    <section
      className={sectionStyles({
        padding: "md",
        background: "muted",
        className,
      })}
    >
      <div className={responsive.container}>
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">{title}</h2>
          </div>
        )}
        <div className={`grid grid-cols-2 lg:grid-cols-${Math.min(stats.length, 4)} gap-8`}>
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="flex justify-center text-primary">{stat.icon}</div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
