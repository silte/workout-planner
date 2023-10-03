'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { Heading } from '$elements/heading/heading';
import { Input } from '$elements/input/input';
import { Container } from '$layouts/container/container';
import { convertKmhToMinkm, convertMinkmToKmh } from '$utils/speed-helper';

type SpeedConverterValues = {
  kmh: number;
  minkm: number;
};

export const SpeedConverter = () => {
  const methods = useForm<SpeedConverterValues>({
    defaultValues: {
      kmh: 0,
      minkm: 0,
    },
  });

  const kmhInMinkm = convertKmhToMinkm(methods.watch('kmh'));
  const minkmInKmh = convertMinkmToKmh(methods.watch('minkm'));

  return (
    <Container className="flex flex-col items-center gap-4">
      <Heading variant="h1">Nopeus muunnin</Heading>
      <FormProvider {...methods}>
        <div>
          <Input id="kmh" type="number">
            km/h
          </Input>
          <p>min/km: {kmhInMinkm.toFixed(2)}</p>
        </div>
        <div>
          <Input id="minkm" type="number">
            min/km
          </Input>
          <p>km/h: {minkmInKmh.toFixed(2)}</p>
        </div>
      </FormProvider>
    </Container>
  );
};