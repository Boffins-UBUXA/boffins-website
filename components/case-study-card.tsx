import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { CaseStudy } from "@/lib/data/case-studies"

interface CaseStudyCardProps {
  study: CaseStudy
  featured?: boolean
}

export function CaseStudyCard({ study, featured = false }: CaseStudyCardProps) {
  if (featured) {
    return (
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          <div className="relative h-64 lg:h-full">
            <Image
              src={study.image || "/placeholder.svg"}
              alt={study.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary text-primary-foreground">{study.category}</Badge>
            </div>
          </div>
          <div className="p-8 flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">{study.title}</h3>
              <p className="text-lg text-muted-foreground">{study.subtitle}</p>
            </div>
            <p className="text-foreground line-clamp-3">{study.intro}</p>
            <Button asChild size="lg" className="w-fit">
              <Link href={`/case-studies/${study.slug}`} className="flex items-center space-x-2">
                <span>View Case Study</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <div className="relative w-full h-48">
        <Image
          src={study.image || "/placeholder.svg"}
          alt={study.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4">
          <Badge>{study.category}</Badge>
        </div>
      </div>
      <CardHeader className="flex-grow">
        <CardTitle className="text-xl">{study.title}</CardTitle>
        <CardDescription className="line-clamp-2">{study.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-foreground/80 line-clamp-3">{study.intro}</p>
        <Button asChild variant="outline" className="w-full bg-transparent">
          <Link href={`/case-studies/${study.slug}`} className="flex items-center justify-center space-x-2">
            <span>Learn More</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
