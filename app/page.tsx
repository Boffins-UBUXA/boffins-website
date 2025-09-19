import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { StatsSection } from "@/components/sections/stats-section"
import { DivisionsSection } from "@/components/sections/divisions-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { BlogPreview } from "@/components/blog-preview"
import { CTASection } from "@/components/sections/cta-section"
import { landingPageData } from "@/lib/data/landing-page"

export default function HomePage() {
  // Transform icon functions to React elements for stats
  const statsWithIcons = landingPageData.stats.map((stat) => ({
    ...stat,
    icon: <stat.icon className="h-8 w-8" />,
  }))

  // Transform icon functions to React elements for divisions
  const divisionsWithIcons = landingPageData.divisions.map((division) => ({
    ...division,
    icon: <division.icon className="h-6 w-6" />,
  }))

  return (
    <div className="min-h-screen">
      <Header />

      <HeroSection {...landingPageData.hero} />

      <StatsSection stats={statsWithIcons} />

      <DivisionsSection
        divisions={divisionsWithIcons}
        title="Our Specialized Divisions"
        subtitle="Each division operates semi-independently while collaborating within the Boffins ecosystem to deliver comprehensive technology solutions."
      />

      <FeaturesSection {...landingPageData.features} />

      <BlogPreview />

      <CTASection {...landingPageData.cta} background="gradient" />

      <Footer />
    </div>
  )
}
