import { AthleteDetailsContainer } from '$containers/athlete/athlete-details.container';

type AthleteDetailsPageProps = {
  params: {
    athleteId: string;
  };
};

export default function AthleteDetailsPage({
  params,
}: AthleteDetailsPageProps) {
  return <AthleteDetailsContainer id={params.athleteId} />;
}
