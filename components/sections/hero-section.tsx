"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { sectionStyles, responsive } from "@/lib/style-utils"

interface HeroSectionProps {
  title?: string
  subtitle?: string
  description?: string
  primaryCTA?: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  heroImage?: {
    src: string
    alt: string
  }
  className?: string
}

export function HeroSection({
  title = "Digitizing Africa's",
  subtitle = "Enterprises",
  description = "Boffins Technology is a diversified technology holding company with specialized subsidiaries in education, products, hardware, media, and bespoke solutions. We transform ideas into reality.",
  primaryCTA = {
    text: "Explore Our Services",
    href: "/services",
  },
  secondaryCTA = {
    text: "Get In Touch",
    href: "/contact",
  },
  heroImage = {
    src: "/modern-technology-workspace-with-multiple-screens-.jpg",
    alt: "Boffins Technology Innovation",
  },
  className,
}: HeroSectionProps) {
  const [descExpanded, setDescExpanded] = useState(false)
  const [canExpandDesc, setCanExpandDesc] = useState(false)
  const descriptionRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const descEl = descriptionRef.current

    if (descEl) {
      setCanExpandDesc(descEl.scrollHeight > descEl.clientHeight)
    }
  }, [])

  return (
    <section
      className={sectionStyles({
        padding: "xl",
        background: "gradient",
        className,
      })}
    >
      <div className={responsive.container}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                {title} <span className="text-primary">{subtitle}</span>
              </h1>
              
              {/* DESCRIPTION — WITH ELLIPSIS & SCROLL */}
              <div className="relative">
                <p
                  ref={descriptionRef}
                  className={`
                    text-xl 
                    text-muted-foreground 
                    text-pretty 
                    leading-relaxed
                    transition-all
                    ${descExpanded 
                      ? "max-h-[200px] overflow-y-auto pr-2" 
                      : "line-clamp-4"
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
                      mt-2
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

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href={primaryCTA.href} className="flex items-center space-x-2">
                  <span>{primaryCTA.text}</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <Image
                src={heroImage.src || "/placeholder.svg"}
                alt={heroImage.alt}
                width={600}
                height={500}
                className="rounded-lg shadow-2xl"
                priority
              />
            </div>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
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