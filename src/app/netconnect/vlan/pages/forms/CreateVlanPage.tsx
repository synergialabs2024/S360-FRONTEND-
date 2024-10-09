import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveVlan } from '../../shared/components';
import { PermissionsEnum } from '@/shared';

export type CreateVlanPageProps = {};

const CreateVlanPage: React.FC<CreateVlanPageProps> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_add_pais);

  return <SaveVlan title="Crear Vlan" />;
};

export default CreateVlanPage;
