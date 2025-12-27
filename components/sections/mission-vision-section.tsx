"use client"

import { useState } from "react"
import Image from "next/image"
import { Target, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

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
    src: "/images/boffins-vision-mission.png",
    alt: "Boffins Technology Mission and Vision",
  },
  reverse = false,
  className,
}: MissionVisionSectionProps) {
  const [expandedMission, setExpandedMission] = useState(false)
  const [expandedVision, setExpandedVision] = useState(false)

  const contentOrder = reverse ? "lg:order-2" : ""
  const imageOrder = reverse ? "lg:order-1" : ""

  return (
    <section className={cn("py-16 lg:py-20 px-4 sm:px-6 lg:px-8", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content Section */}
          <div className={cn("space-y-6", contentOrder)}>
            {/* Mission Card - Fixed dimensions */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <Target className="h-6 w-6 text-primary flex-shrink-0" />
                  <h2 className="text-2xl font-bold leading-none">{mission.title}</h2>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p
                  className={cn(
                    "text-sm leading-relaxed text-muted-foreground transition-all duration-300",
                    expandedMission ? "" : "line-clamp-3",
                  )}
                >
                  {mission.description}
                </p>
                {/* More/Less toggle button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedMission(!expandedMission)}
                  className="text-primary hover:text-primary/80 h-auto p-0 gap-1"
                >
                  {expandedMission ? (
                    <>
                      Less <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      More <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Vision Card - Fixed dimensions */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <Lightbulb className="h-6 w-6 text-primary flex-shrink-0" />
                  <h2 className="text-2xl font-bold leading-none">{vision.title}</h2>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p
                  className={cn(
                    "text-sm leading-relaxed text-muted-foreground transition-all duration-300",
                    expandedVision ? "" : "line-clamp-3",
                  )}
                >
                  {vision.description}
                </p>
                {/* More/Less toggle button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedVision(!expandedVision)}
                  className="text-primary hover:text-primary/80 h-auto p-0 gap-1"
                >
                  {expandedVision ? (
                    <>
                      Less <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      More <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Image Section */}
          <div className={cn("relative aspect-video overflow-hidden rounded-lg shadow-lg", imageOrder)}>
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  )
}