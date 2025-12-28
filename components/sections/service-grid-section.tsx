"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import { sectionStyles, responsive } from "@/lib/style-utils"

interface ServiceItem {
  title: string
  description: string
  icon: string
  href: string
  features: string[]
  color: string
}

interface ServiceGridSectionProps {
  services?: ServiceItem[]
  title?: string
  subtitle?: string
  className?: string
}

export function ServiceGridSection({
  services = [],
  title = "Our Service Divisions",
  subtitle = "Each division operates with specialized expertise while collaborating within our integrated ecosystem to deliver comprehensive solutions.",
  className,
}: ServiceGridSectionProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  if (services.length === 0) return null

  return (
    <section
      className={sectionStyles({
        padding: "lg",
        className,
      })}
    >
      <div className={responsive.container}>
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">{title}</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/50 flex flex-col h-full"
            >
              <CardHeader className="space-y-4">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center text-2xl flex-shrink-0`}
                >
                  {service.icon}
                </div>
                <div>
                  <CardTitle className="text-xl mb-2 line-clamp-2">{service.title}</CardTitle>
                  <CardDescription className="text-base line-clamp-2">{service.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 flex-1 flex flex-col">
                <div className="space-y-3 flex-1">
                  {service.features.slice(0, expandedCard === index ? undefined : 3).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground line-clamp-1">{feature}</span>
                    </div>
                  ))}
                  {service.features.length > 3 && (
                    <button
                      onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                      className="text-sm text-primary hover:underline font-medium pt-2"
                    >
                      {expandedCard === index ? "Less" : `More (${service.features.length - 3})`}
                    </button>
                  )}
                </div>
                <Button
                  asChild
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  <Link href={service.href} className="flex items-center justify-center space-x-2">
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}