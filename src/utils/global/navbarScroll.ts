const SCROLLED_BG = 'var(--_theme---background--brand)';
const SCROLLED_BRAND_HEIGHT = '1.5rem';
const SCROLLED_CONTENT_MARGIN = 'var(--_layout---spacing--small)';
const TRANSITION = '400ms ease-out';

const SCROLL_THRESHOLD_REM = 10;

const getThreshold = (): number =>
  SCROLL_THRESHOLD_REM * parseFloat(getComputedStyle(document.documentElement).fontSize);

export const initNavbarScroll = (): void => {
  const bgScroll = document.querySelector<HTMLElement>('.nav_bg-scroll');
  const brand = document.querySelector<HTMLElement>('.nav_brand');
  const content = document.querySelector<HTMLElement>('.nav_content');
  if (!bgScroll && !brand && !content) return;

  const initialBg = bgScroll ? getComputedStyle(bgScroll).backgroundColor : '';
  const initialBrandHeight = brand ? getComputedStyle(brand).height : '';
  const initialContentMarginTop = content ? getComputedStyle(content).marginTop : '';
  const initialContentMarginBottom = content ? getComputedStyle(content).marginBottom : '';

  if (bgScroll) bgScroll.style.transition = `background-color ${TRANSITION}`;
  if (brand) brand.style.transition = `height ${TRANSITION}`;
  if (content) content.style.transition = `margin-top ${TRANSITION}, margin-bottom ${TRANSITION}`;

  let isScrolled = false;

  const update = (): void => {
    const shouldBeScrolled = window.scrollY > getThreshold();
    if (shouldBeScrolled === isScrolled) return;
    isScrolled = shouldBeScrolled;

    if (bgScroll) bgScroll.style.backgroundColor = shouldBeScrolled ? SCROLLED_BG : initialBg;
    if (brand) brand.style.height = shouldBeScrolled ? SCROLLED_BRAND_HEIGHT : initialBrandHeight;
    if (content) {
      content.style.marginTop = shouldBeScrolled
        ? SCROLLED_CONTENT_MARGIN
        : initialContentMarginTop;
      content.style.marginBottom = shouldBeScrolled
        ? SCROLLED_CONTENT_MARGIN
        : initialContentMarginBottom;
    }
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
};
