import clsx from 'clsx';

import { Icon, IconName } from '$elements/icon/icon';
import { LinkViewTransition } from '$elements/link/link-view-transition';
import { useIsActiveLink } from '$hooks/useIsActiveLink';

interface MobileNavigationItemProps {
  link: string;
  iconName: IconName;
  label: string;
  onClick?(): void;
  ariaLabel?: string;
  isExact?: boolean;
  disallowedPathEndings?: string[];
}

export const MobileNavigationItem = ({
  link,
  iconName,
  label,
  onClick = () => {},
  ariaLabel,
  isExact,
  disallowedPathEndings,
}: MobileNavigationItemProps): JSX.Element => {
  const isActive = useIsActiveLink({ link, isExact, disallowedPathEndings });

  return (
    <li>
      <LinkViewTransition
        href={link}
        className={`flex flex-col items-center justify-center focus:text-800 hover:text-800 h-14`}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        <Icon type={iconName} isSolid={isActive} />
        <span className={clsx('sr-only')}>{label}</span>
      </LinkViewTransition>
    </li>
  );
};
