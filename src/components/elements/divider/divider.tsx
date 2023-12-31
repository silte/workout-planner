import clsx from 'clsx';

interface DividerProps {
  children: string;
  className?: string;
}

export const Divider = ({
  children,
  className = '',
}: DividerProps): JSX.Element => {
  return (
    <div
      className={clsx('relative my-2', {
        [className]: true,
      })}
    >
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-200" />
      </div>
      <div className="relative flex justify-center">
        <span className="px-4 text-sm bg-white text-gray-600">{children}</span>
      </div>
    </div>
  );
};
