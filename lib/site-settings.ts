export type SiteLink = {
  name: string
  href: string
}

export type SocialLink = SiteLink & {
  platform: string
}

export type ContactItem = {
  type: "email" | "phone" | "address"
  label: string
  href?: string
}

export type SiteSettingsData = {
  brandName: string
  logoSrc: string
  logoAlt: string
  navigation: SiteLink[]
  footerDescription: string
  footerDivisionsTitle: string
  footerDivisions: SiteLink[]
  footerQuickLinksTitle: string
  footerQuickLinks: SiteLink[]
  footerContactTitle: string
  footerContactItems: ContactItem[]
  socialLinks: SocialLink[]
  copyrightText: string
}

export type StrapiSiteSettings = Partial<SiteSettingsData>

export const staticSiteSettings: SiteSettingsData = {
  brandName: "Boffins Technology",
  logoSrc: "/images/logo.png",
  logoAlt: "Boffins Technology",
  navigation: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ],
  footerDescription:
    "A diversified technology holding company with specialized subsidiaries in academy, products, hardware, media, and bespoke solutions.",
  footerDivisionsTitle: "Our Divisions",
  footerDivisions: [
    { name: "Academy", href: "/services/education" },
    { name: "Product Division", href: "/services/products" },
    { name: "Hardware Division", href: "/services/hardware" },
    { name: "Media Company", href: "/services/media" },
    { name: "Bespoke Division", href: "/services/bespoke" },
  ],
  footerQuickLinksTitle: "Quick Links",
  footerQuickLinks: [
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ],
  footerContactTitle: "Contact Us",
  footerContactItems: [
    { type: "email", label: "info@boffinstechnology.com.ng", href: "mailto:info@boffinstechnology.com.ng" },
    { type: "phone", label: "+234 (801) 566-53196", href: "tel:+23480156653196" },
    { type: "address", label: "Plot 902 Ibrahim Isyaku St, Abuja, Nigeria" },
  ],
  socialLinks: [
    { platform: "tiktok", name: "TikTok", href: "https://www.tiktok.com/@boffinstechnology" },
    { platform: "twitter", name: "Twitter", href: "https://twitter.com/boffinstech" },
    { platform: "linkedin", name: "LinkedIn", href: "https://www.linkedin.com/in/ubuxa-ubuxa-297427379/" },
  ],
  copyrightText: "© {year} Boffins Technology. All rights reserved.",
}

function linksOrFallback(value: unknown, fallback: SiteLink[]): SiteLink[] {
  if (!Array.isArray(value)) return fallback

  const links = value
    .map((item) => ({
      name: typeof item?.name === "string" ? item.name : "",
      href: typeof item?.href === "string" ? item.href : "",
      platform: typeof item?.platform === "string" ? item.platform : undefined,
    }))
    .filter((item) => item.name && item.href)

  return links.length ? links : fallback
}

function contactItemsOrFallback(value: unknown): ContactItem[] {
  if (!Array.isArray(value)) return staticSiteSettings.footerContactItems

  const items = value
    .map((item) => ({
      type: ["email", "phone", "address"].includes(item?.type) ? item.type : "address",
      label: typeof item?.label === "string" ? item.label : "",
      href: typeof item?.href === "string" ? item.href : undefined,
    }))
    .filter((item) => item.label)

  return items.length ? items : staticSiteSettings.footerContactItems
}

export function normalizeSiteSettings(settings?: StrapiSiteSettings | null): SiteSettingsData {
  return {
    brandName: settings?.brandName?.trim() || staticSiteSettings.brandName,
    logoSrc: settings?.logoSrc?.trim() || staticSiteSettings.logoSrc,
    logoAlt: settings?.logoAlt?.trim() || staticSiteSettings.logoAlt,
    navigation: linksOrFallback(settings?.navigation, staticSiteSettings.navigation),
    footerDescription: settings?.footerDescription?.trim() || staticSiteSettings.footerDescription,
    footerDivisionsTitle: settings?.footerDivisionsTitle?.trim() || staticSiteSettings.footerDivisionsTitle,
    footerDivisions: linksOrFallback(settings?.footerDivisions, staticSiteSettings.footerDivisions),
    footerQuickLinksTitle: settings?.footerQuickLinksTitle?.trim() || staticSiteSettings.footerQuickLinksTitle,
    footerQuickLinks: linksOrFallback(settings?.footerQuickLinks, staticSiteSettings.footerQuickLinks),
    footerContactTitle: settings?.footerContactTitle?.trim() || staticSiteSettings.footerContactTitle,
    footerContactItems: contactItemsOrFallback(settings?.footerContactItems),
    socialLinks: linksOrFallback(settings?.socialLinks, staticSiteSettings.socialLinks) as SocialLink[],
    copyrightText: settings?.copyrightText?.trim() || staticSiteSettings.copyrightText,
  }
}
