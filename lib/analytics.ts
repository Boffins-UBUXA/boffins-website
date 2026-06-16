export function trackEvent(eventName: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return

  const win = window as Window & {
    gtag?: (...args: unknown[]) => void
    fbq?: (action: string, event: string, payload?: Record<string, unknown>) => void
    ttq?: { track?: (event: string, payload?: Record<string, unknown>) => void }
  }

  win.gtag?.("event", eventName, payload)
  win.fbq?.("trackCustom", eventName, payload)
  win.ttq?.track?.(eventName, payload)
}
