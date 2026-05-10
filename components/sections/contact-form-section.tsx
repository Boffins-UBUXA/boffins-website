"use client"

import { useState } from "react"
import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Briefcase,
  CheckCircle,
  Facebook,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  MessageSquare,
  Send,
  Twitter,
  Users,
  Youtube,
} from "lucide-react"
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
  icon?: React.ReactElement | string
  socialMedia?: SocialMedia
}

interface ServiceOption {
  label: string
  value: string
}

interface ContactFormCopy {
  title: string
  description: string
  firstNameLabel: string
  firstNamePlaceholder: string
  lastNameLabel: string
  lastNamePlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  phoneLabel: string
  phonePlaceholder: string
  companyLabel: string
  companyPlaceholder: string
  serviceLabel: string
  servicePlaceholder: string
  serviceOptions: ServiceOption[]
  messageLabel: string
  messagePlaceholder: string
  submitLabel: string
  submittingLabel: string
  toastCloseLabel: string
  validationErrorTitle: string
  validationErrorDescription: string
  successTitle: string
  successDescription: string
  errorTitle: string
  errorDescription: string
  mailRecipient: string
  mailSubjectPrefix: string
}

interface ContactFormSectionProps {
  divisions?: Division[]
  form: ContactFormCopy
  divisionsTitle: string
  divisionsDescription: string
  socialAriaLabelTemplate: string
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

const divisionIconMap = {
  Briefcase,
  MessageSquare,
  Users,
}

function Toast({
  toast,
  onClose,
  closeLabel,
}: {
  toast: ToastState
  onClose: () => void
  closeLabel: string
}) {
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
            {closeLabel}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function SocialMediaLinks({
  socialMedia,
  ariaLabelTemplate,
}: {
  socialMedia?: SocialMedia
  ariaLabelTemplate: string
}) {
  if (!socialMedia) return null

  const socialLinks = [
    { platform: "facebook", icon: Facebook, url: socialMedia.facebook },
    { platform: "twitter", icon: Twitter, url: socialMedia.twitter },
    { platform: "instagram", icon: Instagram, url: socialMedia.instagram },
    { platform: "linkedin", icon: Linkedin, url: socialMedia.linkedin },
    { platform: "youtube", icon: Youtube, url: socialMedia.youtube },
  ].filter((link) => link.url)

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
          aria-label={ariaLabelTemplate.replace("{platform}", platform)}
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  )
}

export function ContactFormSection({
  divisions = [],
  form,
  divisionsTitle,
  divisionsDescription,
  socialAriaLabelTemplate,
  className,
}: ContactFormSectionProps) {
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
    setFormData((prev) => ({
      ...prev,
      [e.target.id || e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setToast({
        show: true,
        title: form.validationErrorTitle,
        description: form.validationErrorDescription,
        variant: "error",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: form.mailRecipient,
          subject: `${form.mailSubjectPrefix} ${formData.firstName} ${formData.lastName}`,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: formData.service,
          serviceLabel: form.serviceOptions.find((option) => option.value === formData.service)?.label || "",
          message: formData.message,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setToast({
        show: true,
        title: form.successTitle,
        description: form.successDescription,
        variant: "success",
      })

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
        title: form.errorTitle,
        description: form.errorDescription,
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
      <Toast toast={toast} onClose={() => setToast({ ...toast, show: false })} closeLabel={form.toastCloseLabel} />

      <div className={responsive.container}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl">{form.title}</CardTitle>
              <CardDescription>{form.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      {form.firstNameLabel}
                    </label>
                    <Input
                      id="firstName"
                      placeholder={form.firstNamePlaceholder}
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      {form.lastNameLabel}
                    </label>
                    <Input
                      id="lastName"
                      placeholder={form.lastNamePlaceholder}
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    {form.emailLabel}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={form.emailPlaceholder}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    {form.phoneLabel}
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={form.phonePlaceholder}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">
                    {form.companyLabel}
                  </label>
                  <Input
                    id="company"
                    placeholder={form.companyPlaceholder}
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-medium">
                    {form.serviceLabel}
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">{form.servicePlaceholder}</option>
                    {form.serviceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    {form.messageLabel}
                  </label>
                  <Textarea
                    id="message"
                    placeholder={form.messagePlaceholder}
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="button" onClick={handleSubmit} className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {form.submittingLabel}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      {form.submitLabel}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">{divisionsTitle}</h2>
              <p className="text-muted-foreground mb-8">{divisionsDescription}</p>
            </div>

            <div className="space-y-4">
              {divisions.map((division, index) => {
                const Icon =
                  typeof division.icon === "string" ? divisionIconMap[division.icon as keyof typeof divisionIconMap] : null
                const icon = Icon ? <Icon className="h-5 w-5" /> : division.icon || <MessageSquare className="h-5 w-5" />

                return (
                  <Card key={index} className="hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                          {icon}
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
                          <SocialMediaLinks
                            socialMedia={division.socialMedia}
                            ariaLabelTemplate={socialAriaLabelTemplate}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
