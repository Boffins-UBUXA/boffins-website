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
  Users,
  Camera,
  Megaphone,
  CheckCircle,
  Star,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react"

export default function MediaPage() {
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
      client: "TechStartup Inc",
      industry: "Technology",
      service: "Complete Brand Overhaul",
      results: "300% increase in social engagement",
      image: "/tech-startup-brand-social-media-campaign.jpg",
      metrics: {
        engagement: "+300%",
        followers: "+150%",
        leads: "+200%",
      },
    },
    {
      client: "Local Restaurant Chain",
      industry: "Food & Beverage",
      service: "Social Media Management",
      results: "50% increase in foot traffic",
      image: "/restaurant-social-media-food-photography.jpg",
      metrics: {
        footTraffic: "+50%",
        onlineOrders: "+75%",
        brandAwareness: "+120%",
      },
    },
    {
      client: "Fashion Boutique",
      industry: "Retail",
      service: "Content Creation & Strategy",
      results: "400% growth in online sales",
      image: "/fashion-boutique-content-creation-photography.jpg",
      metrics: {
        onlineSales: "+400%",
        websiteTraffic: "+250%",
        socialFollowers: "+180%",
      },
    },
  ]

  const testimonials = [
    {
      name: "Amanda Foster",
      company: "StyleHub Boutique",
      image: "/professional-woman-fashion-business.jpg",
      testimonial:
        "Their content creation transformed our brand. Our Instagram engagement increased by 400% and sales followed suit. Absolutely incredible work!",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      company: "TechFlow Solutions",
      image: "/professional-man-tech-ceo.jpg",
      testimonial:
        "The brand strategy they developed positioned us perfectly in the market. We've seen a 200% increase in qualified leads since launch.",
      rating: 5,
    },
    {
      name: "Sofia Martinez",
      company: "Bella Vista Restaurant",
      image: "/professional-woman-restaurant-owner.jpg",
      testimonial:
        "Their social media management brought customers through our doors. Food photography and content strategy were game-changers for our business.",
      rating: 5,
    },
  ]

  const platforms = [
    { name: "Instagram", icon: <Instagram className="h-6 w-6" />, color: "text-pink-500" },
    { name: "Facebook", icon: <Facebook className="h-6 w-6" />, color: "text-blue-600" },
    { name: "Twitter", icon: <Twitter className="h-6 w-6" />, color: "text-blue-400" },
    { name: "LinkedIn", icon: <Users className="h-6 w-6" />, color: "text-blue-700" },
    { name: "TikTok", icon: <Camera className="h-6 w-6" />, color: "text-black" },
    { name: "YouTube", icon: <Camera className="h-6 w-6" />, color: "text-red-600" },
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
                  <Link href="/contact">Start Your Campaign</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#services">View Services</Link>
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Brands Managed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">2M+</div>
                  <div className="text-sm text-muted-foreground">Content Views</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">250%</div>
                  <div className="text-sm text-muted-foreground">Avg. Growth</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/social-media-content-creation-photography-studio.jpg"
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
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
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
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/contact" className="flex items-center justify-center space-x-2">
                      <span>Get Started</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
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
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Success Stories</h2>
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
                <Link href="/contact">Start Your Campaign</Link>
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
