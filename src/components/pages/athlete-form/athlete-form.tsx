'use client';

import { useCallback, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { EditHrZone } from './edit-hr-zone';
import { HrZoneListHeader } from './hr-zone-list-header';
import { HrZoneListRow } from './hr-zone-list-row';

import { Form } from '$blocks/form/form';
import { Button } from '$elements/button/button';
import { Input } from '$elements/input/input';
import { Container } from '$layouts/container/container';
import { Athlete } from '$types/athelete';

type AthleteFormProps = {
  initialValues: Athlete;
  onSave: (values: AthleteFormValues) => void;
  submitLabel: string;
};

export type AthleteFormValues = Athlete;

export const AthleteForm = ({
  initialValues,
  onSave,
  submitLabel,
}: AthleteFormProps) => {
  const [hrZoneToEdit, setHrZoneToEdit] = useState<number>(NaN);

  const formMethods = useForm<AthleteFormValues>({
    defaultValues: initialValues,
  });

  const { append, remove, fields } = useFieldArray<AthleteFormValues>({
    name: 'hrZones',
    control: formMethods.control,
  });

  const addInterval = useCallback(() => {
    const index = fields?.length ?? 0;
    append({
      id: crypto.randomUUID(),
      name: '',
      bpm: 0,
    });
    setHrZoneToEdit(index);
  }, [append, fields.length]);

  return (
    <Container className="w-full">
      <Form methods={formMethods} onSubmit={onSave} submitLabel={submitLabel}>
        <div className="flex flex-col gap-4">
          <Input id="name" isRequired>
            Nimi
          </Input>
          <Button accentColor="blue" onClick={addInterval}>
            Lisää sykealue
          </Button>
          <table className="w-full text-left">
            <thead>
              <HrZoneListHeader />
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <HrZoneListRow
                  key={field.id}
                  index={index}
                  onRemove={() => remove(index)}
                  onEdit={() => setHrZoneToEdit(index)}
                />
              ))}
            </tbody>
          </table>
        </div>
        <EditHrZone onClose={() => setHrZoneToEdit(NaN)} index={hrZoneToEdit} />
      </Form>
    </Container>
  );
};
