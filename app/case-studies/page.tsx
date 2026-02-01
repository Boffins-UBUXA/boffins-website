import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import CaseStudiesContent from "@/components/case-studies-content"

export const metadata = {
  title: "Case Studies - Boffins Technology",
  description:
    "Explore how Boffins Technology has helped businesses across industries achieve their goals through innovative technology solutions.",
  keywords: [
    "case studies",
    "success stories",
    "business transformation",
    "technology solutions",
  ],
  openGraph: {
    title: "Case Studies - Boffins Technology",
    description: "Real-world examples of business transformation through innovative technology",
  },
}

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={null}>
          <CaseStudiesContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
