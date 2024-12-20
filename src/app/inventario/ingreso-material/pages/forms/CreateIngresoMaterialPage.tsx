import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveIngresoMaterial } from '../../shared/components';
import { PermissionsEnum } from '@/shared';

export type CreateIngresoMaterialPageProps = {};

const CreateIngresoMaterialPage: React.FC<
  CreateIngresoMaterialPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_add_ingresomaterial);

  return <SaveIngresoMaterial title="Crear Ingreso Material" />;
};

export default CreateIngresoMaterialPage;
