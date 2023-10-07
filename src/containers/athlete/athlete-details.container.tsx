'use client';

import { notFound, useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

import { DialogConfirm } from '$elements/dialog/confirm/dialog.confirm';
import { Dialog } from '$elements/dialog/dialog';
import { IconName } from '$elements/icon/icon';
import { LinkList } from '$elements/link-list/link-list';
import { LinkListButton } from '$elements/link-list/link-list.button';
import { LinkListLink } from '$elements/link-list/link-list.link';
import { useAthlete, useDeleteAthlete } from '$hooks/useAthletes';
import { Container } from '$layouts/container/container';
import { AthleteDetailsHrZoneListRow } from '$pages/athlete-form/athlete-details.hr-zone-list-row';
import { ATHLETE_FILENAME_EXTENSION } from '$utils/file-helper';
import { getTimeString } from '$utils/time-helper';
import { UpdatePageInfo } from 'src/components/renderers/update-page-info';

interface IAccountDeleteModalProps {
  onDelete: () => void;
}

export const AthleteDeleteModal = ({ onDelete }: IAccountDeleteModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <LinkListButton
        icon={IconName.trash}
        handleClick={handleToggleOpen}
        testId="delete-athelete"
      >
        Poista
      </LinkListButton>
      <Dialog isDialogOpen={isOpen} setIsDialogOpen={setIsOpen}>
        <DialogConfirm
          onConfirm={onDelete}
          onCancel={handleToggleOpen}
          label="Poista urheilija"
          submitButtonLabel="Poista"
          iconName={IconName.exclamation}
          testId="delete-athelete-confirm"
        >
          Haluatko varmasti poistaa urheilijan? Tätä ei voi peruuttaa.
        </DialogConfirm>
      </Dialog>
    </>
  );
};

type AthleteDetailsContainerProps = {
  id: string;
};

export const AthleteDetailsContainer = ({
  id,
}: AthleteDetailsContainerProps) => {
  const { push } = useRouter();

  const athlete = useAthlete(id);

  const handleDelete = useDeleteAthlete();

  if (!athlete) {
    notFound();
  }

  const onDelete = useCallback(() => {
    handleDelete(id);
    push('/urheilijat');
  }, [handleDelete, id, push]);

  const { name, hrZones } = athlete;

  const dataFile = useMemo(
    () =>
      new File(
        [JSON.stringify(athlete ?? {})],
        `${name}_${getTimeString()}${ATHLETE_FILENAME_EXTENSION}`,
        { type: 'text/plain' },
      ),
    [athlete, name],
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
      <UpdatePageInfo title={name} backLink="/urheilijat" />
      <section className={'mb-6 grid md:grid-cols-2 gap-4 md:gap-6'}>
        <LinkList isVertical>
          <LinkListLink
            link={`/urheilijat/${id}/muokkaa`}
            testId="edit-athelete"
            icon={IconName.cog}
          >
            Muokkaa
          </LinkListLink>
          <AthleteDeleteModal onDelete={onDelete} />
          <LinkListLink
            icon={IconName.download}
            download={dataFile.name}
            link={window.URL.createObjectURL(dataFile)}
            testId="download-athelete"
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
        <div className="md:col-start-1 md:row-start-1 md:col-span-1">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>Nimi</th>
                <th>Syke</th>
              </tr>
            </thead>
            <tbody>
              {hrZones.map((hrZone) => (
                <AthleteDetailsHrZoneListRow key={hrZone.id} {...hrZone} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Container>
  );
};
