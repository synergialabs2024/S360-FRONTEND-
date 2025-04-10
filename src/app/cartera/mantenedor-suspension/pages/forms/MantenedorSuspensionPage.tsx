import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import SaveMantenedorSuspension from '../../shared/components/SaveMantenedorSuspension/SaveMantenedorSuspension';

export type MantenedorActivacionesBasePageProps = {};

const MantenedorActivacionesBasePage: React.FC<
  MantenedorActivacionesBasePageProps
> = () => {
  useCheckPermission(PermissionsEnum.cartera_add_mantenedorsuspension);

  return <SaveMantenedorSuspension title="Crear Mantenedor Suspension" />;
};

export default MantenedorActivacionesBasePage;
