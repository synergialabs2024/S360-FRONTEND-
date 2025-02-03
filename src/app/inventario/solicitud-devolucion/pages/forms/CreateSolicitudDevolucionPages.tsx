import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared';
import { SaveSolicitudDevolucion } from '../../shared/components';

export type CreateSolicitudDevolucionPageProps = {};

const CreateSolicitudDevolucionPages: React.FC<
  CreateSolicitudDevolucionPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_add_solicituddevolicion);

  return <SaveSolicitudDevolucion title="Crear Solicitud Devolucion" />;
};

export default CreateSolicitudDevolucionPages;
