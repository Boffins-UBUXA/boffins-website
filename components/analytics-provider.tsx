"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"
import Script from "next/script"
import { trackEvent } from "@/lib/analytics"

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID

function AnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!pathname) return

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

    // Track Facebook Pixel PageView
    if (typeof window !== "undefined" && (window as any).fbq) {
      try {
        (window as any).fbq("track", "PageView")
      } catch (error) {
        console.warn("Failed to track pageview on Facebook Pixel:", error)
      }
    }

    // Track Google Analytics PageView
    if (typeof window !== "undefined" && (window as any).gtag && GA_MEASUREMENT_ID) {
      try {
        (window as any).gtag("config", GA_MEASUREMENT_ID, {
          page_path: url,
        })
      } catch (error) {
        console.warn("Failed to track pageview on Google Analytics:", error)
      }
    }
  }, [pathname, searchParams])

  // Track global outbound / WhatsApp click actions
  useEffect(() => {
    const handleOutboundClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest("a")
      if (anchor && anchor.href) {
        const url = anchor.href
        const text = anchor.textContent?.trim() || ""

        if (url.includes("wa.me") || url.includes("whatsapp.com")) {
          trackEvent("whatsapp_click", {
            url,
            text,
          })
        } else if (
          !url.startsWith(window.location.origin) &&
          !url.startsWith("/") &&
          !url.startsWith("#") &&
          !url.startsWith("mailto:") &&
          !url.startsWith("tel:")
        ) {
          trackEvent("outbound_click", {
            url,
            text,
          })
        }
      }
    }

    document.addEventListener("click", handleOutboundClick)
    return () => {
      document.removeEventListener("click", handleOutboundClick)
    }
  }, [])

  return null
}

export function AnalyticsProvider() {
  return (
    <>
      {/* Google Analytics Script */}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Facebook Pixel Script */}
      {FB_PIXEL_ID && (
        <>
          <Script id="facebook-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}

      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
    </>
  )
}
export default AnalyticsProvider
