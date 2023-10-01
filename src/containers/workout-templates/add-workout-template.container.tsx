'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { useWorkoutTemplates } from '$hooks/useWorkoutTemplates';
import {
  WorkoutTemplateForm,
  WorkoutTemplateFormValues,
} from '$pages/workout-template-form/workout-template-form';

export const AddWorkoutContainer = () => {
  const { push } = useRouter();

  const [, setWorkoutTemplates] = useWorkoutTemplates();

  const onSave = useCallback(
    (values: WorkoutTemplateFormValues) => {
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

  const initialValues = useMemo<WorkoutTemplateFormValues>(
    () => ({
      id: crypto.randomUUID(),
      name: '',
      intervals: [],
    }),
    [],
  );

  return (
    <WorkoutTemplateForm
      initialValues={initialValues}
      onSave={onSave}
      title="Lisää suunniteltu harjoitus"
      submitLabel="Lisää"
    />
  );
};
