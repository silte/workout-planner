'use client';

import { LinkList } from '$elements/link-list/link-list';
import { LinkListLink } from '$elements/link-list/link-list.link';
import { useAthletes } from '$hooks/useAthletes';
import { Container } from '$layouts/container/container';
import { UpdatePageInfo } from 'src/components/renderers/update-page-info';

export const ListAthletesContainer = () => {
  const [athletes] = useAthletes();

  return (
    <Container>
      <UpdatePageInfo title="Urheilijat" />
      <LinkList>
        <LinkListLink link="/urheilijat/lisaa">Lisää urheilija</LinkListLink>
      </LinkList>
      <LinkList
        label={'Tallennetut urheilijat'}
        className={`mt-12`}
        testId="athele-list"
      >
        {athletes.map(({ id, name }) => {
          return (
            <LinkListLink
              link={`/urheilijat/${id}`}
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
