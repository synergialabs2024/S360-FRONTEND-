import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveVlan } from '../../shared/components';
import { PermissionsEnum } from '@/shared';

export type CreateVlanPageProps = {};

const CreateVlanPage: React.FC<CreateVlanPageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_add_ontmodel);

  return <SaveVlan title="Crear Vlan" />;
};

export default CreateVlanPage;
