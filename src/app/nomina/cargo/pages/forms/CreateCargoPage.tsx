import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveCargo } from '../../shared/components';

export type CreateCargoPageProps = {};

const CreateCargoPage: React.FC<CreateCargoPageProps> = () => {
  useCheckPermission(PermissionsEnum.nomina_add_cargo);

  return <SaveCargo title="Crear Cargo" />;
};

export default CreateCargoPage;
