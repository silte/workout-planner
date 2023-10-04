'use client';

import clsx from 'clsx';
import { useCallback, useMemo, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

import { IntervalListHeader } from './interval-list-header';

import { Form } from '$blocks/form/form';
import { Button } from '$elements/button/button';
import { Heading } from '$elements/heading/heading';
import { InfoCard } from '$elements/info-card/info-card';
import { Input } from '$elements/input/input';
import { Select } from '$elements/select/select';
import { Container } from '$layouts/container/container';
import { EditInterval } from '$pages/workout-template-form/edit-interval';
import { IntervalListRow } from '$pages/workout-template-form/interval-list-row';
import {
  AngleUnit,
  IntervalTemplate,
  SpeedUnit,
  WorkoutTemplate,
} from '$types/workout';
import { calculateIntervalsTotalSummary } from '$utils/interval-helper';

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

type WorkoutTemplateFormProps = {
  initialValues: WorkoutTemplate;
  onSave: (values: WorkoutTemplateFormValues) => void;
  title: string;
  submitLabel: string;
};

export type WorkoutTemplateFormValues = WorkoutTemplate;

export const WorkoutTemplateForm = ({
  initialValues,
  onSave,
  title,
  submitLabel,
}: WorkoutTemplateFormProps) => {
  const [intervalToEdit, setIntervalToEdit] = useState<number>(NaN);

  const formMethods = useForm<WorkoutTemplateFormValues>({
    defaultValues: initialValues,
  });

  const { append, remove, fields } = useFieldArray<WorkoutTemplateFormValues>({
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
      index,
    });
    setIntervalToEdit(index);
  }, [append, fields.length]);

  return (
    <Container className="w-full">
      <Heading variant="h1">{title}</Heading>
      <Form methods={formMethods} onSubmit={onSave} submitLabel={submitLabel}>
        <div className="flex flex-col gap-4">
          <Input id="name" isRequired>
            Nimi
          </Input>
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
          onClose={() => setIntervalToEdit(NaN)}
          index={intervalToEdit}
        />
      </Form>
    </Container>
  );
};
