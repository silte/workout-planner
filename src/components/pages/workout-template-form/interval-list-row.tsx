import { useWatch } from 'react-hook-form';

import { Button } from '$elements/button/button';
import { Icon, IconName } from '$elements/icon/icon';
import { IntervalTemplate } from '$types/workout';
import { AngleUnit, SpeedUnit } from '$types/workout';
import { convertDegreesToPercent } from '$utils/angle-helper';
import { calculateIntervalSummary } from '$utils/interval-helper';
import { convertKmhToMinkm } from '$utils/speed-helper';

type IntervalListProps = {
  index: number;
  onRemove: () => void;
  onEdit: () => void;
};

export const IntervalListRow = ({
  index,
  onRemove,
  onEdit,
}: IntervalListProps) => {
  const field = useWatch({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: `intervals.${index}` as any,
  }) as IntervalTemplate;
  const speedUnit = useWatch({ name: 'speedUnit' }) as SpeedUnit;
  const angleUnit = useWatch({ name: 'angleUnit' }) as AngleUnit;

  const summary = calculateIntervalSummary(field);

  const angle =
    angleUnit === AngleUnit.DEGREES
      ? field.angle
      : convertDegreesToPercent(field.angle);
  const speed =
    speedUnit === SpeedUnit.KMH ? field.speed : convertKmhToMinkm(field.speed);

  return (
    <tr>
      <td>{field.name}</td>
      <td>{summary.formatted.duration}</td>
      <td>{angle?.toFixed(1)}</td>
      <td>{speed?.toFixed(1)}</td>
      <td>
        <Button onClick={onEdit} className="mr-2">
          <Icon type={IconName.pencil} />
        </Button>
        <Button onClick={onRemove}>
          <Icon type={IconName.trash} />
        </Button>
      </td>
    </tr>
  );
};
