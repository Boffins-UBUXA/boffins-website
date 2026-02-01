"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Award, Zap, Target } from "lucide-react"
import { caseStudies, caseStudyCategories, caseStudyDivisions, type CaseStudy } from "@/lib/data/case-studies-data"

// Case Study Card Component
function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <div className="relative h-64 w-full overflow-hidden bg-muted">
        <Image
          src={caseStudy.image || "/placeholder.svg"}
          alt={caseStudy.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge>{caseStudy.category}</Badge>
          <Badge variant="secondary">{caseStudy.division}</Badge>
        </div>
      </div>
      <CardContent className="flex-1 p-6 flex flex-col justify-between">
        <div className="space-y-3">
          <h3 className="text-xl font-bold line-clamp-2">{caseStudy.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">{caseStudy.excerpt}</p>

          {caseStudy.metrics && caseStudy.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {caseStudy.metrics.slice(0, 2).map((metric, idx) => (
                <div key={idx} className="bg-muted p-2 rounded">
                  <div className="text-xs text-muted-foreground">{metric.label}</div>
                  <div className="font-bold text-sm">{metric.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Button asChild className="mt-4 w-full">
          <Link href={`/case-studies/${caseStudy.slug}`} className="flex items-center justify-center gap-2">
            View Case Study
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

// Main Case Studies Page Content Component
export default function CaseStudiesContent() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDivision, setSelectedDivision] = useState("All")

  const filteredCaseStudies = caseStudies.filter((study) => {
    const matchesCategory = selectedCategory === "All" || study.category === selectedCategory
    const matchesDivision = selectedDivision === "All" || study.division === selectedDivision
    return matchesCategory && matchesDivision
  })

  const stats = [
    { icon: Target, label: "Projects Completed", value: caseStudies.length.toString() },
    { icon: Award, label: "Industries Served", value: "8+" },
    { icon: Zap, label: "Success Rate", value: "100%" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <Badge variant="secondary" className="w-fit mx-auto">
              <Award className="h-3 w-3 mr-1" />
              Success Stories
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-balance">
              Case Studies: How We <span className="text-primary">Transform Businesses</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
              Explore real-world examples of how Boffins Technology has helped companies across different industries
              achieve their goals through innovative technology solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/50 border-y">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div key={idx} className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">Filter by Category</h3>
              <div className="flex flex-wrap gap-2">
                {caseStudyCategories.map((category, idx) => (
                  <Button
                    key={idx}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">Filter by Division</h3>
              <div className="flex flex-wrap gap-2">
                {caseStudyDivisions.map((division, idx) => (
                  <Button
                    key={idx}
                    variant={selectedDivision === division ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDivision(division)}
                  >
                    {division}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">Featured Case Studies</h2>
            <p className="text-muted-foreground">
              {filteredCaseStudies.length} case {filteredCaseStudies.length !== 1 ? "studies" : "study"} available
            </p>
          </div>

          {filteredCaseStudies.length === 0 ? (
            <Card className="p-12">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">No Case Studies Found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters to see more case studies.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory("All")
                    setSelectedDivision("All")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCaseStudies.map((caseStudy, idx) => (
                <CaseStudyCard key={idx} caseStudy={caseStudy} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-balance">
                Ready to Transform Your Business?
              </h2>
              <p className="text-lg text-muted-foreground">
                Let's discuss how Boffins Technology can help you achieve your goals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/services">Explore Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
