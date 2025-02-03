import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveRecepcionMaterial } from './../../shared/components';
import { useGetRecepcionMaterial } from '@/actions/app';
import { returnUrlRecepcionMaterialPage } from '../tables/RecepcionMaterialMainPage';

export type UpdateRecepcionMaterialPageProps = {};

const UpdateRecepcionMaterialPage: React.FC<
  UpdateRecepcionMaterialPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_change_solicitudmaterial);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetRecepcionMaterial(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlRecepcionMaterialPage} />;

  return (
    <SaveRecepcionMaterial
      title="Cambiar Estado de Solicitud"
      recepcionMaterial={data.data}
    />
  );
};

export default UpdateRecepcionMaterialPage;
