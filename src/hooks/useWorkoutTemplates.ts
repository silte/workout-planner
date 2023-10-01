import { useCallback } from 'react';

import { useLocalStorage } from './useLocalStorage';

import { WorkoutTemplate } from '$types/workout';

export const useWorkoutTemplates = () => {
  return useLocalStorage<WorkoutTemplate[]>('workout-templates', []);
};

export const useWorkoutTemplate = (id: string) => {
  const [templates] = useWorkoutTemplates();
  return templates.find((template) => template.id === id);
};

export const useDeleteWorkoutTemplate = () => {
  const [, setTemplates] = useWorkoutTemplates();
  return useCallback(
    (id: string) => {
      setTemplates((templates) =>
        templates.filter((template) => template.id !== id),
      );
    },
    [setTemplates],
  );
};
