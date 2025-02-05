import { PermissionsEnum } from '@/shared/interfaces';
import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveMotivoTransferencia } from '../../shared/components';

export type CreateMotivoTransferenciaPageProps = {};

const CreateMotivoTransferenciaPage: React.FC<
  CreateMotivoTransferenciaPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_add_motivotransferencia);

  return <SaveMotivoTransferencia title="Crear Motivo Transferencia" />;
};

export default CreateMotivoTransferenciaPage;
