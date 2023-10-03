export const secondsToTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = (Math.floor(seconds / 60) % 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');

  return `${hours}:${minutes}:${secs}`;
};

export const timeToSeconds = (time: string | number): number => {
  if (typeof time === 'number') return time;

  const [hours = 0, minutes = 0, seconds = 0] = time?.split(':').map(Number);

  return hours * 3600 + minutes * 60 + seconds;
};
