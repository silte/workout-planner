'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { useWorkoutTemplates } from '$hooks/useWorkoutTemplates';
import { Container } from '$layouts/container/container';
import {
  WorkoutTemplateForm,
  WorkoutTemplateFormValues,
} from '$pages/workout-template-form/workout-template-form';
import { AngleUnit, SpeedUnit } from '$types/workout';
import { TEMPLATE_FILENAME_EXTENSION } from '$utils/file-helper';
import { useHandleFileUpload } from '$utils/file-helper';

export const AddWorkoutContainer = () => {
  const { uploadedData, handleFileChange, filename } = useHandleFileUpload();

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
      push('/suunnitelmat');
    },
    [push, setWorkoutTemplates],
  );

  const initialValues = useMemo<WorkoutTemplateFormValues>(
    () =>
      uploadedData ?? {
        id: crypto.randomUUID(),
        name: '',
        intervals: [],
        speedUnit: SpeedUnit.KMH,
        angleUnit: AngleUnit.DEGREES,
      },
    [uploadedData],
  );

  return (
    <div className="flex flex-col gap-6 my-2">
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
            accept={TEMPLATE_FILENAME_EXTENSION}
          />
        </label>
        <span className="ml-2">{filename || 'Ei tiedostoa valittuna'}</span>
      </Container>

      <WorkoutTemplateForm
        key={JSON.stringify(initialValues)}
        initialValues={initialValues}
        onSave={onSave}
        title="Lisää suunniteltu harjoitus"
        submitLabel="Tallenna"
      />
    </div>
  );
};
