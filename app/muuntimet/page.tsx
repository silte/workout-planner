'use client';

import Link from 'next/link';

import { UpdatePageInfo } from 'src/components/renderers/update-page-info';

export default function Converters() {
  return (
    <div>
      <UpdatePageInfo title="Muuntimet" />
      <Link href="/muuntimet/kulma">Kulma muunnin</Link>
      <Link href="/muuntimet/nopeus">Nopeus muunnin</Link>
    </div>
  );
}
