"use client"

import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, Users, Award, Star, BookOpen, Code, Palette, Database } from "lucide-react"
import { useState } from "react"

export default function EducationPage() {
  const programs = [
    {
      title: "Social Media Advertising",
      duration: "12 weeks",
      level: "Beginner to Advanced",
      description:
        "Master the art of user interface and user experience design with hands-on projects and industry best practices.",
      icon: <Palette className="h-8 w-8" />,
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems", "Usability Testing"],
      projects: 8,
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
      name: "Sarah Johnson",
      program: "Full Stack Development",
      role: "Senior Developer at TechCorp",
      image: "/professional-woman-developer.png",
      testimonial:
        "The comprehensive curriculum and hands-on projects prepared me perfectly for my current role. The instructors were incredibly supportive throughout my journey.",
      salary: "$85,000",
    },
    {
      name: "Michael Chen",
      program: "UI/UX Design",
      role: "Lead Designer at StartupXYZ",
      image: "/professional-man-designer.jpg",
      testimonial:
        "I went from zero design experience to landing my dream job in just 3 months after graduation. The portfolio projects were industry-relevant and impressive.",
      salary: "$75,000",
    },
    {
      name: "Emily Rodriguez",
      program: "Mobile App Development",
      role: "Mobile Developer at AppStudio",
      image: "/placeholder-rv2fm.png",
      testimonial:
        "The mobile development program gave me the skills to build apps that are now used by thousands of people. The career support was exceptional.",
      salary: "$80,000",
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
      description: "Choose from full-time, part-time, and weekend learning options",
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
                  Academy Division
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-balance">
                  Launch Your <span className="text-primary">Tech Career</span>
                </h1>
                <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                  Transform your future with our comprehensive tech programs. content creation to full-stack
                  development, we provide the skills and support you need to succeed in the technology industry.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">Enroll Now</Link>
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
                src="/students-learning-programming-coding-bootcamp.jpg"
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

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Why Choose Our Programs?</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Our programs are designed with your success in mind, providing comprehensive support and real-world
              experience.
            </p>
          </div>

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
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              See how our graduates have transformed their careers and achieved their professional goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center space-y-4">
                  <Image
                    src={story.image || "/placeholder.svg"}
                    alt={story.name}
                    width={80}
                    height={80}
                    className="rounded-full mx-auto"
                  />
                  <div>
                    <CardTitle className="text-lg">{story.name}</CardTitle>
                    <CardDescription>{story.role}</CardDescription>
                    <Badge variant="outline" className="mt-2">
                      {story.program}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-pretty text-sm italic">"{story.testimonial}"</p>
                  <div className="text-center">
                    <span className="text-lg font-bold text-primary">Starting Salary: {story.salary}</span>
                  </div>
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
              Ready to Start Your Tech Journey?
            </h2>
            <p className="text-xl text-primary-foreground/90 text-pretty">
              Join hundreds of successful graduates who have transformed their careers with our comprehensive training
              programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Enroll Today</Link>
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
          <Link href="/contact" className="flex items-center justify-center space-x-2">
            <span>Learn More</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
