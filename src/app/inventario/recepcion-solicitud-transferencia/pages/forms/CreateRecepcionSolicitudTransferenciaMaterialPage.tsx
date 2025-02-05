import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { useGetSolicitudTransferenciaMaterial } from '@/actions/app';
import { returnUrlRecepcionSolicitudTransferenciaMaterialesPage } from '../tables/RecepcionSolicitudTransferenciaMaterialMainPages';
import { SaveRecepcionSolicitudTransferenciaMaterial } from '../../shared/components';

export type CreateRecepcionSolicitudTransferenciaMaterialPageProps = {};

const CreateRecepcionSolicitudTransferenciaMaterialPage: React.FC<
  CreateRecepcionSolicitudTransferenciaMaterialPageProps
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
    return (
      <Navigate to={returnUrlRecepcionSolicitudTransferenciaMaterialesPage} />
    );

  return (
    <SaveRecepcionSolicitudTransferenciaMaterial
      title="Cambiar Estado de Solicitud"
      solicitudTransferenciaMaterial={data.data}
    />
  );
};

export default CreateRecepcionSolicitudTransferenciaMaterialPage;
