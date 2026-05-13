import 'swiper/css/bundle';

import Swiper from 'swiper/bundle';

import { getSliderConfig } from './config';

export const initHeroSlider = (): Swiper[] => {
  const elements = document.querySelectorAll<HTMLElement>('.swiper.is-hero');
  const { heroSpeed } = getSliderConfig();

  return Array.from(elements).map(
    (element) =>
      new Swiper(element, {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        speed: heroSpeed,
        loop: true,
        allowTouchMove: false,
        observer: true,
        observeParents: true,
      })
  );
};
