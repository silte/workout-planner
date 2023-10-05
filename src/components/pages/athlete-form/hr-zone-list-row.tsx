import { useWatch } from 'react-hook-form';

import { Button } from '$elements/button/button';
import { Icon, IconName } from '$elements/icon/icon';
import { HeartRateZone } from '$types/athelete';

type HrZoneListRowProps = {
  index: number;
  onRemove: () => void;
  onEdit: () => void;
};

export const HrZoneListRow = ({
  index,
  onRemove,
  onEdit,
}: HrZoneListRowProps) => {
  const field = useWatch({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: `hrZones.${index}` as any,
  }) as HeartRateZone;

  return (
    <tr>
      <td>{field.name}</td>
      <td>{field.bpm}</td>
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
