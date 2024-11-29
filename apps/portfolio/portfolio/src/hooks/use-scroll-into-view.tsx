import { handleScrollIntoView } from '@bgdk/utils';
import { useEffect, type RefObject } from 'react';

export const useScrollIntoView = (elementRef: RefObject<HTMLElement>, dependencies = []) => {
  useEffect(() => {
    if (elementRef.current) handleScrollIntoView(elementRef.current);
  }, dependencies);
};

export default useScrollIntoView;
