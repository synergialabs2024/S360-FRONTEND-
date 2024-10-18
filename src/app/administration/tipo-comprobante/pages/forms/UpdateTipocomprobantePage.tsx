import { Navigate, useParams } from 'react-router-dom';

import { useGetTipoComprobante } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { SaveTipoComprobante } from '../../shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared';
import { returnUrlTipoComprobantesPage } from '../tables/TipoComprobantesPage';

export type UpdateTipoComprobantePageProps = {};

const UpdateTipoComprobantePage: React.FC<
  UpdateTipoComprobantePageProps
> = () => {
  useCheckPermission(PermissionsEnum.administration_change_tipocomprobante);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetTipoComprobante(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlTipoComprobantesPage} />;

  return (
    <SaveTipoComprobante
      title="Editar Tipo de Comprobante"
      tipoComprobante={data.data}
    />
  );
};

export default UpdateTipoComprobantePage;
