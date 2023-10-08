'use client';

import { LinkList } from '$elements/link-list/link-list';
import { LinkListLink } from '$elements/link-list/link-list.link';
import { useWorkouts } from '$hooks/useWorkouts';
import { Container } from '$layouts/container/container';
import { calculateIntervalsTotalSummary } from '$utils/interval-helper';
import { UpdatePageInfo } from 'src/components/renderers/update-page-info';

export const ListWorkoutsContainer = () => {
  const [workouts] = useWorkouts();

  return (
    <Container>
      <UpdatePageInfo title="Harjoitukset" />
      <LinkList>
        <LinkListLink link="/harjoitukset/lisaa">Lisää harjoitus</LinkListLink>
      </LinkList>
      <LinkList
        label={'Tallennetut harjoitukset'}
        className={`mt-12`}
        testId="workout-template-list"
      >
        {workouts.map(({ id, name, intervals }) => {
          const summary = calculateIntervalsTotalSummary(intervals ?? []);

          const informations = [
            `Kesto: ${summary.formatted.duration}`,
            `Matka: ${summary.formatted.distance}`,
            `Nousu: ${summary.formatted.ascent}`,
          ];

          return (
            <LinkListLink
              link={`/harjoitukset/${id}`}
              testId="workout-template-row"
              key={id}
            >
              <span className="grid">
                <span className="text-black truncate">{name}</span>
                <div className="flex flex-wrap gap-4">
                  {informations.map((info) => (
                    <span
                      key={info}
                      className="text-sm font-normal tracking-tight text-gray-600 trunc "
                    >
                      {info}
                    </span>
                  ))}
                </div>
              </span>
            </LinkListLink>
          );
        })}
      </LinkList>
    </Container>
  );
};
