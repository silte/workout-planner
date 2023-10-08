import { IntervalTemplate, WorkoutTemplate } from './workout-template';

export type Interval = IntervalTemplate & {
  hasStartHr: boolean;
  hr: number[];
};

export type Workout = Omit<WorkoutTemplate, 'intervals'> & {
  id: string;
  date: Date;
  /** Guid that refers to athelete id */
  athlete: string | null;
  intervals: Interval[];
};
