import { Navigate, useParams } from 'react-router-dom';

import { useGetTransaccion } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveTransaccion } from '../../shared/components';
import { returnUrlTransaccionsPage } from '../tables/TransaccionsPage';

export type UpdateTransaccionPageProps = {};

const UpdateTransaccionPage: React.FC<UpdateTransaccionPageProps> = () => {
  useCheckPermission(PermissionsEnum.cobranza_change_transaccion);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetTransaccion(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlTransaccionsPage} />;

  return <SaveTransaccion title="Editar Transaccion" transaccion={data.data} />;
};

export default UpdateTransaccionPage;
