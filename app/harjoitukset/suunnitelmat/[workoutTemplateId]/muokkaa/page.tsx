import { EditWorkoutTemplateContainer } from '$containers/workout-templates/edit-workout-template.container';

type EditWorkoutTemplatePageProps = {
  params: {
    workoutTemplateId: string;
  };
};

export default function EditWorkoutTemplatePage({
  params,
}: EditWorkoutTemplatePageProps) {
  return <EditWorkoutTemplateContainer id={params.workoutTemplateId} />;
}
