import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useGetDepartamentoTM } from '@/actions/app';
import { SaveDepartamentoTM } from '../../shared/components';
import { PermissionsEnum } from '@/shared/interfaces';
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlDepartamentoTMPage } from '../tables/DepartamentoTMPage';

export type UpdateDepartamentoTMPageProps = {};

const UpdateDepartamentoTMPage: React.FC<
  UpdateDepartamentoTMPageProps
> = () => {
  useCheckPermission(PermissionsEnum.tecnico_change_departamentoticketmasivo);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetDepartamentoTM(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlDepartamentoTMPage} />;

  return (
    <SaveDepartamentoTM
      title="Editar Departamento del Ticket Masivo"
      departamentoTM={data.data}
    />
  );
};

export default UpdateDepartamentoTMPage;
