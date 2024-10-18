import { useGetMetodoPago } from '@/actions/app';
import { PermissionsEnum, useLoaders } from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { Navigate, useParams } from 'react-router-dom';
import { returnUrlMetodosPagoPage } from '../tables/MetodosPagoPage';
import { SaveMetodoPago } from '../../shared/components';

export type UpdateMetodoPagoPageProps = {};

const UpdateMetodoPagoPage: React.FC<UpdateMetodoPagoPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_change_metodopago);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetMetodoPago(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlMetodosPagoPage} />;

  return <SaveMetodoPago title="Editar Metodo Pago" metodopago={data.data} />;
};

export default UpdateMetodoPagoPage;
