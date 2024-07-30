import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveSystemUser } from '../../shared/components';

export type CreateSystemUserPageProps = {};

const CreateSystemUserPage: React.FC<CreateSystemUserPageProps> = () => {
  useCheckPermission(PermissionsEnum.users_add_profile);

  return <SaveSystemUser title="Crear Usuario" />;
};

export default CreateSystemUserPage;
