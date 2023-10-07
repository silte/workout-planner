'use client';

import { Heading } from '$elements/heading/heading';
import { Container } from '$layouts/container/container';
import { UpdatePageInfo } from 'src/components/renderers/update-page-info';

export const ListWorkoutsContainer = () => {
  return (
    <Container>
      <UpdatePageInfo title="Harjoitukset" />
      <Heading variant={'h1'}>Tulossa</Heading>
    </Container>
  );
};
