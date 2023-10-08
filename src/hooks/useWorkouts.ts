import { useCallback, useMemo } from 'react';

import { useLocalStorage } from './useLocalStorage';

import { Workout } from '$types/workout';

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useLocalStorage<Workout[]>('workouts', []);

  return useMemo(() => {
    const parsedWorkouts = workouts.map((workout) => ({
      ...workout,
      date: new Date(workout.date),
    }));

    return [parsedWorkouts, setWorkouts] as const;
  }, [workouts, setWorkouts]);
};

export const useWorkout = (id: string) => {
  const [workouts] = useWorkouts();

  return useMemo(
    () => workouts.find((workout) => workout.id === id),
    [workouts, id],
  );
};

export const useDeleteWorkout = () => {
  const [, setWorkout] = useWorkouts();

  return useCallback(
    (id: string) => {
      setWorkout((workouts) => workouts.filter((workout) => workout.id !== id));
    },
    [setWorkout],
  );
};
