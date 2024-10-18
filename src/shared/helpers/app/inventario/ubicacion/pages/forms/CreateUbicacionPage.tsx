import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveUbicacion } from '../../shared/components';

export type CreateUbicacionPageProps = {};

const CreateUbicacionPage: React.FC<CreateUbicacionPageProps> = () => {
  useCheckPermission(PermissionsEnum.inventario_add_ubicacion);

  return <SaveUbicacion title="Crear Ubicación" />;
};

export default CreateUbicacionPage;
