'use client';

import clsx from 'clsx';
import { notFound, useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

import { DialogConfirm } from '$elements/dialog/confirm/dialog.confirm';
import { Dialog } from '$elements/dialog/dialog';
import { IconName } from '$elements/icon/icon';
import { InfoCard } from '$elements/info-card/info-card';
import { LinkList } from '$elements/link-list/link-list';
import { LinkListButton } from '$elements/link-list/link-list.button';
import { LinkListLink } from '$elements/link-list/link-list.link';
import { useAthlete } from '$hooks/useAthletes';
import { useDeleteWorkout, useWorkout } from '$hooks/useWorkouts';
import { Container } from '$layouts/container/container';
import { WorkoutDetailsIntervalListRow } from '$pages/workout-details/workout-details.interval-list-row';
import { WORKOUT_FILENAME_EXTENSION } from '$utils/file-helper';
import { calculateIntervalsTotalSummary } from '$utils/interval-helper';
import { formatDate, getTimeString } from '$utils/time-helper';
import { UpdatePageInfo } from 'src/components/renderers/update-page-info';

interface IAccountDeleteModalProps {
  onDelete: () => void;
}

export const WorkoutDeleteModal = ({ onDelete }: IAccountDeleteModalProps) => {
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
          label="Poista harjoitus"
          submitButtonLabel="Poista"
          iconName={IconName.exclamation}
          testId="delete-workout-template-confirm"
        >
          Haluatko varmasti poistaa harjoituksen? Tätä ei voi peruuttaa.
        </DialogConfirm>
      </Dialog>
    </>
  );
};

type WorkoutDetailsContainerProps = {
  id: string;
};

export const WorkoutDetailsContainer = ({
  id,
}: WorkoutDetailsContainerProps) => {
  const { push } = useRouter();

  const workout = useWorkout(id);

  const handleDelete = useDeleteWorkout();

  if (!workout) {
    notFound();
  }

  const athlete = useAthlete(workout.athlete);

  const onDelete = useCallback(() => {
    handleDelete(id);
    push('/harjoitukset');
  }, [handleDelete, id, push]);

  const { name, intervals, speedUnit, angleUnit } = workout;

  const { formatted } = calculateIntervalsTotalSummary(intervals);

  const dataFile = useMemo(
    () =>
      new File(
        [JSON.stringify(workout ?? {})],
        `${name}_${getTimeString()}${WORKOUT_FILENAME_EXTENSION}`,
        { type: 'text/plain' },
      ),
    [workout, name],
  );

  const shareData = useMemo(() => {
    const data = {
      title: name,
      text: 'Harjoitus',
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
      <UpdatePageInfo title={name} backLink="/harjoitukset" />
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
          <InfoCard label="Aika" testId="workout-template-ascent" isSmall>
            {formatDate(workout.date)}
          </InfoCard>
          <InfoCard label="Urheilija" testId="workout-template-ascent" isSmall>
            {athlete?.name ?? '-'}
          </InfoCard>
        </section>
        <LinkList isVertical>
          <LinkListLink
            link={`/harjoitukset/${id}/muokkaa`}
            testId="edit-workout-template"
            icon={IconName.cog}
          >
            Muokkaa
          </LinkListLink>
          <WorkoutDeleteModal onDelete={onDelete} />
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
          {workout.intervals.map((interval) => (
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
