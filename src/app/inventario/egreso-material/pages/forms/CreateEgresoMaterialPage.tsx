import { PermissionsEnum } from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveEgresoMaterial } from '../../shared/components';

export type CreateEgresoMaterialPageProps = {};

const CreateEgresoMaterialPage: React.FC<
  CreateEgresoMaterialPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_add_egresomaterial);

  return <SaveEgresoMaterial title="Crear Egreso Material" />;
};

export default CreateEgresoMaterialPage;
