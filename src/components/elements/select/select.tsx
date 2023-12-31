import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

interface SelectProps {
  children: React.ReactNode;
  help?: string;
  id: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  options: Option[];
  defaultValue?: string;
  className?: string;
  handleOnChange?(event: React.ChangeEvent<HTMLSelectElement>): void;
  testId?: string;
}

export interface Option {
  value: string;
  label: string;
}

export const Select = ({
  children,
  help = '',
  id,
  isRequired = false,
  options,
  className = '',
  testId,
  isDisabled = false,
  handleOnChange = () => {},
}: SelectProps): JSX.Element => {
  const { register } = useFormContext();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (!handleOnChange) return null;

    handleOnChange(event);
  };

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-xs font-medium leading-5 tracking-tight uppercase text-gray-600"
      >
        {children}
        <select
          data-testid={testId}
          id={id}
          className="block w-full py-3 pl-3 pr-10 mt-1 text-base font-normal tracking-tight rounded-md bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-800 focus:outline-none focus:ring-black focus:border-black hover:cursor-pointer"
          required={isRequired}
          aria-describedby={help && `${id}-description`}
          disabled={isDisabled}
          {...register(id, {
            disabled: isDisabled,
            onChange: handleChange,
            required: isRequired,
          })}
        >
          {options.map(({ value, label }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
      {help && (
        <p className="mt-2 text-sm text-gray-800" id={`${id}-description`}>
          {help}
        </p>
      )}
    </div>
  );
};
