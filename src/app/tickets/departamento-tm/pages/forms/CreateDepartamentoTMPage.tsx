import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveDepartamentoTM } from '../../shared/components';

export type CreateDepartamentoTMPageProps = {};

const CreateDepartamentoTMPage: React.FC<
  CreateDepartamentoTMPageProps
> = () => {
  useCheckPermission(PermissionsEnum.tecnico_add_departamentoticketmasivo);

  return <SaveDepartamentoTM title="Crear Departamento para ticket masivo" />;
};

export default CreateDepartamentoTMPage;
