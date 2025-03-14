import { SaveIncidenciaTM } from '../../shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';

export type CreateIncidenciaTMPageProps = {};

const CreateIncidenciaTMPage: React.FC<CreateIncidenciaTMPageProps> = () => {
  useCheckPermission(PermissionsEnum.tecnico_add_incidenciaticketmasivo);

  return <SaveIncidenciaTM title="Crear Incidencia para ticket masivo" />;
};

export default CreateIncidenciaTMPage;
