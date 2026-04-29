import type Swiper from 'swiper/bundle';

const STAGGER_MS = 200000;

export const startStaggeredSliders = (sliders: Swiper[]): void => {
  if (sliders.length === 0) return;

  let index = 0;
  setInterval(() => {
    sliders[index].slideNext();
    index = (index + 1) % sliders.length;
  }, STAGGER_MS);
};
