"use client"

import { useState } from "react"
import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send, Loader2, CheckCircle, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"
import { sectionStyles, responsive } from "@/lib/style-utils"

interface SocialMedia {
  facebook?: string
  twitter?: string
  instagram?: string
  linkedin?: string
  youtube?: string
}

interface Division {
  name: string
  description: string
  email: string
  icon: React.ReactElement
  socialMedia?: SocialMedia
}

interface ContactFormSectionProps {
  divisions?: Division[]
  className?: string
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}

interface ToastState {
  show: boolean
  title: string
  description: string
  variant: "success" | "error"
}

// Toast Component
function Toast({ toast, onClose }: { toast: ToastState; onClose: () => void }) {
  if (!toast.show) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
      <Card className={`w-96 ${toast.variant === "error" ? "border-destructive" : "border-green-500"}`}>
        <CardHeader>
          <div className="flex items-center gap-2">
            {toast.variant === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
            <CardTitle className="text-sm">{toast.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{toast.description}</p>
          <Button size="sm" variant="outline" className="mt-3" onClick={onClose}>
            Close
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// Social Media Icons Component
function SocialMediaLinks({ socialMedia }: { socialMedia?: SocialMedia }) {
  if (!socialMedia) return null

  const socialLinks = [
    { platform: "facebook", icon: Facebook, url: socialMedia.facebook },
    { platform: "twitter", icon: Twitter, url: socialMedia.twitter },
    { platform: "instagram", icon: Instagram, url: socialMedia.instagram },
    { platform: "linkedin", icon: Linkedin, url: socialMedia.linkedin },
    { platform: "youtube", icon: Youtube, url: socialMedia.youtube },
  ].filter(link => link.url)

  if (socialLinks.length === 0) return null

  return (
    <div className="flex items-center gap-3 mt-3 pt-3 border-t">
      {socialLinks.map(({ platform, icon: Icon, url }) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300"
          aria-label={`Visit our ${platform} page`}
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  )
}

export function ContactFormSection({ divisions = [], className }: ContactFormSectionProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<ToastState>({
    show: false,
    title: "",
    description: "",
    variant: "success",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id || e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setToast({
        show: true,
        title: "Missing Required Fields",
        description: "Please fill in all required fields (marked with *)",
        variant: "error",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Send email to info@boffinstechnology.com.ng
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "info@boffinstechnology.com.ng",
          subject: `Contact Form Submission from ${formData.firstName} ${formData.lastName}`,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: formData.service,
          message: formData.message,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      // Success
      setToast({
        show: true,
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us! Our team will respond to your inquiry within 10 minutes to 24 hours.",
        variant: "success",
      })

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      })
    } catch (error) {
      setToast({
        show: true,
        title: "Failed to Send Message",
        description: "We couldn't send your message. Please try again or contact us directly at info@boffinstechnology.com.ng",
        variant: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      className={sectionStyles({
        padding: "lg",
        background: "muted",
        className,
      })}
    >
      <Toast toast={toast} onClose={() => setToast({ ...toast, show: false })} />

      <div className={responsive.container}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl">Send Us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      First Name *
                    </label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last Name *
                    </label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+234 (0) 123 456 7890"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">
                    Company
                  </label>
                  <Input
                    id="company"
                    placeholder="Your Company Name"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-medium">
                    Service of Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">Select a service</option>
                    <option value="bespoke">Bespoke Division</option>
                    <option value="products">Product Division</option>
                    <option value="media">Media Company</option>
                    <option value="academy">Academy</option>
                    <option value="hardware">Hardware Division</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project or inquiry..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
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
                        <SocialMediaLinks socialMedia={division.socialMedia} />
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