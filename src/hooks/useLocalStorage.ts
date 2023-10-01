import { useCallback, useMemo, useState } from 'react';

export const useLocalStorage = <ValueType = never>(
  key: string,
  initialValue: ValueType,
) => {
  const [storedValue, setStoredValue] = useState<ValueType>(() => {
    if (typeof window === 'undefined' || key === null) {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: ValueType | ((previousValue: ValueType) => ValueType)) => {
      setStoredValue((previousValue) => {
        const valueToStore =
          value instanceof Function ? value(previousValue) : value;

        try {
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          }
        } catch (error) {
          console.error(error);
        } finally {
          return valueToStore;
        }
      });
    },
    [key],
  );

  return useMemo(
    () => [storedValue, setValue] as const,
    [storedValue, setValue],
  );
};
