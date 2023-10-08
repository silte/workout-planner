const addLeadingZero = (number: number) => number.toString().padStart(2, '0');

// const formatter = new Intl.DateTimeFormat('fi-FI');

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

export const getTimeString = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = addLeadingZero(now.getMonth() + 1);
  const day = addLeadingZero(now.getDate());

  const hours = addLeadingZero(now.getHours());
  const minutes = addLeadingZero(now.getMinutes());
  const seconds = addLeadingZero(now.getSeconds());

  return `${year}${month}${day}-${hours}${minutes}${seconds}`;
};

export const formatInputDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${year}-${addLeadingZero(month)}-${addLeadingZero(
    day,
  )}T${addLeadingZero(hour)}:${addLeadingZero(minute)}`;
};

const formatter = new Intl.DateTimeFormat('fi-FI', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
});

export const formatDate = (date: Date): string => formatter.format(date);
