import { EditAthleteContainer } from '$containers/athlete/edit-athlete.container';

type EditAthletePageProps = {
  params: {
    athleteId: string;
  };
};

export default function EditAthletePage({ params }: EditAthletePageProps) {
  return <EditAthleteContainer id={params.athleteId} />;
}
