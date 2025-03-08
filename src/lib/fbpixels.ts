"use client";

const options = {
  autoConfig: true,
  debug: true,
};

export const initFacebookPixel = async (pixelId: string) => {
  if (typeof window === "undefined") return;

  try {
    const ReactPixel = (await import("react-facebook-pixel")).default;
    ReactPixel.init(pixelId, undefined, options);
  } catch (error) {
    console.error("Error initializing Facebook Pixel:", error);
  }
};

export const trackPageView = async () => {
  if (typeof window === "undefined") return;

  try {
    const ReactPixel = (await import("react-facebook-pixel")).default;
    ReactPixel.pageView();
  } catch (error) {
    console.error("Error tracking page view:", error);
  }
};

export const trackEvent = async (event: string, data = {}) => {
  if (typeof window === "undefined") return;

  try {
    const ReactPixel = (await import("react-facebook-pixel")).default;
    ReactPixel.track(event, data);
  } catch (error) {
    console.error(`Error tracking event "${event}":`, error);
  }
};
