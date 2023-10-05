'use client';

import { Heading } from '$elements/heading/heading';
import { LinkList } from '$elements/link-list/link-list';
import { LinkListLink } from '$elements/link-list/link-list.link';
import { useAthletes } from '$hooks/useAthletes';
import { Container } from '$layouts/container/container';

export const ListAthletesContainer = () => {
  const [athletes] = useAthletes();

  return (
    <Container>
      <Heading variant="h1">Urheilijat</Heading>
      <LinkList>
        <LinkListLink link="/harjoitukset/urheilijat/lisaa">
          Lisää urheilija
        </LinkListLink>
      </LinkList>
      <LinkList label={'Urheilijat'} className={`mt-12`} testId="athele-list">
        {athletes.map(({ id, name }) => {
          return (
            <LinkListLink
              link={`/harjoitukset/urheilijat/${id}`}
              testId="athele-row"
              key={id}
            >
              <span className="grid">
                <span className="text-black truncate">{name}</span>
              </span>
            </LinkListLink>
          );
        })}
      </LinkList>
    </Container>
  );
};
