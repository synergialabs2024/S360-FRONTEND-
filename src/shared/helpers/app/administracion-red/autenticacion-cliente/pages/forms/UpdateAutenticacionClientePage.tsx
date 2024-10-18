import { Navigate, useParams } from 'react-router-dom';

import { PermissionsEnum, useLoaders } from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useGetAutenticacionCliente } from '@/actions/app';
import { SaveAutenticacionCliente } from '../../shared/components';
import { returnUrlAutenticacionClientesPage } from '../tables/AutenticacionClientePage';

export type UpdateAutenticacionClientePageProps = {};

const UpdateAutenticacionClientePage: React.FC<
  UpdateAutenticacionClientePageProps
> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_change_pais);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetAutenticacionCliente(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlAutenticacionClientesPage} />;

  return (
    <SaveAutenticacionCliente
      title="Editar Autenticacion del Cliente"
      authCliente={data.data}
    />
  );
};

export default UpdateAutenticacionClientePage;
