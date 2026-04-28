import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initFooterReveal = (): void => {
  const footer = document.querySelector<HTMLElement>('.footer_component');
  const logo = document.querySelector<HTMLElement>('.footer_logo');
  const line = document.querySelector<HTMLElement>('.footer_logo-line');
  if (!footer || !logo) return;

  footer.style.setProperty('overflow', 'hidden');

  const tl = gsap.timeline({
    scrollTrigger: {
      // markers: true,
      trigger: footer,
      start: '50% bottom',
      toggleActions: 'play none none reverse',
      invalidateOnRefresh: true,
    },
  });

  tl.from(
    logo,
    {
      yPercent: 110,
      duration: 1,
      ease: 'power3.out',
    },
    0
  );

  if (line) {
    tl.from(
      line,
      {
        y: () => logo.offsetHeight * 1.1,
        duration: 1,
        ease: 'power3.out',
      },
      0
    );
  }
};
