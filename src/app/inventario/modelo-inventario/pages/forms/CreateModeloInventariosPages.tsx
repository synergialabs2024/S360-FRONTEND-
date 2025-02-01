import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveModeloInventario } from '../../shared/components';

export type CreateModeloInventarioPageProps = {};

const CreateModeloInventarioPage: React.FC<
  CreateModeloInventarioPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_add_modeloinventario);

  return <SaveModeloInventario title="Crear Modelo Inventario" />;
};

export default CreateModeloInventarioPage;
