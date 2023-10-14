'use client';

import clsx from 'clsx';
import { useCallback, useMemo, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

import { EditInterval } from './edit-interval';
import { IntervalListHeader } from './interval-list-header';
import { IntervalListRow } from './interval-list-row';

import { Form } from '$blocks/form/form';
import { Button } from '$elements/button/button';
import { InfoCard } from '$elements/info-card/info-card';
import { Input } from '$elements/input/input';
import { Select } from '$elements/select/select';
import { Container } from '$layouts/container/container';
import { Athlete } from '$types/athelete';
import { Workout } from '$types/workout';
import {
  AngleUnit,
  IntervalTemplate,
  SpeedUnit,
} from '$types/workout-template';
import { calculateIntervalsTotalSummary } from '$utils/interval-helper';
import { formatInputDate } from '$utils/time-helper';

const IntervalSummary = () => {
  const intervals = useWatch({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: `intervals` as any,
  }) as IntervalTemplate[];

  const summary = useMemo(
    () => calculateIntervalsTotalSummary(intervals ?? []),
    [intervals],
  );

  return (
    <section className={clsx('grid sm:grid-cols-3 gap-2 mt-12')}>
      <InfoCard label="Kesto" testId="workout-template-duration" isSmall>
        {summary.formatted.duration}
      </InfoCard>
      <InfoCard label="Matka" testId="workout-template-distance" isSmall>
        {summary.formatted.distance}
      </InfoCard>
      <InfoCard label="Nousu" testId="workout-template-ascent" isSmall>
        {summary.formatted.ascent}
      </InfoCard>
    </section>
  );
};

const speedUnitOptions = [
  {
    label: 'km/h',
    value: SpeedUnit.KMH,
  },
  {
    label: 'min/km',
    value: SpeedUnit.MINKM,
  },
];

const angleUnitOptions = [
  {
    label: 'astetta',
    value: AngleUnit.DEGREES,
  },
  {
    label: 'prosenttia',
    value: AngleUnit.PERCENTAGE,
  },
];

type WorkoutFormProps = {
  initialValues: Workout;
  athletes: Athlete[];
  onSave: (values: WorkoutFormValues) => void;
  submitLabel: string;
};

export type WorkoutFormValues = Workout;

export const WorkoutForm = ({
  initialValues,
  onSave,
  submitLabel,
  athletes,
}: WorkoutFormProps) => {
  const [intervalToEdit, setIntervalToEdit] = useState<number>(NaN);

  const formMethods = useForm<WorkoutFormValues>({
    defaultValues: {
      ...initialValues,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      date: formatInputDate(initialValues.date) as any,
    },
  });

  const { append, remove, fields } = useFieldArray<WorkoutFormValues>({
    name: 'intervals',
    control: formMethods.control,
  });

  const addInterval = useCallback(() => {
    const index = fields?.length ?? 0;
    append({
      id: crypto.randomUUID(),
      name: '',
      duration: 0,
      angle: 0,
      speed: 0,
      hr: [],
      hasStartHr: false,
      index,
    });
    setIntervalToEdit(index);
  }, [append, fields.length]);

  const athleteOptions = useMemo(
    () => [
      { label: 'Valitse', value: '' },
      ...athletes.map((athlete) => ({
        label: athlete.name,
        value: athlete.id,
      })),
    ],
    [athletes],
  );

  return (
    <Container className="w-full">
      <Form methods={formMethods} onSubmit={onSave} submitLabel={submitLabel}>
        <div className="flex flex-col gap-4">
          <Input id="name" isRequired>
            Nimi
          </Input>
          <Input id="date" type="datetime-local" isRequired>
            Päivä
          </Input>
          <Select id="athlete" options={athleteOptions}>
            Urheilija
          </Select>
          <Select id={'speedUnit'} options={speedUnitOptions}>
            Nopeuden yksikkö
          </Select>
          <Select id={'angleUnit'} options={angleUnitOptions}>
            Kulman yksikkö
          </Select>
          <Button accentColor="blue" onClick={addInterval}>
            Lisää
          </Button>
          <table className="w-full text-left">
            <thead>
              <IntervalListHeader />
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <IntervalListRow
                  key={field.id}
                  index={index}
                  onRemove={() => remove(index)}
                  onEdit={() => setIntervalToEdit(index)}
                />
              ))}
            </tbody>
          </table>
        </div>
        <IntervalSummary />
        <EditInterval
          key={intervalToEdit}
          onClose={() => setIntervalToEdit(NaN)}
          index={intervalToEdit}
        />
      </Form>
    </Container>
  );
};
