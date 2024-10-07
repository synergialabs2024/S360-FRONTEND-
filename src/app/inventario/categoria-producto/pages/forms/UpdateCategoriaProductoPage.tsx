import { Navigate, useParams } from 'react-router-dom';

import { useGetCategoriaProducto } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveCategoriaProducto } from '../../shared/components';
import { returnUrlCategoriasProductoPage } from '../tables/CategoriasProductoPage';

export type UpdateCategoriaProductoPageProps = {};

const UpdateCategoriaProductoPage: React.FC<
  UpdateCategoriaProductoPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_change_categoriaproducto);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetCategoriaProducto(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlCategoriasProductoPage} />;

  return (
    <SaveCategoriaProducto
      title="Editar Categoría de Producto"
      categoriaproducto={data.data}
    />
  );
};

export default UpdateCategoriaProductoPage;
