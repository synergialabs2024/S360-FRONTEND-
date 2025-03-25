import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import SaveCriterioMantenedorActivaciones from '../../shared/components/SaveCriterioMantenedorActivaciones/SaveCriterioMantenedorActivaciones';

export type CreateCriterioMantenedorActivacionesPageProps = {};

const CreateCriterioMantenedorActivacionesPage: React.FC<
  CreateCriterioMantenedorActivacionesPageProps
> = () => {
  useCheckPermission(PermissionsEnum.cartera_add_criteriomantenedoractivacion);

  return (
    <SaveCriterioMantenedorActivaciones title="Crear Criterio Mantenedor Activaciones" />
  );
};

export default CreateCriterioMantenedorActivacionesPage;
