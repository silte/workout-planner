import { useLocalStorage } from './useLocalStorage';

import { WorkoutTemplate } from '$types/workout';

export const useWorkoutTemplates = () => {
  return useLocalStorage<WorkoutTemplate[]>('workout-templates', []);
};
