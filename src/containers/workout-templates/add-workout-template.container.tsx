'use client';

import { useMemo, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

import { Form } from '$blocks/form/form';
import { Button } from '$elements/button/button';
import { Heading } from '$elements/heading/heading';
import { Input } from '$elements/input/input';
import { Container } from '$layouts/container/container';
import { EditInterval } from '$pages/add-workout/edit-interval';
import { IntervalListRow } from '$pages/add-workout/interval-list-row';
import { IntervalTemplate, WorkoutTemplate } from '$types/workout';
import { calculateIntervalSummary } from '$utils/interval-helper';

const IntervalSummary = () => {
  const intervals = useWatch({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: `intervals` as any,
  }) as IntervalTemplate[];

  const summary = useMemo(
    () =>
      (intervals ?? [])
        .map((interval) => calculateIntervalSummary(interval))
        .reduce(
          (acc, curr) => ({
            distance: acc.distance + curr.distance,
            ascent: acc.ascent + curr.ascent,
          }),
          { distance: 0, ascent: 0 },
        ),
    [intervals],
  );

  return (
    <dl className="mt-6">
      <dt className="font-bold">Kokonais matka</dt>
      <dd>{summary.distance} m</dd>
      <dt className="font-bold">Kokonais nousu</dt>
      <dd>{summary.ascent} m</dd>
    </dl>
  );
};

type AddWorkoutFormValues = WorkoutTemplate;

export const AddWorkoutContainer = () => {
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

  const addInterval = () => {
    append({
      id: crypto.randomUUID(),
      name: '',
      duration: 0,
      angle: 0,
      speed: 0,
    });
  };

  return (
    <Container>
      <Heading variant="h1">Lisää harjoitus</Heading>
      <Form methods={formMethods} onSubmit={console.log} submitLabel="Lisää">
        <div className="flex flex-col gap-4">
          <Input id="name">Nimi</Input>
          <Button accentColor="blue" onClick={addInterval}>
            Lisää
          </Button>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>Nimi</th>
                <th>Kesto (s)</th>
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
