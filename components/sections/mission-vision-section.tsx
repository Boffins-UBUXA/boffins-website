import Image from "next/image"
import { Target, Lightbulb } from "lucide-react"
import { sectionStyles, responsive } from "@/lib/style-utils"

interface MissionVisionSectionProps {
  mission?: {
    title?: string
    description: string
  }
  vision?: {
    title?: string
    description: string
  }
  image?: {
    src: string
    alt: string
  }
  reverse?: boolean
  className?: string
}

export function MissionVisionSection({
  mission = {
    title: "Our Mission",
    description:
      "To democratize technology by providing world-class education, innovative products, and bespoke solutions that empower businesses and individuals to thrive in the digital age.",
  },
  vision = {
    title: "Our Vision",
    description:
      "To be the leading technology ecosystem that bridges the gap between innovation and practical application, creating sustainable value for all stakeholders.",
  },
  image = {
    src: "/placeholder.svg?key=mission",
    alt: "Boffins Technologies Mission and Vision",
  },
  reverse = false,
  className,
}: MissionVisionSectionProps) {
  const contentOrder = reverse ? "lg:order-2" : ""
  const imageOrder = reverse ? "lg:order-1" : ""

  return (
    <section
      className={sectionStyles({
        padding: "lg",
        className,
      })}
    >
      <div className={responsive.container}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 ${contentOrder}`}>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Target className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl font-bold">{mission.title}</h2>
                </div>
                <p className="text-lg text-muted-foreground text-pretty leading-relaxed">{mission.description}</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Lightbulb className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl font-bold">{vision.title}</h2>
                </div>
                <p className="text-lg text-muted-foreground text-pretty leading-relaxed">{vision.description}</p>
              </div>
            </div>
          </div>
          <div className={`relative ${imageOrder}`}>
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              width={500}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
