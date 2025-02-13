import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import SaveCriterioMantenedorActivaciones from '../../shared/components/SaveCriterioMantenedorActivaciones/SaveCriterioMantenedorActivaciones';

export type CreateCriterioMantenedorActivacionesPageProps = {};

const CreateCriterioMantenedorActivacionesPage: React.FC<
  CreateCriterioMantenedorActivacionesPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_add_ubicacion);

  return (
    <SaveCriterioMantenedorActivaciones title="Crear Criterio Mantenedor Activaciones" />
  );
};

export default CreateCriterioMantenedorActivacionesPage;
