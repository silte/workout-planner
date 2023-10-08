'use client';

import { notFound, useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { useAthletes } from '$hooks/useAthletes';
import { useWorkout, useWorkouts } from '$hooks/useWorkouts';
import {
  WorkoutForm,
  WorkoutFormValues,
} from '$pages/workout-form/workout-form';
import { UpdatePageInfo } from 'src/components/renderers/update-page-info';

type EditWorkoutTemplateContainerProps = {
  id: string;
};

export const EditWorkoutContainer = ({
  id,
}: EditWorkoutTemplateContainerProps) => {
  const { push } = useRouter();

  const [, setWorkoutTemplates] = useWorkouts();
  const workout = useWorkout(id);

  const [athletes] = useAthletes();

  if (!workout) {
    notFound();
  }

  const onSave = useCallback(
    (values: WorkoutFormValues) => {
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
      push(`/harjoitukset/${formattedValues.id}`);
    },
    [push, setWorkoutTemplates],
  );

  return (
    <>
      <UpdatePageInfo
        title={`Muokkaa - ${workout.name}`}
        backLink={`/harjoitukset/${workout.id}`}
      />
      <WorkoutForm
        initialValues={workout}
        athletes={athletes}
        onSave={onSave}
        submitLabel="Tallenna"
      />
    </>
  );
};
