import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle } from "lucide-react"
import { sectionStyles, responsive } from "@/lib/style-utils"

interface FeaturesSectionProps {
  title?: string
  description?: string
  features?: string[]
  image?: {
    src: string
    alt: string
  }
  cta?: {
    text: string
    href: string
  }
  reverse?: boolean
  className?: string
}

export function FeaturesSection({
  title = "Why Choose Boffins Technology?",
  description = "Our strength lies in collaboration and innovation. Each division brings unique expertise while working together to deliver exceptional results.",
  features = [
    "Diverse expertise across multiple technology domains",
    "Collaborative approach with shared talent pool",
    "Proven track record with 95% project success rate",
    "24/7 support and ongoing maintenance",
    "Scalable solutions that grow with your business",
  ],
  image = {
    src: "/diverse-team-of-technology-professionals-collabora.jpg",
    alt: "Boffins Technology Team",
  },
  cta = {
    text: "Learn More About Us",
    href: "/about",
  },
  reverse = false,
  className,
}: FeaturesSectionProps) {
  const contentOrder = reverse ? "lg:order-2" : ""
  const imageOrder = reverse ? "lg:order-1" : ""

  return (
    <section
      className={sectionStyles({
        padding: "lg",
        background: "muted",
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
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
            <Button size="lg" asChild>
              <Link href={cta.href}>{cta.text}</Link>
            </Button>
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
