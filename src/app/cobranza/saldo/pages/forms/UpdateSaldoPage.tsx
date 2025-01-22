import { Navigate, useParams } from 'react-router-dom';

import { useGetSaldo } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveSaldo } from '../../shared/components';
import { returnUrlSaldosPage } from '../tables/SaldosPage';

export type UpdateSaldoPageProps = {};

const UpdateSaldoPage: React.FC<UpdateSaldoPageProps> = () => {
  useCheckPermission(PermissionsEnum.cobranza_change_saldo);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetSaldo(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlSaldosPage} />;

  return <SaveSaldo title="Editar Saldo" saldo={data.data} />;
};

export default UpdateSaldoPage;
