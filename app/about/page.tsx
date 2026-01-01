import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { MissionVisionSection } from "@/components/sections/mission-vision-section"
import { ValuesSection } from "@/components/sections/values-section"
import { LeadershipSection } from "@/components/sections/leadership-section"
import { TimelineSection } from "@/components/sections/timeline-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { CTASection } from "@/components/sections/cta-section"
import { aboutData } from "@/lib/data/about-data"

export default function AboutPage() {
  // Transform icon functions to React elements for values
  const valuesWithIcons = aboutData.values.map((value) => ({
    ...value,
    icon: <value.icon className="h-8 w-8" />,
  }))

  return (
    <div className="min-h-screen">
      <Header />

      <HeroSection
        title={aboutData.hero.title}
        subtitle={aboutData.hero.subtitle}
        description={aboutData.hero.description}
        heroImage={aboutData.hero.heroImage}
        primaryCTA={aboutData.hero.primaryCTA}
        secondaryCTA={aboutData.hero.secondaryCTA}
      />

      <MissionVisionSection mission={aboutData.mission} vision={aboutData.vision} />

      <ValuesSection
        values={valuesWithIcons}
        title="Our Core Values"
        subtitle="These values guide every decision we make and every solution we create across all our divisions."
      />

      <LeadershipSection
        leadership={aboutData.leadership}
        title="Organizational Structure"
        subtitle="Our lean but effective leadership structure ensures strategic alignment while maintaining operational efficiency across all divisions."
      />

      <TimelineSection
        items={aboutData.milestones}
        title="Our Journey"
        subtitle="From a single vision to a diversified technology ecosystem - here's how we've grown and evolved."
      />

      <FeaturesSection
        title={aboutData.collaboration.title}
        description={aboutData.collaboration.description}
        features={aboutData.collaboration.features}
        image={aboutData.collaboration.image}
        cta={aboutData.collaboration.cta}
      />

      <CTASection {...aboutData.cta} background="gradient" />

      <Footer />
    </div>
  )
}
