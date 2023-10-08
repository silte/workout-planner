import { useMemo } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { WorkoutFormValues } from './workout-form';

import { Drawer } from '$blocks/drawer/drawer';
import { Button } from '$elements/button/button';
import { Checkbox } from '$elements/checkbox/checkbox';
import { Heading } from '$elements/heading/heading';
import { Icon, IconName } from '$elements/icon/icon';
import {
  Input,
  TimeInput,
  AngleInput,
  SpeedInput,
} from '$elements/input/input';
import {
  AngleUnit,
  IntervalTemplate,
  SpeedUnit,
} from '$types/workout-template';
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

type HrRowProps = {
  intervalIndex: number;
  hrIndex: number;
  onRemove: () => void;
};

const HrRow = ({ intervalIndex, hrIndex, onRemove }: HrRowProps) => {
  const hasStartHr = useWatch({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: `intervals.${intervalIndex}.hasStartHr` as any,
  }) as boolean;

  const labelNumber = hasStartHr ? hrIndex : hrIndex + 1;

  const label =
    hasStartHr && hrIndex === 0 ? `Aloitus syke` : `Syke ${labelNumber}`;

  return (
    <div className="flex items-end justify-between gap-2">
      <Input id={`intervals.${intervalIndex}.hr.${hrIndex}`}>{label}</Input>
      <div>
        <Button onClick={onRemove}>
          <Icon type={IconName.trash} />
        </Button>
      </div>
    </div>
  );
};

type EditIntervalProps = {
  onClose: () => void;
  index: number;
};

export const EditInterval = ({ onClose, index }: EditIntervalProps) => {
  const isOpen = !isNaN(index);

  const { control } = useFormContext<WorkoutFormValues>();

  const speedUnit = useWatch({ name: 'speedUnit' }) as SpeedUnit;
  const angleUnit = useWatch({ name: 'angleUnit' }) as AngleUnit;

  const { append, remove, fields } = useFieldArray({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: `intervals.${index}.hr` as any,
    control,
  });

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
        <Checkbox
          id={`intervals.${index}.hasStartHr`}
          label="Sisältää aloitus sykkeen"
        />
        <Button onClick={() => append(0)}>Lisää syke</Button>
        {fields.map((item, hrIndex) => (
          <HrRow
            key={item.id}
            intervalIndex={index}
            hrIndex={hrIndex}
            onRemove={() => remove(hrIndex)}
          />
        ))}
        <EditIntervalSummary index={index} />
      </div>
    </Drawer>
  );
};
