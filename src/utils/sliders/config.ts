type SliderConfig = {
  heroSpeed: number;
  presentationSpeed: number;
  heroDelay: number;
  presentationDelay: number;
  heroStartDelay: number;
};

const DEFAULTS: SliderConfig = {
  heroStartDelay: 2500,
  heroSpeed: 400,
  heroDelay: 3500,
  presentationSpeed: 400,
  presentationDelay: 3500,
};

declare global {
  interface Window {
    SLIDER_CONFIG?: Partial<SliderConfig>;
  }
}

export const getSliderConfig = (): SliderConfig => ({
  ...DEFAULTS,
  ...(window.SLIDER_CONFIG ?? {}),
});
