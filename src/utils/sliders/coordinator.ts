import type Swiper from 'swiper/bundle';

export const startStaggeredSliders = (
  sliders: Swiper[],
  intervalMs = 2000,
  firstTickDelayMs = intervalMs
): void => {
  if (sliders.length === 0) return;

  let index = 0;
  const tick = () => {
    sliders[index].slideNext();
    index = (index + 1) % sliders.length;
  };
  window.setTimeout(
    () => {
      tick();
      setInterval(tick, intervalMs);
    },
    Math.max(0, firstTickDelayMs)
  );
};
