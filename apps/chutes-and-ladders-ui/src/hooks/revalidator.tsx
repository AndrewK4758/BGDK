import { useEffect } from 'react';
import { useRevalidator } from 'react-router-dom';

export default function useRevalidateBoard() {
  const revalidator = useRevalidator();

  useEffect(() => {
    const interval = setInterval(() => {
      revalidator.revalidate();
    }, 5000);

    return () => clearInterval(interval);
  }, [revalidator]);
}