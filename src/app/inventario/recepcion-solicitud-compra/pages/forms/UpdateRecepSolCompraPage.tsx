import { Navigate, useParams } from 'react-router';

import { PermissionsEnum, useLoaders } from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useGetsolicitudCompra } from '@/actions/app';
import { returnUrlRecepSolCompraPage } from '../tables/RecepcionSolCompraMainPages';
import SaveRecepSolCompra from '../../shared/components/SaveRecepSolCompra/SaveRecepSolCompra';

export type UpdateRecepSolCompraPageProps = {};

const UpdateRecepSolCompraPage: React.FC<
  UpdateRecepSolCompraPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_change_solicitudcompra);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetsolicitudCompra(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlRecepSolCompraPage} />;

  return (
    <SaveRecepSolCompra
      title="Cambiar Estado de Solicitud"
      recepcionCompra={data.data}
    />
  );
};

export default UpdateRecepSolCompraPage;
