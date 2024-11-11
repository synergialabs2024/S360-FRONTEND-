import { Navigate, useParams } from 'react-router-dom';

import { useGetCliente } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { GeneralFibraClient } from '../../shared/components';
import { returnUrlClientesFibraPage } from '../tables/ClientesFibraMainPage';

export type FibraClientFormPageProps = {};

const FibraClientFormPage: React.FC<FibraClientFormPageProps> = () => {
  useCheckPermission(PermissionsEnum.clientes_change_cliente);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetCliente(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlClientesFibraPage} />;

  return <GeneralFibraClient title="Editar Cliente" cliente={data.data} />;
};

export default FibraClientFormPage;
