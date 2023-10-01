export const timeFormatter = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const hDisplay = h > 0 ? `${h}h ` : '';
  const mDisplay = h > 0 || m > 0 ? `${m}m ` : '';
  const sDisplay = `${s}s`;
  return hDisplay + mDisplay + sDisplay;
};

export const distanceFormatter = (meters: number): string => {
  if (meters > 1000) {
    return `${(meters / 1000).toFixed(2)} km`;
  }
  return `${meters.toFixed(1)} m`;
};
