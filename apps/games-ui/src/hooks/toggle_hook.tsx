import { useCallback, useState } from 'react';

export default function useToggle(initialState: boolean) {
  const [isToggle, setIsToggle] = useState<boolean>(initialState);

  const toggle = useCallback(() => setIsToggle(bool => !bool), [setIsToggle]);
  return [isToggle, toggle] as const;
}
