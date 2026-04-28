export const initFooterYear = () => {
  const elements = document.querySelectorAll<HTMLElement>('[footer="year"]');
  if (!elements.length) return;

  const year = new Date().getFullYear().toString();
  elements.forEach((element) => {
    element.textContent = year;
  });
};
