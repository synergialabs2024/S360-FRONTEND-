import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveMotivoRechazo } from '../../shared/components';

export type CreateMotivoRechazoPageProps = {};

const CreateMotivoRechazoPage: React.FC<CreateMotivoRechazoPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_add_motivorechazo);

  return <SaveMotivoRechazo title="Crear Motivo de Rechazo" />;
};

export default CreateMotivoRechazoPage;
