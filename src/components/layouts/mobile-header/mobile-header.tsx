import { clsx } from 'clsx';
import Link from 'next/link';

import { usePageInfoContext } from '../../../context/pageInfoContext';
import { Heading } from '../../elements/heading/heading';
import { Icon, IconName } from '../../elements/icon/icon';

export const MobileHeader = (): JSX.Element => {
  const [{ title, backLink, headerAction, toolbarColor }] =
    usePageInfoContext();

  const hasBackLinkAndOrAction = !!backLink || !!headerAction;

  return (
    <div
      className={clsx(
        'text-center fixed top-0 left-0 right-0 px-4 grid items-center h-16 border-b grid-cols-[44px,1fr,44px]',
        {
          ['border-b-transparent']: !hasBackLinkAndOrAction,
          ['border-b-gray-dark']: hasBackLinkAndOrAction,
          ['bg-white']: !toolbarColor || toolbarColor === 'white',
          ['bg-neutral-900']: toolbarColor === 'black',
        }
      )}
    >
      {backLink && (
        <Link
          href={backLink}
          className="inline-flex items-center justify-center h-11 w-11 -translate-x-1/4"
          data-testid="header-back-link"
        >
          <span className="sr-only">Go back</span>
          <Icon type={IconName.arrowLeft} />
        </Link>
      )}
      <Heading
        variant="h1"
        className="justify-center col-[2]"
        titleClassName={clsx('truncate', {
          ['text-white']: toolbarColor === 'black',
        })}
        testId="page-main-heading"
      >
        {title ?? '-'}
      </Heading>
      {headerAction && (
        <div className="inline-flex items-center justify-center h-11 w-11 translate-x-1/4 col-[3]">
          {headerAction}
        </div>
      )}
    </div>
  );
};
