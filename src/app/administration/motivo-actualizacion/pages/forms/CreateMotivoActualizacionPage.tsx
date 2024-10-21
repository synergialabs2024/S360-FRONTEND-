import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveMotivoActualizacion } from '../../shared/components';

export type CreateMotivoActualizacionPageProps = {};

const CreateMotivoActualizacionPage: React.FC<
  CreateMotivoActualizacionPageProps
> = () => {
  useCheckPermission(PermissionsEnum.administration_add_motivoactualizacion);

  return <SaveMotivoActualizacion title="Crear motivo de actualización" />;
};

export default CreateMotivoActualizacionPage;
