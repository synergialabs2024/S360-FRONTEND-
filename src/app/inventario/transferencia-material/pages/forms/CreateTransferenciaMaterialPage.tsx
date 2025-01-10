import { PermissionsEnum } from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveTransferenciaMaterial } from '../../shared/components';

export type CreateTransferenciaMaterialPageProps = {};

const CreateTransferenciaMaterialPage: React.FC<
  CreateTransferenciaMaterialPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_add_transferenciamaterial);

  return <SaveTransferenciaMaterial title="Crear Transferencia Material" />;
};

export default CreateTransferenciaMaterialPage;
