"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { sectionStyles, responsive } from "@/lib/style-utils"
import { ChevronDown, ChevronUp } from "lucide-react"

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
    alt: "Boffins Technology Collaborative Process",
  },
  reverse = false,
  className,
}: ProcessSectionProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)
  const [showAllSteps, setShowAllSteps] = useState(false)
  const contentOrder = reverse ? "lg:order-2" : ""
  const imageOrder = reverse ? "lg:order-1" : ""

  const displaySteps = showAllSteps ? steps : steps.slice(0, 4)
  const hasMoreSteps = steps.length > 4

  return (
    <>
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
                {displaySteps.map((process, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {process.step}
                      </div>
                    </div>
                    <div className="flex-1 space-y-2 min-w-0">
                      <h3 className="text-lg font-semibold">{process.title}</h3>
                      <p
                        className={`text-muted-foreground text-pretty ${expandedStep !== index ? "line-clamp-2" : ""}`}
                      >
                        {process.description}
                      </p>
                      {process.description.length > 80 && (
                        <button
                          onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                          className="text-sm text-primary hover:underline font-medium inline-flex items-center gap-1 mt-2"
                        >
                          {expandedStep === index ? (
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
                  </div>
                ))}
              </div>
              {hasMoreSteps && !showAllSteps && (
                <Button onClick={() => setShowAllSteps(true)} variant="outline" className="w-full">
                  View All {steps.length} Steps
                </Button>
              )}
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

      <Dialog open={showAllSteps} onOpenChange={setShowAllSteps}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {steps.map((process, index) => (
              <div key={index} className="flex space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {process.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{process.title}</h3>
                  <p className="text-muted-foreground text-pretty mt-2">{process.description}</p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
