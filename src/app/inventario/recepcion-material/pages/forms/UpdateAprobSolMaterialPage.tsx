import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useGetSolicitudMaterial } from '@/actions/app';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum, SolicitudMaterial } from '@/shared/interfaces';
import { returnUrlRecepcionMaterialPage } from '../tables/RecepcionMaterialMainPage';
import SaveAprobSolMaterial from '../../shared/components/SaveAproSolMaterial/SaveAproSolMaterial';

export type UpdateRecepcionMaterialPageProps = {};

const UpdateRecepcionMaterialPage: React.FC<
  UpdateRecepcionMaterialPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_change_solicitudmaterial);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetSolicitudMaterial(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlRecepcionMaterialPage} />;

  return (
    <SaveAprobSolMaterial
      title="Cambiar Estado de Solicitud"
      aprobMaterial={data.data as SolicitudMaterial}
    />
  );
};

export default UpdateRecepcionMaterialPage;
