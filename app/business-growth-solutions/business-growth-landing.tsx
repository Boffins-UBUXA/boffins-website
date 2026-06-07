"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { ComponentType, ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Code2,
  DatabaseZap,
  Gauge,
  Globe2,
  Layers3,
  MessageCircle,
  MousePointerClick,
  PackageCheck,
  PanelTop,
  Phone,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  UsersRound,
} from "lucide-react"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const WHATSAPP_NUMBER = "23480156653196"

type FormState = {
  serviceType: string
  businessType: string
  problem: string
  budget: string
  timeline: string
}

const initialFormState: FormState = {
  serviceType: "",
  businessType: "",
  problem: "",
  budget: "",
  timeline: "",
}

const problemCards = [
  {
    title: "Low Visibility",
    text: "People need what you sell, but they do not find you online.",
    icon: Globe2,
  },
  {
    title: "Weak Lead Conversion",
    text: "Ads get attention, but visitors leave without buying or asking.",
    icon: MousePointerClick,
  },
  {
    title: "Manual Operations",
    text: "Your team repeats work that software can handle faster.",
    icon: Bot,
  },
  {
    title: "Scattered Systems",
    text: "Sales, customer data, payments, and reports live in too many places.",
    icon: Layers3,
  },
]

const outcomes = [
  {
    title: "Get More Customers",
    text: "Clear pages, better offers, and digital funnels built for action.",
    icon: TrendingUp,
  },
  {
    title: "Convert Leads Better",
    text: "Turn social traffic into qualified enquiries before the chat starts.",
    icon: UsersRound,
  },
  {
    title: "Improve Operations",
    text: "Automate requests, records, approvals, bookings, and reporting.",
    icon: Gauge,
  },
  {
    title: "Build Custom Products",
    text: "Launch portals, dashboards, SaaS tools, mobile apps, and internal systems.",
    icon: PackageCheck,
  },
]

const services = [
  { title: "Website Development", icon: PanelTop },
  { title: "Sales Landing Pages", icon: Rocket },
  { title: "Web Applications", icon: Code2 },
  { title: "Mobile Applications", icon: Smartphone },
  { title: "Business Automation", icon: DatabaseZap },
  { title: "SaaS Platforms", icon: Building2 },
  { title: "Custom Software", icon: BriefcaseBusiness },
  { title: "Digital Business Setup", icon: ShieldCheck },
]

const pricing = [
  {
    name: "Website Development",
    oldPrice: "₦250,000",
    newPrice: "₦150,000",
    detail: "Business website, company profile, service pages, contact flow.",
  },
  {
    name: "Sales / Lead Funnel Page",
    oldPrice: "₦300,000",
    newPrice: "₦180,000",
    detail: "Ad-ready landing page with offer, proof, pricing, and CTA.",
  },
  {
    name: "Business Automation / Internal System",
    oldPrice: "₦5,000,000",
    newPrice: "₦3,500,000",
    detail: "Dashboards, workflows, records, approvals, and reports.",
  },
  {
    name: "Web / Mobile App Development",
    oldPrice: "₦15,000,000",
    newPrice: "₦10,000,000",
    detail: "Customer apps, portals, marketplaces, SaaS, and product MVPs.",
  },
]

const workExamples = [
  {
    name: "Ubuxa",
    type: "Product build",
    image: "/images/case-studies/ubuxa.jpg",
    text: "A digital product Boffins helped build for smarter platform experiences.",
  },
  {
    name: "Bokana Electronics",
    type: "Commerce presence",
    image: "/digital-transformation-small-business.jpg",
    text: "Digital setup direction for a business that needs trust, visibility, and product enquiries.",
  },
  {
    name: "Tims Auto",
    type: "Service business",
    image: "/automotive-service-website-booking.jpg",
    text: "A business website direction built around bookings, trust, and service enquiries.",
  },
]

const serviceOptions = [
  "Website Development",
  "Sales / Lead Funnel Page",
  "Business Automation / Internal System",
  "Web / Mobile App Development",
  "SaaS Platform",
  "Custom Software",
  "Not sure yet",
]

const budgetOptions = [
  "₦150k - ₦300k",
  "₦300k - ₦1m",
  "₦1m - ₦3.5m",
  "₦3.5m - ₦10m",
  "₦10m+",
]

const timelineOptions = ["Immediately", "Within 2 weeks", "This month", "1 - 3 months", "Still planning"]

const faqs = [
  {
    question: "Why show pricing before WhatsApp?",
    answer: "It helps both sides save time. You see the starting range first, then we discuss the actual scope.",
  },
  {
    question: "How long does a project take?",
    answer: "Simple websites can take days to a few weeks. Apps, SaaS platforms, and internal systems depend on features.",
  },
  {
    question: "Can I pay in phases?",
    answer: "Yes. Most projects are split into agreed phases such as deposit, milestone delivery, and final launch.",
  },
  {
    question: "Do you build mobile apps?",
    answer: "Yes. We build web apps, Android/iOS mobile apps, dashboards, portals, and connected systems.",
  },
  {
    question: "Can you build a custom system for my business?",
    answer: "Yes. We can design systems for sales, inventory, HR, booking, customer management, reporting, and more.",
  },
  {
    question: "Does my business need to be in Abuja?",
    answer: "No. Boffins works with businesses across Nigeria and can start remotely through WhatsApp or calls.",
  },
  {
    question: "Do you handle maintenance after launch?",
    answer: "Yes. Maintenance, updates, hosting support, backups, and improvements can be arranged after launch.",
  },
]

function trackLeadEvent(eventName: string, payload: Record<string, string | boolean> = {}) {
  if (typeof window === "undefined") return

  console.info("[analytics-placeholder]", eventName, payload)

  const win = window as Window & {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    ttq?: { track?: (event: string, payload?: Record<string, string | boolean>) => void }
  }

  win.gtag?.("event", eventName, payload)
  win.fbq?.("trackCustom", eventName, payload)
  win.ttq?.track?.(eventName, payload)
}

export function BusinessGrowthLanding() {
  const [form, setForm] = useState<FormState>(initialFormState)
  const [started, setStarted] = useState(false)
  const [completed, setCompleted] = useState(false)
  const pricingRef = useRef<HTMLElement | null>(null)

  const isComplete = Object.values(form).every((value) => value.trim().length > 0)

  const whatsappLink = useMemo(() => {
    const message = [
      "Hi Boffins Technology, I came from the Business Growth Solutions landing page.",
      "",
      `Service type: ${form.serviceType}`,
      `Business type: ${form.businessType}`,
      `Problem to solve: ${form.problem}`,
      `Budget range: ${form.budget}`,
      `Timeline: ${form.timeline}`,
      "",
      "Please advise on the best solution and next steps.",
    ].join("\n")

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }, [form])

  useEffect(() => {
    const node = pricingRef.current
    if (!node || typeof IntersectionObserver === "undefined") return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackLeadEvent("pricing_view")
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isComplete && !completed) {
      setCompleted(true)
      trackLeadEvent("qualification_completion", {
        service: form.serviceType,
        budget: form.budget,
      })
    }
  }, [completed, form.budget, form.serviceType, isComplete])

  function updateField(field: keyof FormState, value: string) {
    if (!started) {
      setStarted(true)
      trackLeadEvent("qualification_start")
    }

    if (field === "serviceType") trackLeadEvent("selected_service", { service: value })
    if (field === "budget") trackLeadEvent("selected_budget", { budget: value })

    setForm((current) => ({ ...current, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="relative overflow-hidden bg-[#071d2b] text-white">
          <div className="absolute inset-0 opacity-30">
            <Image src="/modern-technology-workspace-with-multiple-screens.jpg" alt="" fill priority className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(7,29,43,0.96),rgba(11,105,124,0.78),rgba(255,116,42,0.34))]" />
          <div className="container relative mx-auto grid min-h-[92vh] grid-cols-1 items-center gap-10 px-4 py-24 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <div className="space-y-7">
              <Badge className="w-fit bg-white/12 text-white hover:bg-white/12">For social media leads</Badge>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                  Grow your business with websites, apps, and digital systems.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-white/82 sm:text-lg">
                  Boffins helps businesses get seen, convert leads, automate work, and build custom products that move revenue.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
                  <Link href="#qualify">
                    Qualify My Project <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/35 bg-white/8 text-white hover:bg-white hover:text-[#071d2b]"
                  asChild
                >
                  <Link href="#pricing">See Starting Prices</Link>
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-2">
                {["Fast scan", "Clear pricing", "WhatsApp ready"].map((item) => (
                  <div key={item} className="rounded-lg border border-white/15 bg-white/10 p-3 text-center text-xs font-medium sm:text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur">
              <div className="rounded-md bg-white p-4 text-[#071d2b]">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase text-primary">Boffins Growth Stack</p>
                    <h2 className="text-2xl font-bold">From ad click to customer</h2>
                  </div>
                  <Sparkles className="h-8 w-8 text-secondary" />
                </div>
                <div className="grid grid-cols-2 gap-3 py-4">
                  {["Website", "Lead funnel", "Automation", "App/SaaS"].map((item) => (
                    <div key={item} className="rounded-md bg-muted p-3 text-sm font-semibold">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="rounded-md bg-primary p-4 text-primary-foreground">
                  <p className="text-sm font-medium">Before WhatsApp:</p>
                  <p className="mt-1 text-2xl font-bold">Tell us what you need in 60 seconds.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionShell id="problems" eyebrow="Common business blockers" title="What is slowing growth down?">
          <CardGrid>
            {problemCards.map((item) => (
              <IconCard key={item.title} {...item} />
            ))}
          </CardGrid>
        </SectionShell>

        <SectionShell eyebrow="Business outcomes" title="What Boffins helps you improve" muted>
          <CardGrid>
            {outcomes.map((item) => (
              <IconCard key={item.title} {...item} />
            ))}
          </CardGrid>
        </SectionShell>

        <SectionShell id="services" eyebrow="What we can build" title="Pick the digital tool your business needs">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {services.map(({ title, icon: Icon }) => (
              <div key={title} className="rounded-lg border bg-card p-4 shadow-sm">
                <Icon className="mb-3 h-7 w-7 text-primary" />
                <p className="text-sm font-semibold leading-snug">{title}</p>
              </div>
            ))}
          </div>
        </SectionShell>

        <section id="pricing" ref={pricingRef} className="bg-[#071d2b] py-16 text-white sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-secondary">Limited starting offers</p>
                <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Pricing that filters serious projects</h2>
              </div>
              <Badge className="w-fit bg-white text-[#071d2b] hover:bg-white">Starting from</Badge>
            </div>
            <div className="grid gap-4 lg:grid-cols-4">
              {pricing.map((item) => (
                <Card key={item.name} className="border-white/12 bg-white text-[#071d2b]">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg leading-tight">{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground line-through">Old starting price {item.oldPrice}</p>
                      <p className="text-3xl font-bold text-primary">Starting from {item.newPrice}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="mt-5 text-sm text-white/78">
              Final pricing depends on scope, features, timeline, integrations, content, and business requirements.
            </p>
          </div>
        </section>

        <SectionShell eyebrow="Proof of work" title="Examples connected to real business needs">
          <div className="grid gap-5 md:grid-cols-3">
            {workExamples.map((item) => (
              <Card key={item.name} className="overflow-hidden">
                <div className="relative h-44 w-full">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <CardHeader className="pb-2">
                  <Badge variant="secondary" className="w-fit">{item.type}</Badge>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionShell>

        <section id="qualify" className="bg-muted/60 py-16 sm:py-20">
          <div className="container mx-auto grid gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div className="space-y-5">
              <Badge variant="secondary" className="w-fit">Quick qualification</Badge>
              <h2 className="text-3xl font-bold sm:text-4xl">Answer 5 quick questions before WhatsApp.</h2>
              <p className="text-muted-foreground">
                This helps us reply with the right solution, price direction, and next step.
              </p>
              <div className="grid gap-3">
                {["No long form", "No forced call", "Message is prefilled"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm font-medium">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <Card className="shadow-lg">
              <CardContent className="grid gap-5 p-5 sm:p-6">
                <SelectField
                  label="Service type"
                  value={form.serviceType}
                  placeholder="Select what you need"
                  options={serviceOptions}
                  onChange={(value) => updateField("serviceType", value)}
                />
                <div className="grid gap-2">
                  <Label htmlFor="businessType">Business type</Label>
                  <Input
                    id="businessType"
                    value={form.businessType}
                    onChange={(event) => updateField("businessType", event.target.value)}
                    placeholder="Example: fashion store, school, logistics, real estate"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="problem">Problem to solve</Label>
                  <Textarea
                    id="problem"
                    value={form.problem}
                    onChange={(event) => updateField("problem", event.target.value)}
                    placeholder="Example: I need more qualified leads from Instagram ads"
                    className="min-h-24"
                  />
                </div>
                <SelectField
                  label="Budget range"
                  value={form.budget}
                  placeholder="Select your budget range"
                  options={budgetOptions}
                  onChange={(value) => updateField("budget", value)}
                />
                <SelectField
                  label="Timeline"
                  value={form.timeline}
                  placeholder="Select your timeline"
                  options={timelineOptions}
                  onChange={(value) => updateField("timeline", value)}
                />
                {isComplete ? (
                  <Button
                    size="lg"
                    className="h-12 bg-[#25D366] text-white hover:bg-[#1fb457]"
                    asChild
                    onClick={() => {
                      trackLeadEvent("whatsapp_click", {
                        service: form.serviceType,
                        budget: form.budget,
                      })
                    }}
                  >
                    <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-5 w-5" /> Continue on WhatsApp
                    </Link>
                  </Button>
                ) : (
                  <Button size="lg" disabled className="h-12 bg-[#25D366] text-white hover:bg-[#25D366]">
                    <MessageCircle className="h-5 w-5" /> Complete questions first
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        <SectionShell eyebrow="Questions before you chat" title="Quick answers">
          <Accordion type="single" collapsible className="mx-auto max-w-3xl">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SectionShell>

        <section className="bg-primary py-12 text-primary-foreground">
          <div className="container mx-auto flex flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase text-primary-foreground/75">Ready when you are</p>
              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">Start with the quick form, then chat with Boffins.</h2>
            </div>
            <Button size="lg" variant="secondary" asChild>
              <Link href="#qualify">
                Qualify My Project <Phone className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function SectionShell({
  id,
  eyebrow,
  title,
  children,
  muted = false,
}: {
  id?: string
  eyebrow: string
  title: string
  children: ReactNode
  muted?: boolean
}) {
  return (
    <section id={id} className={muted ? "bg-muted/60 py-16 sm:py-20" : "py-16 sm:py-20"}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-secondary">{eyebrow}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  )
}

function CardGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
}

function IconCard({
  title,
  text,
  icon: Icon,
}: {
  title: string
  text: string
  icon: ComponentType<{ className?: string }>
}) {
  return (
    <Card className="h-full">
      <CardContent className="p-5">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
      </CardContent>
    </Card>
  )
}

function SelectField({
  label,
  value,
  placeholder,
  options,
  onChange,
}: {
  label: string
  value: string
  placeholder: string
  options: string[]
  onChange: (value: string) => void
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-")

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
