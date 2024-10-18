import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveNap } from '../../shared/components';

export type CreateNapPageProps = {};

const CreateNapPage: React.FC<CreateNapPageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_add_nap);

  return <SaveNap title="Crear Caja Nap" />;
};

export default CreateNapPage;
