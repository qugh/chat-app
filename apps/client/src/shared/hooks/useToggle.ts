import { useMemo, useState } from 'react';

export const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  return useMemo(
    () => ({
      state,
      on: () => {
        setState(true);
      },
      off: () => {
        setState(false);
      },
      toggle: () => {
        setState((prev) => !prev);
      },
    }),
    [state, setState],
  );
};
