import { useEffect, useRef, useState } from 'react';

export const useDebounce = <T extends unknown>(value: T, delay?: number): T => {
  const [state, setState] = useState<T>(value);
  const ref = useRef<null | NodeJS.Timeout>();

  useEffect(() => {
    if (ref?.current) {
        clearTimeout(ref?.current);
    }
    ref.current = setTimeout(() => {
        setState(value);
    }, delay ?? 0);

    return () => {
        if (ref.current) {
            clearTimeout(ref?.current);
        }
    };
  }, [value, delay]);

  return state;
};
