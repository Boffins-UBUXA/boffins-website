import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ContactInfoSection } from "@/components/sections/contact-info-section"
import { ContactFormSection } from "@/components/sections/contact-form-section"
import { contactData } from "@/lib/data/contact-data"
import { MapPin } from "lucide-react"
import { sectionStyles, responsive } from "@/lib/style-utils"

export default function ContactPage() {
  // Transform icon functions to React elements for contact info
  const contactInfoWithIcons = contactData.contactInfo.map((info) => ({
    ...info,
    icon: <info.icon className="h-6 w-6" />,
  }))

  // Transform icon functions to React elements for divisions
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
              {contactData.hero.title} <span className="text-primary">{contactData.hero.subtitle}</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty leading-relaxed">{contactData.hero.description}</p>
          </div>
        </div>
      </section>

      <ContactInfoSection contactInfo={contactInfoWithIcons} />

      <ContactFormSection divisions={divisionsWithIcons} />

      {/* Map Section */}
      <section className={sectionStyles({ padding: "lg" })}>
        <div className={responsive.container}>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">{contactData.office.title}</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              {contactData.office.description}
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="h-96 bg-muted flex items-center justify-center">
              <div className="text-center space-y-4">
                <MapPin className="h-12 w-12 text-primary mx-auto" />
                <div>
                  <h3 className="font-semibold text-lg">{contactData.office.address.name}</h3>
                  <p className="text-muted-foreground">{contactData.office.address.street}</p>
                  <p className="text-muted-foreground">{contactData.office.address.city}</p>
                </div>
                <Button variant="outline">Get Directions</Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
