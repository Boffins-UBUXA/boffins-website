import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { sectionStyles, responsive } from "@/lib/style-utils"

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
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl font-bold text-primary">{item.year}</span>
                      </div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-pretty">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="relative z-10">
                  <div className="w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                </div>
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
