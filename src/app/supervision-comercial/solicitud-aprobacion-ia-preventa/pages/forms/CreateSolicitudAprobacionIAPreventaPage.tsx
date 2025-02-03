import { SaveSolicitudAprobacionIAPreventa } from '../../shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';

export type CreateSolicitudAprobacionIAPreventaPageProps = {};

const CreateSolicitudAprobacionIAPreventaPage: React.FC<
  CreateSolicitudAprobacionIAPreventaPageProps
> = () => {
  useCheckPermission(
    PermissionsEnum.comercial_add_solicitudaprobacioniapreventa,
  );

  return (
    <SaveSolicitudAprobacionIAPreventa title="Crear SolicitudAprobacionIAPreventa" />
  );
};

export default CreateSolicitudAprobacionIAPreventaPage;
