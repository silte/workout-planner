import clsx from 'clsx';
import Link from 'next/link';

import { useIsActiveLink } from '../../../hooks/useIsActiveLink';
import { IconName, Icon } from '../../elements/icon/icon';

interface MobileNavigationItemProps {
  url: string;
  iconName: IconName;
  label: string;
  onClick?(): void;
  ariaLabel?: string;
  isExact?: boolean;
  disallowedPathEndings?: string[];
}

export const MobileNavigationItem = ({
  url,
  iconName,
  label,
  onClick = () => {},
  ariaLabel,
  isExact,
  disallowedPathEndings,
}: MobileNavigationItemProps): JSX.Element => {
  const isActive = useIsActiveLink({ url, isExact, disallowedPathEndings });

  return (
    <li>
      <Link
        href={url}
        className={`flex flex-col items-center justify-center focus:text-charcoal hover:text-charcoal h-14`}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        <Icon type={iconName} isSolid={isActive} />
        <span className={clsx('sr-only')}>{label}</span>
      </Link>
    </li>
  );
};
