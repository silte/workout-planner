import { RefObject, useEffect, useMemo } from 'react';

type EventType = TouchEvent | MouseEvent;

export const useOnClickOutside = (
  ref: RefObject<HTMLElement> | RefObject<HTMLElement>[],
  handler: (event: EventType) => void,
  isActive = true,
) => {
  const refArray = useMemo(() => (Array.isArray(ref) ? ref : [ref]), [ref]);

  useEffect(() => {
    if (!isActive) return;

    const listener = (event: EventType) => {
      if (
        refArray.some(
          (currentRef) =>
            !currentRef.current ||
            currentRef.current?.contains(event.target as Node),
        )
      ) {
        return;
      }

      if ((event.target as HTMLElement)?.classList?.contains('loader')) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler, refArray, isActive]);
};
