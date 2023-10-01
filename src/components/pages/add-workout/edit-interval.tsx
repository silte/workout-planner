import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import { Drawer } from '$blocks/drawer/drawer';
import { Heading } from '$elements/heading/heading';
import { Input } from '$elements/input/input';
import { IntervalTemplate } from '$types/workout';
import { calculateIntervalSummary } from '$utils/interval-helper';

type EditIntervalSummaryProps = {
  index: number;
};

const EditIntervalSummary = ({ index }: EditIntervalSummaryProps) => {
  const field = useWatch({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: `intervals.${index}` as any,
  }) as IntervalTemplate;

  const summary = useMemo(() => calculateIntervalSummary(field), [field]);

  return (
    <dl className="mt-6">
      <dt className="font-bold">Matka</dt>
      <dd>{summary.formatted.distance}</dd>
      <dt className="font-bold">Nousu</dt>
      <dd>{summary.formatted.ascent}</dd>
    </dl>
  );
};

type EditIntervalProps = {
  onClose: () => void;
  index: number;
};

export const EditInterval = ({ onClose, index }: EditIntervalProps) => {
  const isOpen = !isNaN(index);

  return (
    <Drawer onClose={onClose} isOpen={isOpen}>
      <div className="m-4">
        <Heading variant="h2">Muokkaa intervallia</Heading>
        <Input id={`intervals.${index}.name`}>Nimi</Input>
        <Input id={`intervals.${index}.duration`} type={'number'}>
          Kesto (s)
        </Input>
        <Input id={`intervals.${index}.angle`} type={'number'}>
          Kulma (astetta)
        </Input>
        <Input id={`intervals.${index}.speed`} type={'number'}>
          Nopeus (km/h)
        </Input>
        <EditIntervalSummary index={index} />
      </div>
    </Drawer>
  );
};
