"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Code, Smartphone, Globe, Settings, CheckCircle, Star, X } from "lucide-react"
import { useState } from "react"

export default function BespokePage() {
  const services = [
    {
      title: "Beautiful Websites that Convert",
      description: "Custom web experiences designed to engage visitors and drive meaningful conversions.",
      icon: <Globe className="h-8 w-8" />,
      features: [
        "Responsive design",
        "Performance optimization",
        "SEO implementation",
        "User experience focused",
        "Fast loading times",
        "Mobile-first approach",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Custom Web Applications that Solve Real Problems",
      description:
        "Tailored web solutions built with modern technologies to address your specific business challenges.",
      icon: <Code className="h-8 w-8" />,
      features: [
        "Full-stack development",
        "Database integration",
        "API development",
        "Scalable architecture",
        "Security implementation",
        "Real-time features",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "User Friendly Mobile Applications",
      description: "Native and cross-platform mobile applications with seamless, intuitive user experiences.",
      icon: <Smartphone className="h-8 w-8" />,
      features: [
        "iOS and Android development",
        "Cross-platform solutions",
        "Intuitive UI/UX design",
        "App store deployment",
        "Push notifications",
        "Offline functionality",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Experienced Technical Consulting Services",
      description:
        "Expert guidance on technology strategy, architecture decisions, and digital transformation initiatives.",
      icon: <Settings className="h-8 w-8" />,
      features: [
        "Technology assessment",
        "Architecture planning",
        "Code review and optimization",
        "Performance auditing",
        "Security consulting",
        "Team training",
      ],
      color: "from-orange-500 to-red-500",
    },
  ]

  const portfolioProjects = [
    {
      name: "Ubuxa Website",
      description:
        "Renewable energy management platform website with interactive dashboards and real-time analytics visualization.",
      image: "/multi-tenant-pasges.png",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts"],
      features: [
        "Interactive energy analytics",
        "Real-time monitoring",
        "Performance metrics",
        "Cost analysis tools",
        "Mobile responsive design",
      ],
      link: "#",
      category: "Energy Management",
    },
    {
      name: "Tims Auto Website",
      description: "Automotive service website with online booking system, service catalog, and customer testimonials.",
      image: "/automotive-service-website-booking.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      features: [
        "Online booking system",
        "Service catalog",
        "Customer reviews",
        "Payment integration",
        "Service history tracking",
      ],
      link: "#",
      category: "Automotive Services",
    },
    {
      name: "Renewable Energy Website",
      description: "Educational platform for renewable energy solutions with case studies and implementation guides.",
      image: "/renewable-energy-education-platform.jpg",
      technologies: ["Next.js", "Supabase", "Tailwind CSS", "MDX"],
      features: [
        "Educational content",
        "Case studies section",
        "Interactive guides",
        "Resource library",
        "Newsletter integration",
      ],
      link: "#",
      category: "Energy Education",
    },
    {
      name: "Immigration Website",
      description:
        "Comprehensive immigration services platform with visa tracking, document management, and consultation booking.",
      image: "/immigration-services-website-portal.jpg",
      technologies: ["Next.js", "Supabase", "Stripe", "Auth0"],
      features: [
        "Visa application tracking",
        "Document management",
        "Consultation booking",
        "Payment processing",
        "Multi-language support",
      ],
      link: "#",
      category: "Immigration Services",
    },
    {
      name: "Bekwyn Law Website",
      description: "Professional law firm website with case management system and secure client portal.",
      image: "/law-firm-website-client-portal.jpg",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
      features: [
        "Case management system",
        "Client portal",
        "Document storage",
        "Appointment scheduling",
        "Secure messaging",
      ],
      link: "#",
      category: "Legal Services",
    },
  ]

  const testimonials = [
    {
      name: "Tim Johnson",
      company: "Tims Auto Services",
      image: "/auto-service-owner.jpg",
      testimonial:
        "The website Boffins built transformed our business. Online booking increased our appointments by 40%, and customers love the seamless experience. Their team was professional and understood our industry perfectly.",
      rating: 5,
      project: "Automotive Website",
    },
    {
      name: "David Bekwyn",
      company: "Bekwyn Law Firm",
      image: "/lawyer-professional.jpg",
      testimonial:
        "Their technical expertise combined with understanding of our legal processes was exceptional. The case management system perfectly fits our workflow. The secure client portal has improved client satisfaction significantly.",
      rating: 5,
      project: "Legal Case Management",
    },
  ]

  const process = [
    {
      step: "01",
      title: "Discovery & Requirements",
      description: "We conduct thorough analysis of your business needs, current systems, and desired outcomes.",
      icon: <Settings className="h-6 w-6" />,
    },
    {
      step: "02",
      title: "Design & Architecture",
      description: "Our experts design the optimal solution architecture and create detailed technical specifications.",
      icon: <Code className="h-6 w-6" />,
    },
    {
      step: "03",
      title: "Development & Testing",
      description: "Agile development process with continuous testing and quality assurance throughout the build.",
      icon: <Globe className="h-6 w-6" />,
    },
    {
      step: "04",
      title: "Deployment & Support",
      description: "Seamless deployment with comprehensive training and ongoing support for your team.",
      icon: <Smartphone className="h-6 w-6" />,
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  Bespoke Division
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-balance">
                  Custom <span className="text-primary">Software Solutions</span>
                </h1>
                <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                  Transform your business with tailor-made software solutions. From web applications to mobile apps and
                  system integrations, we build exactly what you need to succeed.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link
                    href="https://wa.me/2348061286691?text=I%20want%20to%20know%20more%20about%20the%20project"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Start Your Project
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#services">View Services</Link>
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/custom-software-development.png"
                alt="Custom software development team"
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
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Our Bespoke Services</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              We specialize in creating custom software solutions that perfectly align with your business processes and
              objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Explore our successful bespoke projects that have transformed businesses and improved operational
              efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
            {portfolioProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Our Development Process</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              We follow a proven methodology that ensures successful project delivery while maintaining the highest
              standards of quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader className="space-y-4">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl mx-auto">
                    {step.step}
                  </div>
                  <div className="flex justify-center text-primary">{step.icon}</div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-pretty text-sm">{step.description}</p>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Client Success Stories</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              See how our bespoke solutions have transformed businesses and delivered measurable results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
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
              Ready to Build Your Custom Solution?
            </h2>
            <p className="text-xl text-primary-foreground/90 text-pretty">
              Let's discuss your project requirements and create a solution that perfectly fits your business needs. Our
              team is ready to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link
                  href="https://wa.me/2348061286691?text=I%20want%20to%20know%20more%20about%20the%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start Your Project
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

function ProjectCard({ project }: { project: any }) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Card className="hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
        {/* Fixed height image */}
        <div className="relative w-full h-40 sm:h-48 flex-shrink-0">
          <Image src={project.image || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="text-xs">
              {project.category}
            </Badge>
          </div>
        </div>

        {/* Fixed height content area */}
        <CardHeader className="space-y-2 pb-3 flex-shrink-0 min-h-[5rem]">
          <CardTitle className="text-base sm:text-lg line-clamp-2 leading-tight">{project.name}</CardTitle>
          <CardDescription className="line-clamp-2 text-xs sm:text-sm">{project.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3 flex-1 flex flex-col min-h-[8rem]">
          {/* Technologies */}
          <div className="flex-shrink-0">
            <h4 className="font-semibold text-xs sm:text-sm mb-1.5">Technologies:</h4>
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
                <Badge key={techIndex} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Features with truncation */}
          <div className="flex-1 flex flex-col">
            <h4 className="font-semibold text-xs sm:text-sm mb-1.5">Features:</h4>
            <ul className="space-y-1 overflow-hidden flex-1">
              {project.features.slice(0, 2).map((feature: string, featureIndex: number) => (
                <li key={featureIndex} className="flex items-start gap-1.5 text-xs sm:text-sm">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground line-clamp-1">{feature}</span>
                </li>
              ))}
            </ul>
            {project.features.length > 2 && (
              <p className="text-xs text-muted-foreground mt-1">+{project.features.length - 2} more features</p>
            )}
          </div>

          {/* Fixed button at bottom */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setModalOpen(true)}
            className="w-full text-primary border-primary hover:bg-primary/10 mt-auto"
          >
            View Details
          </Button>
        </CardContent>
      </Card>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between p-6 bg-card border-b">
              <h2 className="text-2xl font-bold">{project.name}</h2>
              <button onClick={() => setModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Full image in modal */}
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image src={project.image || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
              </div>

              {/* Full description */}
              <div>
                <h3 className="font-semibold text-lg mb-2">About Project</h3>
                <p className="text-muted-foreground text-pretty">{project.description}</p>
              </div>

              {/* All technologies */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string, techIndex: number) => (
                    <Badge key={techIndex} variant="secondary" className="text-sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* All features */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {project.features.map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Close button */}
              <Button onClick={() => setModalOpen(false)} className="w-full mt-4">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
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
            {testimonial.project}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4 flex-1 flex flex-col">
          {/* Star rating */}
          <div className="flex gap-1 flex-shrink-0">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          {/* Truncated testimonial text - fixed height */}
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
                    {testimonial.project}
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

function ServiceCard({ service }: { service: any }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 h-full flex flex-col">
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
        <div className="flex-1">
          <div className="space-y-3">
            {service.features.slice(0, 2).map((feature: string, featureIndex: number) => (
              <div key={featureIndex} className="flex items-center space-x-3">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
          {expanded && (
            <div className="space-y-3 mt-3">
              {service.features.slice(2).map((feature: string, featureIndex: number) => (
                <div key={featureIndex + 2} className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          )}
          {service.features.length > 2 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-primary p-0 h-auto mt-2"
            >
              {expanded ? "See Less" : `See More (${service.features.length - 2}+)`}
            </Button>
          )}
        </div>
        <Button asChild className="w-full mt-auto">
          <Link href="/contact" className="flex items-center justify-center space-x-2">
            <span>Get Quote</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
