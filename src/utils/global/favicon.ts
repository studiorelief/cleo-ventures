const OLD_DARK_FAVICON =
  'https://cdn.prod.website-files.com/69ea217e5053ece3f05be858/69ea2e396b19b771572d9190_cleo-favicon-32.png';
const NEW_DARK_FAVICON =
  'https://cdn.prod.website-files.com/69ea217e5053ece3f05be858/69ef803bfbd319caadb7deb9_cleo-fabvicon-32.png';

export const initFavicon = (): void => {
  const links = document.querySelectorAll<HTMLLinkElement>('link[rel="icon"]');
  links.forEach((link) => {
    if (link.href === OLD_DARK_FAVICON) {
      link.href = NEW_DARK_FAVICON;
    }
  });
};
