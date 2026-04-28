import 'swiper/css/bundle';

import Swiper from 'swiper/bundle';

export const initPresentationSlider = (): Swiper[] => {
  const elements = document.querySelectorAll<HTMLElement>('.swiper.is-presentation');

  return Array.from(elements).map(
    (element) =>
      new Swiper(element, {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        speed: 800,
        loop: true,
        allowTouchMove: true,
      })
  );
};
