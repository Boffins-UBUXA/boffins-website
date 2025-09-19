import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Code, Smartphone, Globe, Settings, CheckCircle, Star, ExternalLink } from "lucide-react"

export default function BespokePage() {
  const services = [
    {
      title: "Custom Web Applications",
      description: "Tailored web solutions built with modern technologies to meet your specific business requirements.",
      icon: <Globe className="h-8 w-8" />,
      features: [
        "Full-stack development",
        "Responsive design",
        "Database integration",
        "API development",
        "Security implementation",
        "Performance optimization",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android with seamless user experiences.",
      icon: <Smartphone className="h-8 w-8" />,
      features: [
        "iOS and Android development",
        "Cross-platform solutions",
        "UI/UX design",
        "App store deployment",
        "Push notifications",
        "Offline functionality",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "System Integration",
      description:
        "Seamlessly connect your existing systems and third-party services for improved workflow efficiency.",
      icon: <Settings className="h-8 w-8" />,
      features: [
        "API integration",
        "Legacy system modernization",
        "Data migration",
        "Workflow automation",
        "Real-time synchronization",
        "Custom connectors",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Technical Consulting",
      description:
        "Expert guidance on technology strategy, architecture decisions, and digital transformation initiatives.",
      icon: <Code className="h-8 w-8" />,
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
      name: "Coming to Canada",
      description:
        "Comprehensive website for a Canadian immigration company with client portal and document management.",
      image: "/coming-to-canada-immigration-website.jpg",
      technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
      features: [
        "Client portal with document upload",
        "Immigration process tracking",
        "Multilingual support",
        "Secure document storage",
        "Automated email notifications",
      ],
      link: "#",
      category: "Immigration Services",
    },
    {
      name: "Bekwyn Law Firm",
      description: "Professional law firm website with case management system and client communication tools.",
      image: "/bekwyn-law-firm-legal-website.jpg",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
      features: [
        "Case management system",
        "Client communication portal",
        "Document generation",
        "Appointment scheduling",
        "Billing integration",
      ],
      link: "#",
      category: "Legal Services",
    },
  ]

  const testimonials = [
    {
      name: "Jennifer Walsh",
      company: "Coming to Canada Immigration",
      image: "/professional-woman-immigration-consultant.jpg",
      testimonial:
        "The bespoke solution they built transformed our client management process. We can now handle 3x more cases with the same team size.",
      rating: 5,
      project: "Immigration Management System",
    },
    {
      name: "David Bekwyn",
      company: "Bekwyn Law Firm",
      image: "/professional-man-lawyer.jpg",
      testimonial:
        "Their technical expertise and understanding of our legal processes resulted in a system that perfectly fits our workflow. Exceptional work!",
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

      {/* Hero Section */}
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
                  <Link href="/contact">Start Your Project</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#services">View Services</Link>
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">100+</div>
                  <div className="text-sm text-muted-foreground">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/custom-software-development-coding-team.jpg"
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
                      <span>Get Quote</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
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
              Explore some of our successful bespoke projects that have transformed businesses and improved operational
              efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {portfolioProjects.map((project, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-64">
                  <Image src={project.image || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary">{project.category}</Badge>
                  </div>
                </div>
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={project.link} className="flex items-center space-x-1">
                        <ExternalLink className="h-3 w-3" />
                        <span className="sr-only">View Project</span>
                      </Link>
                    </Button>
                  </div>
                  <CardDescription className="text-base">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                  <Badge variant="outline">{testimonial.project}</Badge>
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
              Ready to Build Your Custom Solution?
            </h2>
            <p className="text-xl text-primary-foreground/90 text-pretty">
              Let's discuss your project requirements and create a solution that perfectly fits your business needs. Our
              team is ready to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Start Your Project</Link>
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
