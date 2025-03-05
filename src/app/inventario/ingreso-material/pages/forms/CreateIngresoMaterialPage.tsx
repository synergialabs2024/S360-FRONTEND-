import { SaveIngresoMateriales } from '../../shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared';

export type CreateIngresoMaterialPageProps = {};

const CreateIngresoMaterialPage: React.FC<
  CreateIngresoMaterialPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_add_ingresomaterial);

  return <SaveIngresoMateriales title="Crear Ingreso Material" />;
};

export default CreateIngresoMaterialPage;
