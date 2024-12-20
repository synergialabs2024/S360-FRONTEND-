import { Navigate, useParams } from 'react-router-dom';

import { useGetIngresoMaterial } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { SaveIngresoMaterial } from '../../shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared';
import { returnUrlIngresoMaterialesPage } from '../tables/IngresoMaterialesPage';

export type UpdateIngresoMaterialPageProps = {};

const UpdateIngresoMaterialPage: React.FC<
  UpdateIngresoMaterialPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_change_ingresomaterial);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetIngresoMaterial(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlIngresoMaterialesPage} />;

  return (
    <SaveIngresoMaterial
      title="Editar Ingreso Material"
      ingresoMaterial={data.data}
    />
  );
};

export default UpdateIngresoMaterialPage;
