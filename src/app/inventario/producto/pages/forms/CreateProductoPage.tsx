import { SaveProducto } from '../../shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';

export type CreateProductoPageProps = {};

const CreateProductoPage: React.FC<CreateProductoPageProps> = () => {
  useCheckPermission(PermissionsEnum.inventario_add_producto);

  return <SaveProducto title="Crear Producto" />;
};

export default CreateProductoPage;
