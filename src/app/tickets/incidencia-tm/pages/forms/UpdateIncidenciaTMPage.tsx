import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useGetIncidenciaTM } from '@/actions/app';
import { PermissionsEnum } from '@/shared/interfaces';
import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveIncidenciaTM } from '../../shared/components';
import { returnUrlIncidenciaTMPage } from '../tables/IncidenciaTMPage';

export type UpdateIncidenciaTMPageProps = {};

const UpdateIncidenciaTMPage: React.FC<UpdateIncidenciaTMPageProps> = () => {
  useCheckPermission(PermissionsEnum.tecnico_change_incidenciaticketmasivo);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetIncidenciaTM(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlIncidenciaTMPage} />;

  return (
    <SaveIncidenciaTM
      title="Editar Incidencia del Ticket Masivo"
      incidenciaTM={data.data}
    />
  );
};

export default UpdateIncidenciaTMPage;
