'use client';

import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { Form } from '$blocks/form/form';
import { Button } from '$elements/button/button';
import { Heading } from '$elements/heading/heading';
import { Input } from '$elements/input/input';
import { Container } from '$layouts/container/container';
import { EditInterval } from '$pages/add-workout/edit-interval';
import { IntervalListRow } from '$pages/add-workout/interval-list-row';
import { WorkoutTemplate } from '$types/workout';

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
        <EditInterval
          onClose={() => setIntervalToEdit(NaN)}
          index={intervalToEdit}
        />
      </Form>
    </Container>
  );
};
