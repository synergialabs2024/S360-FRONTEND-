import { Navigate, useParams } from 'react-router-dom';

import { useGetSolicitudTransferenciaMaterial } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared';
import { SaveSolicitudTransferenciaMaterial } from '../../shared/components';
import { returnUrlSolicitudTransferenciaMaterialesPage } from '../tables/SolicitudTransferenciaMaterialMainPages';

export type UpdateSolicitudTransferenciaMaterialPageProps = {};

const UpdateSolicitudTransferenciaMaterialPage: React.FC<
  UpdateSolicitudTransferenciaMaterialPageProps
> = () => {
  useCheckPermission(
    PermissionsEnum.inventario_change_solicitudtransferenciamaterial,
  );

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } =
    useGetSolicitudTransferenciaMaterial(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlSolicitudTransferenciaMaterialesPage} />;

  return (
    <SaveSolicitudTransferenciaMaterial
      title="Editar Solicitud Transferencia Material"
      solicitudTransferenciaMaterial={data.data}
    />
  );
};

export default UpdateSolicitudTransferenciaMaterialPage;
