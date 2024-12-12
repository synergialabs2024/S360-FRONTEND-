import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SavePrimaryNap } from '../../shared/components';

export type CreatePrimaryNapPageProps = {};

const CreatePrimaryNapPage: React.FC<CreatePrimaryNapPageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_add_napprimary);

  return <SavePrimaryNap title="Crear Caja Nap Primaria" />;
};

export default CreatePrimaryNapPage;
