import { PermissionsEnum } from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveSolicitudTransferenciaMaterial } from '../../shared/components';

export type CreateSolicitudTransferenciaMaterialPageProps = {};

const CreateSolicitudTransferenciaMaterialPage: React.FC<
  CreateSolicitudTransferenciaMaterialPageProps
> = () => {
  useCheckPermission(
    PermissionsEnum.inventario_add_solicitudtransferenciamaterial,
  );

  return (
    <SaveSolicitudTransferenciaMaterial title="Crear Solcilitud Transferencia Material" />
  );
};

export default CreateSolicitudTransferenciaMaterialPage;
