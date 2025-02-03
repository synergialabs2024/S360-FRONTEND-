import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared';
import { SaveSolicitudMaterial } from '../../shared/components';

export type CreateSolicitudMaterialPageProps = {};

const CreateSolicitudMaterialPage: React.FC<
  CreateSolicitudMaterialPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_add_solicitudmaterial);

  return <SaveSolicitudMaterial title="Crear Solicitud Material" />;
};

export default CreateSolicitudMaterialPage;
