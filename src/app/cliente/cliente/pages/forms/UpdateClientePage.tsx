import { Navigate, useParams } from 'react-router-dom';

import { useCheckPermission } from '@/shared/hooks/auth';
import { useLoaders } from '@/shared/hooks';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveCliente } from '../../shared/components';
import { useGetCliente } from '@/actions/app';
import { returnUrlClientesPage } from '../tables/ClientesPage';

export type UpdateClientePageProps = {};

const UpdateClientePage: React.FC<UpdateClientePageProps> = () => {
  useCheckPermission(PermissionsEnum.clientes_change_cliente);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetCliente(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlClientesPage} />;

  return <SaveCliente title="Editar Cliente" cliente={data.data} />;
};

export default UpdateClientePage;
