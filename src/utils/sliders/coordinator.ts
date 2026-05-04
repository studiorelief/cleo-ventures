import type Swiper from 'swiper/bundle';

export const startStaggeredSliders = (sliders: Swiper[], intervalMs = 2000): void => {
  if (sliders.length === 0) return;

  let index = 0;
  setInterval(() => {
    sliders[index].slideNext();
    index = (index + 1) % sliders.length;
  }, intervalMs);
};
