'use client';

import { LinkList } from '$elements/link-list/link-list';
import { LinkListLink } from '$elements/link-list/link-list.link';
import { UpdatePageInfo } from 'src/components/renderers/update-page-info';

export default function Converters() {
  return (
    <div>
      <UpdatePageInfo title="Muuntimet" />
      <LinkList>
        <LinkListLink link="/muuntimet/kulma">Kulma muunnin</LinkListLink>
        <LinkListLink link="/muuntimet/nopeus">Nopeus muunnin</LinkListLink>
      </LinkList>
    </div>
  );
}
