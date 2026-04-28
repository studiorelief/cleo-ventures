import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export const initHeroLoad = (): void => {
  const overlay = document.querySelector<HTMLElement>('.hero_load-overlay');
  const logo = document.querySelector<HTMLElement>('.hero_animation-logo');
  const swiperLeft = document.querySelector<HTMLElement>('.swiper.is-hero.is-left');
  const swiperRight = document.querySelector<HTMLElement>('.swiper.is-hero.is-right');
  const headlineAnimations = document.querySelectorAll<HTMLElement>(
    '[scroll-animation="text-hero"]'
  );

  gsap.set('.nav_component', { opacity: 0 });
  gsap.set('.hero_component', { opacity: 0 });
  gsap.set('.hero_background', { opacity: 0 });

  if (logo) gsap.set(logo, { scale: 0, transformOrigin: '50% 100%', willChange: 'transform' });
  if (swiperLeft) gsap.set(swiperLeft, { position: 'relative', left: '-100%' });
  if (swiperRight) gsap.set(swiperRight, { position: 'relative', left: '100%' });

  document.fonts.ready.then(() => {
    const splits: SplitText[] = [];
    headlineAnimations.forEach((element) => {
      const split = new SplitText(element, {
        type: 'lines',
        linesClass: 'split-line',
        mask: 'lines',
        autoSplit: true,
      });
      gsap.set(split.lines, { yPercent: 110 });
      splits.push(split);
    });

    const tl = gsap.timeline();

    tl.set(overlay, { display: 'none' });

    tl.to(logo, {
      scale: 1,
      duration: 2,
      ease: 'power3.out',
    });

    tl.addLabel('reveal', '+=0.5');

    tl.set(logo, { transformOrigin: '50% 50%' }, 'reveal');
    tl.to(
      logo,
      {
        scale: 3,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.in',
        onComplete: () => {
          if (logo) logo.style.display = 'none';
        },
      },
      'reveal'
    );

    if (swiperLeft) {
      tl.to(
        swiperLeft,
        {
          left: '0%',
          duration: 0.8,
          ease: 'power3.out',
          clearProps: 'left,position',
        },
        'reveal'
      );
    }

    if (swiperRight) {
      tl.to(
        swiperRight,
        {
          left: '0%',
          duration: 0.8,
          ease: 'power3.out',
          clearProps: 'left,position',
        },
        'reveal'
      );
    }

    tl.to(
      '.hero_background',
      {
        opacity: 1,
        duration: 0.8,
      },
      'reveal'
    );

    tl.to(
      '.nav_component',
      {
        opacity: 1,
        duration: 0.5,
      },
      'reveal'
    );

    tl.addLabel('content', 'reveal+=0.8');

    tl.to(
      '.hero_component',
      {
        opacity: 1,
        duration: 0.6,
      },
      'content'
    );

    splits.forEach((split) => {
      tl.to(
        split.lines,
        {
          yPercent: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.9,
        },
        'reveal'
      );
    });
  });
};
