import { gsap } from 'gsap';
import lottie, { type AnimationItem } from 'lottie-web';

const LOTTIE_URL =
  'https://cdn.prod.website-files.com/69ea217e5053ece3f05be858/69f0dab263cb38172b5a3558_simple-burger-menu.json';

const OPEN_DURATION = 0.5;
const CLOSE_DURATION = 0.35;
const SLIDE_FROM = '-1.5rem';

export const initNavMobile = (): void => {
  const trigger = document.querySelector<HTMLElement>('#nav-lottie');
  const menu = document.querySelector<HTMLElement>('.nav_menu-mobile');
  if (!trigger || !menu) return;

  const animation: AnimationItem = lottie.loadAnimation({
    container: trigger,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: LOTTIE_URL,
  });
  animation.setSpeed(1.4);

  trigger.style.cursor = 'pointer';
  trigger.setAttribute('role', 'button');
  trigger.setAttribute('aria-label', 'Toggle menu');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', menu.id || 'nav-menu-mobile');
  if (!menu.id) menu.id = 'nav-menu-mobile';

  gsap.set(menu, { display: 'none', y: SLIDE_FROM, autoAlpha: 0 });

  let isOpen = false;
  let isAnimating = false;

  const open = (): void => {
    if (isOpen || isAnimating) return;
    isAnimating = true;
    isOpen = true;
    trigger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    animation.setDirection(1);
    animation.play();

    gsap.set(menu, { display: 'flex' });
    gsap.fromTo(
      menu,
      { y: SLIDE_FROM, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: OPEN_DURATION,
        ease: 'power3.out',
        onComplete: () => {
          isAnimating = false;
        },
      }
    );
  };

  const close = (): void => {
    if (!isOpen || isAnimating) return;
    isAnimating = true;
    isOpen = false;
    trigger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    animation.setDirection(-1);
    animation.play();

    gsap.to(menu, {
      y: SLIDE_FROM,
      autoAlpha: 0,
      duration: CLOSE_DURATION,
      ease: 'power3.in',
      onComplete: () => {
        gsap.set(menu, { display: 'none' });
        isAnimating = false;
      },
    });
  };

  const toggle = (): void => {
    if (isOpen) close();
    else open();
  };

  trigger.addEventListener('click', (event) => {
    event.stopPropagation();
    toggle();
  });

  document.addEventListener('click', (event) => {
    if (!isOpen) return;
    const target = event.target as Node | null;
    if (!target) return;
    if (menu.contains(target) || trigger.contains(target)) return;
    close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen) close();
  });

  menu.querySelectorAll<HTMLAnchorElement>('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (isOpen) close();
    });
  });
};
