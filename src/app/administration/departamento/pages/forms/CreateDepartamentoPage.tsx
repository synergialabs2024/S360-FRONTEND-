import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveDepartamento } from '../../shared/components';

export type CreateDepartamentoPageProps = {};

const CreateDepartamentoPage: React.FC<CreateDepartamentoPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_add_departamento);

  return <SaveDepartamento title="Crear Departamento" />;
};

export default CreateDepartamentoPage;
