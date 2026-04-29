import 'swiper/css/bundle';

import Swiper from 'swiper/bundle';

export const initHeroSlider = (): Swiper[] => {
  const elements = document.querySelectorAll<HTMLElement>('.swiper.is-hero');

  return Array.from(elements).map(
    (element) =>
      new Swiper(element, {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        speed: 400,
        loop: true,
        allowTouchMove: false,
      })
  );
};
