import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import SaveMantenedorActivacionesBase from '../../shared/components/SaveMantenedorActivacionesBase/SaveMantenedorActivacionesBase';

export type MantenedorActivacionesBasePageProps = {};

const MantenedorActivacionesBasePage: React.FC<
  MantenedorActivacionesBasePageProps
> = () => {
  useCheckPermission(PermissionsEnum.cartera_add_mantenedoractivacionbase);

  return (
    <SaveMantenedorActivacionesBase title="Crear Mantenedor Activaciones Base" />
  );
};

export default MantenedorActivacionesBasePage;
