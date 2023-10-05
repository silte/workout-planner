import { useCallback, useMemo } from 'react';

import { useLocalStorage } from './useLocalStorage';

import { Athlete } from '$types/athelete';

export const useAthletes = () => {
  return useLocalStorage<Athlete[]>('athletes', []);
};

export const useAthlete = (id: string) => {
  const [athletes] = useAthletes();

  return useMemo(
    () => athletes.find((athlete) => athlete.id === id),
    [athletes, id],
  );
};

export const useDeleteAthlete = () => {
  const [, setAthlete] = useAthletes();

  return useCallback(
    (id: string) => {
      setAthlete((athletes) => athletes.filter((athlete) => athlete.id !== id));
    },
    [setAthlete],
  );
};
