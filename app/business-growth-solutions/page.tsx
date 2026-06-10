import type { Metadata } from "next"
import { BusinessGrowthLanding } from "./business-growth-landing"

export const metadata: Metadata = {
  title: "Business Growth Solutions | Boffins Technology",
  description:
    "Grow your business with websites, sales landing pages, apps, automation, SaaS platforms, and custom digital systems from Boffins Technology.",
  alternates: {
    canonical: "/business-growth-solutions",
  },
  openGraph: {
    title: "Business Growth Solutions | Boffins Technology",
    description:
      "Websites, apps, automation, and custom digital systems built to help businesses get more customers and operate better.",
    url: "https://boffinstechnology.com.ng/business-growth-solutions",
    siteName: "Boffins Technology",
    images: [
      {
        url: "/boffins-bespoke-hero-image.png",
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
