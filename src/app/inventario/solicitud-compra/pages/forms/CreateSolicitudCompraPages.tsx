import { SaveSolicitudCompra } from '../../shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared';

export type CreateSolicitudCompraPageProps = {};

const CreateSolicitudCompraPages: React.FC<
  CreateSolicitudCompraPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_add_solicituddevolicion);

  return <SaveSolicitudCompra title="Crear Solicitud Compra" />;
};

export default CreateSolicitudCompraPages;
