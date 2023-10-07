'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { Input } from '$elements/input/input';
import { Container } from '$layouts/container/container';
import {
  convertDegreesToPercent,
  convertPercentToDegrees,
} from '$utils/angle-helper';
import { UpdatePageInfo } from 'src/components/renderers/update-page-info';

type AngleConverterValues = {
  degrees: number;
  percent: number;
};

export const AngleConverter = () => {
  const methods = useForm<AngleConverterValues>({
    defaultValues: {
      degrees: 0,
      percent: 0,
    },
  });

  const percentInDegrees = convertPercentToDegrees(methods.watch('percent'));
  const degreesInPercents = convertDegreesToPercent(methods.watch('degrees'));

  return (
    <Container className="flex flex-col items-center gap-4">
      <UpdatePageInfo title="Kulma muunnin" backLink="/muuntimet" />
      <FormProvider {...methods}>
        <div>
          <Input id="degrees" type="number">
            Astetta
          </Input>
          <p>prosenttia: {degreesInPercents.toFixed(2)}</p>
        </div>
        <div>
          <Input id="percent" type="number">
            Prosenttia
          </Input>
          <p>astetta: {percentInDegrees.toFixed(2)}</p>
        </div>
      </FormProvider>
    </Container>
  );
};
