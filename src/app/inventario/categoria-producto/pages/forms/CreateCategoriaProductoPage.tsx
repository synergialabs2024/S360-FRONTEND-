import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveCategoriaProducto } from '../../shared/components';

export type CreateCategoriaProductoPageProps = {};

const CreateCategoriaProductoPage: React.FC<
  CreateCategoriaProductoPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_add_categoriaproducto);

  return <SaveCategoriaProducto title="Crear Categoría de Producto" />;
};

export default CreateCategoriaProductoPage;
