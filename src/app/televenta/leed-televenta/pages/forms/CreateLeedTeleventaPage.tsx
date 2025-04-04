import { SaveLeedTeleventa } from '../../shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';

export type CreateLeedTeleventaPageProps = {};

const CreateLeedTeleventaPage: React.FC<CreateLeedTeleventaPageProps> = () => {
  useCheckPermission(PermissionsEnum.televentas_add_leedteleventa);

  return <SaveLeedTeleventa title="Crear Leed Televenta" />;
};

export default CreateLeedTeleventaPage;
