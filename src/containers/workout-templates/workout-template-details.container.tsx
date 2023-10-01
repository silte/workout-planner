'use client';

import clsx from 'clsx';
import { notFound } from 'next/navigation';
import { useState } from 'react';

import { DialogConfirm } from '$elements/dialog/confirm/dialog.confirm';
import { Dialog } from '$elements/dialog/dialog';
import { Heading } from '$elements/heading/heading';
import { IconName } from '$elements/icon/icon';
import { InfoCard } from '$elements/info-card/info-card';
import { LinkList } from '$elements/link-list/link-list';
import { LinkListButton } from '$elements/link-list/link-list.button';
import { LinkListLink } from '$elements/link-list/link-list.link';
import {
  useDeleteWorkoutTemplate,
  useWorkoutTemplate,
} from '$hooks/useWorkoutTemplates';
import { Container } from '$layouts/container/container';
import { WorkoutDetailsIntervalListRow } from '$pages/workout-details/workout-details.interval-list-row';
import { calculateIntervalsTotalSummary } from '$utils/interval-helper';

interface IAccountDeleteModalProps {
  onDelete: () => void;
}

export const WorkoutTemplateDeleteModal = ({
  onDelete,
}: IAccountDeleteModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <LinkListButton
        icon={IconName.trash}
        handleClick={handleToggleOpen}
        testId="delete-workout-template"
      >
        Poista
      </LinkListButton>
      <Dialog isDialogOpen={isOpen} setIsDialogOpen={setIsOpen}>
        <DialogConfirm
          onConfirm={onDelete}
          onCancel={handleToggleOpen}
          label="Poista suunniteltu harjoitus"
          submitButtonLabel="Poista"
          iconName={IconName.exclamation}
          testId="delete-workout-template-confirm"
        >
          Haluatko varmasti poistaa suunnitellun harjoituksen? Tätä ei voi
          peruuttaa.
        </DialogConfirm>
      </Dialog>
    </>
  );
};

type WorkoutTemplateDetailsContainerProps = {
  id: string;
};

export const WorkoutTemplateDetailsContainer = ({
  id,
}: WorkoutTemplateDetailsContainerProps) => {
  const template = useWorkoutTemplate(id);

  const handleDelete = useDeleteWorkoutTemplate();

  if (!template) {
    notFound();
  }

  const overallSummary = calculateIntervalsTotalSummary(template.intervals);

  return (
    <Container>
      <Heading variant="h1" className="mb-12">
        {template.name}
      </Heading>
      <section className={'mb-6 grid md:grid-cols-2 gap-4 md:gap-6'}>
        <section className={clsx('grid gap-2')}>
          <InfoCard label="Kesto" testId="workout-template-duration" isLarge>
            {overallSummary.formatted.duration}
          </InfoCard>
          <InfoCard label="Matka" testId="workout-template-distance" isSmall>
            {overallSummary.formatted.distance}
          </InfoCard>
          <InfoCard label="Nousu" testId="workout-template-ascent" isSmall>
            {overallSummary.formatted.ascent}
          </InfoCard>
        </section>
        <LinkList isVertical>
          <LinkListLink
            link={`#/harjoitukset/suunnitelmat/${id}/muokkaa`}
            testId="edit-workout-template"
            icon={IconName.cog}
          >
            Muokkaa
          </LinkListLink>
          <WorkoutTemplateDeleteModal onDelete={() => handleDelete(id)} />
        </LinkList>
      </section>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Nimi</th>
            <th>Kesto</th>
            <th>Matka</th>
            <th>Nousu</th>
            <th>Kulma (astetta)</th>
            <th>Nopeus (km/h)</th>
          </tr>
        </thead>
        <tbody>
          {template.intervals.map((interval) => (
            <WorkoutDetailsIntervalListRow key={interval.id} {...interval} />
          ))}
        </tbody>
      </table>
    </Container>
  );
};
