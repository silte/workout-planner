import { WorkoutTemplateDetailsContainer } from '$containers/workout-templates/workout-template-details.container';

type WorkoutTemplateDetailsPageProps = {
  params: {
    workoutTemplateId: string;
  };
};

export default function WorkoutTemplateDetailsPage({
  params,
}: WorkoutTemplateDetailsPageProps) {
  return <WorkoutTemplateDetailsContainer id={params.workoutTemplateId} />;
}
