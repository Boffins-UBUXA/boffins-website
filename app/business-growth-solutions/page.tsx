import type { Metadata } from "next"

import { BusinessGrowthLanding } from "./business-growth-landing"

export const metadata: Metadata = {
  title: "Business Growth Solutions | Boffins Technology",
  description:
    "Websites, landing pages, apps, automation, and custom digital systems that help Nigerian businesses qualify leads, improve operations, and grow.",
  alternates: {
    canonical: "/business-growth-solutions",
  },
  openGraph: {
    title: "Business Growth Solutions | Boffins Technology",
    description:
      "Build a business growth system that explains your offer, qualifies serious buyers, and sends ready customers to WhatsApp.",
    url: "https://boffinstechnology.com.ng/business-growth-solutions",
    siteName: "Boffins Technology",
    images: [
      {
        url: "/business-growth/hero-business-growth.png",
        width: 1200,
        height: 630,
        alt: "Boffins Technology business growth solutions",
      },
    ],
    type: "website",
  },
}

export default function BusinessGrowthSolutionsPage() {
  return <BusinessGrowthLanding />
}
