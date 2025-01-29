import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { ROUTER_PATHS } from '@/router/constants';
import SaveBuzonTareas from '../../shared/components/SaveMantenedorAplicaciones/SaveMantenedorAplicaciones';

export type MantenedorAplicacionesPageProps = {};

export const returnUrlMantenedorAplicacionesPage =
  ROUTER_PATHS.cartera.mantenedorActivacionesNav;

const MantenedorAplicacionesPage: React.FC<
  MantenedorAplicacionesPageProps
> = () => {
  useCheckPermission(PermissionsEnum.cobranza_add_factura);

  return (
    <SaveBuzonTareas title="Parametrizacion para activaciones de servicio" />
  );
};

export default MantenedorAplicacionesPage;
