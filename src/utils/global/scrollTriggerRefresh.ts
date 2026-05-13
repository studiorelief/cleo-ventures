import { ScrollTrigger } from 'gsap/ScrollTrigger';

const DEBOUNCE_MS = 150;

export const initScrollTriggerRefresh = (): void => {
  if (typeof ResizeObserver === 'undefined') return;

  let lastHeight = document.body.offsetHeight;
  let timeoutId: number | undefined;

  const scheduleRefresh = () => {
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => ScrollTrigger.refresh(), DEBOUNCE_MS);
  };

  const observer = new ResizeObserver(() => {
    const currentHeight = document.body.offsetHeight;
    if (currentHeight === lastHeight) return;
    lastHeight = currentHeight;
    scheduleRefresh();
  });

  observer.observe(document.body);
};
