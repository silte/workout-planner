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

export enum SpeedUnit {
  KMH = 'km/h',
  MINKM = 'min/km',
}

export enum AngleUnit {
  DEGREES = '°',
  PERCENTAGE = '%',
}

export type WorkoutTemplate = {
  id: string;
  name: string;
  /** Unit speed that will be displayed in forms and UI, data is always kmh */
  speedUnit: SpeedUnit;
  /** Unit angle that will be displayed in forms and UI, data is always degrees */
  angleUnit: AngleUnit;
  intervals: IntervalTemplate[];
};
