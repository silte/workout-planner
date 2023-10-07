import { usePageInfoContext } from '$containers/page-info.context';
import { Heading } from '$elements/heading/heading';
import { Icon, IconName } from '$elements/icon/icon';
import { LinkViewTransition } from '$elements/link/link-view-transition';

export const DesktopHeader = (): JSX.Element => {
  const [{ title, backLink, headerAction }] = usePageInfoContext();

  return (
    <>
      <div className="flex items-center gap-4 mb-6 vt-name-[desktop-header]">
        {backLink && (
          <LinkViewTransition
            href={backLink}
            className="inline-flex items-center justify-center text-gray-600 border border-gray-200 rounded-full h-11 w-11 bg-gray-50 hover:bg-gray-200"
            data-testid="header-back-link"
            transition="close-to-right"
          >
            <span className="sr-only">Takaisin</span>
            <Icon type={IconName.chevronLeft} />
          </LinkViewTransition>
        )}
        <Heading variant="h1" testId="page-main-heading">
          {title ?? '-'}
        </Heading>
        {headerAction && <div className="ml-auto">{headerAction}</div>}
      </div>
    </>
  );
};
