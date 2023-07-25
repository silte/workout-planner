export const convertDegreesToPercent = (degrees: number): number => {
  return Math.tan(degrees * (Math.PI / 180)) * 100;
};

export const convertPercentToDegrees = (percent: number): number => {
  return Math.atan(percent / 100) * (180 / Math.PI);
};
