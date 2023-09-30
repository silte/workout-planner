'use client';

import { Heading } from '$elements/heading/heading';
import { LinkList } from '$elements/link-list/link-list';
import { LinkListLink } from '$elements/link-list/link-list.link';
import { useWorkoutTemplates } from '$hooks/useWorkoutTemplates';
import { Container } from '$layouts/container/container';

export const ListWorkoutTemplatesContainer = () => {
  const [workoutTemplates] = useWorkoutTemplates();

  return (
    <Container>
      <Heading variant="h1">Harjoitukset</Heading>
      <LinkList>
        <LinkListLink link="/harjoitukset/lisaa">
          Lisää suunniteltu harjoitus
        </LinkListLink>
      </LinkList>
      <ul>
        {workoutTemplates.map((workoutTemplate) => (
          <li key={workoutTemplate.id}>{workoutTemplate.name}</li>
        ))}
      </ul>
    </Container>
  );
};
