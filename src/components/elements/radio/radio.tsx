import clsx from 'clsx';

interface RadioProps {
  children: string;
  className?: string;
  value: string;
  name: string;
  isChecked?: boolean;
}

export const Radio = ({
  children,
  className = '',
  name,
  value,
  isChecked,
}: RadioProps): JSX.Element => {
  return (
    <label
      className={clsx(
        'flex items-center p-4 gap-4 rounded-md hover:bg-gray-200 focus-within:bg-gray-200 hover:cursor-pointer',
        { [className]: true },
      )}
      htmlFor={`${name}-${value}`}
    >
      <div className="flex items-center h-5">
        <input
          id={`${name}-${value}`}
          name={name}
          type="radio"
          value={value}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-200 focus:ring-blue-600 focus:ring-2"
          defaultChecked={isChecked}
        />
      </div>
      <span className="text-base font-medium tracking-tight text-gray-800">
        {children}
      </span>
    </label>
  );
};
