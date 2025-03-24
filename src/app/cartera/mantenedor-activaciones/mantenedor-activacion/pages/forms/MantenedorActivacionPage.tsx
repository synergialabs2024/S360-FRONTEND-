import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { ROUTER_PATHS } from '@/router/constants';
import SaveMantenedorActivacionesBase from '../../shared/components/SaveMantenedorActivacion/SaveMantenedorActivacion';

export type MantenedorActivacionPageProps = {};

export const returnUrlMantenedorActivacionesPage =
  ROUTER_PATHS.cartera.mantenedorActivacionesNav;

const MantenedorActivacionPage: React.FC<
  MantenedorActivacionPageProps
> = () => {
  useCheckPermission(PermissionsEnum.cartera_add_mantenedoractivacion);

  return <SaveMantenedorActivacionesBase title="Crear Mantenedor activacion" />;
};

export default MantenedorActivacionPage;
