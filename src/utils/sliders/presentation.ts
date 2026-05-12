import 'swiper/css/bundle';

import Swiper from 'swiper/bundle';

import { getSliderConfig } from './config';

export const initPresentationSlider = (): Swiper[] => {
  const elements = document.querySelectorAll<HTMLElement>('.swiper.is-presentation');
  const { presentationSpeed } = getSliderConfig();

  return Array.from(elements).map(
    (element) =>
      new Swiper(element, {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        speed: presentationSpeed,
        loop: true,
        allowTouchMove: true,
      })
  );
};
