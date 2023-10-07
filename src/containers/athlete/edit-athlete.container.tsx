'use client';

import { notFound, useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { useAthlete, useAthletes } from '$hooks/useAthletes';
import {
  AthleteForm,
  AthleteFormValues,
} from '$pages/athlete-form/athlete-form';

type EditAthleteContainerProps = {
  id: string;
};

export const EditAthleteContainer = ({ id }: EditAthleteContainerProps) => {
  const { push } = useRouter();

  const [, setAthletes] = useAthletes();
  const athlete = useAthlete(id);

  if (!athlete) {
    notFound();
  }

  const onSave = useCallback(
    (values: AthleteFormValues) => {
      const formattedValues = {
        ...values,
        hrZones: values.hrZones.map((hrZone, index) => ({
          ...hrZone,
          index,
        })),
      };

      setAthletes((prev) =>
        prev.map((item) =>
          item.id === formattedValues.id ? formattedValues : item,
        ),
      );
      push(`/urheilijat/${formattedValues.id}`);
    },
    [push, setAthletes],
  );

  return (
    <AthleteForm
      initialValues={athlete}
      onSave={onSave}
      title={`Muokkaa urheilijaa - ${athlete.name}`}
      submitLabel="Tallenna"
    />
  );
};
