import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ContactInfoSection } from "@/components/sections/contact-info-section"
import { ContactFormSection } from "@/components/sections/contact-form-section"
import { sectionStyles, responsive } from "@/lib/style-utils"
import { getContactPageData, getStaticContactPageData, type ContactPageData } from "@/lib/api/contact"

export default async function ContactPage() {
  let contactPageData: ContactPageData

  try {
    contactPageData = await getContactPageData()
  } catch (error) {
    console.error("Failed to fetch contact page data:", error)
    contactPageData = getStaticContactPageData()
  }

  return (
    <div className="min-h-screen">
      <Header />

      <section
        className={sectionStyles({
          padding: "xl",
          background: "gradient",
        })}
      >
        <div className={responsive.container}>
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <Badge variant="secondary" className="w-fit mx-auto">
              {contactPageData.hero.badge}
            </Badge>

            <h1 className="text-4xl lg:text-6xl font-bold text-balance">
              {contactPageData.hero.title} <span className="text-primary">{contactPageData.hero.subtitle}</span>
            </h1>

            <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
              {contactPageData.hero.description}
            </p>
          </div>
        </div>
      </section>

      <ContactInfoSection contactInfo={contactPageData.contactInfo} />

      <ContactFormSection
        divisions={contactPageData.divisions}
        form={contactPageData.form}
        divisionsTitle={contactPageData.divisionsTitle}
        divisionsDescription={contactPageData.divisionsDescription}
        socialAriaLabelTemplate={contactPageData.socialAriaLabelTemplate}
      />

      <section className={sectionStyles({ padding: "lg" })}>
        <div className={responsive.container}>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">{contactPageData.office.title}</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              {contactPageData.office.description}
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="relative w-full h-96 md:h-[500px] lg:h-[600px]">
              <iframe
                src={contactPageData.office.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={contactPageData.office.mapTitle}
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
