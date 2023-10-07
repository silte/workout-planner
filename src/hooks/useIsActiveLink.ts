import { usePathname } from 'next/navigation';

type UseIsActiveLinkProps = {
  link: string;
  isExact?: boolean;
  disallowedPathEndings?: string[];
};

export const useIsActiveLink = ({
  link,
  isExact = false,
  disallowedPathEndings = [],
}: UseIsActiveLinkProps) => {
  const pathname = usePathname();
  const match = isExact ? pathname === link : pathname.startsWith(link);

  return (
    match && !disallowedPathEndings.some((part) => pathname.endsWith(part))
  );
};
