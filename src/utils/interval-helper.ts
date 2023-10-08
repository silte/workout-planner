import { convertDegreesToPercent } from './angle-helper';
import { distanceFormatter, timeFormatter } from './unit-helper';

import { IntervalTemplate } from '$types/workout-template';

export type IntervalSummary = {
  /** Distance in meters */
  distance: number;
  /** Ascent in meters */
  ascent: number;
  /** Duration in seconds */
  duration: number;
  formatted: {
    distance: string;
    ascent: string;
    duration: string;
  };
};

export const calculateIntervalSummary = (
  interval: IntervalTemplate,
): IntervalSummary => {
  const duration = interval.duration;

  const distance = (interval.speed * 1000 * duration) / 3600; // convert km/h to m/s
  const ascent = (convertDegreesToPercent(interval.angle) / 100) * distance;

  const formatted = {
    distance: distanceFormatter(distance),
    ascent: distanceFormatter(ascent),
    duration: timeFormatter(duration),
  };

  return {
    distance,
    ascent,
    duration,
    formatted,
  };
};

export const calculateIntervalsTotalSummary = (
  intervals: IntervalTemplate[],
): IntervalSummary => {
  const summary = intervals.map(calculateIntervalSummary).reduce(
    (acc, curr) => ({
      distance: acc.distance + curr.distance,
      ascent: acc.ascent + curr.ascent,
      duration: acc.duration + curr.duration,
    }),
    { distance: 0, ascent: 0, duration: 0 },
  );

  const formatted = {
    distance: distanceFormatter(summary.distance),
    ascent: distanceFormatter(summary.ascent),
    duration: timeFormatter(summary.duration),
  };

  return {
    ...summary,
    formatted,
  };
};
