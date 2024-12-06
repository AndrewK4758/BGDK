import { handleScrollIntoView } from '@bgdk/utils';
import { useLayoutEffect, type RefObject } from 'react';

/**
 *
 * @param elementRef The ref of the element you wish to have scrolled into view when it is rendered
 * @param dependencies The dependency list for the useLayoutEffect hook. Is initialized as [] if not provided
 */

export const useScrollIntoView = (elementRef: RefObject<HTMLElement | null>, dependencies = []) => {
  useLayoutEffect(() => {
    if (elementRef.current) handleScrollIntoView(elementRef.current);
  }, dependencies);
};

export default useScrollIntoView;
