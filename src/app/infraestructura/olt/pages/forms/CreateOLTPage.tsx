import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveOLT } from '../../shared/components';

export type CreateOLTPageProps = {};

const CreateOLTPage: React.FC<CreateOLTPageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_add_olt);

  return <SaveOLT title="Crear OLT" />;
};

export default CreateOLTPage;
