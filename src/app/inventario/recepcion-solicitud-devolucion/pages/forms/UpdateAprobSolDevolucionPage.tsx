import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { useGetsolicitudDevolucion } from '@/actions/app';
import SaveAprobSolDevolucion from '../../shared/components/SaveAproSolDevolucion/SaveAproSolDevolucion';
import { returnUrlRecepcionSolicitudDevolucionMaterialesPage } from '../tables/RecepcionSolDevolucionMainPages';

export type UpdateAprobSolDevolucionPageProps = {};

const UpdateAprobSolDevolucionPage: React.FC<
  UpdateAprobSolDevolucionPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_change_solicituddevolicion);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetsolicitudDevolucion(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return (
      <Navigate to={returnUrlRecepcionSolicitudDevolucionMaterialesPage} />
    );

  return (
    <SaveAprobSolDevolucion
      title="Cambiar Estado de Solicitud"
      aprobDevolucion={data.data}
    />
  );
};

export default UpdateAprobSolDevolucionPage;
