"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  TrendingUp,
  Camera,
  Megaphone,
  CheckCircle,
  Star,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react"

const XIcon = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.67-5.858 6.67H2.42l7.726-8.835L1.254 2.25h6.554l4.6 6.084 5.308-6.084zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const TikTokIcon = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.321 5.562a5.122 5.122 0 0 1-.823-.077c.645-1.2 1.427-2.905 1.427-5.26h-3.454c0 .571-.049 1.131-.136 1.673a5.508 5.508 0 0 1-5.369 4.667v3.461a2.88 2.88 0 0 0 .847-.127v3.21a5.884 5.884 0 0 1-5.884-5.884 5.884 5.884 0 0 1 5.884-5.884c1.046 0 2.038.158 2.988.46V2.562a9.494 9.494 0 0 0-2.988-.476 9.338 9.338 0 0 0-9.338 9.338 9.338 9.338 0 0 0 9.338 9.338 9.325 9.325 0 0 0 9.325-9.325v-5.396a6.867 6.867 0 0 0 3.989 1.289v-3.454c-1.273 0-2.41-.37-3.4-.963z" />
  </svg>
)

const YouTubeIcon = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

export default function MediaPage() {
  const [expandedServices, setExpandedServices] = useState<{ [key: number]: boolean }>({})

  const toggleServiceExpand = (index: number) => {
    setExpandedServices((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const services = [
    {
      title: "Social Media Management",
      description: "Complete social media strategy, content creation, and community management across all platforms.",
      icon: <Instagram className="h-8 w-8" />,
      features: [
        "Content strategy development",
        "Daily posting and scheduling",
        "Community engagement",
        "Performance analytics",
        "Hashtag optimization",
        "Influencer collaboration",
      ],
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Content Creation",
      description:
        "High-quality visual and written content that captures your brand's voice and engages your audience.",
      icon: <Camera className="h-8 w-8" />,
      features: [
        "Photography and videography",
        "Graphic design and branding",
        "Copywriting and storytelling",
        "Video editing and production",
        "Animation and motion graphics",
        "Content optimization",
      ],
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Brand Strategy",
      description: "Comprehensive brand development and positioning to establish a strong market presence.",
      icon: <Megaphone className="h-8 w-8" />,
      features: [
        "Brand identity development",
        "Market research and analysis",
        "Competitive positioning",
        "Brand guidelines creation",
        "Voice and tone development",
        "Brand consistency monitoring",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Digital Marketing Campaigns",
      description: "Data-driven marketing campaigns that drive engagement, leads, and conversions.",
      icon: <TrendingUp className="h-8 w-8" />,
      features: [
        "Paid advertising (PPC, Social)",
        "Email marketing campaigns",
        "SEO and content marketing",
        "Conversion optimization",
        "Analytics and reporting",
        "ROI tracking and analysis",
      ],
      color: "from-green-500 to-emerald-500",
    },
  ]

  const portfolioItems = [
    {
      client: "Ubuxa",
      industry: "Fintech",
      service: "Complete Brand Overhaul & Social Strategy",
      results: "500% increase in social engagement",
      image: "/fintech-app-ubuxa.jpg",
      metrics: {
        engagement: "+500%",
        followers: "+350%",
        leads: "+450%",
      },
    },
    {
      client: "Tims Auto",
      industry: "Automotive",
      service: "Social Media Management & Content Creation",
      results: "300% increase in showroom traffic",
      image: "/automotive-dealership-cars.jpg",
      metrics: {
        footTraffic: "+300%",
        onlineInquiries: "+280%",
        brandAwareness: "+420%",
      },
    },
    {
      client: "Bekwyn Law",
      industry: "Legal Services",
      service: "Brand Strategy & Content Marketing",
      results: "250% growth in client inquiries",
      image: "/law-office-professional-legal.jpg",
      metrics: {
        inquiries: "+250%",
        websiteTraffic: "+180%",
        socialEngagement: "+320%",
      },
    },
  ]

  const testimonials = [
    {
      name: "CEO, Ubuxa",
      company: "Ubuxa",
      image: "/professional-ceo-tech.jpg",
      testimonial:
        "Their social media strategy transformed our brand presence. Within months, we saw massive growth in user acquisition and engagement. Truly exceptional work!",
      rating: 5,
    },
    {
      name: "Manager, Tims Auto",
      company: "Tims Auto",
      image: "/professional-business-manager.jpg",
      testimonial:
        "The content creation team delivered incredible visuals and marketing materials. Our showroom traffic increased significantly. Highly recommended!",
      rating: 5,
    },
    {
      name: "Partner, Bekwyn Law",
      company: "Bekwyn Law",
      image: "/professional-lawyer-attorney.jpg",
      testimonial:
        "Their brand strategy positioned us as thought leaders in our industry. Client inquiries have never been higher. Outstanding service!",
      rating: 5,
    },
  ]

  const platforms = [
    { name: "Instagram", icon: <Instagram className="h-6 w-6" />, color: "text-pink-500" },
    { name: "Facebook", icon: <Facebook className="h-6 w-6" />, color: "text-blue-600" },
    { name: "X", icon: <XIcon />, color: "text-black" },
    { name: "LinkedIn", icon: <Linkedin className="h-6 w-6" />, color: "text-blue-700" },
    { name: "TikTok", icon: <TikTokIcon />, color: "text-black" },
    { name: "YouTube", icon: <YouTubeIcon />, color: "text-red-600" },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  Media Company
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-balance">
                  Amplify Your <span className="text-primary">Brand's Voice</span>
                </h1>
                <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                  Transform your digital presence with our comprehensive media services. From social media management to
                  content creation, we help brands connect with their audience and drive meaningful engagement.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link
                    href="https://wa.me/?text=Hi,%20I'm%20interested%20in%20learning%20more%20about%20your%20products"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Start Your Campaign
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#services">View Services</Link>
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Brands Managed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50M+</div>
                  <div className="text-sm text-muted-foreground">Content Views</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">450%</div>
                  <div className="text-sm text-muted-foreground">Avg. Growth</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/social-media-content-creation-studio.jpg"
                alt="Content creation and social media management"
                width={500}
                height={500}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Our Media Services</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Comprehensive digital marketing and content creation services designed to elevate your brand and engage
              your target audience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const isExpanded = expandedServices[index] || false
              const visibleFeatures = isExpanded ? service.features : service.features.slice(0, 2)
              const hasMoreFeatures = service.features.length > 2

              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <CardHeader className="space-y-4">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center text-white`}
                    >
                      {service.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6 flex-1 flex flex-col">
                    <div className="space-y-3 flex-1">
                      {visibleFeatures.map((feature: string, featureIndex: number) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                      {hasMoreFeatures && (
                        <button
                          onClick={() => toggleServiceExpand(index)}
                          className="text-primary hover:text-primary/80 text-sm font-medium mt-2 transition-colors"
                        >
                          {isExpanded ? "See Less" : `See More (${service.features.length - 2}+)`}
                        </button>
                      )}
                    </div>
                    <Button asChild className="w-full">
                      <Link href="#" className="flex items-center justify-center space-x-2">
                        <span>Get Started</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Platforms We Master</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              We create and manage content across all major social media platforms, ensuring your brand reaches your
              audience wherever they are.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {platforms.map((platform, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300">
                <CardContent className="space-y-4">
                  <div className={`flex justify-center ${platform.color}`}>{platform.icon}</div>
                  <h3 className="font-semibold">{platform.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Companies We've Helped</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              See how we've helped businesses across different industries achieve remarkable growth through strategic
              media management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative h-48">
                  <Image src={item.image || "/placeholder.svg"} alt={item.client} fill className="object-cover" />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{item.industry}</Badge>
                  </div>
                  <CardTitle className="text-lg">{item.client}</CardTitle>
                  <CardDescription>{item.service}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm font-medium text-primary">{item.results}</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {Object.entries(item.metrics).map(([key, value], metricIndex) => (
                      <div key={metricIndex} className="space-y-1">
                        <div className="text-lg font-bold text-primary">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Hear from business owners who have transformed their digital presence with our media services.
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
              Ready to Grow Your Brand?
            </h2>
            <p className="text-xl text-primary-foreground/90 text-pretty">
              Let's create a digital presence that drives real results. Our team is ready to help you connect with your
              audience and achieve your business goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link
                  href="https://wa.me/?text=Hi,%20I'm%20interested%20in%20learning%20more%20about%20your%20products"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start Your Campaign
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
