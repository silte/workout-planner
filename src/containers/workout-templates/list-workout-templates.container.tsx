'use client';

import { Heading } from '$elements/heading/heading';
import { LinkList } from '$elements/link-list/link-list';
import { LinkListLink } from '$elements/link-list/link-list.link';
import { useWorkoutTemplates } from '$hooks/useWorkoutTemplates';
import { Container } from '$layouts/container/container';
import { calculateIntervalsTotalSummary } from '$utils/interval-helper';

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
      <LinkList
        label={'Suunnitellut harjoitukset'}
        className={`mt-12`}
        testId="workout-template-list"
      >
        {workoutTemplates.map(({ id, name, intervals }) => {
          const summary = calculateIntervalsTotalSummary(intervals ?? []);

          const informations = [
            `Kesto: ${summary.formatted.duration}`,
            `Matka: ${summary.formatted.distance}`,
            `Nousu: ${summary.formatted.ascent}`,
          ];

          return (
            <LinkListLink
              link={`/harjoitukset/suunnitelmat/${id}`}
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
