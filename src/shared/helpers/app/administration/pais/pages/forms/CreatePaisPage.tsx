import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SavePais } from './../../shared/components';

export type CreatePaisPageProps = {};

const CreatePaisPage: React.FC<CreatePaisPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_add_pais);

  return <SavePais title="Crear Pais" />;
};

export default CreatePaisPage;
