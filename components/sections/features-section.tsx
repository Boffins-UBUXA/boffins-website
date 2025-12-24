"use client"

import { useState, useRef, useEffect } from "react"
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
    src: "/images/boffins-collaboration-model.png",
    alt: "Boffins Technology Team",
  },
  cta = {
    text: "Learn More About Us",
    href: "/about",
  },
  reverse = false,
  className,
}: FeaturesSectionProps) {
  const [descExpanded, setDescExpanded] = useState(false)
  const [featuresExpanded, setFeaturesExpanded] = useState(false)
  const [canExpandDesc, setCanExpandDesc] = useState(false)
  const [canExpandFeatures, setCanExpandFeatures] = useState(false)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const descEl = descriptionRef.current
    const featEl = featuresRef.current

    if (descEl) {
      setCanExpandDesc(descEl.scrollHeight > descEl.clientHeight)
    }

    if (featEl) {
      setCanExpandFeatures(featEl.scrollHeight > featEl.clientHeight)
    }
  }, [])

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
              
              {/* DESCRIPTION — WITH ELLIPSIS & SCROLL */}
              <div className="relative">
                <p
                  ref={descriptionRef}
                  className={`
                    text-lg 
                    text-muted-foreground 
                    text-pretty
                    transition-all
                    ${descExpanded 
                      ? "max-h-[150px] overflow-y-auto pr-2" 
                      : "line-clamp-3"
                    }
                  `}
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'hsl(var(--primary)) transparent'
                  }}
                >
                  {description}
                </p>

                {canExpandDesc && (
                  <button
                    type="button"
                    onClick={() => setDescExpanded(!descExpanded)}
                    className="
                      mt-1
                      text-sm
                      text-primary
                      hover:underline
                      font-medium
                    "
                  >
                    {descExpanded ? "Show less" : "Show more..."}
                  </button>
                )}
              </div>
            </div>

            {/* FEATURES LIST — WITH ELLIPSIS & SCROLL */}
            <div className="relative">
              <div
                ref={featuresRef}
                className={`
                  space-y-4
                  transition-all
                  ${featuresExpanded 
                    ? "max-h-[300px] overflow-y-auto pr-2" 
                    : "max-h-[200px] overflow-hidden"
                  }
                `}
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'hsl(var(--primary)) transparent'
                }}
              >
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground flex-1">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Gradient overlay when collapsed */}
              {!featuresExpanded && canExpandFeatures && (
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-muted to-transparent pointer-events-none" />
              )}

              {canExpandFeatures && (
                <button
                  type="button"
                  onClick={() => setFeaturesExpanded(!featuresExpanded)}
                  className="
                    mt-2
                    text-sm
                    text-primary
                    hover:underline
                    font-medium
                  "
                >
                  {featuresExpanded ? "Show less" : "Show more..."}
                </button>
              )}
            </div>

            <Button size="lg" asChild>
              <Link href={cta.href}>{cta.text}</Link>
            </Button>
          </div>

          <div className={`relative ${imageOrder}`}>
            <Image
              src={image.src}
              alt={image.alt}
              width={500}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        :global(.overflow-y-auto::-webkit-scrollbar) {
          width: 6px;
        }

        :global(.overflow-y-auto::-webkit-scrollbar-track) {
          background: transparent;
        }

        :global(.overflow-y-auto::-webkit-scrollbar-thumb) {
          background: hsl(var(--primary));
          border-radius: 3px;
        }

        :global(.overflow-y-auto::-webkit-scrollbar-thumb:hover) {
          background: hsl(var(--primary) / 0.8);
        }
      `}</style>
    </section>
  )
}