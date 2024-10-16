import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveSector } from '../../shared/components';

export type CreateSectorPageProps = {};

const CreateSectorPage: React.FC<CreateSectorPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_add_sector);

  return <SaveSector title="Crear Sector" />;
};

export default CreateSectorPage;
