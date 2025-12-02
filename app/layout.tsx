import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Boffins Technology - Digitizing Africa's Enterprises",
  icons: {
    icon: "/images/logo.png",
  },
  description:
    "A diversified technology holding company with specialized subsidiaries in education, products, hardware, media, and bespoke solutions. Transform your business with cutting-edge technology.",
  keywords: [
    "technology solutions",
    "software development",
    "tech education",
    "IoT devices",
    "renewable energy management",
    "custom software",
    "digital transformation",
    "Nigeria technology company",
  ],
  authors: [{ name: "Boffins Technology" }],
  creator: "Boffins Technology",
  publisher: "Boffins Technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://boffinstechnology.com.ng"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Boffins Technology - Digitizing Africa's Enterprises",
    description:
      "Transform your business with our comprehensive technology solutions across education, products, hardware, media, and bespoke development.",
    url: "https://boffinstechnology.com.ng",
    siteName: "Boffins Technology",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Boffins Technology Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boffins Technology - Digitizing Africa's Enterprises",
    description:
      "Transform your business with our comprehensive technology solutions across education, products, hardware, media, and bespoke development.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>{children}</Suspense>
          <ScrollToTop />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
