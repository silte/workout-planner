import { convertDegreesToPercent } from './angle-helper';

import { IntervalTemplate } from '$types/workout';

export type IntervalSummary = {
  /** Distance in meters */
  distance: number;
  /** Ascent in meters */
  ascent: number;
};

export const calculateIntervalSummary = (
  interval: IntervalTemplate,
): IntervalSummary => {
  const distance = (interval.speed * 1000 * interval.duration) / 3600; // convert km/h to m/s
  const ascent = (convertDegreesToPercent(interval.angle) / 100) * distance;
  return { distance, ascent };
};
