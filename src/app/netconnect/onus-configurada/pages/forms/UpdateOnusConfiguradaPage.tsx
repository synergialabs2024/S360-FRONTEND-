import { Navigate, useParams } from 'react-router-dom';

import { PermissionsEnum, useLoaders } from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useGetOnusConfigurada } from '@/actions/app';
import { returnUrlOnusConfiguradasPage } from '../tables/OnusConfiguradasPage';
import { SaveOnusConfigurada } from '../../shared/components';

export type UpdateOnusConfiguradaPageProps = {};

const UpdateOnusConfiguradaPage: React.FC<
  UpdateOnusConfiguradaPageProps
> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_change_pais);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetOnusConfigurada(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlOnusConfiguradasPage} />;

  return (
    <SaveOnusConfigurada
      title="Editar Registro de Onus Configurada"
      onusConfigurada={data.data}
    />
  );
};

export default UpdateOnusConfiguradaPage;
