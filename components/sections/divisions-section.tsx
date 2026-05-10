import type React from "react"
import { DivisionCard } from "@/components/division-card"
import { sectionStyles, responsive } from "@/lib/style-utils"
import { Code, Cpu, GraduationCap, HardDrive, Megaphone, type LucideIcon } from "lucide-react"

const iconMap = {
  Code,
  Cpu,
  GraduationCap,
  HardDrive,
  Megaphone,
}

interface Division {
  title: string
  description: string
  features: string[]
  href: string
  icon?: React.ReactElement<LucideIcon> | keyof typeof iconMap | string
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
          {divisions.map((division, index) => {
            const Icon = typeof division.icon === "string" ? iconMap[division.icon as keyof typeof iconMap] : null
            const icon = Icon ? <Icon className="h-6 w-6" /> : division.icon || <Cpu className="h-6 w-6" />

            return <DivisionCard key={index} {...division} icon={icon} />
          })}
        </div>
      </div>
    </section>
  )
}
