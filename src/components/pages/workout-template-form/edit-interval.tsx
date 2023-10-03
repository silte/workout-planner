import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import { Drawer } from '$blocks/drawer/drawer';
import { Heading } from '$elements/heading/heading';
import {
  Input,
  TimeInput,
  AngleInput,
  SpeedInput,
} from '$elements/input/input';
import { AngleUnit, IntervalTemplate, SpeedUnit } from '$types/workout';
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

  const speedUnit = useWatch({ name: 'speedUnit' }) as SpeedUnit;
  const angleUnit = useWatch({ name: 'angleUnit' }) as AngleUnit;

  return (
    <Drawer onClose={onClose} isOpen={isOpen}>
      <div className="m-4">
        <Heading variant="h2">Muokkaa intervallia</Heading>
        <Input id={`intervals.${index}.name`}>Nimi</Input>
        <TimeInput id={`intervals.${index}.duration`} step={1}>
          Kesto
        </TimeInput>
        <AngleInput id={`intervals.${index}.angle`} unit={angleUnit} step={0.1}>
          Kulma
        </AngleInput>
        <SpeedInput id={`intervals.${index}.speed`} unit={speedUnit} step={0.1}>
          Nopeus
        </SpeedInput>
        <EditIntervalSummary index={index} />
      </div>
    </Drawer>
  );
};
