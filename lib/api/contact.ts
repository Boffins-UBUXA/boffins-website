import qs from "qs"

import { contactData } from "@/lib/data/contact-data"
import { fetchStrapi, type StrapiResponse } from "@/lib/strapi"

type StrapiHero = {
  title?: string | null
  subtitle?: string | null
  description?: string | null
}

type StrapiContactInfo = {
  icon?: string | null
  title?: string | null
  details?: string | null
  color?: string | null
}

type StrapiFormOption = {
  label?: string | null
  value?: string | null
}

type StrapiDivision = {
  name?: string | null
  description?: string | null
  email?: string | null
  icon?: string | null
  socialMedia?: Record<string, string> | null
}

type StrapiContactPage = {
  hero?: StrapiHero | null
  heroBadge?: string | null
  contactInfo?: StrapiContactInfo[] | null
  formTitle?: string | null
  formDescription?: string | null
  firstNameLabel?: string | null
  firstNamePlaceholder?: string | null
  lastNameLabel?: string | null
  lastNamePlaceholder?: string | null
  emailLabel?: string | null
  emailPlaceholder?: string | null
  phoneLabel?: string | null
  phonePlaceholder?: string | null
  companyLabel?: string | null
  companyPlaceholder?: string | null
  serviceLabel?: string | null
  servicePlaceholder?: string | null
  serviceOptions?: StrapiFormOption[] | null
  messageLabel?: string | null
  messagePlaceholder?: string | null
  submitLabel?: string | null
  submittingLabel?: string | null
  toastCloseLabel?: string | null
  validationErrorTitle?: string | null
  validationErrorDescription?: string | null
  successTitle?: string | null
  successDescription?: string | null
  errorTitle?: string | null
  errorDescription?: string | null
  mailRecipient?: string | null
  mailSubjectPrefix?: string | null
  divisionsTitle?: string | null
  divisionsDescription?: string | null
  divisions?: StrapiDivision[] | null
  socialAriaLabelTemplate?: string | null
  officeTitle?: string | null
  officeDescription?: string | null
  officeMapUrl?: string | null
  officeMapTitle?: string | null
}

export type ContactPageData = {
  hero: typeof contactData.hero
  contactInfo: Array<{
    icon: string
    title: string
    details: string[]
    color: string
  }>
  form: {
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
    serviceOptions: Array<{ label: string; value: string }>
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
  divisionsTitle: string
  divisionsDescription: string
  divisions: Array<{
    name: string
    description: string
    email: string
    icon: string
    socialMedia?: Record<string, string>
  }>
  socialAriaLabelTemplate: string
  office: typeof contactData.office & {
    mapTitle: string
  }
}

const contactInfoIcons = ["MapPin", "Phone", "Mail", "Clock"]
const divisionIcons = ["Users", "Briefcase", "MessageSquare", "MessageSquare", "Briefcase"]

function textOrFallback(value: string | null | undefined, fallback: string) {
  return value?.trim() || fallback
}

function detailsFromText(value: string | null | undefined, fallback: string[]) {
  if (!value?.trim()) return fallback

  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
}

function getDefaultServiceOptions() {
  return [
    { value: "bespoke", label: "Bespoke Division" },
    { value: "products", label: "Product Division" },
    { value: "media", label: "Media Company" },
    { value: "academy", label: "Academy" },
    { value: "hardware", label: "Hardware Division" },
  ]
}

function normalizeSocialMedia(value: unknown) {
  if (!value || typeof value !== "object") return undefined

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string" && entry[1].trim().length > 0
    )
  )
}

function normalizeContactPage(page?: StrapiContactPage | null): ContactPageData {
  const hero = page?.hero

  return {
    hero: {
      badge: textOrFallback(page?.heroBadge, contactData.hero.badge),
      title: textOrFallback(hero?.title, contactData.hero.title),
      subtitle: textOrFallback(hero?.subtitle, contactData.hero.subtitle),
      description: textOrFallback(hero?.description, contactData.hero.description),
    },
    contactInfo: page?.contactInfo?.length
      ? page.contactInfo.map((item, index) => ({
          icon: textOrFallback(item.icon, contactInfoIcons[index] || "MapPin"),
          title: textOrFallback(item.title, contactData.contactInfo[index]?.title || ""),
          details: detailsFromText(item.details, contactData.contactInfo[index]?.details || []),
          color: textOrFallback(item.color, contactData.contactInfo[index]?.color || "from-primary to-primary/70"),
        }))
      : contactData.contactInfo.map((item, index) => ({
          icon: contactInfoIcons[index] || "MapPin",
          title: item.title,
          details: item.details,
          color: item.color,
        })),
    form: {
      title: textOrFallback(page?.formTitle, "Send Us a Message"),
      description: textOrFallback(page?.formDescription, "Fill out the form below and we'll get back to you within 24 hours."),
      firstNameLabel: textOrFallback(page?.firstNameLabel, "First Name *"),
      firstNamePlaceholder: textOrFallback(page?.firstNamePlaceholder, "John"),
      lastNameLabel: textOrFallback(page?.lastNameLabel, "Last Name *"),
      lastNamePlaceholder: textOrFallback(page?.lastNamePlaceholder, "Doe"),
      emailLabel: textOrFallback(page?.emailLabel, "Email Address *"),
      emailPlaceholder: textOrFallback(page?.emailPlaceholder, "john@example.com"),
      phoneLabel: textOrFallback(page?.phoneLabel, "Phone Number"),
      phonePlaceholder: textOrFallback(page?.phonePlaceholder, "+234 (0) 123 456 7890"),
      companyLabel: textOrFallback(page?.companyLabel, "Company"),
      companyPlaceholder: textOrFallback(page?.companyPlaceholder, "Your Company Name"),
      serviceLabel: textOrFallback(page?.serviceLabel, "Service of Interest"),
      servicePlaceholder: textOrFallback(page?.servicePlaceholder, "Select a service"),
      serviceOptions: page?.serviceOptions?.length
        ? page.serviceOptions.map((option) => ({
            value: textOrFallback(option.value, ""),
            label: textOrFallback(option.label, ""),
          }))
        : getDefaultServiceOptions(),
      messageLabel: textOrFallback(page?.messageLabel, "Message *"),
      messagePlaceholder: textOrFallback(page?.messagePlaceholder, "Tell us about your project or inquiry..."),
      submitLabel: textOrFallback(page?.submitLabel, "Send Message"),
      submittingLabel: textOrFallback(page?.submittingLabel, "Sending..."),
      toastCloseLabel: textOrFallback(page?.toastCloseLabel, "Close"),
      validationErrorTitle: textOrFallback(page?.validationErrorTitle, "Missing Required Fields"),
      validationErrorDescription: textOrFallback(
        page?.validationErrorDescription,
        "Please fill in all required fields (marked with *)"
      ),
      successTitle: textOrFallback(page?.successTitle, "Message Sent Successfully!"),
      successDescription: textOrFallback(
        page?.successDescription,
        "Thank you for contacting us! Our team will respond to your inquiry within 10 minutes to 24 hours."
      ),
      errorTitle: textOrFallback(page?.errorTitle, "Failed to Send Message"),
      errorDescription: textOrFallback(
        page?.errorDescription,
        "We couldn't send your message. Please try again or contact us directly at info@boffinstechnology.com.ng"
      ),
      mailRecipient: textOrFallback(page?.mailRecipient, "info@boffinstechnology.com.ng"),
      mailSubjectPrefix: textOrFallback(page?.mailSubjectPrefix, "Contact Form Submission from"),
    },
    divisionsTitle: textOrFallback(page?.divisionsTitle, "Contact Our Divisions"),
    divisionsDescription: textOrFallback(
      page?.divisionsDescription,
      "Get in touch with the specific division that best matches your needs for faster, more targeted assistance."
    ),
    divisions: page?.divisions?.length
      ? page.divisions.map((division, index) => ({
          name: textOrFallback(division.name, contactData.divisions[index]?.name || ""),
          description: textOrFallback(division.description, contactData.divisions[index]?.description || ""),
          email: textOrFallback(division.email, contactData.divisions[index]?.email || ""),
          icon: textOrFallback(division.icon, divisionIcons[index] || "MessageSquare"),
          socialMedia: division.socialMedia || undefined,
        }))
      : contactData.divisions.map((division, index) => ({
          name: division.name,
          description: division.description,
          email: division.email,
          icon: divisionIcons[index] || "MessageSquare",
          socialMedia: normalizeSocialMedia("socialMedia" in division ? division.socialMedia : undefined),
        })),
    socialAriaLabelTemplate: textOrFallback(page?.socialAriaLabelTemplate, "Visit our {platform} page"),
    office: {
      title: textOrFallback(page?.officeTitle, contactData.office.title),
      description: textOrFallback(page?.officeDescription, contactData.office.description),
      mapUrl: textOrFallback(page?.officeMapUrl, contactData.office.mapUrl),
      mapTitle: textOrFallback(page?.officeMapTitle, "Boffins Technology Office Location"),
    },
  }
}

export async function getContactPageData(): Promise<ContactPageData> {
  const query = qs.stringify(
    {
      populate: {
        seo: true,
        hero: true,
        contactInfo: true,
        serviceOptions: true,
        divisions: true,
      },
    },
    { encodeValuesOnly: true }
  )

  const response = await fetchStrapi<StrapiResponse<StrapiContactPage>>(`/api/contact-page?${query}`)

  return normalizeContactPage(response.data)
}

export function getStaticContactPageData(): ContactPageData {
  return normalizeContactPage(null)
}
