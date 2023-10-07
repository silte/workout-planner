import clsx from 'clsx';
import Link from 'next/link';

import { isExternalLink } from '$elements/button/button';
import { Icon, IconName } from '$elements/icon/icon';
import { useIsActiveLink } from '$hooks/useIsActiveLink';

interface IDesktopNavigationItemProps {
  link: string;
  iconName: IconName;
  label: string;
  onClick?(): void;
  ariaLabel?: string;
  isExact?: boolean;
  disallowedPathEndings?: string[];
}

export const DesktopNavigationItem = ({
  link,
  iconName,
  label,
  onClick = () => {},
  ariaLabel,
  isExact = false,
  disallowedPathEndings = [],
}: IDesktopNavigationItemProps): JSX.Element => {
  const isActive = useIsActiveLink({ link, isExact, disallowedPathEndings });

  const linkClasses = clsx(
    'flex items-center p-4 hover:bg-gray-200 rounded-md tracking-tight font-medium',
    {
      ['bg-gray-200']: isActive,
    },
  );

  const linkContent = (
    <>
      <Icon type={iconName} isSolid={isActive} />
      <span className={clsx('ml-4 text-base')}>{label}</span>
    </>
  );

  if (isExternalLink(link)) {
    return (
      <li>
        <a href={link} className={linkClasses} aria-label={ariaLabel}>
          {linkContent}
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={link}
        className={linkClasses}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {linkContent}
      </Link>
    </li>
  );
};
