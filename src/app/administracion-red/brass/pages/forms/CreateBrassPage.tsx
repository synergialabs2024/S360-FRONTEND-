import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveBrass } from '../../shared/components';

export type CreateBrassPageProps = {};

const CreateBrassPage: React.FC<CreateBrassPageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_add_brass);

  return <SaveBrass title="Crear Brass" />;
};

export default CreateBrassPage;
