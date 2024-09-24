import { SyntheticEvent } from 'react';

const handleScrollIntoView = (e: SyntheticEvent<HTMLDivElement, Event>) => {
  e.currentTarget.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
  });
};

export default handleScrollIntoView;
