/**
 *
 * @param ref the ref to any HTML element you wish to have scrolled into view on render
 */

export const handleScrollIntoView = (ref: HTMLElement) => {
  const element = ref.getBoundingClientRect();
  const offset = element.top + window.scrollY;

  window.scrollTo({
    top: offset - 150,
    behavior: 'smooth',
  });
};

export default handleScrollIntoView;
