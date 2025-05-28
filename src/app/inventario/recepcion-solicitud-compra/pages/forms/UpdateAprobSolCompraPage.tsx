import { Navigate, useParams } from 'react-router';

import { useGetsolicitudCompra } from '@/actions/app';
import { PermissionsEnum, useLoaders } from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveAproSolCompra } from '../../shared/components';
import { returnUrlAprobarSolCompraPage } from '../tables/AprobarSolCompra';

export type UpdateAprobSolCompraPageProps = {};

const UpdateAprobSolCompraPage: React.FC<
  UpdateAprobSolCompraPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_change_solicitudcompra);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetsolicitudCompra(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlAprobarSolCompraPage} />;

  return (
    <SaveAproSolCompra
      title="Cambiar Estado de Solicitud"
      aprobCompra={data.data}
    />
  );
};

export default UpdateAprobSolCompraPage;
