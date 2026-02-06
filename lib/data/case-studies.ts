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
    image: "/multi-tenant-pasges.png",
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
        content: "Ubuxa is built as a scalable, multi-tenant SaaS platform designed specifically for pay-as-you-go and distributed asset businesses. It follows a software-first, API-driven approach, enabling modular, extensible solutions that adapt as operational needs evolve.",
        items: [
          "Multi-Tenant SaaS Architecture - Secure, isolated environments for multiple vendors with shared infrastructure",
          "API-Driven Design - Modular, extensible integrations enabling seamless connectivity with existing systems",
          "Scalable Infrastructure - Built to support growth across regions, currencies, and industries without architectural constraints",
          "Real-Time Processing - Immediate payment verification, PAYG token enforcement, and transaction settlement",
          "Local Market Alignment - Designed with the operational realities of distributed, field-based businesses in mind",
        ],
      },
      {
        id: "status",
        title: "Current Status",
        content: "Ubuxa is in the Alpha stage, being actively validated through real-world use cases with vendors and agents. This phase focuses on testing core workflows, refining operational processes, and ensuring the platform meets the practical needs of pay-as-you-go businesses.",
        items: [
          "Active Validation - Real-world testing with vendors, agents, and customers in live PAYG operations",
          "Core Workflow Refinement - Continuous optimization of sales, payments, collections, and reporting processes",
          "Market Feedback Integration - Platform evolution guided by industry insights and operational lessons learned",
          "Scalability Testing - Validating system performance and reliability under production loads and diverse use cases",
          "Continuous Improvement - Roadmap driven by user feedback and emerging market requirements",
        ],
      },
      {
        id: "built-by",
        title: "Built by Boffins Technology",
        content: "Ubuxa is an independent SaaS platform designed and engineered by Boffins Technology Ltd, a software and media company with deep experience building industry-focused digital products. Boffins Technology serves as the product design and engineering partner behind Ubuxa, bringing proven expertise in product strategy, deep domain understanding, and scalable system design.",
        items: [
          "Product Strategy & Design - Deep expertise in translating complex business problems into user-centric software solutions",
          "Industry-Focused SaaS Platform Development - Proven track record building tailored platforms for specific industries and markets",
          "Domain Understanding - In-depth knowledge of pay-as-you-go models, asset financing, and distributed energy business operations",
          "Scalable Architecture - Designed systems capable of supporting sustainable growth across regions and currencies",
          "Production-Ready Engineering - Reliable, robust software built for real-world operational demands and long-term viability",
        ],
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
