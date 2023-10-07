import { LinkViewTransition } from '$elements/link/link-view-transition';

interface ButtonInternalProps {
  children: React.ReactNode;
  className: string;
  link: string;
  onClick?(): void;
  testId?: string;
}

export const ButtonInternal = ({
  children,
  className,
  link,
  onClick,
  testId,
}: ButtonInternalProps): JSX.Element => {
  return (
    <LinkViewTransition
      href={link}
      className={className}
      onClick={onClick}
      data-testid={testId}
    >
      {children}
    </LinkViewTransition>
  );
};
