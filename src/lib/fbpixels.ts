import ReactPixel from "react-facebook-pixel";

const options = {
  autoConfig: true,
  debug: true,
};

export const initFacebookPixel = (pixelId: string) => {
  ReactPixel.init(pixelId, undefined, options); // Pass undefined instead of {}
};

export const trackPageView = () => {
  ReactPixel.pageView();
};

export const trackEvent = (event: string, data = {}) => {
  ReactPixel.track(event, data);
};
