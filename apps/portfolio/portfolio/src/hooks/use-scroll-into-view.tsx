import { handleScrollIntoView } from '@bgdk/utils';
import { useLayoutEffect, type RefObject } from 'react';

/**
 * This custom hook scrolls an element into view when the component mounts or when the dependencies change.
 *
 * @param {RefObject<HTMLElement | null>} elementRef - A ref object that refers to the element to be scrolled into view.
 * @param {unknown[]} [dependencies=[]] - An optional array of dependencies that trigger the scroll effect when they change.
 */

export const useScrollIntoView = (elementRef: RefObject<HTMLElement | null>, dependencies: unknown[] = []) => {
  useLayoutEffect(() => {
    if (elementRef.current) handleScrollIntoView(elementRef.current);
  }, dependencies);
};

export default useScrollIntoView;
