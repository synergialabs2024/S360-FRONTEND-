import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared';
import SaveSolicitudMaterial from '../../shared/components/SaveSolicitudMaterial/SaveSolicitudMaterial';

export type CreateBodegaPageProps = {};

const CreateSolicitudMaterialPage: React.FC<CreateBodegaPageProps> = () => {
  useCheckPermission(PermissionsEnum.inventario_add_solicitudmaterial);

  return <SaveSolicitudMaterial title="Crear Solicitud Material" />;
};

export default CreateSolicitudMaterialPage;
