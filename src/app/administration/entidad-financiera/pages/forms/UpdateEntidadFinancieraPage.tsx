import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { useGetEntidadFinanciera } from '@/actions/app';
import { returnUrlEntidadesFinancieraPage } from '../tables/EntidadesFinancieraPage';
import { SaveEntidadFinanciera } from '../../shared/components';

export type UpdateEntidadFinancieraPageProps = {};

const UpdateEntidadFinancieraPage: React.FC<
  UpdateEntidadFinancieraPageProps
> = () => {
  useCheckPermission(PermissionsEnum.administration_change_entidadfinanciera);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetEntidadFinanciera(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlEntidadesFinancieraPage} />;

  return (
    <SaveEntidadFinanciera
      title="Editar Entidad Financiera"
      entidadfinanciera={data.data}
    />
  );
};

export default UpdateEntidadFinancieraPage;
