import Image from "next/image"
import { sectionStyles, responsive } from "@/lib/style-utils"

interface ProcessStep {
  step: string
  title: string
  description: string
}

interface ProcessSectionProps {
  title?: string
  description?: string
  steps?: ProcessStep[]
  image?: {
    src: string
    alt: string
  }
  reverse?: boolean
  className?: string
}

export function ProcessSection({
  title = "Our Collaborative Process",
  description = "We follow a proven methodology that ensures successful project delivery while maintaining the highest standards of quality and innovation.",
  steps = [
    {
      step: "01",
      title: "Discovery & Analysis",
      description: "We understand your needs and challenges through comprehensive consultation.",
    },
    {
      step: "02",
      title: "Strategy & Planning",
      description: "Our experts develop a tailored strategy leveraging our integrated ecosystem.",
    },
    {
      step: "03",
      title: "Development & Implementation",
      description: "Multiple divisions collaborate to build and deploy your solution.",
    },
    {
      step: "04",
      title: "Support & Optimization",
      description: "Ongoing support and continuous improvement to ensure long-term success.",
    },
  ],
  image = {
    src: "/collaborative-technology-process-workflow.jpg",
    alt: "Boffins Technologies Collaborative Process",
  },
  reverse = false,
  className,
}: ProcessSectionProps) {
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
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-balance">{title}</h2>
              <p className="text-lg text-muted-foreground text-pretty">{description}</p>
            </div>
            <div className="space-y-6">
              {steps.map((process, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      {process.step}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{process.title}</h3>
                    <p className="text-muted-foreground text-pretty">{process.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative ${imageOrder}`}>
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              width={500}
              height={500}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
