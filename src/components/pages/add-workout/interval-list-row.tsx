import { useWatch } from 'react-hook-form';

import { Button } from '$elements/button/button';
import { IntervalTemplate } from '$types/workout';

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

  return (
    <tr>
      <td>{field.name}</td>
      <td>{field.duration}</td>
      <td>{field.angle}</td>
      <td>{field.speed}</td>
      <td>
        <Button onClick={onEdit}>muokkaa</Button>
        <Button onClick={onRemove}>poista</Button>
      </td>
    </tr>
  );
};
