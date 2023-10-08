import { EditWorkoutContainer } from '$containers/workouts/edit-workout.container';

type EditWorkoutPageProps = {
  params: {
    workoutId: string;
  };
};

export default function EditWorkoutPage({ params }: EditWorkoutPageProps) {
  return <EditWorkoutContainer id={params.workoutId} />;
}
