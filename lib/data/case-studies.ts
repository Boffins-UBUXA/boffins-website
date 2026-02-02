export interface CaseStudy {
  id: string
  slug: string
  title: string
  subtitle: string
  intro: string
  image: string
  category: string
  client: string
  ctaUrl?: string
  ctaText?: string
  sections: CaseStudySection[]
}

export interface CaseStudySection {
  id: string
  title: string
  subtitle?: string
  content: string
  items?: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: "ubuxa",
    slug: "ubuxa",
    title: "Ubuxa",
    subtitle: "Pay-As-You-Go (PAYG) Energy & Asset Financing Platform",
    intro: "Ubuxa is a PAYG platform built for energy and asset-based businesses operating in local markets. It enables companies to finance, manage, and collect payments for distributed assets while aligning operations and software costs with local currency realities.",
    image: "/images/case-studies/ubuxa.jpg",
    category: "SaaS Platform",
    client: "Ubuxa",
    ctaUrl: "https://ubuxa.ng",
    ctaText: "Visit Ubuxa",
    sections: [
      {
        id: "problem",
        title: "The Problem",
        subtitle: "Industry Context",
        content: "Energy and asset-based businesses serving local markets face a unique set of operational and financial challenges. Customers often cannot afford the full upfront cost of essential assets, forcing vendors to adopt installment or pay-as-you-go models without the right supporting infrastructure.",
        items: [
          "High upfront costs that limit customer adoption",
          "Payment defaults that disrupt cash flow and asset recovery",
          "Manual or fragmented tracking of devices, customers, and collections",
          "Limited visibility into agent performance and asset lifecycle status",
          "Reliance on spreadsheets or disconnected tools that do not scale",
          "Foreign currency software costs vs. local currency revenue",
        ],
      },
      {
        id: "solution",
        title: "The Solution",
        subtitle: "Purpose-Built Platform for PAYG Operations",
        content: "Ubuxa is a purpose-built platform designed to support pay-as-you-go and asset-based business models in local markets. It brings together financing, operations, and enforcement into a single, software-first system built for scale. Unlike traditional payment tools, Ubuxa is not just about collecting money—it helps businesses manage the entire asset lifecycle from onboarding and financing to usage control, collections, and performance visibility.",
        items: [
          "Implement pay-as-you-go sales models that lower the barrier to customer adoption",
          "Finance assets and manage installment-based payments over time",
          "Track devices and inventory across their full lifecycle",
          "Enable agent-led sales and collections with clear accountability",
          "Automate access control and enforcement using PAYG tokens",
        ],
      },
      {
        id: "features",
        title: "Core Features Delivered",
        content: "Ubuxa delivers a comprehensive set of tools designed to support pay-as-you-go and asset-based operations end to end.",
        items: [
          "PAYG Token Generation & Device Control - Automated pay-as-you-go enforcement through secure token generation",
          "Device, Inventory, and Package Management - Full visibility into assets from storage to installation",
          "Sales, Installments & Payment Tracking - Flexible sales models with real-time payment tracking",
          "Agent & Installer Wallets - Commission tracking and wallet management with accountability",
          "Customer & Contract Management - Centralized management of customer profiles and contracts",
          "Reporting & Performance Insights - Granular reports for executives, sales, collections, devices, agents, inventory, and customers",
        ],
      },
      {
        id: "workflow",
        title: "How Ubuxa Works",
        content: "Ubuxa is designed to be simple to operate while handling complex pay-as-you-go workflows behind the scenes.",
        items: [
          "Vendors register inventory, packages, and devices in one central system",
          "Agents onboard customers and initiate sales with assets",
          "Customers pay in installments using flexible plans suited to local markets",
          "Ubuxa enforces access using PAYG tokens based on payment status",
          "Payments, commissions, and performance are tracked automatically",
        ],
      },
      {
        id: "impact",
        title: "Impact & Value",
        content: "Ubuxa fundamentally changed how PAYG and energy businesses operate by addressing currency exposure, payment reliability, and operational visibility.",
        items: [
          "Reduced Foreign Exchange Exposure - Software costs aligned with local currency revenue",
          "Improved Payment Reliability - PAYG enforcement reduces defaults and improves asset control",
          "Better Visibility Into Asset Performance - Single system for tracking assets, devices, payments, and collections",
          "Easier Agent Management & Accountability - Platform-based commission and collection tracking",
          "A Scalable Foundation - Designed for sustainable growth across regions without foreign currency dependencies",
        ],
      },
      {
        id: "technology",
        title: "Technology & Platform Approach",
        content: "Ubuxa is built as a scalable, multi-tenant SaaS platform designed specifically for pay-as-you-go and distributed asset businesses. It follows a software-first, API-driven approach, allowing its core modules to remain modular, extensible, and adaptable as operational needs evolve. The platform is designed to support long-term growth across regions and industries while remaining aligned with the operational realities of local-market businesses.",
      },
      {
        id: "status",
        title: "Current Status",
        content: "Ubuxa is currently in the Alpha stage, where the platform is being actively validated using real-world use cases. This phase focuses on testing core workflows, refining operational processes, and ensuring the platform aligns with the practical needs of pay-as-you-go and asset-based businesses. Ubuxa is designed to evolve through continuous industry feedback.",
      },
    ],
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug)
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies
}
