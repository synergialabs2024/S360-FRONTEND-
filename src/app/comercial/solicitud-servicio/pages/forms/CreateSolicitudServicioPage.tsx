import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveSolicitudServicio } from '../../shared/components';
import { useLocation } from 'react-router';

export type CreateSolicitudServicioPageProps = {};

const CreateSolicitudServicioPage: React.FC<
  CreateSolicitudServicioPageProps
> = () => {
  useCheckPermission(PermissionsEnum.comercial_add_solicitudservicio);

  const location = useLocation();
  const fromLeed = location.state?.leed;

  return (
    <SaveSolicitudServicio
      title="Crear Solicitud de Servicio"
      leed={fromLeed}
    />
  );
};

export default CreateSolicitudServicioPage;
