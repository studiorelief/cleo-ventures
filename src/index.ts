import './index.css';

import { initFooterReveal } from '$utils/animations/footerReveal';
import { initHeroLoad } from '$utils/animations/heroLoad';
import { initTextReveal } from '$utils/animations/textReveal';
import { initFooterYear } from '$utils/footer/year';
import { initFavicon } from '$utils/global/favicon';
import { loadAttributesScripts } from '$utils/global/loadScript';
import { initMarker } from '$utils/global/marker';
import { initNavbarScroll } from '$utils/global/navbarScroll';
import { initNavMobile } from '$utils/global/navMobile';
import { startStaggeredSliders } from '$utils/sliders/coordinator';
import { initHeroSlider } from '$utils/sliders/hero';
import { initPresentationSlider } from '$utils/sliders/presentation';

initFavicon();

window.Webflow ||= [];
window.Webflow.push(() => {
  initHeroLoad();
  initFooterYear();
  initMarker();
  initNavbarScroll();
  initNavMobile();
  loadAttributesScripts();
  initTextReveal();
  initFooterReveal();

  const heroSliders = initHeroSlider();
  const presentationSliders = initPresentationSlider();
  startStaggeredSliders([...heroSliders, ...presentationSliders]);
});
