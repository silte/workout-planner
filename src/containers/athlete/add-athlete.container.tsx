'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { useAthletes } from '$hooks/useAthletes';
import { Container } from '$layouts/container/container';
import {
  AthleteForm,
  AthleteFormValues,
} from '$pages/athlete-form/athlete-form';
import { ATHLETE_FILENAME_EXTENSION } from '$utils/file-helper';
import { useHandleFileUpload } from '$utils/file-helper';

export const AddAthleteContainer = () => {
  const { uploadedData, handleFileChange, filename } = useHandleFileUpload();

  const { push } = useRouter();

  const [, setAthlete] = useAthletes();

  const onSave = useCallback(
    (values: AthleteFormValues) => {
      const formattedValues = {
        ...values,
        hrZones: values.hrZones.map((hrZone, index) => ({
          ...hrZone,
          index,
        })),
      };

      setAthlete((prev) => [...prev, formattedValues]);
      push('/harjoitukset/urheilijat');
    },
    [push, setAthlete],
  );

  const initialValues = useMemo<AthleteFormValues>(
    () =>
      uploadedData ?? {
        id: crypto.randomUUID(),
        name: '',
        hrZones: [],
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
            accept={ATHLETE_FILENAME_EXTENSION}
          />
        </label>
        <span className="ml-2">{filename || 'Ei tiedostoa valittuna'}</span>
      </Container>

      <AthleteForm
        key={JSON.stringify(initialValues)}
        initialValues={initialValues}
        onSave={onSave}
        title="Lisää urheilija"
        submitLabel="Tallenna"
      />
    </div>
  );
};
