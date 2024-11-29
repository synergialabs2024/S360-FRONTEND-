import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveBrass } from '../../shared/components';

export type CreateBrassPageProps = {};

const CreateBrassPage: React.FC<CreateBrassPageProps> = () => {
  // Pendiente a cambios
  useCheckPermission(PermissionsEnum.administration_add_pais);

  return <SaveBrass title="Crear Brass" />;
};

export default CreateBrassPage;
