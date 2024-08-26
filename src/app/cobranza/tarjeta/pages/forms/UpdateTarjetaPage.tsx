import { Navigate, useParams } from 'react-router-dom';

import { useGetTarjeta } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveTarjeta } from '../../shared/components';
import { returnUrlTarjetasPage } from '../tables/TarjetasPage';

export type UpdateTarjetaPageProps = {};

const UpdateTarjetaPage: React.FC<UpdateTarjetaPageProps> = () => {
  useCheckPermission(PermissionsEnum.cobranza_change_tarjeta);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetTarjeta(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlTarjetasPage} />;

  return <SaveTarjeta title="Editar Tarjeta" tarjeta={data.data} />;
};

export default UpdateTarjetaPage;
