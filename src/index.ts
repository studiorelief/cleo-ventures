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
import { initTabsRefresh } from '$utils/global/tabsRefresh';
import { startStaggeredSliders } from '$utils/sliders/coordinator';
import { initHeroSlider } from '$utils/sliders/hero';
import { initPresentationSlider } from '$utils/sliders/presentation';
import { initTeamSlider } from '$utils/sliders/team';

initFavicon();

window.Webflow ||= [];
window.Webflow.push(() => {
  initFooterYear();
  initMarker();
  initNavbarScroll();
  initNavMobile();
  loadAttributesScripts();
  initTextReveal();
  initFooterReveal();
  initTabsRefresh();

  const heroSliders = initHeroSlider();
  const presentationSliders = initPresentationSlider();
  if (window.location.pathname === '/') {
    initHeroLoad().then(() => startStaggeredSliders(heroSliders, 2000));
  } else {
    startStaggeredSliders(heroSliders, 2000);
  }
  startStaggeredSliders(presentationSliders, 4000);
  initTeamSlider();
});
