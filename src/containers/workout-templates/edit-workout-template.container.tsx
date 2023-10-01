'use client';

import { notFound, useRouter } from 'next/navigation';
import { useCallback } from 'react';

import {
  useWorkoutTemplate,
  useWorkoutTemplates,
} from '$hooks/useWorkoutTemplates';
import {
  WorkoutTemplateForm,
  WorkoutTemplateFormValues,
} from '$pages/workout-template-form/workout-template-form';

type EditWorkoutTemplateContainerProps = {
  id: string;
};

export const EditWorkoutTemplateContainer = ({
  id,
}: EditWorkoutTemplateContainerProps) => {
  const { push } = useRouter();

  const [, setWorkoutTemplates] = useWorkoutTemplates();
  const template = useWorkoutTemplate(id);

  if (!template) {
    notFound();
  }

  const onSave = useCallback(
    (values: WorkoutTemplateFormValues) => {
      const formattedValues = {
        ...values,
        intervals: values.intervals.map((interval, index) => ({
          ...interval,
          index,
        })),
      };

      setWorkoutTemplates((prev) =>
        prev.map((item) =>
          item.id === formattedValues.id ? formattedValues : item,
        ),
      );
      push('/harjoitukset');
    },
    [push, setWorkoutTemplates],
  );

  return (
    <WorkoutTemplateForm
      initialValues={template}
      onSave={onSave}
      title={`Muokkaa suunniteltu harjoitus - ${template.name}`}
      submitLabel="Tallenna"
    />
  );
};
