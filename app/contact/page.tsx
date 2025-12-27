"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ContactInfoSection } from "@/components/sections/contact-info-section"
import { ContactFormSection } from "@/components/sections/contact-form-section"
import { sectionStyles, responsive } from "@/lib/style-utils"
import { contactData } from "@/lib/data/contact-data"

export default function ContactPage() {
  // convert icon components → JSX (design stays same)
  const contactInfoWithIcons = contactData.contactInfo.map((item) => ({
    ...item,
    icon: <item.icon className="h-6 w-6" />,
  }))

  const divisionsWithIcons = contactData.divisions.map((division) => ({
    ...division,
    icon: <division.icon className="h-5 w-5" />,
  }))

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section
        className={sectionStyles({
          padding: "xl",
          background: "gradient",
        })}
      >
        <div className={responsive.container}>
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <Badge variant="secondary" className="w-fit mx-auto">
              {contactData.hero.badge}
            </Badge>

            <h1 className="text-4xl lg:text-6xl font-bold text-balance">
              {contactData.hero.title}{" "}
              <span className="text-primary">
                {contactData.hero.subtitle}
              </span>
            </h1>

            <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
              {contactData.hero.description}
            </p>
          </div>
        </div>
      </section>

      <ContactInfoSection contactInfo={contactInfoWithIcons} />

      <ContactFormSection divisions={divisionsWithIcons} />

      {/* Map Section */}
      <section className={sectionStyles({ padding: "lg" })}>
        <div className={responsive.container}>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">
              {contactData.office.title}
            </h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              {contactData.office.description}
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="relative w-full h-96 md:h-[500px] lg:h-[600px]">
              <iframe
                src={contactData.office.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Boffins Technology Office Location"
                className="w-full h-full"
              />
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
