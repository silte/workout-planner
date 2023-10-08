import { WorkoutDetailsContainer } from '$containers/workouts/workout-details.container';

type WorkoutDetailsPageProps = {
  params: {
    workoutId: string;
  };
};

export default function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  return <WorkoutDetailsContainer id={params.workoutId} />;
}
