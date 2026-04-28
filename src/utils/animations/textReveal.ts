import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const SELECTOR = '[scroll-animation="text-reveal"]';

export const initTextReveal = (): void => {
  const elements = document.querySelectorAll<HTMLElement>(SELECTOR);
  if (!elements.length) return;

  document.fonts.ready.then(() => {
    elements.forEach((element) => {
      const split = new SplitText(element, {
        type: 'lines, chars',
        linesClass: 'split-line',
        charsClass: 'split-char',
        autoSplit: true,
      });

      element.style.setProperty('overflow', 'hidden');
      gsap.set(split.lines, { overflow: 'hidden' });

      gsap.from(split.chars, {
        yPercent: 110,
        duration: 0.4,
        ease: 'power3.out',
        // stagger: 0.025,
        scrollTrigger: {
          // markers: true,
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  });
};
