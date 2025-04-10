import { PermissionsEnum } from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveTransferenciaMaterial } from '../../shared/components';
import { useLocation } from 'react-router';

export type CreateTransferenciaMaterialPageProps = {};

const CreateTransferenciaMaterialPage: React.FC<
  CreateTransferenciaMaterialPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_add_transferenciamaterial);
  const location = useLocation();
  const fromSolicitud = location.state?.solicitud;

  return (
    <SaveTransferenciaMaterial
      title="Crear Transferencia Material"
      solicitud={fromSolicitud}
    />
  );
};

export default CreateTransferenciaMaterialPage;
