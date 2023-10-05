export type HeartRateZone = {
  id: string;
  name: string;
  bpm: number;
};

export type Athlete = {
  id: string;
  name: string;
  hrZones: HeartRateZone[];
};
