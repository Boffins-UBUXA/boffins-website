import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send } from "lucide-react"
import { sectionStyles, responsive } from "@/lib/style-utils"

interface Division {
  name: string
  description: string
  email: string
  icon: React.ReactElement
}

interface ContactFormSectionProps {
  divisions?: Division[]
  className?: string
}

export function ContactFormSection({ divisions = [], className }: ContactFormSectionProps) {
  return (
    <section
      className={sectionStyles({
        padding: "lg",
        background: "muted",
        className,
      })}
    >
      <div className={responsive.container}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl">Send Us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      First Name *
                    </label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last Name *
                    </label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <Input id="phone" type="tel" placeholder="+234 (0) 123 456 7890" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">
                    Company
                  </label>
                  <Input id="company" placeholder="Your Company Name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-medium">
                    Service of Interest
                  </label>
                  <select
                    id="service"
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                  >
                    <option value="">Select a service</option>
                    <option value="education">Education & Training</option>
                    <option value="products">Product Division</option>
                    <option value="hardware">Hardware Division</option>
                    <option value="media">Media Company</option>
                    <option value="bespoke">Bespoke Division</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message *
                  </label>
                  <Textarea id="message" placeholder="Tell us about your project or inquiry..." rows={5} required />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Division Contacts */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Contact Our Divisions</h2>
              <p className="text-muted-foreground mb-8">
                Get in touch with the specific division that best matches your needs for faster, more targeted
                assistance.
              </p>
            </div>

            <div className="space-y-4">
              {divisions.map((division, index) => (
                <Card key={index} className="hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                        {division.icon}
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="font-semibold">{division.name}</h3>
                        <p className="text-sm text-muted-foreground">{division.description}</p>
                        <a
                          href={`mailto:${division.email}`}
                          className="text-sm text-primary hover:underline inline-flex items-center space-x-1"
                        >
                          <Mail className="h-3 w-3" />
                          <span>{division.email}</span>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
