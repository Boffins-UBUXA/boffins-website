/**
 * Analytics Utility for Google Analytics and Facebook Pixel tracking.
 */

type EventParams = Record<string, any>;

/**
 * Tracks a custom or standard event to Google Analytics and Facebook Pixel.
 * @param eventName The name of the event to track (e.g., 'Contact', 'whatsapp_click').
 * @param params Additional event parameters/metadata.
 */
export const trackEvent = (eventName: string, params?: EventParams) => {
  if (typeof window === "undefined") return;

  // 1. Google Analytics Event Tracking
  if (typeof (window as any).gtag === "function") {
    try {
      (window as any).gtag("event", eventName, params);
    } catch (error) {
      console.warn("Failed to track event on Google Analytics:", error);
    }
  }

  // 2. Facebook Pixel Event Tracking
  if (typeof (window as any).fbq === "function") {
    try {
      // List of Facebook standard event names (requires exact casing)
      const standardFbqEvents = [
        "AddPaymentInfo",
        "AddToCart",
        "AddToWishlist",
        "CompleteRegistration",
        "Contact",
        "CustomizeProduct",
        "Donate",
        "FindLocation",
        "InitiateCheckout",
        "Lead",
        "Purchase",
        "Schedule",
        "Search",
        "StartTrial",
        "SubmitApplication",
        "Subscribe",
        "ViewContent",
      ];

      if (standardFbqEvents.includes(eventName)) {
        (window as any).fbq("track", eventName, params);
      } else {
        (window as any).fbq("trackCustom", eventName, params);
      }
    } catch (error) {
      console.warn("Failed to track event on Facebook Pixel:", error);
    }
  }
};
