import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { StatsSection } from "@/components/sections/stats-section"
import { DivisionsSection } from "@/components/sections/divisions-section"
import { FeaturesSection } from "@/components/sections/features-section"
import BlogPreview from "@/components/blog-preview"
import { CTASection } from "@/components/sections/cta-section"
import { getHomepageData } from "@/lib/api/homepage"
import { landingPageData } from "@/lib/data/landing-page"
import type { HomepageData } from "@/lib/api/homepage"

type HomePageViewData = HomepageData

export default async function HomePage() {
  let homepageData: HomePageViewData

  try {
    homepageData = await getHomepageData()
  } catch (error) {
    console.error("Failed to fetch homepage data:", error)
    // Fallback to static data
    homepageData = {
      ...landingPageData,
      divisionsTitle: "Our Specialized Divisions",
      divisionsSubtitle:
        "Each division operates semi-independently while collaborating within the Boffins ecosystem to deliver comprehensive technology solutions.",
      blogPosts: [],
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <HeroSection {...homepageData.hero} />

      <StatsSection stats={homepageData.stats} />

      <DivisionsSection
        divisions={homepageData.divisions}
        title={homepageData.divisionsTitle}
        subtitle={homepageData.divisionsSubtitle}
      />

      <FeaturesSection {...homepageData.features} />

      <BlogPreview initialPosts={homepageData.blogPosts} />

      <CTASection {...homepageData.cta} background="gradient" />

      <Footer />
    </div>
  )
}
