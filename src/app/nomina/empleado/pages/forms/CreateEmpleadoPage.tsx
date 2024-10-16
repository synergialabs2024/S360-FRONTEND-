import { SaveEmpleado } from '../../shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';

export type CreateEmpleadoPageProps = {};

const CreateEmpleadoPage: React.FC<CreateEmpleadoPageProps> = () => {
  useCheckPermission(PermissionsEnum.nomina_add_empleado);

  return <SaveEmpleado title="Crear Empleado" />;
};

export default CreateEmpleadoPage;
