'use client';

import clsx from 'clsx';
import { notFound, useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

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
import { TEMPLATE_FILENAME_EXTENSION } from '$utils/file-helper';
import { calculateIntervalsTotalSummary } from '$utils/interval-helper';
import { getTimeString } from '$utils/time-helper';

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
  const { push } = useRouter();

  const template = useWorkoutTemplate(id);

  const handleDelete = useDeleteWorkoutTemplate();

  if (!template) {
    notFound();
  }

  const onDelete = useCallback(() => {
    handleDelete(id);
    push('/suunnitelmat');
  }, [handleDelete, id, push]);

  const { name, intervals, speedUnit, angleUnit } = template;

  const { formatted } = calculateIntervalsTotalSummary(intervals);

  const dataFile = useMemo(
    () =>
      new File(
        [JSON.stringify(template ?? {})],
        `${name}_${getTimeString()}${TEMPLATE_FILENAME_EXTENSION}`,
        { type: 'text/plain' },
      ),
    [template, name],
  );

  const shareData = useMemo(() => {
    const data = {
      title: name,
      text: 'Suunniteltu harjoitus',
      files: [dataFile],
    };

    console.log(data, navigator.canShare(data));

    if (!navigator.canShare(data)) {
      return undefined;
    }

    return data;
  }, [dataFile, name]);

  return (
    <Container>
      <Heading variant="h1" className="mb-12">
        {name}
      </Heading>
      <section className={'mb-6 grid md:grid-cols-2 gap-4 md:gap-6'}>
        <section className={clsx('grid gap-2')}>
          <InfoCard label="Kesto" testId="workout-template-duration" isLarge>
            {formatted.duration}
          </InfoCard>
          <InfoCard label="Matka" testId="workout-template-distance" isSmall>
            {formatted.distance}
          </InfoCard>
          <InfoCard label="Nousu" testId="workout-template-ascent" isSmall>
            {formatted.ascent}
          </InfoCard>
        </section>
        <LinkList isVertical>
          <LinkListLink
            link={`/suunnitelmat/${id}/muokkaa`}
            testId="edit-workout-template"
            icon={IconName.cog}
          >
            Muokkaa
          </LinkListLink>
          <WorkoutTemplateDeleteModal onDelete={onDelete} />
          <LinkListLink
            icon={IconName.download}
            download={dataFile.name}
            link={window.URL.createObjectURL(dataFile)}
            testId="download-workout-template"
          >
            Lataa
          </LinkListLink>
          {shareData && false && (
            <LinkListButton
              handleClick={() => navigator.share(shareData)}
              icon={IconName.switchHorizontal}
            >
              Jaa
            </LinkListButton>
          )}
        </LinkList>
      </section>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Nimi</th>
            <th>Kesto</th>
            <th>Matka</th>
            <th>Nousu</th>
            <th>Kulma ({angleUnit})</th>
            <th>Nopeus ({speedUnit})</th>
          </tr>
        </thead>
        <tbody>
          {template.intervals.map((interval) => (
            <WorkoutDetailsIntervalListRow
              key={interval.id}
              {...interval}
              speedUnit={speedUnit}
              angleUnit={angleUnit}
            />
          ))}
        </tbody>
      </table>
    </Container>
  );
};
