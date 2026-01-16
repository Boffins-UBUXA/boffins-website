"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Zap, Users, TrendingUp, Shield, CheckCircle, Star, Battery, Video, X } from "lucide-react"

export default function ProductsPage() {
  const [expandedProducts, setExpandedProducts] = useState<{ [key: number]: boolean }>({})

  const toggleProductExpand = (index: number) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const products = [
    {
      name: "Ubuxa",
      tagline: "Renewable Energy Management Solution",
      description:
        "Comprehensive platform for monitoring, managing, and optimizing renewable energy systems with real-time analytics and predictive maintenance.",
      icon: <Battery className="h-8 w-8" />,
      features: [
        "Real-time energy monitoring",
        "Predictive maintenance alerts",
        "Performance optimization",
        "Cost analysis and reporting",
        "Grid integration management",
        "Mobile and web dashboards",
      ],
      benefits: [
        "Reduce energy costs by up to 30%",
        "Increase system efficiency",
        "Minimize downtime",
        "Environmental impact tracking",
      ],
      image: "/renewable-energy-dashboard-solar-panels-monitoring.jpg",
      color: "from-green-500 to-emerald-500",
      category: "Energy Management",
      website: "https://www.ubuxa.ng/",
    },
    {
      name: "Vikmid",
      tagline: "Creator Management Solution",
      description:
        "All-in-one platform for content creators to manage their brand, audience, collaborations, and revenue streams across multiple platforms.",
      icon: <Video className="h-8 w-8" />,
      features: [
        "Multi-platform content scheduling",
        "Audience analytics and insights",
        "Collaboration management",
        "Revenue tracking and optimization",
        "Brand partnership tools",
        "Content performance metrics",
      ],
      benefits: [
        "Streamline content workflow",
        "Increase audience engagement",
        "Maximize revenue opportunities",
        "Professional brand management",
      ],
      image: "/content-creator-dashboard-social-media-analytics.jpg",
      color: "from-purple-500 to-pink-500",
      category: "Creator Tools",
      website: "https://www.vicmid.ng/",
    },
  ]

  const testimonials = [
    {
      name: "David Thompson",
      company: "GreenTech Solutions",
      product: "Ubuxa",
      image: "/professional-man-energy-company.jpg",
      testimonial:
        "Ubuxa has revolutionized how we manage our solar installations. The predictive maintenance feature alone has saved us thousands in repair costs. We've seen a 35% improvement in system efficiency and our maintenance team now responds to issues before they become problems.",
      rating: 5,
    },
    {
      name: "Sarah Martinez",
      company: "Creative Studios Inc",
      product: "Vikmid",
      image: "/professional-woman-content-creator.jpg",
      testimonial:
        "As a content creator managing multiple platforms, Vikmid has been a game-changer. My engagement rates have increased by 60% since using it. The analytics dashboard provides insights that help me optimize content strategy, and the scheduling feature saves hours every week.",
      rating: 5,
    },
  ]

  const stats = [
    { label: "Active Users", value: "100+", icon: <Users className="h-6 w-6" /> },
    { label: "Revenue Earned", value: "$5M+", icon: <TrendingUp className="h-6 w-6" /> },
    { label: "Uptime", value: "99.9%", icon: <Shield className="h-6 w-6" /> },
    { label: "Customer Satisfaction", value: "4.9/5", icon: <Star className="h-6 w-6" /> },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <Badge variant="secondary" className="w-fit mx-auto">
              Product Division
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-balance">
              Innovative <span className="text-primary">Software Products</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
              Discover our suite of cutting-edge software products designed to solve real-world problems and drive
              business growth across various industries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="#products">Explore Products</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="flex justify-center text-primary">{stat.icon}</div>
                <div className="text-2xl lg:text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Our Product Portfolio</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Each product is built with cutting-edge technology and designed to address specific industry challenges.
            </p>
          </div>

          <div className="space-y-20">
            {products.map((product, index) => {
              const isExpanded = expandedProducts[index] || false
              const visibleFeatures = isExpanded ? product.features : product.features.slice(0, 3)
              const visibleBenefits = isExpanded ? product.benefits : product.benefits.slice(0, 2)
              const hasMoreFeatures = product.features.length > 3
              const hasMoreBenefits = product.benefits.length > 2

              return (
                <div
                  key={index}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                >
                  <div className={`space-y-8 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <div className="space-y-4">
                      <Badge variant="outline">{product.category}</Badge>
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-16 h-16 rounded-full bg-gradient-to-r ${product.color} flex items-center justify-center text-white`}
                        >
                          {product.icon}
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold">{product.name}</h3>
                          <p className="text-lg text-primary font-medium">{product.tagline}</p>
                        </div>
                      </div>
                      <p className="text-lg text-muted-foreground text-pretty">{product.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Key Features:</h4>
                        <ul className="space-y-2">
                          {visibleFeatures.map((feature: string, featureIndex: number) => (
                            <li key={featureIndex} className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                          {hasMoreFeatures && (
                            <li>
                              <button
                                onClick={() => toggleProductExpand(index)}
                                className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                              >
                                {isExpanded ? "See Less" : `See More (${product.features.length - 3}+)`}
                              </button>
                            </li>
                          )}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Benefits:</h4>
                        <ul className="space-y-2">
                          {visibleBenefits.map((benefit: string, benefitIndex: number) => (
                            <li key={benefitIndex} className="flex items-start space-x-2">
                              <Zap className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                              <span className="text-sm text-muted-foreground">{benefit}</span>
                            </li>
                          ))}
                          {hasMoreBenefits && (
                            <li>
                              <button
                                onClick={() => toggleProductExpand(index)}
                                className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                              >
                                {isExpanded ? "See Less" : `See More (${product.benefits.length - 2}+)`}
                              </button>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button size="lg" asChild>
                        <Link
                          href={product.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2"
                        >
                          <span>Get Started</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="lg" variant="outline" asChild>
                        <Link href="/contact">Learn More</Link>
                      </Button>
                    </div>
                  </div>

                  <div className={`relative ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={`${product.name} Dashboard`}
                      width={600}
                      height={400}
                      className="rounded-lg shadow-xl"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              See how our products have transformed businesses and improved operational efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground text-balance">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-primary-foreground/90 text-pretty">
              Join thousands of satisfied customers who have improved their operations with our innovative products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link
                  href="https://wa.me/?text=Hi,%20I'm%20interested%20in%20learning%20more%20about%20your%20products"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Let's Talk
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: any }) {
  const [modalOpen, setModalOpen] = useState(false)
  const testimonialPreview =
    testimonial.testimonial.length > 120 ? testimonial.testimonial.substring(0, 120) + "..." : testimonial.testimonial

  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-300 flex flex-col h-full min-h-80">
        <CardHeader className="space-y-4 flex-shrink-0">
          <div className="flex items-center gap-4">
            <Image
              src={testimonial.image || "/placeholder.svg"}
              alt={testimonial.name}
              width={50}
              height={50}
              className="rounded-full w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 object-cover"
            />
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base sm:text-lg line-clamp-1">{testimonial.name}</CardTitle>
              <CardDescription className="text-xs sm:text-sm line-clamp-1">{testimonial.company}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-xs w-fit">
            {testimonial.product}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4 flex-1 flex flex-col">
          {/* Star rating */}
          <div className="flex gap-1 flex-shrink-0">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          {/* Truncated testimonial text */}
          <div className="flex-1">
            <p className="text-muted-foreground text-sm sm:text-base text-pretty italic line-clamp-4">
              "{testimonialPreview}"
            </p>
          </div>

          {/* View more button */}
          {testimonial.testimonial.length > 120 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setModalOpen(true)}
              className="text-primary border-primary hover:bg-primary/10"
            >
              Read Full Review
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl max-w-md w-full">
            <div className="sticky top-0 flex items-center justify-between p-6 bg-card border-b">
              <h2 className="text-xl font-bold">Review</h2>
              <button onClick={() => setModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Client info */}
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={60}
                  height={60}
                  className="rounded-full w-16 h-16 object-cover"
                />
                <div>
                  <p className="font-semibold text-lg">{testimonial.name}</p>
                  <p className="text-muted-foreground text-sm">{testimonial.company}</p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {testimonial.product}
                  </Badge>
                </div>
              </div>

              {/* Star rating */}
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Full testimonial */}
              <p className="text-muted-foreground text-pretty italic leading-relaxed">"{testimonial.testimonial}"</p>

              <Button onClick={() => setModalOpen(false)} className="w-full">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
