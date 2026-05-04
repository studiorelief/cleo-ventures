import 'swiper/css/bundle';

import Swiper from 'swiper/bundle';

const MOBILE_QUERY = '(max-width: 479px)';

const SWIPER_CLASSES = {
  wrapper: 'team_collection-list-wrapper',
  list: 'team_collection-list',
  item: 'team_collection-list-item',
} as const;

interface TeamSliderInstance {
  wrapper: HTMLElement;
  swiper: Swiper | null;
}

const MIN_SLIDES_FOR_LOOP = 8;
const CLONE_ATTR = 'data-team-clone';

const enableSwiper = (instance: TeamSliderInstance): void => {
  if (instance.swiper) return;

  const list = instance.wrapper.querySelector<HTMLElement>(`.${SWIPER_CLASSES.list}`);
  if (!list) return;

  const originalItems = Array.from(
    list.querySelectorAll<HTMLElement>(`.${SWIPER_CLASSES.item}`)
  ).filter((item) => !item.hasAttribute(CLONE_ATTR));

  if (originalItems.length === 0) return;

  while (list.querySelectorAll(`.${SWIPER_CLASSES.item}`).length < MIN_SLIDES_FOR_LOOP) {
    originalItems.forEach((item) => {
      const clone = item.cloneNode(true) as HTMLElement;
      clone.setAttribute(CLONE_ATTR, '');
      clone.setAttribute('aria-hidden', 'true');
      list.appendChild(clone);
    });
  }

  const items = list.querySelectorAll<HTMLElement>(`.${SWIPER_CLASSES.item}`);

  instance.wrapper.classList.add('swiper', 'is-team');
  list.classList.add('swiper-wrapper');
  items.forEach((item) => item.classList.add('swiper-slide'));

  instance.swiper = new Swiper(instance.wrapper, {
    slidesPerView: 1.25,
    spaceBetween: 16,
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    loopAdditionalSlides: 2,
    mousewheel: {
      forceToAxis: true,
      releaseOnEdges: true,
    },
  });
};

const disableSwiper = (instance: TeamSliderInstance): void => {
  if (instance.swiper) {
    instance.swiper.destroy(true, true);
    instance.swiper = null;
  }

  const list = instance.wrapper.querySelector<HTMLElement>(`.${SWIPER_CLASSES.list}`);
  list?.querySelectorAll<HTMLElement>(`[${CLONE_ATTR}]`).forEach((clone) => clone.remove());

  const items = instance.wrapper.querySelectorAll<HTMLElement>(`.${SWIPER_CLASSES.item}`);

  instance.wrapper.classList.remove('swiper', 'is-team');
  list?.classList.remove('swiper-wrapper');
  items.forEach((item) => item.classList.remove('swiper-slide'));
};

export const initTeamSlider = (): void => {
  const wrappers = document.querySelectorAll<HTMLElement>(`.${SWIPER_CLASSES.wrapper}`);
  if (wrappers.length === 0) return;

  const instances: TeamSliderInstance[] = Array.from(wrappers).map((wrapper) => ({
    wrapper,
    swiper: null,
  }));

  const mediaQuery = window.matchMedia(MOBILE_QUERY);

  const sync = (matches: boolean): void => {
    instances.forEach((instance) => {
      if (matches) enableSwiper(instance);
      else disableSwiper(instance);
    });
  };

  sync(mediaQuery.matches);
  mediaQuery.addEventListener('change', (event) => sync(event.matches));
};
