import clsx from 'clsx';
import React, { ChangeEvent, useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { secondsToTime, timeToSeconds } from '$utils/time-helper';

interface BaseInputProps {
  children: React.ReactNode;
  help?: string;
  id: string;
  isCurrency?: boolean;
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
  { children, help = '', id, isCurrency = false, testId, ...props },
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
        {isCurrency && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-800">€</span>
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
            { ['pl-7']: isCurrency },
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
