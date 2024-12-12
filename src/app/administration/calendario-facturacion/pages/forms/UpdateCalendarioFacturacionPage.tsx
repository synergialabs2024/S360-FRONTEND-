import { Navigate, useParams } from 'react-router-dom';

import { useGetCalendarioFacturacion } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { SaveCalendarioFacturacion } from '../../shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared';
import { returnUrlCalendarioFacturacionesPage } from '../tables/CalendarioFacturacionPage';

export type UpdateCalendarioFacturacionPageProps = {};

const UpdateCalendarioFacturacionPage: React.FC<
  UpdateCalendarioFacturacionPageProps
> = () => {
  useCheckPermission(
    PermissionsEnum.administration_change_calendariofacturacion,
  );

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetCalendarioFacturacion(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlCalendarioFacturacionesPage} />;

  return (
    <SaveCalendarioFacturacion
      title="Editar Calendario Factura"
      calendarioFacturacion={data.data}
    />
  );
};

export default UpdateCalendarioFacturacionPage;
