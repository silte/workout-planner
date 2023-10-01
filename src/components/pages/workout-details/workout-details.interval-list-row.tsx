import { IntervalTemplate } from '$types/workout';
import { calculateIntervalSummary } from '$utils/interval-helper';

type WorkoutDetailsIntervalListRowProps = IntervalTemplate;

export const WorkoutDetailsIntervalListRow = (
  props: WorkoutDetailsIntervalListRowProps,
) => {
  const summary = calculateIntervalSummary(props);
  const { name, angle, speed } = props;

  return (
    <tr>
      <td>{name}</td>
      <td>{summary.formatted.duration}</td>
      <td>{summary.formatted.distance}</td>
      <td>{summary.formatted.ascent}</td>
      <td>{angle}</td>
      <td>{speed}</td>
    </tr>
  );
};
