"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone } from "lucide-react"
import { FaLinkedin, FaTiktok, FaTwitter } from "react-icons/fa"

import {
  staticSiteSettings,
  type ContactItem,
  type SiteSettingsData,
  type SocialLink,
} from "@/lib/site-settings"

export function Footer() {
  const [settings, setSettings] = useState<SiteSettingsData>(staticSiteSettings)

  useEffect(() => {
    let cancelled = false

    fetch("/api/site-settings")
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!cancelled && data) setSettings(data)
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <footer className="bg-muted border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src={settings.logoSrc} alt={settings.logoAlt} width={32} height={32} className="h-8 w-8" />
              <span className="text-lg font-bold text-primary">{settings.brandName}</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">{settings.footerDescription}</p>
            <div className="flex space-x-4">
              {settings.socialLinks.map((link) => (
                <SocialLinkIcon key={`${link.platform}-${link.href}`} link={link} />
              ))}
            </div>
          </div>

          <FooterLinkGroup title={settings.footerDivisionsTitle} links={settings.footerDivisions} />
          <FooterLinkGroup title={settings.footerQuickLinksTitle} links={settings.footerQuickLinks} />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{settings.footerContactTitle}</h3>
            <div className="space-y-3">
              {settings.footerContactItems.map((item) => (
                <ContactInfoItem key={`${item.type}-${item.label}`} item={item} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              {settings.copyrightText.replace("{year}", String(new Date().getFullYear()))}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLinkGroup({ title, links }: { title: string; links: Array<{ name: string; href: string }> }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={`${link.name}-${link.href}`}>
            <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SocialLinkIcon({ link }: { link: SocialLink }) {
  const Icon = link.platform === "tiktok" ? FaTiktok : link.platform === "linkedin" ? FaLinkedin : FaTwitter

  return (
    <Link
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground hover:text-primary transition-colors"
      aria-label={link.name}
    >
      <Icon className="h-5 w-5" />
    </Link>
  )
}

function ContactInfoItem({ item }: { item: ContactItem }) {
  const Icon = item.type === "email" ? Mail : item.type === "phone" ? Phone : MapPin
  const content = <span className="text-muted-foreground text-sm">{item.label}</span>

  return (
    <div className="flex items-center space-x-3">
      <Icon className="h-4 w-4 text-primary" />
      {item.href ? (
        <Link href={item.href} className="hover:text-primary transition-colors">
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  )
}
