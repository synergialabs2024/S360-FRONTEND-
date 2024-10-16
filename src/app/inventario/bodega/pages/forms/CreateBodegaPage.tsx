import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveBodega } from '../../shared/components';
import { PermissionsEnum } from '@/shared';

export type CreateBodegaPageProps = {};

const CreateBodegaPage: React.FC<CreateBodegaPageProps> = () => {
  useCheckPermission(PermissionsEnum.inventario_add_bodega);

  return <SaveBodega title="Crear Bodega" />;
};

export default CreateBodegaPage;
