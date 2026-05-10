import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { ServiceGridSection } from "@/components/sections/service-grid-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { ProcessSection } from "@/components/sections/process-section"
import { CTASection } from "@/components/sections/cta-section"
import { getServicesPageData, type ServicesPageData } from "@/lib/api/services"
import { servicesData } from "@/lib/data/services-data"

export default async function ServicesPage() {
  let servicesPageData: ServicesPageData;

  try {
    servicesPageData = await getServicesPageData();
  } catch (error) {
    console.error('Failed to fetch services data:', error);
    servicesPageData = {
      ...servicesData,
      divisionsTitle: "Our Service Divisions",
      divisionsSubtitle:
        "Each division operates with specialized expertise while collaborating within our integrated ecosystem to deliver comprehensive solutions.",
      divisionCardCtaLabel: "Learn More",
      divisionMoreLabel: "More",
      divisionLessLabel: "Less",
      benefits: servicesData.benefits.map((benefit, index) => ({
        icon: ["Users", "Zap", "Shield", "Lightbulb"][index] || "Lightbulb",
        title: benefit.title,
        description: benefit.description,
      })),
      benefitsTitle: "Why Choose Boffins Technology?",
      benefitsSubtitle:
        "Our unique approach combines specialized expertise with collaborative innovation to deliver exceptional results.",
      benefitSeeMoreLabel: "See More",
      benefitSeeLessLabel: "See Less",
      processMoreLabel: "More",
      processLessLabel: "Less",
      processViewAllLabel: "View All {count} Steps",
    };
  }

  return (
    <div className="min-h-screen">
      <Header />

      <HeroSection {...servicesPageData.hero} />

      <ServiceGridSection
        services={servicesPageData.divisions}
        title={servicesPageData.divisionsTitle}
        subtitle={servicesPageData.divisionsSubtitle}
        cardCtaLabel={servicesPageData.divisionCardCtaLabel}
        moreLabel={servicesPageData.divisionMoreLabel}
        lessLabel={servicesPageData.divisionLessLabel}
      />

      <BenefitsSection
        benefits={servicesPageData.benefits}
        title={servicesPageData.benefitsTitle}
        subtitle={servicesPageData.benefitsSubtitle}
        seeMoreLabel={servicesPageData.benefitSeeMoreLabel}
        seeLessLabel={servicesPageData.benefitSeeLessLabel}
      />

      <ProcessSection
        {...servicesPageData.process}
        moreLabel={servicesPageData.processMoreLabel}
        lessLabel={servicesPageData.processLessLabel}
        viewAllLabel={servicesPageData.processViewAllLabel}
      />

      <CTASection {...servicesPageData.cta} background="gradient" />

      <Footer />
    </div>
  )
}
