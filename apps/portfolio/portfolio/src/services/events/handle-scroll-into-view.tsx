import type { SyntheticEvent } from 'react';

const handleScrollIntoView = (e: SyntheticEvent<HTMLDivElement, Event>) => {
  e.currentTarget.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
  });
};

export default handleScrollIntoView;
