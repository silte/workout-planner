export const convertKmhToMinkm = (speed: number) => {
  const kmMin = 60 / speed;
  return 1 * kmMin;
};

export const convertMinkmToKmh = (speed: number) => {
  const kmMin = 1 / speed;
  return 60 * kmMin;
};
