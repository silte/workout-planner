'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { useAthletes } from '$hooks/useAthletes';
import { useWorkouts } from '$hooks/useWorkouts';
import { Container } from '$layouts/container/container';
import {
  WorkoutForm,
  WorkoutFormValues,
} from '$pages/workout-form/workout-form';
import { AngleUnit, SpeedUnit } from '$types/workout-template';
import { WORKOUT_FILENAME_EXTENSION } from '$utils/file-helper';
import { useHandleFileUpload } from '$utils/file-helper';
import { UpdatePageInfo } from 'src/components/renderers/update-page-info';

export const AddWorkoutContainer = () => {
  const { uploadedData, handleFileChange, filename } = useHandleFileUpload();

  const { push } = useRouter();

  const [, setWorkouts] = useWorkouts();
  const [athletes] = useAthletes();

  const onSave = useCallback(
    (values: WorkoutFormValues) => {
      const formattedValues = {
        ...values,
        intervals: values.intervals.map((interval, index) => ({
          ...interval,
          index,
        })),
      };

      setWorkouts((prev) => [...prev, formattedValues]);
      push('/suunnitelmat');
    },
    [push, setWorkouts],
  );

  const initialValues = useMemo<WorkoutFormValues>(
    () =>
      uploadedData ?? {
        id: crypto.randomUUID(),
        date: new Date(),
        name: '',
        athlete: '',
        intervals: [],
        speedUnit: SpeedUnit.KMH,
        angleUnit: AngleUnit.DEGREES,
      },
    [uploadedData],
  );

  return (
    <div className="flex flex-col gap-6 my-2">
      <UpdatePageInfo title="Lisää harjoitus" backLink="/harjoitukset" />
      <Container className="w-full">
        <label
          htmlFor="selectFiles"
          className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium tracking-tight text-white transition duration-150 ease-in-out bg-gray-800 rounded-md cursor-pointer sm:w-auto focus:ring-2 focus:ring-offset-2 focus:outline-none hover:opacity-75 focus:opacity-75 focus:ring-gray-800"
        >
          Tuo tiedostosta
          <input
            className="hidden"
            type="file"
            id="selectFiles"
            onChange={handleFileChange}
            accept={WORKOUT_FILENAME_EXTENSION}
          />
        </label>
        <span className="ml-2">{filename || 'Ei tiedostoa valittuna'}</span>
      </Container>

      <WorkoutForm
        key={JSON.stringify(initialValues)}
        initialValues={initialValues}
        athletes={athletes}
        onSave={onSave}
        submitLabel="Tallenna"
      />
    </div>
  );
};
