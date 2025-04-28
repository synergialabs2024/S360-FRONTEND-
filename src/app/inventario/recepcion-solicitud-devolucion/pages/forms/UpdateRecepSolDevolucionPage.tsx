import { Navigate, useParams } from 'react-router';

import { PermissionsEnum, useLoaders } from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useGetsolicitudDevolucion } from '@/actions/app';
import SaveRecepSolDevolucion from '../../shared/components/SaveRecepSolDevolucion/SaveRecepSolDevolucion';
import { returnUrlRecepcionSolicitudDevolucionMaterialesPage } from '../tables/RecepcionSolDevolucionMainPages';

export type UpdateRecepcionSolicitudDevolucionPageProps = {};

const UpdateRecepcionSolicitudDevolucionPage: React.FC<
  UpdateRecepcionSolicitudDevolucionPageProps
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
    <SaveRecepSolDevolucion
      title="Cambiar Estado de Solicitud"
      recepcionDevolucion={data.data}
    />
  );
};

export default UpdateRecepcionSolicitudDevolucionPage;
