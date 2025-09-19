import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building } from "lucide-react"
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
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">{title}</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leadership.map((leader, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Building className="h-6 w-6 text-primary" />
                  <CardTitle className="text-lg">{leader.name}</CardTitle>
                </div>
                <CardDescription className="font-medium text-primary">{leader.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-pretty">{leader.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
