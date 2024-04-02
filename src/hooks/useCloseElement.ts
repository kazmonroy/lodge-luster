import { useEffect, useRef } from 'react';

function useCloseElement(close: () => void, listenCapture = true) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: any) {
      if (ref.current && !ref.current!.contains(e.target)) {
        close();
      }
    }

    document.addEventListener('click', handleClick, listenCapture);

    return () =>
      document.removeEventListener('click', handleClick, listenCapture);
  }, [close, listenCapture]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (ref.current && e.key === 'Escape') {
        close();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [close]);

  return { ref };
}

export default useCloseElement;
