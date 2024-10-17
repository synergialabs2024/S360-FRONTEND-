import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveMonitoreo } from '../../shared/components';
import { PermissionsEnum } from '@/shared';

export type CreateMonitoreoPageProps = {};

const CreateMonitoreoPage: React.FC<CreateMonitoreoPageProps> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_add_pais);

  return <SaveMonitoreo title="Crear Monitoreo" />;
};

export default CreateMonitoreoPage;
