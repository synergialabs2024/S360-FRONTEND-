import SaveTarea from '../../shared/components/SaveTarea/SaveTarea';
import { ROUTER_PATHS } from '@/router/constants';
import { useGetBuzonTarea } from '@/actions/app/cartera/buzon-tareas';
import { Navigate, useParams } from 'react-router';
import { useLoaders } from '@/shared';

export const returnUrlCambioPlanPage =
  ROUTER_PATHS.buzonTareas.buzonTareasAsignadasNav;

export type CreateTareaPageProps = {};

const CreateTareaPage: React.FC<CreateTareaPageProps> = () => {
  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetBuzonTarea(uuid!);
  useLoaders(isLoading || isRefetching);
  if (isLoading) return null; // no isRefetching commented 'cause opt
  if (!data?.data?.id) return <Navigate to={returnUrlCambioPlanPage} />;

  return <SaveTarea title="Gestionar Tarea" buzonTarea={data.data} />;
};

export default CreateTareaPage;
