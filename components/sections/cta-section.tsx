"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { sectionStyles, responsive } from "@/lib/style-utils"
import { ChevronDown, ChevronUp } from "lucide-react"

interface CTASectionProps {
  title?: string
  description?: string
  primaryCTA?: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  background?: "primary" | "secondary" | "gradient"
  className?: string
}

export function CTASection({
  title = "Ready to Transform Your Business?",
  description = "Let's discuss how our specialized divisions can work together to deliver the perfect solution for your unique challenges.",
  primaryCTA = {
    text: "Start Your Project",
    href: "https://chat.whatsapp.com/FEOHmsZHBXTJEb5gsBSjlS",
  },
  secondaryCTA = {
    text: "View All Services",
    href: "/services",
  },
  background = "primary",
  className,
}: CTASectionProps) {
  const [descExpanded, setDescExpanded] = useState(false)
  const shouldTruncateDesc = description.length > 150

  const bgClass =
    background === "gradient"
      ? "bg-gradient-to-r from-primary to-primary/80"
      : background === "secondary"
        ? "bg-secondary"
        : "bg-primary"

  return (
    <section
      className={sectionStyles({
        padding: "lg",
        className: `${bgClass} ${className}`,
      })}
    >
      <div className={`${responsive.container} text-center`}>
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground text-balance">{title}</h2>
          
          <div>
            <p
              className={`text-xl text-primary-foreground/90 text-pretty ${
                !descExpanded && shouldTruncateDesc ? "line-clamp-3" : ""
              }`}
            >
              {description}
            </p>

            {shouldTruncateDesc && (
              <button
                type="button"
                onClick={() => setDescExpanded(!descExpanded)}
                className="mt-2 text-sm text-primary-foreground hover:underline font-medium inline-flex items-center gap-1"
              >
                {descExpanded ? (
                  <>
                    Less <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    More <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}