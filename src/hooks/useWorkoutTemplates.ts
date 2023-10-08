import { useCallback, useMemo } from 'react';

import { useLocalStorage } from './useLocalStorage';

import { WorkoutTemplate } from '$types/workout-template';

export const useWorkoutTemplates = () => {
  return useLocalStorage<WorkoutTemplate[]>('workout-templates', []);
};

export const useWorkoutTemplate = (id: string) => {
  const [templates] = useWorkoutTemplates();

  return useMemo(
    () => templates.find((template) => template.id === id),
    [templates, id],
  );
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
