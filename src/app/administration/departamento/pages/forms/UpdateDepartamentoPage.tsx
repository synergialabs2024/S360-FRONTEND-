import { Navigate, useParams } from 'react-router-dom';

import { useGetDepartamento } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveDepartamento } from '../../shared/components';
import { returnUrlDepartamentosPage } from '../tables/DepartamentosPage';

export type UpdateDepartamentoPageProps = {};

const UpdateDepartamentoPage: React.FC<UpdateDepartamentoPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_change_departamento);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetDepartamento(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlDepartamentosPage} />;

  return (
    <SaveDepartamento title="Editar Departamento" departamento={data.data} />
  );
};

export default UpdateDepartamentoPage;
