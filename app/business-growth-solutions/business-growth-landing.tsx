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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
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
    description: "One clear link that tells customers what you do, who it is for, and how to start.",
    icon: FileText,
  },
  {
    title: "Filter Serious Buyers",
    description: "Collect need, budget, and timeline before your team spends time on WhatsApp.",
    icon: Filter,
  },
  {
    title: "Build Trust Before the Chat",
    description: "Show services, proof, pricing direction, and contact details in one place.",
    icon: ShieldCheck,
  },
  {
    title: "Support Your Ads",
    description: "Send Instagram, Facebook, TikTok, LinkedIn, and referral clicks to a page built for action.",
    icon: Megaphone,
  },
]

const problemCards = [
  {
    title: "People Keep Asking What You Do",
    description: "You repeat the same explanation on calls and WhatsApp because there is no clear page to send.",
    icon: MessageCircle,
  },
  {
    title: "Ads Bring Messages, Not Buyers",
    description: "Your ads get attention, but many people are not ready, not clear, or not qualified.",
    icon: MousePointerClick,
  },
  {
    title: "Customers Do Not Understand Your Offer",
    description: "When your offer is confusing, people delay, compare randomly, or move on.",
    icon: UsersRound,
  },
  {
    title: "Your Business Process Is Scattered",
    description: "Leads, payments, stock, customer records, follow-up, and reports live in different places.",
    icon: LayoutDashboard,
  },
]

const outcomeCards = [
  {
    title: "More Serious Enquiries",
    description: "People arrive knowing what you offer, what it may cost, and why it matters.",
    icon: BadgeCheck,
  },
  {
    title: "Better Lead Conversion",
    description: "Turn social media traffic and referrals into structured enquiries that are easier to close.",
    icon: TrendingUp,
  },
  {
    title: "Improved Business Operations",
    description: "Replace repeated manual work with forms, dashboards, workflows, reminders, and reports.",
    icon: Workflow,
  },
  {
    title: "Custom Digital Products",
    description: "Build apps, portals, dashboards, SaaS platforms, and systems made for your business model.",
    icon: PackageCheck,
  },
]

const serviceCards = [
  {
    title: "Website Development",
    description: "Professional business websites that explain your brand, services, proof, and contact flow.",
    bestFor: "Trust and clarity",
    icon: PanelTop,
  },
  {
    title: "Sales / Lead Funnel Pages",
    description: "Focused pages for ads, offers, launches, consultation requests, and lead qualification.",
    bestFor: "Ads and campaigns",
    icon: Rocket,
  },
  {
    title: "Web Applications",
    description: "Customer portals, admin dashboards, CRMs, booking systems, inventory, and internal tools.",
    bestFor: "Operations online",
    icon: Code2,
  },
  {
    title: "Mobile Applications",
    description: "Customer apps, staff apps, agent apps, and field operation apps for Android and iOS.",
    bestFor: "Mobile workflows",
    icon: Smartphone,
  },
  {
    title: "Business Automation",
    description: "Automate follow-up, approvals, reports, reminders, records, onboarding, and repetitive tasks.",
    bestFor: "Less manual work",
    icon: Bot,
  },
  {
    title: "SaaS Platforms",
    description: "Subscription products, multi-user platforms, dashboards, billing flows, and product MVPs.",
    bestFor: "Digital product founders",
    icon: Building2,
  },
  {
    title: "Custom Software",
    description: "Systems for unique business processes that normal off-the-shelf tools cannot handle well.",
    bestFor: "Special workflows",
    icon: BriefcaseBusiness,
  },
  {
    title: "Digital Business Setup",
    description: "Website, WhatsApp flow, Google presence, lead forms, analytics, and basic digital structure.",
    bestFor: "First digital setup",
    icon: Globe2,
  },
]

const pricingCards = [
  {
    title: "Website Development",
    oldPrice: "₦250,000",
    newPrice: "₦150,000",
    detail: "Business website, service pages, trust signals, contact flow, and mobile-friendly structure.",
  },
  {
    title: "Sales / Lead Funnel Page",
    oldPrice: "₦300,000",
    newPrice: "₦180,000",
    detail: "Ad-ready page with offer, proof, pricing direction, qualification form, and WhatsApp CTA.",
  },
  {
    title: "Business Automation / Internal System",
    oldPrice: "₦5,000,000",
    newPrice: "₦3,500,000",
    detail: "Dashboards, records, workflows, approvals, notifications, reports, and team access.",
  },
  {
    title: "Web / Mobile App Development",
    oldPrice: "₦15,000,000",
    newPrice: "₦10,000,000",
    detail: "Apps, portals, SaaS products, marketplaces, MVPs, and customer-facing platforms.",
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
    label: "A product Boffins helped build",
    description:
      "A digital product direction for renewable energy operations, designed around business visibility, records, agents, customers, sales, and operational control.",
    image: "/images/case-studies/ubuxa.jpg",
  },
  {
    title: "Bokana Electronics",
    label: "Product visibility and brand presentation",
    description:
      "Digital business support for product visibility, customer-facing presentation, online positioning, and clearer enquiry flow.",
    image: "/digital-transformation-small-business.jpg",
  },
  {
    title: "Tims Auto",
    label: "Service visibility and customer trust",
    description:
      "Business-facing digital support for a service brand that needs customers to understand services, trust the business, and make enquiries.",
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

const budgetRangeOptions = ["₦150k - ₦300k", "₦300k - ₦1m", "₦1m - ₦5m", "₦5m - ₦10m", "₦10m+", "Not sure yet"]

const timelineOptions = ["Immediately", "This month", "Next month", "1 - 3 months", "Still planning"]

const faqItems = [
  {
    question: "How much does it cost to build a website?",
    answer:
      "Website development currently starts from ₦150,000. Final pricing depends on pages, content, design, features, integrations, timeline, and business requirements.",
  },
  {
    question: "Will a website automatically bring customers?",
    answer:
      "No. A website works best when it is connected to a clear offer, traffic source, lead qualification process, and follow-up system. Boffins helps you think beyond just having a page online.",
  },
  {
    question: "Can I pay in phases?",
    answer: "Yes. Payment phases can be discussed based on the project type, scope, milestone plan, and timeline.",
  },
  {
    question: "How long does it take?",
    answer:
      "Simple websites and landing pages can be completed faster. Apps, automation, SaaS platforms, and custom systems need planning, design, development, testing, and review.",
  },
  {
    question: "Do I need a mobile app immediately?",
    answer:
      "Not always. Many businesses should start with a strong website, landing page, or web app before investing in a mobile app. Boffins can help you choose the right starting point.",
  },
  {
    question: "Can Boffins build a custom system for my business?",
    answer:
      "Yes. Boffins builds custom software, dashboards, portals, automation tools, SaaS platforms, internal systems, and web/mobile applications based on business needs.",
  },
  {
    question: "Do you work with businesses outside Abuja or Nigeria?",
    answer:
      "Yes. The process can be handled remotely using calls, shared documents, online project communication, and WhatsApp.",
  },
  {
    question: "Do you provide maintenance after launch?",
    answer:
      "Yes. Maintenance, updates, hosting support, backups, content updates, and technical support can be arranged based on the project.",
  },
]

function trackLeadEvent(eventName: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return

  console.info("[analytics-placeholder]", eventName, payload)

  const win = window as Window & {
    gtag?: (...args: unknown[]) => void
    fbq?: (action: string, event: string, payload?: Record<string, unknown>) => void
    ttq?: { track?: (event: string, payload?: Record<string, unknown>) => void }
  }

  win.gtag?.("event", eventName, payload)
  win.fbq?.("trackCustom", eventName, payload)
  win.ttq?.track?.(eventName, payload)
}

export function BusinessGrowthLanding() {
  const [form, setForm] = useState<FormState>(initialFormState)
  const pricingRef = useRef<HTMLElement | null>(null)
  const pricingTrackedRef = useRef(false)
  const qualificationStartedRef = useRef(false)
  const qualificationCompletedRef = useRef(false)

  const isFormComplete = Object.values(form).every((value) => value.trim().length > 0)

  const whatsappUrl = useMemo(() => {
    const message = [
      "Hello Boffins Technology, I came from the Business Growth Solutions page.",
      "",
      `Service needed: ${form.serviceType}`,
      `Business type: ${form.businessType}`,
      `Problem I want to solve: ${form.problemToSolve}`,
      `Budget range: ${form.budgetRange}`,
      `Timeline: ${form.timeline}`,
      "",
      "Please advise on the best solution, estimated scope, and next steps.",
    ].join("\n")

    return `https://wa.me/${BOFFINS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }, [form])

  useEffect(() => {
    const pricingSection = pricingRef.current

    if (!pricingSection || typeof IntersectionObserver === "undefined") {
      if (!pricingTrackedRef.current) {
        pricingTrackedRef.current = true
        trackLeadEvent("pricing_view")
      }
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !pricingTrackedRef.current) {
          pricingTrackedRef.current = true
          trackLeadEvent("pricing_view")
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
      trackLeadEvent("qualification_completion", form)
    }
  }, [form, isFormComplete])

  function updateField(field: keyof FormState, value: string) {
    if (value && !qualificationStartedRef.current) {
      qualificationStartedRef.current = true
      trackLeadEvent("qualification_start")
    }

    if (field === "serviceType" && value) trackLeadEvent("selected_service", { serviceType: value })
    if (field === "budgetRange" && value) trackLeadEvent("selected_budget", { budgetRange: value })

    setForm((current) => ({ ...current, [field]: value }))
  }

  function trackWhatsappClick() {
    trackLeadEvent("whatsapp_click", form)
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
        src="/modern-technology-workspace-with-multiple-screens.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-35"
      />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,25,35,0.98)_0%,rgba(7,68,82,0.88)_54%,rgba(246,118,39,0.42)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />

      <div className="container relative mx-auto px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-4xl">
          <Badge className="mb-5 max-w-full justify-start whitespace-normal border-white/15 bg-white/10 text-left leading-5 text-white hover:bg-white/10">
            For Nigerian businesses using ads, referrals, social media, and WhatsApp
          </Badge>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Turn your business into a digital system customers can trust.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
            Boffins Technology builds websites, landing pages, apps, automation, SaaS platforms, and custom software
            that explain your offer, qualify leads, improve operations, and help your business grow.
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
          {["Ad or referral click", "Clear trusted page", "Qualified WhatsApp chat"].map((item, index) => (
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
      eyebrow="Why this matters"
      title="Your website should do more than look fine"
      intro="The job is simple: make customers understand, trust, and take action without asking too many basic questions."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <VisualImage
          src="/boffins-bespoke-hero-image.png"
          alt="Boffins digital business growth services"
          objectPosition="center"
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
    <SectionShell eyebrow="Business problems" title="Common problems Boffins helps you fix" muted>
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
    <SectionShell
      eyebrow="Growth outcomes"
      title="What your business can achieve"
      intro="We focus on business results first, then choose the right technology to support the result."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="grid gap-3 sm:grid-cols-2">
          {outcomeCards.map((item) => (
            <IconCard key={item.title} compact {...item} />
          ))}
        </div>
        <VisualImage src="/financial-dashboard-revenue-analytics-billing-syst.jpg" alt="Business dashboard analytics" />
      </div>
    </SectionShell>
  )
}

function ServicesSection() {
  return (
    <SectionShell
      id="services"
      eyebrow="Services"
      title="What Boffins can build for your business"
      intro="Pick the right starting point. If you are not sure, the qualification form helps us recommend one."
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
              <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{description}</p>
              <Badge variant="outline" className="mt-4 max-w-full whitespace-normal text-left">
                Best for: {bestFor}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionShell>
  )
}

function PricingSection({ pricingRef }: { pricingRef: MutableRefObject<HTMLElement | null> }) {
  return (
    <section id="pricing" ref={pricingRef} className="bg-[#061923] py-14 text-white sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-secondary">Starting prices</p>
          <h2 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
            Starting offers for serious business owners
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/80 sm:text-base">
            All prices are starting prices. Final pricing depends on scope, features, timeline, integrations, design
            needs, content, and business requirements.
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
                    Old starting price: <span className="line-through">{item.oldPrice}</span>
                  </p>
                  <p className="text-sm font-medium text-foreground">Current starting offer:</p>
                  <p className="text-3xl font-bold leading-tight text-primary">Starting from {item.newPrice}</p>
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
    <SectionShell eyebrow="A common concern" title="I built a website before and it did not bring sales">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-4 text-base leading-7 text-muted-foreground">
          <p>
            That usually happens when a website is only an online flyer. A useful sales page explains your offer, shows
            proof, gives pricing direction, collects useful details, and sends serious people to WhatsApp.
          </p>
          <p>
            Boffins helps shape the full journey from social media click to enquiry, qualification, follow-up, and
            conversion.
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
      title="Work and product examples"
      intro="Examples of digital product thinking, visibility, trust, and business operations support."
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
              <Badge variant="secondary" className="mb-2 max-w-full justify-start whitespace-normal text-left leading-5">
                {item.label}
              </Badge>
              <CardTitle className="text-xl">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
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
              Before you chat with us, tell us what you need
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
              Answer a few quick questions so we can understand your business before the WhatsApp conversation starts.
            </p>
          </div>
          <div className="grid gap-3">
            {["No long proposal form", "WhatsApp message is prepared automatically", "Faster recommendation from Boffins"].map(
              (item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  {item}
                </div>
              ),
            )}
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
    <SectionShell eyebrow="FAQ" title="Quick answers before you start" muted>
      <Accordion type="single" collapsible className="mx-auto max-w-3xl rounded-lg border bg-background px-4">
        {faqItems.map((item, index) => (
          <AccordionItem key={item.question} value={`faq-${index}`}>
            <AccordionTrigger className="text-left text-base">{item.question}</AccordionTrigger>
            <AccordionContent className="leading-6 text-muted-foreground">{item.answer}</AccordionContent>
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
              Ready to build a digital system that helps your business grow?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-primary-foreground/80 sm:text-base">
              Answer the quick questions above and continue to WhatsApp with your project details. This helps us
              understand your business faster and recommend the right solution.
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
          <p className="text-sm font-semibold uppercase tracking-wide text-secondary">{eyebrow}</p>
          <h2 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
          {intro ? <p className="mt-3 text-base leading-7 text-muted-foreground">{intro}</p> : null}
        </div>
        {children}
      </div>
    </section>
  )
}

function VisualImage({
  src,
  alt,
  objectPosition = "center",
}: {
  src: string
  alt: string
  objectPosition?: string
}) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border bg-muted shadow-sm sm:aspect-[16/9]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
        style={{ objectPosition }}
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
        <p
          className={
            compact ? "mt-2 text-sm leading-5 text-muted-foreground" : "mt-3 text-sm leading-6 text-muted-foreground"
          }
        >
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
      <div role="radiogroup" aria-labelledby={id} className="grid gap-2 sm:grid-cols-2">
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
