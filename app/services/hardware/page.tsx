"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Zap, CheckCircle, Cpu, Router, Battery } from "lucide-react"

const services = [
  {
    title: "IoT Device Management",
    description: "Effortlessly manage your IoT devices with our intuitive platform.",
    icon: <Router className="h-8 w-8" />,
    features: ["Device provisioning", "Real-time monitoring", "Remote management", "Data analytics"],
    color: "from-primary to-primary/80",
    featured: true,
  },
  {
    title: "Industrial Connectivity",
    description: "Ensure seamless connectivity for your industrial applications.",
    icon: <Cpu className="h-8 w-8" />,
    features: ["High-speed data transfer", "Robust network infrastructure", "Scalable solutions"],
    color: "from-secondary to-secondary/80",
  },
  {
    title: "Power Protection",
    description: "Protect your critical equipment from power anomalies.",
    icon: <Battery className="h-8 w-8" />,
    features: ["Surge protection", "Voltage regulation", "Battery backup"],
    color: "from-accent to-accent/80",
  },
]

export default function HardwarePage() {
  const [expandedServices, setExpandedServices] = useState<{ [key: number]: boolean }>({})

  const toggleServiceExpand = (index: number) => {
    setExpandedServices((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const applications = [
    {
      industry: "Manufacturing",
      description: "Smart factory solutions with IoT sensors for equipment monitoring and predictive maintenance.",
      image: "/smart-factory-iot-sensors-manufacturing.jpg",
      benefits: ["Reduce downtime by 40%", "Optimize production efficiency", "Predictive maintenance alerts"],
    },
    {
      industry: "Energy & Utilities",
      description: "Smart grid solutions and renewable energy monitoring systems for optimal performance.",
      image: "/smart-grid-energy-monitoring-renewable.jpg",
      benefits: ["Real-time energy monitoring", "Grid stability optimization", "Renewable integration"],
    },
    {
      industry: "Smart Buildings",
      description: "Building automation systems for HVAC, lighting, and security management.",
      image: "/smart-building-automation-hvac-lighting.jpg",
      benefits: ["Energy savings up to 30%", "Automated climate control", "Enhanced security"],
    },
  ]

  const specs = [
    { label: "Operating Temperature", value: "-40°C to +85°C" },
    { label: "Power Consumption", value: "< 5W" },
    { label: "Connectivity", value: "WiFi, Bluetooth, LoRaWAN" },
    { label: "Protection Rating", value: "IP65" },
    { label: "Data Storage", value: "32GB Local + Cloud" },
    { label: "Battery Life", value: "5+ Years" },
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
                  Hardware Division
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-balance">
                  Smart <span className="text-primary">IoT Solutions</span>
                </h1>
                <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                  Protect and optimize your electronic infrastructure with our cutting-edge IoT devices and networking
                  solutions. From custom hardware development to our proprietary Ubuxa-IoT-Pro protection system.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="https://wa.me/?text=Hi,%20I'm%20interested%20in%20learning%20more%20about%20your%20products">
                    Let's Talk
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#services">View Solutions</Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">99.8%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Monitoring</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/iot-devices-smart-sensors-industrial-monitoring.jpg"
                alt="IoT devices and smart sensors"
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
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Our Hardware Solutions</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Comprehensive IoT and networking solutions designed to protect, monitor, and optimize your electronic
              infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <HardwareSolutionCard
                key={index}
                service={service}
                isExpanded={expandedServices[index] || false}
                onToggle={() => toggleServiceExpand(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Ubuxa-IoT-Pro Spotlight */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline">Proprietary Technology</Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-balance">
                  Ubuxa-IoT-Pro <span className="text-primary">Protection Device</span>
                </h2>
                <p className="text-lg text-muted-foreground text-pretty">
                  The Ubuxa-IoT-Pro is a state-of-the-art intelligent protection device designed to safeguard critical
                  electronic equipment such as inverters, air conditioning units, and industrial machinery. By
                  monitoring voltage fluctuations, temperature variations, and power anomalies in real-time, the device
                  provides predictive maintenance alerts and automated protection measures to prevent costly equipment
                  failures.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {specs.map((spec, index) => (
                  <div key={index} className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">{spec.label}</div>
                    <div className="text-lg font-semibold">{spec.value}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="https://wa.me/?text=Hi,%20I'm%20interested%20in%20learning%20more%20about%20your%20products">
                    Let's Talk
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/motherboard-iot-circuit-board-technology.jpg"
                alt="Ubuxa-IoT-Pro Motherboard and Circuit Board"
                width={500}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Industry Applications */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Industry Applications</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Our hardware solutions are deployed across various industries, delivering measurable results and
              operational improvements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((application, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={application.image || "/placeholder.svg"}
                    alt={application.industry}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{application.industry}</CardTitle>
                  <CardDescription>{application.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {application.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
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
              Protect Your Equipment Today
            </h2>
            <p className="text-xl text-primary-foreground/90 text-pretty">
              Invest in the future of your equipment with our advanced IoT protection technology. Prevent failures
              before they happen and maximize your operational efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="https://wa.me/?text=Hi,%20I'm%20interested%20in%20learning%20more%20about%20your%20products">
                  Let's Talk
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

interface Service {
  title: string
  description: string
  icon: React.ReactNode
  features: string[]
  color: string
  featured?: boolean
}

interface HardwareSolutionCardProps {
  service: Service
  isExpanded: boolean
  onToggle: () => void
}

function HardwareSolutionCard({ service, isExpanded, onToggle }: HardwareSolutionCardProps) {
  const visibleFeatures = isExpanded ? service.features : service.features.slice(0, 2)
  const hasMoreFeatures = service.features.length > 2

  return (
    <Card
      className={`group hover:shadow-xl transition-all duration-300 h-full flex flex-col ${
        service.featured ? "ring-2 ring-primary" : ""
      }`}
    >
      <CardHeader className="space-y-4">
        {service.featured && <Badge className="w-fit bg-primary text-primary-foreground">Featured Product</Badge>}
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
              onClick={onToggle}
              className="text-primary hover:text-primary/80 text-sm font-medium mt-2 transition-colors"
            >
              {isExpanded ? "See Less" : `See More (${service.features.length - 2}+)`}
            </button>
          )}
        </div>
        <Button asChild className="w-full">
          <Link href="/contact" className="flex items-center justify-center space-x-2">
            <span>Learn More</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
