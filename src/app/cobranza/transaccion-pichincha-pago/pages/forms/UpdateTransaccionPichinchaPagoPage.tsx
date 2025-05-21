import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { PermissionsEnum } from '@/shared/interfaces';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useGetTransaccionPichinchaPago } from '@/actions/app';
import { SaveTransaccionPichinchaPago } from '../../shared/components';
import { returnUrlTransaccionPichinchaPagoPage } from '../tables/TransaccionPichinchaPagoPage';

export type UpdateTransaccionPichinchaPagoPageProps = {};

const UpdateTransaccionPichinchaPagoPage: React.FC<
  UpdateTransaccionPichinchaPagoPageProps
> = () => {
  useCheckPermission(PermissionsEnum.cobranza_change_transaccionpichinchapago);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetTransaccionPichinchaPago(
    uuid!,
  );
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlTransaccionPichinchaPagoPage} />;

  return (
    <SaveTransaccionPichinchaPago
      title="Editar Transaccion Pichincha Pago"
      tpp={data.data}
    />
  );
};

export default UpdateTransaccionPichinchaPagoPage;
