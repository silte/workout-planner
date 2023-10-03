import { useWatch } from 'react-hook-form';

import { AngleUnit, SpeedUnit } from '$types/workout';

export const IntervalListHeader = () => {
  const speedUnit = useWatch({ name: 'speedUnit' }) as SpeedUnit;
  const angleUnit = useWatch({ name: 'angleUnit' }) as AngleUnit;

  return (
    <tr>
      <th>Nimi</th>
      <th>Kesto</th>
      <th>Kulma ({angleUnit})</th>
      <th>Nopeus ({speedUnit})</th>
    </tr>
  );
};
