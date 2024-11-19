export const handleScrollIntoView = (ref: HTMLElement) => {
  const element = ref.getBoundingClientRect();
  const offset = element.top + window.scrollY;

  window.scrollTo({
    top: offset - 150,
    behavior: 'smooth',
  });
};

export default handleScrollIntoView;
