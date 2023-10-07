'use client';

import { IconName } from '$elements/icon/icon';
import { LinkList } from '$elements/link-list/link-list';
import { LinkListLink } from '$elements/link-list/link-list.link';
import { UpdatePageInfo } from 'src/components/renderers/update-page-info';

export default function Home() {
  return (
    <div>
      <UpdatePageInfo title="Etusivu" />
      <LinkList>
        <LinkListLink icon={IconName.chartBar} link="/harjoitukset">
          Harjoitukset
        </LinkListLink>
        <LinkListLink icon={IconName.viewGrid} link="/suunnitelmat">
          Suunnitellut harjoitukset
        </LinkListLink>
        <LinkListLink icon={IconName.userCircle} link="/urheilijat">
          Urheilijat
        </LinkListLink>
        <LinkListLink icon={IconName.cog} link="/muuntimet">
          Muuntimet
        </LinkListLink>
      </LinkList>
    </div>
  );
}
