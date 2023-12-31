import clsx from 'clsx';

import { ButtonExternal } from './button.external';
import { ButtonInternal } from './button.internal';
import { ButtonPlain } from './button.plain';

export type ButtonAccentColor = 'blue' | 'plain' | 'black';
interface ButtonProps {
  accentColor?: ButtonAccentColor;
  children: React.ReactNode;
  className?: string;
  link?: string;
  onClick?(): void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  testId?: string;
  isDisabled?: boolean;
}

export const isExternalLink = (link: string): boolean =>
  link.substring(0, 8) === 'https://' ||
  link.substring(0, 7) === 'http://' ||
  link.substring(0, 2) === '//' ||
  link.substring(0, 5) === 'blob:' ||
  link.substring(0, 5) === '/api/' ||
  link.substring(0, 6) === '/auth/';

export const Button = ({
  accentColor = 'black',
  children,
  className = '',
  link,
  onClick = () => {},
  type = 'button',
  testId,
  isDisabled,
}: ButtonProps): JSX.Element => {
  const buttonClasses = clsx(
    'inline-flex justify-center w-full sm:w-auto rounded-md items-center py-3 px-6 focus:ring-2 focus:ring-offset-2 focus:outline-none transition ease-in-out duration-150 tracking-tight font-medium text-base hover:opacity-75 focus:opacity-75',
    {
      ['bg-gray-800 text-white focus:ring-gray-800']: accentColor === 'black',
      ['bg-blue-600 text-white focus:ring-blue-600']: accentColor === 'blue',
      ['bg-gray-100 text-black focus:ring-gray-800 hover:bg-gray-200 border border-gray-200 focus:opacity-100 hover:opacity-100']:
        accentColor === 'plain',
      [className]: true,
    },
  );

  if (typeof link === 'string' && link.length > 0 && !isDisabled) {
    if (isExternalLink(link)) {
      return (
        <ButtonExternal
          link={link}
          className={buttonClasses}
          onClick={onClick}
          testId={testId}
        >
          {children}
        </ButtonExternal>
      );
    }

    return (
      <ButtonInternal
        link={link}
        className={buttonClasses}
        onClick={onClick}
        testId={testId}
      >
        {children}
      </ButtonInternal>
    );
  }

  return (
    <ButtonPlain
      type={type}
      onClick={onClick}
      className={buttonClasses}
      testId={testId}
      isDisabled={isDisabled}
    >
      {children}
    </ButtonPlain>
  );
};
