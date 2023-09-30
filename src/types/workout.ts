export type IntervalTemplate = {
  id: string;
  index: number;
  name: string;
  /** Duration in seconds */
  duration: number;
  /**  Angle in degrees */
  angle: number;
  /**  Speed in km/h */
  speed: number;
  description?: string;
};

export type WorkoutTemplate = {
  id: string;
  name: string;
  intervals: IntervalTemplate[];
};
