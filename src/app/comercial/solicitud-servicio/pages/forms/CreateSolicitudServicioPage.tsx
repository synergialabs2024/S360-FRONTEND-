import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveSolicitudServicio } from '../../shared/components';

export type CreateSolicitudServicioPageProps = {};

const CreateSolicitudServicioPage: React.FC<
  CreateSolicitudServicioPageProps
> = () => {
  useCheckPermission(PermissionsEnum.comercial_add_solicitudservicio);

  return <SaveSolicitudServicio title="Crear Solicitud de Servicio" />;
};

export default CreateSolicitudServicioPage;
