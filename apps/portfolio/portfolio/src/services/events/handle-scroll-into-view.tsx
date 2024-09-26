import type { SyntheticEvent } from 'react';

const handleScrollIntoView = (e: SyntheticEvent<HTMLDivElement, Event>) => {
  e.currentTarget.scrollIntoView({
    behavior: 'smooth',
  });
};

export default handleScrollIntoView;
