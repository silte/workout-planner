import { HeartRateZone } from '$types/athelete';

type AthleteDetailsHrZoneListRowProps = HeartRateZone;

export const AthleteDetailsHrZoneListRow = ({
  name,
  bpm,
}: AthleteDetailsHrZoneListRowProps) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{bpm}</td>
    </tr>
  );
};
