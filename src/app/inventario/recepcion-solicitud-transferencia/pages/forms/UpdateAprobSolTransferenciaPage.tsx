import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { useGetSolicitudTransferenciaMaterial } from '@/actions/app';
import SaveAprobSolTransferencia from '../../shared/components/SaveAproSolTransferencia/SaveAproSolTransferencia';
import { returnUrlRecepcionSolicitudTransferenciaMaterialesPage } from '../tables/RecepcionSolicitudTransferenciaMaterialMainPages';

export type UpdateAprobSolTransferenciaPageProps = {};

const UpdateAprobSolTransferenciaPage: React.FC<
  UpdateAprobSolTransferenciaPageProps
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
    <SaveAprobSolTransferencia
      title="Cambiar Estado de Solicitud"
      aprobTransferencia={data.data}
    />
  );
};

export default UpdateAprobSolTransferenciaPage;
