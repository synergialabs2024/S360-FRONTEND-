import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveOrigen } from '../../shared/components';

export type CreateOrigenPageProps = {};

const CreateOrigenPage: React.FC<CreateOrigenPageProps> = () => {
  useCheckPermission(PermissionsEnum.inventario_add_ubicacion);

  return <SaveOrigen title="Crear Origen" />;
};

export default CreateOrigenPage;
