"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { ComponentType, MutableRefObject, ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardList,
  Code2,
  DatabaseZap,
  FileText,
  Filter,
  Globe2,
  LayoutDashboard,
  MessageCircle,
  Megaphone,
  MousePointerClick,
  PackageCheck,
  PanelTop,
  Rocket,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  UsersRound,
  Workflow,
} from "lucide-react"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

const BOFFINS_WHATSAPP_NUMBER = "23480156653196"

type FormState = {
  serviceType: string
  businessType: string
  problemToSolve: string
  budgetRange: string
  timeline: string
}

const initialFormState: FormState = {
  serviceType: "",
  businessType: "",
  problemToSolve: "",
  budgetRange: "",
  timeline: "",
}

const websiteValueCards = [
  {
    title: "Explain Your Business Fast",
    description: "One link. Clear offer. Less repeating yourself on WhatsApp.",
    icon: FileText,
  },
  {
    title: "Filter Serious Buyers",
    description: "Ask for need, budget, and timeline before the chat starts.",
    icon: Filter,
  },
  {
    title: "Build Trust Before the Chat",
    description: "Show services, proof, prices, and contact details clearly.",
    icon: ShieldCheck,
  },
  {
    title: "Support Your Ads",
    description: "Send ad clicks to a page built for action, not confusion.",
    icon: Megaphone,
  },
]

const problemCards = [
  {
    title: "People Keep Asking What You Do",
    description: "You keep typing the same explanation again and again.",
    icon: MessageCircle,
  },
  {
    title: "Your Ads Bring Messages, But Many Are Not Serious",
    description: "Too many chats. Too few ready buyers.",
    icon: MousePointerClick,
  },
  {
    title: "Customers Do Not Understand Your Offer Quickly",
    description: "When your offer is unclear, customers delay or move on.",
    icon: UsersRound,
  },
  {
    title: "Your Business Is Scattered",
    description: "Leads, payments, stock, and follow-ups live everywhere.",
    icon: LayoutDashboard,
  },
]

const outcomeCards = [
  {
    title: "More Serious Enquiries",
    description: "Attract people who already understand what they need.",
    icon: BadgeCheck,
  },
  {
    title: "Better Lead Conversion",
    description: "Turn ad clicks and referrals into structured enquiries.",
    icon: TrendingUp,
  },
  {
    title: "Improved Business Operations",
    description: "Reduce manual tracking and organize your process.",
    icon: Workflow,
  },
  {
    title: "Custom Digital Products",
    description: "Build apps, portals, dashboards, and SaaS products.",
    icon: PackageCheck,
  },
]

const serviceCards = [
  {
    title: "Website Development",
    description: "A professional online presence customers can trust.",
    bestFor: "Trust and clarity",
    icon: PanelTop,
  },
  {
    title: "Sales / Lead Funnel Pages",
    description: "Pages for ads, offers, launches, and lead collection.",
    bestFor: "Ads and campaigns",
    icon: Rocket,
  },
  {
    title: "Web Applications",
    description: "Dashboards, portals, CRMs, booking, and admin tools.",
    bestFor: "Operations online",
    icon: Code2,
  },
  {
    title: "Mobile Applications",
    description: "Customer, staff, agent, and field operations apps.",
    bestFor: "Customer and staff apps",
    icon: Smartphone,
  },
  {
    title: "Business Automation",
    description: "Automate follow-up, reports, reminders, and operations.",
    bestFor: "Less manual work",
    icon: Bot,
  },
  {
    title: "SaaS Platforms",
    description: "For founders building subscription-based digital products.",
    bestFor: "Digital product founders",
    icon: Building2,
  },
  {
    title: "Custom Software",
    description: "Systems for business processes normal tools cannot handle.",
    bestFor: "Unique business process",
    icon: BriefcaseBusiness,
  },
  {
    title: "Digital Business Setup",
    description: "Website, WhatsApp flow, Google presence, and forms.",
    bestFor: "First digital structure",
    icon: Globe2,
  },
]

const pricingCards = [
  {
    title: "Website Development",
    oldPrice: "₦250,000",
    newPrice: "₦150,000",
    detail: "Website, service pages, trust signals, contact flow.",
  },
  {
    title: "Sales / Lead Funnel Page",
    oldPrice: "₦300,000",
    newPrice: "₦180,000",
    detail: "Ad-ready page with offer, proof, pricing, and CTA.",
  },
  {
    title: "Business Automation / Internal System",
    oldPrice: "₦5,000,000",
    newPrice: "₦3,500,000",
    detail: "Dashboards, records, workflows, and reports.",
  },
  {
    title: "Web / Mobile App Development",
    oldPrice: "₦15,000,000",
    newPrice: "₦10,000,000",
    detail: "Apps, portals, SaaS products, and platforms.",
  },
]

const objectionCards = [
  { title: "Online flyer", icon: FileText },
  { title: "Sales page", icon: TrendingUp },
  { title: "Lead qualification page", icon: ClipboardList },
  { title: "Business automation system", icon: DatabaseZap },
]

const proofItems = [
  {
    title: "Ubuxa",
    label: "Ubuxa — A Boffins-built product for renewable energy operations.",
    description:
      "A Boffins-built digital operations platform for renewable energy businesses, supporting CRM, sales, inventory, agents, installers, and operational visibility.",
    image: "/images/case-studies/ubuxa.jpg",
  },
  {
    title: "Bokana Electronics",
    label: "Product visibility and brand presentation",
    description:
      "Digital and business support for product visibility, online positioning, and customer-facing brand presentation.",
    image: "/digital-transformation-small-business.jpg",
  },
  {
    title: "Tims Auto",
    label: "Service visibility and customer trust",
    description:
      "Business-facing digital support example for service visibility, customer trust, and online presence.",
    image: "/automotive-service-website-booking.jpg",
  },
]

const serviceTypeOptions = [
  "Website Development",
  "Sales / Lead Funnel Page",
  "Business Automation",
  "Web Application",
  "Mobile Application",
  "SaaS Platform",
  "Custom Software",
  "Digital Business Setup",
  "Not sure yet",
]

const businessTypeOptions = [
  "Retail",
  "Service Business",
  "Renewable Energy",
  "Real Estate",
  "Logistics",
  "Education",
  "Professional Service",
  "E-commerce",
  "Other",
]

const problemToSolveOptions = [
  "Get more customers",
  "Convert leads better",
  "Improve online presence",
  "Automate manual work",
  "Improve business operations",
  "Build an app or platform",
  "Organize customer records",
  "Other",
]

const budgetRangeOptions = [
  "₦150k – ₦300k",
  "₦300k – ₦1m",
  "₦1m – ₦5m",
  "₦5m – ₦10m",
  "₦10m+",
  "Not sure yet",
]

const timelineOptions = ["Immediately", "This month", "Next month", "Still planning"]

const faqItems = [
  {
    question: "How much does it cost to build a website?",
    answer:
      "Website development currently starts from ₦150,000. Final pricing depends on the number of pages, design needs, features, integrations, timeline, and business requirements.",
  },
  {
    question: "Will a website automatically bring customers?",
    answer:
      "No. A website works best when it is connected to a clear offer, traffic source, lead qualification process, and follow-up system. Boffins helps you think beyond just having a page online.",
  },
  {
    question: "Can I pay in phases?",
    answer:
      "Yes. Payment phases can be discussed based on the project type, scope, and timeline.",
  },
  {
    question: "How long does it take?",
    answer:
      "Simple websites and landing pages can be completed faster. Web apps, mobile apps, automation, and custom systems require more planning, design, development, testing, and review.",
  },
  {
    question: "Do I need a mobile app immediately?",
    answer:
      "Not always. Many businesses should start with a strong website, landing page, or web app before investing in a mobile app. Boffins can help you choose the right starting point.",
  },
  {
    question: "Can Boffins build a custom system for my business?",
    answer:
      "Yes. Boffins builds custom software, dashboards, portals, automation tools, SaaS platforms, and internal systems based on business needs.",
  },
  {
    question: "Do you work with businesses outside Abuja or Nigeria?",
    answer:
      "Yes. The process can be handled remotely using calls, shared documents, online project communication, and WhatsApp.",
  },
  {
    question: "Do you provide maintenance after launch?",
    answer:
      "Yes. Maintenance, updates, hosting support, content updates, and technical support can be discussed based on the project.",
  },
]

const trackEvent = (eventName: string, payload?: Record<string, unknown>) => {
  if (typeof window === "undefined") return

  console.log("[Analytics Placeholder]", eventName, payload)

  // Future integrations:
  // Meta Pixel
  // Google Analytics
  // TikTok Pixel
  const win = window as Window & {
    fbq?: (action: string, event: string, payload?: Record<string, unknown>) => void
    gtag?: (...args: unknown[]) => void
    ttq?: { track?: (event: string, payload?: Record<string, unknown>) => void }
  }

  win.fbq?.("trackCustom", eventName, payload)
  win.gtag?.("event", eventName, payload)
  win.ttq?.track?.(eventName, payload)
}

export function BusinessGrowthLanding() {
  const [form, setForm] = useState<FormState>(initialFormState)
  const pricingRef = useRef<HTMLElement | null>(null)
  const pricingTrackedRef = useRef(false)
  const qualificationStartedRef = useRef(false)
  const qualificationCompletedRef = useRef(false)

  const isFormComplete = Object.values(form).every((value) => value.length > 0)

  const whatsappUrl = useMemo(() => {
    const message = `Hello Boffins Technology, I am interested in your business growth solution.

Service needed: ${form.serviceType}
Business type: ${form.businessType}
Problem I want to solve: ${form.problemToSolve}
Budget range: ${form.budgetRange}
Timeline: ${form.timeline}

I would like to discuss how Boffins can help my business.`

    return `https://wa.me/${BOFFINS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }, [form])

  useEffect(() => {
    const pricingSection = pricingRef.current

    if (!pricingSection || typeof IntersectionObserver === "undefined") {
      if (!pricingTrackedRef.current) {
        pricingTrackedRef.current = true
        trackEvent("pricing_view")
      }
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !pricingTrackedRef.current) {
          pricingTrackedRef.current = true
          trackEvent("pricing_view")
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(pricingSection)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isFormComplete && !qualificationCompletedRef.current) {
      qualificationCompletedRef.current = true
      trackEvent("qualification_completion", {
        serviceType: form.serviceType,
        businessType: form.businessType,
        problemToSolve: form.problemToSolve,
        budgetRange: form.budgetRange,
        timeline: form.timeline,
      })
    }
  }, [form, isFormComplete])

  function updateField(field: keyof FormState, value: string) {
    if (value && !qualificationStartedRef.current) {
      qualificationStartedRef.current = true
      trackEvent("qualification_start")
    }

    if (field === "serviceType" && value) {
      trackEvent("selected_service", { serviceType: value })
    }

    if (field === "budgetRange" && value) {
      trackEvent("selected_budget", { budgetRange: value })
    }

    setForm((current) => ({ ...current, [field]: value }))
  }

  function trackWhatsappClick() {
    trackEvent("whatsapp_click", {
      serviceType: form.serviceType,
      businessType: form.businessType,
      problemToSolve: form.problemToSolve,
      budgetRange: form.budgetRange,
      timeline: form.timeline,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <HeroSection />
        <WebsiteValueSection />
        <ProblemCardsSection />
        <OutcomeCardsSection />
        <ServicesSection />
        <PricingSection pricingRef={pricingRef} />
        <ObjectionHandlingSection />
        <ProofSection />
        <QualificationFormSection
          form={form}
          isFormComplete={isFormComplete}
          onFieldChange={updateField}
          onWhatsappClick={trackWhatsappClick}
          whatsappUrl={whatsappUrl}
        />
        <FAQSection />
        <FinalCTASection
          isFormComplete={isFormComplete}
          onWhatsappClick={trackWhatsappClick}
          whatsappUrl={whatsappUrl}
        />
      </main>

      <Footer />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#061923] text-white">
      <Image
        src="/business-growth/hero-business-growth.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_center]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,25,35,0.96)_0%,rgba(6,25,35,0.82)_38%,rgba(6,25,35,0.3)_76%)]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />

      <div className="container relative mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-4xl">
          <Badge className="mb-5 max-w-full justify-start whitespace-normal border-white/15 bg-white/10 text-left leading-5 text-white hover:bg-white/10">
            For Nigerian businesses using ads, referrals, and WhatsApp
          </Badge>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Turn Your Business Into a Link Customers Can Trust
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
            Build a website, landing page, app, or automation system that explains
            your offer fast and sends serious buyers to WhatsApp.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-auto min-h-10 w-full whitespace-normal bg-secondary py-3 text-center leading-snug text-secondary-foreground hover:bg-secondary/90 sm:w-auto"
              asChild
            >
              <Link href="#pricing">
                Check Starting Prices <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-auto min-h-10 w-full whitespace-normal border-white/30 bg-white/10 py-3 text-center leading-snug text-white hover:bg-white hover:text-[#061923] sm:w-auto"
              asChild
            >
              <Link href="#services">See What Boffins Can Build</Link>
            </Button>
          </div>
        </div>

        <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
          {[
            "Ad click",
            "Trusted page",
            "Serious WhatsApp chat",
          ].map((item, index) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/10 p-4 text-sm font-semibold backdrop-blur"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-primary">
                {index + 1}
              </span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WebsiteValueSection() {
  return (
    <SectionShell
      eyebrow="Website value"
      title="Your Website Should Do More Than Look Fine"
      intro="The job is simple: make customers understand, trust, and take action."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <VisualImage
          src="/business-growth/funnel-journey.png"
          alt="Visual flow from social media to website to qualified WhatsApp chat"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {websiteValueCards.map((item) => (
            <IconCard key={item.title} compact {...item} />
          ))}
        </div>
      </div>
    </SectionShell>
  )
}

function ProblemCardsSection() {
  return (
    <SectionShell
      eyebrow="Business problems"
      title="Common Problems We Fix"
      muted
    >
      <CardGrid>
        {problemCards.map((item) => (
          <IconCard key={item.title} {...item} />
        ))}
      </CardGrid>
    </SectionShell>
  )
}

function OutcomeCardsSection() {
  return (
    <SectionShell eyebrow="Growth outcomes" title="What You Can Achieve">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="grid gap-3 sm:grid-cols-2">
          {outcomeCards.map((item) => (
            <IconCard key={item.title} compact {...item} />
          ))}
        </div>
        <VisualImage
          src="/business-growth/operations-dashboard.png"
          alt="Nigerian business team using an organized digital operations dashboard"
        />
      </div>
    </SectionShell>
  )
}

function ServicesSection() {
  return (
    <SectionShell
      id="services"
      eyebrow="Services"
      title="What Boffins Can Build for Your Business"
      intro="Pick the right starting point. We help you choose if you are not sure."
      muted
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {serviceCards.map(({ title, description, bestFor, icon: Icon }) => (
          <Card key={title} className="h-full py-0">
            <CardContent className="flex h-full flex-col p-5">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold leading-snug">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
              <Badge variant="outline" className="mt-4">
                Best for: {bestFor}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionShell>
  )
}

function PricingSection({
  pricingRef,
}: {
  pricingRef: MutableRefObject<HTMLElement | null>
}) {
  return (
    <section id="pricing" ref={pricingRef} className="bg-[#061923] py-14 text-white sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
            Starting prices
          </p>
          <h2 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
            Starting Offers for Serious Business Owners
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/80 sm:text-base">
            All prices are starting prices. Final pricing depends on scope, features,
            timeline, integrations, design needs, and business requirements.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {pricingCards.map((item) => (
            <Card key={item.title} className="border-white/10 bg-white py-0 text-foreground">
              <CardHeader className="p-5 pb-2">
                <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-5 pt-0">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Old starting price:{" "}
                    <span className="line-through">{item.oldPrice}</span>
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    Current starting offer:
                  </p>
                  <p className="text-3xl font-bold leading-tight text-primary">
                    Starting from {item.newPrice}
                  </p>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">{item.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-7">
          <Button
            size="lg"
            className="h-auto min-h-10 w-full whitespace-normal bg-[#25D366] py-3 text-center leading-snug text-white hover:bg-[#1fb457] sm:w-auto"
            asChild
          >
            <Link href="#qualification">
              Check If Boffins Is Right for My Business
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function ObjectionHandlingSection() {
  return (
    <SectionShell
      eyebrow="A common concern"
      title="“I Built a Website Before and It Did Not Bring Sales”"
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-4 text-base leading-7 text-muted-foreground">
          <p>
            That happens when a website is only an online flyer. A proper sales page
            explains your offer, shows proof, collects useful details, and sends serious
            people to WhatsApp.
          </p>
          <p>
            Boffins helps you shape the journey from social media click to enquiry,
            qualification, follow-up, and conversion.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {objectionCards.map(({ title, icon: Icon }) => (
            <div key={title} className="rounded-lg border bg-card p-4 shadow-sm">
              <Icon className="mb-3 h-6 w-6 text-primary" />
              <p className="text-sm font-semibold">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}

function ProofSection() {
  return (
    <SectionShell
      eyebrow="Proof"
      title="Work & Product Examples"
      intro="Examples of digital products, visibility, trust, and operations thinking."
      muted
    >
      <div className="grid gap-5 md:grid-cols-3">
        {proofItems.map((item) => (
          <Card key={item.title} className="overflow-hidden py-0">
            <div className="relative h-44 w-full bg-muted">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <CardHeader className="p-5 pb-2">
              <Badge
                variant="secondary"
                className="mb-2 max-w-full justify-start whitespace-normal text-left leading-5"
              >
                {item.label}
              </Badge>
              <CardTitle className="text-xl">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <p className="text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionShell>
  )
}

function QualificationFormSection({
  form,
  isFormComplete,
  onFieldChange,
  onWhatsappClick,
  whatsappUrl,
}: {
  form: FormState
  isFormComplete: boolean
  onFieldChange: (field: keyof FormState, value: string) => void
  onWhatsappClick: () => void
  whatsappUrl: string
}) {
  return (
    <section id="qualification" className="py-14 sm:py-16">
      <div className="container mx-auto grid gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="min-w-0 space-y-5">
          <Badge variant="secondary">Quick qualification</Badge>
          <div>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              Before You Chat With Us, Tell Us What You Need
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
              Answer a few quick questions so we can understand your business before the
              WhatsApp conversation starts.
            </p>
          </div>
          <div className="grid gap-3">
            {[
              "No long proposal form",
              "WhatsApp message is prepared automatically",
              "Faster recommendation from Boffins",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <Card className="min-w-0 py-0 shadow-lg">
          <CardContent className="grid min-w-0 gap-5 p-5 sm:p-6">
            <ChoiceField
              label="What do you need?"
              value={form.serviceType}
              options={serviceTypeOptions}
              onChange={(value) => onFieldChange("serviceType", value)}
            />
            <ChoiceField
              label="What type of business do you run?"
              value={form.businessType}
              options={businessTypeOptions}
              onChange={(value) => onFieldChange("businessType", value)}
            />
            <ChoiceField
              label="What problem do you want to solve?"
              value={form.problemToSolve}
              options={problemToSolveOptions}
              onChange={(value) => onFieldChange("problemToSolve", value)}
            />
            <ChoiceField
              label="What is your budget range?"
              value={form.budgetRange}
              options={budgetRangeOptions}
              onChange={(value) => onFieldChange("budgetRange", value)}
            />
            <ChoiceField
              label="When do you want to start?"
              value={form.timeline}
              options={timelineOptions}
              onChange={(value) => onFieldChange("timeline", value)}
            />

            {isFormComplete ? (
              <Button
                size="lg"
                className="h-auto min-h-12 w-full whitespace-normal bg-[#25D366] py-3 text-center leading-snug text-white hover:bg-[#1fb457]"
                asChild
                onClick={onWhatsappClick}
              >
                <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  Continue to WhatsApp With My Project Details
                </Link>
              </Button>
            ) : (
              <Button
                size="lg"
                disabled
                className="h-auto min-h-12 w-full whitespace-normal bg-[#25D366] py-3 text-center leading-snug text-white hover:bg-[#25D366]"
              >
                <MessageCircle className="h-5 w-5" />
                Answer the questions to continue
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function FAQSection() {
  return (
    <SectionShell eyebrow="FAQ" title="Quick Answers Before You Start" muted>
      <Accordion type="single" collapsible className="mx-auto max-w-3xl rounded-lg border bg-background px-4">
        {faqItems.map((item, index) => (
          <AccordionItem key={item.question} value={`faq-${index}`}>
            <AccordionTrigger className="text-left text-base">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="leading-6 text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionShell>
  )
}

function FinalCTASection({
  isFormComplete,
  onWhatsappClick,
  whatsappUrl,
}: {
  isFormComplete: boolean
  onWhatsappClick: () => void
  whatsappUrl: string
}) {
  return (
    <section className="bg-primary py-12 text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
              Ready to Build a Digital System That Helps Your Business Grow?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-primary-foreground/80 sm:text-base">
              Answer the quick questions above and continue to WhatsApp with your
              project details. This helps us understand your business faster and
              recommend the right solution.
            </p>
          </div>

          {isFormComplete ? (
            <Button
              size="lg"
              variant="secondary"
              className="h-auto min-h-10 w-full whitespace-normal py-3 text-center leading-snug sm:w-auto"
              asChild
              onClick={onWhatsappClick}
            >
              <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                Continue to WhatsApp
                <MessageCircle className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button
              size="lg"
              variant="secondary"
              className="h-auto min-h-10 w-full whitespace-normal py-3 text-center leading-snug sm:w-auto"
              asChild
            >
              <Link href="#qualification">
                Answer the Questions
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}

function SectionShell({
  id,
  eyebrow,
  title,
  intro,
  muted = false,
  children,
}: {
  id?: string
  eyebrow: string
  title: string
  intro?: string
  muted?: boolean
  children: ReactNode
}) {
  return (
    <section id={id} className={muted ? "bg-muted/60 py-14 sm:py-16" : "py-14 sm:py-16"}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
            {title}
          </h2>
          {intro ? (
            <p className="mt-3 text-base leading-7 text-muted-foreground">{intro}</p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  )
}

function VisualImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border bg-muted shadow-sm sm:aspect-[16/9]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  )
}

function CardGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
}

function IconCard({
  title,
  description,
  icon: Icon,
  compact = false,
}: {
  title: string
  description: string
  icon: ComponentType<{ className?: string }>
  compact?: boolean
}) {
  return (
    <Card className="h-full py-0">
      <CardContent className={compact ? "p-4" : "p-5"}>
        <div
          className={
            compact
              ? "mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
              : "mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary"
          }
        >
          <Icon className={compact ? "h-5 w-5" : "h-6 w-6"} />
        </div>
        <h3 className={compact ? "text-base font-semibold leading-tight" : "text-lg font-semibold leading-tight"}>
          {title}
        </h3>
        <p className={compact ? "mt-2 text-sm leading-5 text-muted-foreground" : "mt-3 text-sm leading-6 text-muted-foreground"}>
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

function ChoiceField({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-")

  return (
    <div className="grid min-w-0 gap-3">
      <Label id={id}>{label}</Label>
      <div
        role="radiogroup"
        aria-labelledby={id}
        className="grid gap-2 sm:grid-cols-2"
      >
        {options.map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={value === option}
            onClick={() => onChange(option)}
            className={
              value === option
                ? "min-h-11 rounded-md border border-primary bg-primary px-3 py-2 text-left text-sm font-semibold leading-snug text-primary-foreground shadow-sm"
                : "min-h-11 rounded-md border bg-background px-3 py-2 text-left text-sm font-medium leading-snug text-foreground shadow-sm transition-colors hover:border-primary/50 hover:bg-primary/5"
            }
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
