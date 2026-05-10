import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { MissionVisionSection } from "@/components/sections/mission-vision-section"
import { ValuesSection } from "@/components/sections/values-section"
import { LeadershipSection } from "@/components/sections/leadership-section"
import { TimelineSection } from "@/components/sections/timeline-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { CTASection } from "@/components/sections/cta-section"
import { getAboutPageData, type AboutPageData } from "@/lib/api/about"
import { aboutData } from "@/lib/data/about-data"

export default async function AboutPage() {
  let aboutPageData: AboutPageData;

  try {
    aboutPageData = await getAboutPageData();
  } catch (error) {
    console.error('Failed to fetch about page data:', error);
    aboutPageData = {
      ...aboutData,
      values: aboutData.values.map((value, index) => ({
        ...value,
        icon: ["Lightbulb", "Handshake", "Award", "TrendingUp"][index] || "Lightbulb",
      })),
      valuesTitle: "Our Core Values",
      valuesSubtitle: "These values guide every decision we make and every solution we create across all our divisions.",
      leadershipTitle: "Organizational Structure",
      leadershipSubtitle:
        "Our lean but effective leadership structure ensures strategic alignment while maintaining operational efficiency across all divisions.",
      milestonesTitle: "Our Journey",
      milestonesSubtitle: "From a single vision to a diversified technology ecosystem - here's how we've grown and evolved.",
    };
  }

  return (
    <div className="min-h-screen">
      <Header />

      <HeroSection
        title={aboutPageData.hero.title}
        subtitle={aboutPageData.hero.subtitle}
        description={aboutPageData.hero.description}
        heroImage={aboutPageData.hero.heroImage}
        primaryCTA={aboutPageData.hero.primaryCTA}
        secondaryCTA={aboutPageData.hero.secondaryCTA}
      />

      <MissionVisionSection mission={aboutPageData.mission} vision={aboutPageData.vision} />

      <ValuesSection
        values={aboutPageData.values}
        title={aboutPageData.valuesTitle}
        subtitle={aboutPageData.valuesSubtitle}
      />

      <LeadershipSection
        leadership={aboutPageData.leadership}
        title={aboutPageData.leadershipTitle}
        subtitle={aboutPageData.leadershipSubtitle}
      />

      <TimelineSection
        items={aboutPageData.milestones}
        title={aboutPageData.milestonesTitle}
        subtitle={aboutPageData.milestonesSubtitle}
      />

      <FeaturesSection
        title={aboutPageData.collaboration.title}
        description={aboutPageData.collaboration.description}
        features={aboutPageData.collaboration.features}
        image={aboutPageData.collaboration.image}
        cta={aboutPageData.collaboration.cta}
      />

      <CTASection {...aboutPageData.cta} background="gradient" />

      <Footer />
    </div>
  )
}
