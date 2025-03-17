import { SavePrioridadIncidenciaTM } from '../../shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';

export type CreatePrioridadIncidenciaTMPageProps = {};

const CreatePrioridadIncidenciaTMPage: React.FC<
  CreatePrioridadIncidenciaTMPageProps
> = () => {
  useCheckPermission(
    PermissionsEnum.tecnico_add_prioridadincidenciaticketmasivo,
  );

  return (
    <SavePrioridadIncidenciaTM title="Crear Prioridad Incidencia para ticket masivo" />
  );
};

export default CreatePrioridadIncidenciaTMPage;
