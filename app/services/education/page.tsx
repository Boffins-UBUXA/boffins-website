"use client"

import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, Users, Award, Star, BookOpen, Code, Palette, Database, X } from "lucide-react"
import { useState } from "react"

const WHATSAPP_NUMBER = "08083430800"
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi! I'm interested in learning more about your tech programs at Boffins Academy.",
)

function getWhatsAppLink() {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`
}

export default function AcademyPage() {
  const programs = [
    {
      title: "Social Media Advertising",
      duration: "8 weeks",
      level: "Beginner to Intermediate",
      description:
        "Master the strategies and tools needed to create effective social media advertising campaigns. Learn platform optimization, audience targeting, and performance analytics.",
      icon: <Palette className="h-8 w-8" />,
      skills: ["Facebook Ads", "Instagram Ads", "TikTok Ads", "Analytics", "A/B Testing", "Campaign Management"],
      projects: 6,
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Frontend Development",
      duration: "16 weeks",
      level: "Beginner to Intermediate",
      description: "Build modern, responsive web applications using the latest frontend technologies and frameworks.",
      icon: <Code className="h-8 w-8" />,
      skills: ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Tailwind CSS"],
      projects: 12,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Backend Development",
      duration: "20 weeks",
      level: "Intermediate to Advanced",
      description: "Learn server-side development, databases, and API design to build robust backend systems.",
      icon: <Database className="h-8 w-8" />,
      skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"],
      projects: 10,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Full Stack Development",
      duration: "24 weeks",
      level: "Intermediate to Advanced",
      description:
        "Comprehensive program covering both frontend and backend development for complete web applications.",
      icon: <BookOpen className="h-8 w-8" />,
      skills: ["React", "Node.js", "Databases", "DevOps", "Testing", "Deployment"],
      projects: 15,
      color: "from-purple-500 to-violet-500",
    },
  ]

  const successStories = [
    {
      name: "Chisom Okafor",
      program: "Full Stack Development",
      role: "Software Engineer at TechCorp Nigeria",
      image: "/professional-woman-developer.jpg",
      testimonial:
        "Boffins Academy transformed my career journey. The hands-on projects and mentorship prepared me perfectly for industry challenges. I landed my dream job within 3 months of graduation!",
      salary: "$1,500/month",
    },
    {
      name: "Adebayo Akinsanya",
      program: "Frontend Development",
      role: "UI/UX Developer at Digital Innovations",
      image: "/professional-man-designer.jpg",
      testimonial:
        "The Frontend Development program exceeded my expectations. I went from zero coding knowledge to building production-ready applications. The instructors are incredibly supportive and knowledgeable.",
      salary: "$1,200/month",
    },
    {
      name: "Zainab Mohammed",
      program: "Backend Development",
      role: "Backend Engineer at Fintech Solutions",
      image: "/professional-woman-developers.jpg",
      testimonial:
        "The comprehensive backend curriculum and real-world projects gave me the confidence to tackle complex system design. I'm now leading backend initiatives at my company.",
      salary: "$1,400/month",
    },
  ]

  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of real-world experience",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Industry Certification",
      description: "Receive recognized certifications upon successful program completion",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Hands-on Projects",
      description: "Build a portfolio of real-world projects to showcase your skills",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Flexible Schedule",
      description: "Self-paced learning and online cohort options to fit your lifestyle",
    },
  ]

  const [selectedStory, setSelectedStory] = useState<(typeof successStories)[0] | null>(null)

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
                  Boffins Academy
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-balance">
                  Launch Your <span className="text-primary">Tech Career</span>
                </h1>
                <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                  Transform your future with our comprehensive tech programs. From social media advertising to
                  full-stack development, we provide the skills and support you need to succeed in the technology
                  industry.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                    Learn More
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#programs">View Programs</Link>
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Graduates</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">95%</div>
                  <div className="text-sm text-muted-foreground">Job Placement</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">4.9</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/students-learning-programming-coding-bootcamp.jpeg"
                alt="Students learning technology"
                width={500}
                height={500}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Our Training Programs</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Choose from our comprehensive range of programs designed to take you from beginner to industry-ready
              professional.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <ProgramCard key={index} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* Flexible Schedule Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Flexible Learning Options</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Learn at your own pace with our self-paced courses or join live cohorts for structured, interactive
              learning experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Self-Paced Learning</CardTitle>
                <CardDescription className="text-base">Learn on your schedule</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">Access course materials anytime, anywhere</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">Progress at your own pace</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">Lifetime access to course resources</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Online Cohorts</CardTitle>
                <CardDescription className="text-base">Structured live learning</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">Live instructor-led sessions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">Peer collaboration and networking</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">Structured timeline and accountability</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Why Choose Our Program?</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Our programs are designed with your success in mind, providing comprehensive support and real-world
              experience.
            </p>
          </div>

          <WhyChooseOurPrograms features={features} />
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              See how our graduates have transformed their careers and achieved their professional goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="min-h-80 hover:shadow-lg transition-all duration-300 flex flex-col">
                <CardHeader className="text-center space-y-4">
                  <Image
                    src={story.image || "/placeholder.svg?height=80&width=80&query=professional"}
                    alt={story.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-full mx-auto"
                  />
                  <div>
                    <CardTitle className="text-lg line-clamp-1">{story.name}</CardTitle>
                    <CardDescription className="text-xs line-clamp-1">{story.role}</CardDescription>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {story.program}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 flex-1 flex flex-col">
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-pretty text-xs line-clamp-4 italic flex-1">
                    "{story.testimonial}"
                  </p>
                  <div className="text-center pt-2">
                    <span className="text-sm font-bold text-primary block mb-2">{story.salary}</span>
                    {story.testimonial.length > 120 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedStory(story)}
                        className="w-full text-xs"
                      >
                        Read Full Story
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="sticky top-0 bg-background border-b flex flex-row items-start justify-between">
              <div className="text-center flex-1">
                <Image
                  src={selectedStory.image || "/placeholder.svg?height=80&width=80&query=professional"}
                  alt={selectedStory.name}
                  width={80}
                  height={80}
                  className="rounded-full mx-auto mb-4"
                />
                <CardTitle>{selectedStory.name}</CardTitle>
                <CardDescription>{selectedStory.role}</CardDescription>
                <Badge variant="outline" className="mt-2">
                  {selectedStory.program}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4"
              >
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6 py-6">
              <div className="flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground text-pretty italic text-lg">"{selectedStory.testimonial}"</p>
              <div className="text-center pt-4 border-t">
                <span className="text-lg font-bold text-primary">Starting Salary: {selectedStory.salary}</span>
              </div>
            </CardContent>
            <div className="sticky bottom-0 bg-background border-t p-4">
              <Button className="w-full" onClick={() => setSelectedStory(null)}>
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground text-balance">
              Ready to Start Your Tech Journey?
            </h2>
            <p className="text-xl text-primary-foreground/90 text-pretty">
              Join hundreds of successful graduates who have transformed their careers with our comprehensive training
              programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  Learn More
                </a>
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

function WhyChooseOurPrograms({
  features,
}: {
  features: Array<{ icon: React.ReactNode; title: string; description: string }>
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature: { icon: React.ReactNode; title: string; description: string }, index: number) => (
        <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300">
          <CardContent className="space-y-4">
            <div className="flex justify-center text-primary">{feature.icon}</div>
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="text-muted-foreground text-pretty text-sm">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ProgramCard({ program }: { program: any }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div
            className={`w-16 h-16 rounded-full bg-gradient-to-r ${program.color} flex items-center justify-center text-white`}
          >
            {program.icon}
          </div>
          <div className="text-right">
            <Badge variant="outline">{program.level}</Badge>
          </div>
        </div>
        <div>
          <CardTitle className="text-xl mb-2">{program.title}</CardTitle>
          <CardDescription className="text-base">{program.description}</CardDescription>
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{program.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen className="h-4 w-4" />
            <span>{program.projects} Projects</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h4 className="font-semibold mb-3">Skills You'll Learn:</h4>
          <div className="flex flex-wrap gap-2">
            {program.skills.slice(0, 3).map((skill: string, skillIndex: number) => (
              <Badge key={skillIndex} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
          {expanded && (
            <div className="flex flex-wrap gap-2 mt-2">
              {program.skills.slice(3).map((skill: string, skillIndex: number) => (
                <Badge key={skillIndex + 3} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          )}
          {program.skills.length > 3 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-primary p-0 h-auto mt-2"
            >
              {expanded ? "Show Less" : `Show More (${program.skills.length - 3}+)`}
            </Button>
          )}
        </div>
        <Button asChild className="w-full mt-auto">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2"
          >
            <span>Learn More</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
