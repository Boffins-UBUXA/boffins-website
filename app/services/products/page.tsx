"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Zap, Users, TrendingUp, Shield, CheckCircle, Star, Battery, Video, DollarSign } from "lucide-react"

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
    },
    {
      name: "RevenueHub+",
      tagline: "Revenue Collection & Management Solution",
      description:
        "Powerful platform for businesses to streamline revenue collection, automate billing processes, and gain insights into financial performance.",
      icon: <DollarSign className="h-8 w-8" />,
      features: [
        "Automated billing and invoicing",
        "Multiple payment gateway integration",
        "Revenue analytics and forecasting",
        "Customer payment tracking",
        "Subscription management",
        "Financial reporting and insights",
      ],
      benefits: [
        "Reduce payment delays by 40%",
        "Automate financial processes",
        "Improve cash flow management",
        "Comprehensive financial insights",
      ],
      image: "/financial-dashboard-revenue-analytics-billing-syst.jpg",
      color: "from-blue-500 to-cyan-500",
      category: "Financial Management",
    },
  ]

  const testimonials = [
    {
      name: "David Thompson",
      company: "GreenTech Solutions",
      product: "Ubuxa",
      image: "/professional-man-energy-company.jpg",
      testimonial:
        "Ubuxa has revolutionized how we manage our solar installations. The predictive maintenance feature alone has saved us thousands in repair costs.",
      rating: 5,
    },
    {
      name: "Sarah Martinez",
      company: "Creative Studios Inc",
      product: "Vikmid",
      image: "/professional-woman-content-creator.jpg",
      testimonial:
        "As a content creator managing multiple platforms, Vikmid has been a game-changer. My engagement rates have increased by 60% since using it.",
      rating: 5,
    },
    {
      name: "Michael Johnson",
      company: "TechStart Ventures",
      product: "RevenueHub+",
      image: "/professional-businessman.png",
      testimonial:
        "RevenueHub+ streamlined our entire billing process. We've reduced payment delays significantly and our cash flow has never been better.",
      rating: 5,
    },
  ]

  const stats = [
    { label: "Active Users", value: "10,000+", icon: <Users className="h-6 w-6" /> },
    { label: "Revenue Processed", value: "$50M+", icon: <TrendingUp className="h-6 w-6" /> },
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
                <Link href="/contact">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#products">Explore Products</Link>
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
                        <Link href="/contact" className="flex items-center space-x-2">
                          <span>Get Demo</span>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.company}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline">{testimonial.product}</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-pretty italic">"{testimonial.testimonial}"</p>
                </CardContent>
              </Card>
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
                <Link href="/contact">Request Demo</Link>
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
