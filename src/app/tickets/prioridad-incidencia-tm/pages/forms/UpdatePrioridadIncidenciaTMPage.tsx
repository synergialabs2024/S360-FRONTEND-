import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { PermissionsEnum } from '@/shared/interfaces';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useGetPrioridadIncidenciaTM } from '@/actions/app';
import { SavePrioridadIncidenciaTM } from '../../shared/components';
import { returnUrlPrioridadIncidenciaTMPage } from '../tables/PrioridadIncidenciaTMPage';

export type UpdatePrioridadIncidenciaTMPageProps = {};

const UpdatePrioridadIncidenciaTMPage: React.FC<
  UpdatePrioridadIncidenciaTMPageProps
> = () => {
  useCheckPermission(
    PermissionsEnum.tecnico_change_prioridadincidenciaticketmasivo,
  );

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetPrioridadIncidenciaTM(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlPrioridadIncidenciaTMPage} />;

  return (
    <SavePrioridadIncidenciaTM
      title="Editar Prioridad Incidencia del Ticket Masivo"
      prioridadincidenciaTM={data.data}
    />
  );
};

export default UpdatePrioridadIncidenciaTMPage;
