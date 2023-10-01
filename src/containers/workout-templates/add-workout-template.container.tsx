'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

import { Form } from '$blocks/form/form';
import { Button } from '$elements/button/button';
import { Heading } from '$elements/heading/heading';
import { Input } from '$elements/input/input';
import { useWorkoutTemplates } from '$hooks/useWorkoutTemplates';
import { Container } from '$layouts/container/container';
import { EditInterval } from '$pages/add-workout/edit-interval';
import { IntervalListRow } from '$pages/add-workout/interval-list-row';
import { IntervalTemplate, WorkoutTemplate } from '$types/workout';
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
    <dl className="mt-6">
      <dt className="font-bold">Kokonais kesto</dt>
      <dd>{summary.formatted.duration}</dd>
      <dt className="font-bold">Kokonais matka</dt>
      <dd>{summary.formatted.distance}</dd>
      <dt className="font-bold">Kokonais nousu</dt>
      <dd>{summary.formatted.ascent}</dd>
    </dl>
  );
};

type AddWorkoutFormValues = WorkoutTemplate;

export const AddWorkoutContainer = () => {
  const { push } = useRouter();

  const [, setWorkoutTemplates] = useWorkoutTemplates();

  const [intervalToEdit, setIntervalToEdit] = useState<number>(NaN);

  const formMethods = useForm<AddWorkoutFormValues>({
    defaultValues: {
      id: crypto.randomUUID(),
    },
  });

  const { append, remove, fields } = useFieldArray<AddWorkoutFormValues>({
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

  const onSave = useCallback(
    (values: AddWorkoutFormValues) => {
      const formattedValues = {
        ...values,
        intervals: values.intervals.map((interval, index) => ({
          ...interval,
          index,
        })),
      };

      setWorkoutTemplates((prev) => [...prev, formattedValues]);
      push('/harjoitukset');
    },
    [push, setWorkoutTemplates],
  );

  return (
    <Container>
      <Heading variant="h1">Lisää harjoitus</Heading>
      <Form methods={formMethods} onSubmit={onSave} submitLabel="Lisää">
        <div className="flex flex-col gap-4">
          <Input id="name" isRequired>
            Nimi
          </Input>
          <Button accentColor="blue" onClick={addInterval}>
            Lisää
          </Button>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>Nimi</th>
                <th>Kesto</th>
                <th>Kulma (astetta)</th>
                <th>Nopeus (km/h)</th>
              </tr>
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
