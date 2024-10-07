import { Navigate, useParams } from 'react-router-dom';

import { useCheckPermission } from '@/shared/hooks/auth';
import { useLoaders } from '@/shared/hooks';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveProducto } from '../../shared/components';
import { useGetProducto } from '@/actions/app';
import { returnUrlProductosPage } from '../tables/ProductosPage';

export type UpdateProductoPageProps = {};

const UpdateProductoPage: React.FC<UpdateProductoPageProps> = () => {
  useCheckPermission(PermissionsEnum.inventario_change_producto);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetProducto(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlProductosPage} />;

  return <SaveProducto title="Editar Producto" producto={data.data} />;
};

export default UpdateProductoPage;
