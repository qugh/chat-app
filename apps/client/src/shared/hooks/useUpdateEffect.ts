import { useEffect, useRef } from 'react';

export const useUpdateEffect = function (
  effectCallback: any,
  deps: unknown[] = [],
) {
  const isFirstMount = useRef(false);

  useEffect(() => {
    return () => {
      isFirstMount.current = false;
    };
  }, []);
  useEffect(() => {
    if (!isFirstMount.current) {
      isFirstMount.current = true;
    } else {
      return effectCallback();
    }
  }, deps);
};
