import { Navigate, useParams } from 'react-router-dom';

import { useGetEgresoMaterial } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared';
import { SaveEgresoMaterial } from '../../shared/components';
import { returnUrlEgresoMaterialesPage } from '../tables/EgresoMaterialesPage';

export type UpdateEgresoMaterialPageProps = {};

const UpdateEgresoMaterialPage: React.FC<
  UpdateEgresoMaterialPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_change_egresomaterial);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetEgresoMaterial(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlEgresoMaterialesPage} />;

  return (
    <SaveEgresoMaterial
      title="Editar Egreso Material"
      egresoMaterial={data.data}
    />
  );
};

export default UpdateEgresoMaterialPage;
