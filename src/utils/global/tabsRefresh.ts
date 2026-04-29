import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TAB_SELECTOR = '.w-tab-link';
const TAB_TRANSITION_MS = 400;

export const initTabsRefresh = (): void => {
  const tabs = document.querySelectorAll<HTMLElement>(TAB_SELECTOR);
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      window.setTimeout(() => ScrollTrigger.refresh(), TAB_TRANSITION_MS);
    });
  });
};
