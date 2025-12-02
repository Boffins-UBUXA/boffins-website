import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { ServiceGridSection } from "@/components/sections/service-grid-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { ProcessSection } from "@/components/sections/process-section"
import { CTASection } from "@/components/sections/cta-section"
import { servicesData } from "@/lib/data/services-data"

export default function ServicesPage() {
  // Transform icon functions to React elements for benefits
  const benefitsWithIcons = servicesData.benefits.map((benefit) => ({
    ...benefit,
    icon: <benefit.icon className="h-8 w-8" />,
  }))

  return (
    <div className="min-h-screen">
      <Header />

      <HeroSection {...servicesData.hero} />

      <ServiceGridSection
        services={servicesData.divisions}
        title="Our Service Divisions"
        subtitle="Each division operates with specialized expertise while collaborating within our integrated ecosystem to deliver comprehensive solutions."
      />

      <BenefitsSection
        benefits={benefitsWithIcons}
        title="Why Choose Boffins Technology?"
        subtitle="Our unique approach combines specialized expertise with collaborative innovation to deliver exceptional results."
      />

      <ProcessSection {...servicesData.process} />

      <CTASection {...servicesData.cta} background="gradient" />

      <Footer />
    </div>
  )
}
