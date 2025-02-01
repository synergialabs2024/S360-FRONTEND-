import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveModeloInventario } from '../../shared/components';
import { useGetModeloInventario } from '@/actions/app';
import { returnUrlModeloInventariosPage } from '../tables/ModeloInventariosPages';

export type UpdateModeloInventarioPageProps = {};

const UpdateModeloInventarioPage: React.FC<
  UpdateModeloInventarioPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_change_modeloinventario);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetModeloInventario(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlModeloInventariosPage} />;

  return (
    <SaveModeloInventario
      title="Editar Modelo Inventario"
      modelo_inventario={data.data}
    />
  );
};

export default UpdateModeloInventarioPage;
