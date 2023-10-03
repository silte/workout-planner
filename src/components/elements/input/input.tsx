import clsx from 'clsx';
import React, { ChangeEvent, useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { AngleUnit, SpeedUnit } from '$types/workout';
import {
  convertDegreesToPercent,
  convertPercentToDegrees,
} from '$utils/angle-helper';
import { convertKmhToMinkm, convertMinkmToKmh } from '$utils/speed-helper';
import { secondsToTime, timeToSeconds } from '$utils/time-helper';

interface BaseInputProps {
  children: React.ReactNode;
  help?: string;
  id: string;
  unit?: string;
  type?: 'text' | 'number' | 'time';
  step?: number;
  testId?: string;
}

type InternalInputProps = BaseInputProps &
  React.InputHTMLAttributes<HTMLInputElement>;

export const InternalInput = React.forwardRef<
  HTMLInputElement,
  InternalInputProps
>(function InternalInput(
  { children, help = '', id, unit, testId, ...props },
  ref,
) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-medium leading-5 tracking-tight text-gray-600 uppercase"
      >
        {children}
      </label>
      <div className="relative mt-1 rounded-md">
        {!!unit && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-right pointer-events-none">
            <span className="text-gray-800">{unit}</span>
          </div>
        )}
        <input
          ref={ref}
          id={id}
          data-testid={testId}
          {...props}
          className={clsx(
            'appearance-none block w-full px-3 py-3 border border-gray-200 bg-gray-100 rounded-md focus:outline-none focus:ring-black focus:border-black text-gray-800 tracking-tight',
            props.className,
            {
              ['pl-7']: unit && unit.length < 2,
              ['pl-[4.5rem]']: unit && unit.length >= 2,
            },
          )}
        />
      </div>
      {help && (
        <p className="mt-2 text-sm text-gray-800" id={`${id}-description`}>
          {help}
        </p>
      )}
    </div>
  );
});

interface InputProps extends BaseInputProps {
  isRequired?: boolean;
  min?: number;
  max?: number;
  testId?: string;
}

export const Input = ({
  id,
  isRequired = false,
  type = 'text',
  min,
  max,
  ...props
}: InputProps): JSX.Element => {
  const { register } = useFormContext();

  const getValueParsingOptions = useCallback(() => {
    if (type === 'number') return { valueAsNumber: true };

    return {};
  }, [type]);

  return (
    <InternalInput
      id={id}
      type={type}
      {...props}
      {...register(id, {
        min,
        max,
        required: isRequired,
        ...getValueParsingOptions(),
      })}
    />
  );
};

type TimeInputProps = Omit<BaseInputProps, 'type'> & {
  isRequired?: boolean;
};

export const TimeInput = ({ id, isRequired, ...props }: TimeInputProps) => {
  const { field } = useController({
    name: id,
    rules: { required: isRequired },
  });

  return (
    <InternalInput
      id={id}
      type={'time'}
      {...props}
      {...field}
      value={secondsToTime(field.value)}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        field.onChange(timeToSeconds(event.target.value));
        field.onBlur();
      }}
    />
  );
};

type AngleInputProps = Omit<BaseInputProps, 'type' | 'min'> & {
  unit?: AngleUnit;
  isRequired?: boolean;
};

export const AngleInput = ({
  unit = AngleUnit.DEGREES,
  id,
  isRequired,
  ...props
}: AngleInputProps) => {
  const { field } = useController({
    name: id,
    rules: { required: isRequired, min: 0 },
  });

  return (
    <InternalInput
      id={id}
      type={'number'}
      {...props}
      {...field}
      unit={unit}
      value={
        unit === AngleUnit.DEGREES
          ? field.value
          : convertDegreesToPercent(field.value)
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        field.onChange(
          unit === AngleUnit.DEGREES
            ? event.target.value
            : convertPercentToDegrees(parseInt(event.target.value)),
        );
        field.onBlur();
      }}
    />
  );
};

type SpeedInputProps = Omit<BaseInputProps, 'type' | 'min'> & {
  unit?: SpeedUnit;
  isRequired?: boolean;
};

export const SpeedInput = ({
  unit = SpeedUnit.KMH,
  id,
  isRequired,
  ...props
}: SpeedInputProps) => {
  const { field } = useController({
    name: id,
    rules: { required: isRequired, min: 0 },
  });

  return (
    <InternalInput
      id={id}
      type={'number'}
      {...props}
      {...field}
      unit={unit}
      value={
        unit === SpeedUnit.KMH ? field.value : convertKmhToMinkm(field.value)
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        field.onChange(
          unit === SpeedUnit.KMH
            ? event.target.value
            : convertMinkmToKmh(parseInt(event.target.value)),
        );
        field.onBlur();
      }}
    />
  );
};
