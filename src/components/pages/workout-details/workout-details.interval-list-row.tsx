import { AngleUnit, IntervalTemplate, SpeedUnit } from '$types/workout';
import { convertDegreesToPercent } from '$utils/angle-helper';
import { calculateIntervalSummary } from '$utils/interval-helper';
import { convertKmhToMinkm } from '$utils/speed-helper';

type WorkoutDetailsIntervalListRowProps = IntervalTemplate & {
  speedUnit: SpeedUnit;
  angleUnit: AngleUnit;
};

export const WorkoutDetailsIntervalListRow = ({
  speedUnit,
  angleUnit,
  ...props
}: WorkoutDetailsIntervalListRowProps) => {
  const summary = calculateIntervalSummary(props);
  const { name } = props;

  const angle =
    angleUnit === AngleUnit.DEGREES
      ? props.angle
      : convertDegreesToPercent(props.angle);
  const speed =
    speedUnit === SpeedUnit.KMH ? props.speed : convertKmhToMinkm(props.speed);

  return (
    <tr>
      <td>{name}</td>
      <td>{summary.formatted.duration}</td>
      <td>{summary.formatted.distance}</td>
      <td>{summary.formatted.ascent}</td>
      <td>{angle?.toFixed(1)}</td>
      <td>{speed?.toFixed(1)}</td>
    </tr>
  );
};
