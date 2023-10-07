'use client';

import { LinkViewTransition } from '$elements/link/link-view-transition';
import { UpdatePageInfo } from 'src/components/renderers/update-page-info';

export default function Converters() {
  return (
    <div>
      <UpdatePageInfo title="Muuntimet" />
      <LinkViewTransition href="/muuntimet/kulma">
        Kulma muunnin
      </LinkViewTransition>
      <LinkViewTransition href="/muuntimet/nopeus">
        Nopeus muunnin
      </LinkViewTransition>
    </div>
  );
}
